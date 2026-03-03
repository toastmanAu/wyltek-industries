/**
 * ckbfs-resolver.js
 *
 * Core CKBFS resolution logic — framework-agnostic, no build step required.
 * Import this from a bundler, or load as a module in the browser.
 *
 * Protocol: CKBFS V2 (code_hash 0x31e637... deployed 20241025)
 * SDK: wraps @ckbfs/api for publish; resolution is hand-rolled for browser compat.
 */

export const CKBFS_CODE_HASH = '0x31e6376287d223b8c0410d562fb422f04d1d617b2947596a14c3d2efb7218d3a';

export const RPC_ENDPOINTS = {
  testnet: 'https://testnet.ckbapp.dev',
  mainnet: 'https://mainnet.ckbapp.dev',
};

// ── CKB RPC ───────────────────────────────────────────────────────────────────

export async function ckbRpc(network, method, params) {
  const res = await fetch(RPC_ENDPOINTS[network], {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: 1, jsonrpc: '2.0', method, params }),
  });
  const data = await res.json();
  if (data.error) throw new Error(`RPC error: ${data.error.message}`);
  return data.result;
}

// ── TypeID parser ─────────────────────────────────────────────────────────────

export function parseIdentifier(input) {
  let typeId = input.trim();
  if (typeId.startsWith('ckbfs://')) typeId = typeId.slice('ckbfs://'.length);
  if (!typeId.startsWith('0x')) typeId = '0x' + typeId;
  if (typeId.length !== 66) throw new Error('Invalid TypeID — expected 32-byte hex (0x + 64 chars)');
  return typeId;
}

// ── Molecule decoder ──────────────────────────────────────────────────────────
// Handles both 4-field (V2/V3 contract schema) and 5-field (old V2 schema) tables.

export function decodeCKBFSData(hex) {
  const data = hexToBytes(hex);
  const dv = new DataView(data.buffer);

  const totalSize = dv.getUint32(0, true);
  if (data.length < totalSize) throw new Error('Truncated cell data');

  // Number of fields = (firstOffset / 4) - 1
  const firstOffset = dv.getUint32(4, true);
  const fieldCount = (firstOffset / 4) - 1;

  const offsets = [];
  for (let i = 0; i < fieldCount; i++) offsets.push(dv.getUint32(4 + i * 4, true));
  offsets.push(totalSize);

  if (fieldCount === 4) {
    // 4-field: index(Uint32), checksum(Uint32), content_type(Bytes), filename(Bytes)
    return {
      index:       dv.getUint32(offsets[0], true),
      checksum:    dv.getUint32(offsets[1], true),
      contentType: decodeBytes(data, dv, offsets[2]),
      filename:    decodeBytes(data, dv, offsets[3]),
    };
  } else {
    // 5-field: indexes(Vec<Uint32>), checksum, content_type, filename, backlinks
    const idxTotal = dv.getUint32(offsets[0], true);
    const indexCount = (idxTotal - 4) / 4;
    return {
      index:       indexCount > 0 ? dv.getUint32(offsets[0] + 4, true) : 0,
      checksum:    dv.getUint32(offsets[1], true),
      contentType: decodeBytes(data, dv, offsets[2]),
      filename:    decodeBytes(data, dv, offsets[3]),
    };
  }
}

function decodeBytes(data, dv, offset) {
  const len = dv.getUint32(offset, true) - 4;
  return new TextDecoder().decode(data.slice(offset + 4, offset + 4 + len));
}

// ── Witness content extractor ─────────────────────────────────────────────────

export function extractFileFromWitness(witnessHex) {
  const bytes = hexToBytes(witnessHex);
  const magic = new TextDecoder().decode(bytes.slice(0, 5));
  if (magic !== 'CKBFS') throw new Error('Witness missing CKBFS magic header');
  const version = bytes[5];
  // v2: content at byte 6; v3: content at byte 50 (6 + 32 + 4 + 4 + 4)
  const contentOffset = version === 0x03 ? 50 : 6;
  return bytes.slice(contentOffset);
}

// ── Main resolve function ─────────────────────────────────────────────────────

/**
 * Resolve a CKBFS TypeID to its file content and metadata.
 *
 * @param {string} typeId   - 0x-prefixed 32-byte hex TypeID
 * @param {string} network  - 'testnet' | 'mainnet'
 * @param {function} [onProgress] - optional (message: string) => void
 * @returns {{ fileBytes: Uint8Array, contentType: string, filename: string, checksum: number, txHash: string }}
 */
export async function resolveCKBFS(typeId, network, onProgress = () => {}) {
  onProgress('Searching for CKBFS cell…');

  const cellsResult = await ckbRpc(network, 'get_cells', [{
    script: { code_hash: CKBFS_CODE_HASH, hash_type: 'data1', args: typeId },
    script_type: 'type',
    filter: null,
  }, 'asc', '0x1']);

  const cells = cellsResult?.objects || [];
  if (cells.length === 0) {
    throw new Error(`No CKBFS cell found for TypeID ${typeId.slice(0, 18)}… on ${network}`);
  }

  const cell = cells[0];
  const { tx_hash, index } = cell.out_point;

  onProgress('Decoding cell metadata…');
  const meta = decodeCKBFSData(cell.output_data || '0x');

  onProgress(`Fetching transaction…`);
  const txResult = await ckbRpc(network, 'get_transaction', [tx_hash]);
  const tx = txResult?.transaction;
  if (!tx) throw new Error('Transaction not found');

  const witnesses = tx.witnesses || [];
  if (meta.index >= witnesses.length) {
    throw new Error(`Witness index ${meta.index} out of range (tx has ${witnesses.length} witnesses)`);
  }

  onProgress(`Extracting ${meta.filename || 'file content'}…`);
  const fileBytes = extractFileFromWitness(witnesses[meta.index]);

  return {
    fileBytes,
    contentType: meta.contentType,
    filename:    meta.filename,
    checksum:    meta.checksum,
    witnessIdx:  meta.index,
    txHash:      tx_hash,
  };
}

// ── Utils ─────────────────────────────────────────────────────────────────────

export function hexToBytes(hex) {
  const h = hex.startsWith('0x') ? hex.slice(2) : hex;
  const arr = new Uint8Array(h.length / 2);
  for (let i = 0; i < arr.length; i++) arr[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16);
  return arr;
}

export function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}
