// posts.js — Wyltek Industries devlog entries
// To add a new post: add an object to the front of the POSTS array.
// Fields:
//   id:      unique slug (used for anchor links)
//   date:    "YYYY-MM-DD"
//   title:   string
//   tags:    array of strings — shown as coloured pills
//   project: primary project name (shown in header strip)
//   body:    array of paragraphs — strings or {type, content} objects
//             plain string   → <p>
//             {type:"h3"}    → <h3>
//             {type:"code"}  → <pre><code> block
//             {type:"ul"}    → <ul> (content = array of strings)
//             {type:"link", text, href} → inline CTA link
//   links:   array of {text, href} — footer buttons on the post card

const POSTS = [

  // ────────────────────────────────────────────────────────────────
  {
    id: "2026-03-01-bitchat-esp32",
    date: "2026-03-01",
    title: "BitChat on ESP32: wire codec + mesh relay engine",
    tags: ["BitChat", "ESP32", "BLE", "LoRa", "mesh", "C++"],
    project: "ckb-light-esp",
    body: [
      "BitChat is Jack Dorsey's decentralised BLE mesh chat — no servers, no accounts, messages hop peer-to-peer over Bluetooth. It launched in July 2025, the protocol spec is clean and well-documented, and the whole thing is Unlicense. Today I built the first two layers of a native ESP32 implementation into ckb-light-esp.",

      {type:"h3", content:"The protocol"},
      "BitChat is a four-layer stack: transport (BLE GATT, abstracted), session/packet framing (TTL, routing, fragmentation), Noise encryption (XX pattern — Curve25519 + ChaCha20-Poly1305 + SHA-256), and application (nicknames, messages, receipts). The wire format is a compact binary protocol — 14-byte fixed header, variable payload, optional 64-byte Ed25519 signature, and PKCS#7-style padding to block sizes (256/512/1024/2048 bytes) to resist traffic analysis.",

      {type:"h3", content:"What I built"},
      "Two new files in <code>src/bitchat/</code>:",

      {type:"ul", content:[
        "<strong>bitchat_packet.h / .cpp</strong> — the wire codec. Full V1 encode/decode, all 8 message types, BitchatMessage and BitchatAnnounce serialisation, zero-copy decode (payload pointer into caller's buffer), and a <code>padding=false</code> mode for LoRa's 255-byte MTU constraint.",
        "<strong>bitchat_mesh.h / .cpp</strong> — the relay engine. 512-bit Bloom filter (3 hash functions, 5-minute rotation window) for packet deduplication. Peer table with 16 slots and LRU eviction. Core relay logic: decode → dedup → echo-suppress → dispatch → decrement TTL → relay. Callback interface plugs into any transport."
      ]},

      "108 host tests, all passing. Grand total across the project: 336/336.",

      {type:"h3", content:"Key design decisions"},
      "<strong>Relay is packet-transparent.</strong> A relay node doesn't need a Noise session with anyone. Private messages are Noise-encrypted end-to-end — relay nodes forward the opaque ciphertext and can't read it. That means a fixed ESP32 node (bolted to the wall at a café) can relay messages between phones without knowing anything about their content. This is the key to making a BLE mesh extender viable.",

      "<strong>LoRa MTU mismatch.</strong> BitChat's BLE transport fragments at ~469 bytes. LoRa's physical layer maxes out at 255 bytes. A BLE↔LoRa bridge can't just forward raw packets — it needs to fully reassemble fragments from the BLE side, then re-fragment for LoRa. That's the bridge layer, which comes next.",

      "<strong>Nobody has shipped this yet.</strong> BitChat issue #508 has people asking for exactly a LoRa bridge. The T-Deck board (LilyGo) in our board targets has BLE + SX1262 LoRa + keyboard + display — it's the natural hardware for this.",

      {type:"h3", content:"What's next"},
      "BLE transport layer (NimBLE-Arduino — advertise + scan + connect + relay on ESP32), then the LoRa bridge (reassemble/re-fragment at the MTU boundary). After that: Noise session layer so the ESP32 can send and receive private messages, not just relay them. Long-term: map BitChat's identity fingerprint (SHA-256 of the Noise static key) to a CKB lock script, so you can pay a BitChat peer without exchanging addresses."
    ],
    links: [
      {text: "GitHub — ckb-light-esp", href: "https://github.com/toastmanAu/ckb-light-esp"},
      {text: "BitChat protocol", href: "https://github.com/permissionlesstech/bitchat"}
    ]
  },

  // ────────────────────────────────────────────────────────────────
  {
    id: "2026-03-01-device-build-dryrun",
    date: "2026-03-01",
    title: "ckb-light-esp: first PlatformIO device build dry-run — what we found",
    tags: ["ckb-light-esp", "ESP32", "PlatformIO", "C++", "CKB"],
    project: "ckb-light-esp",
    body: [
      "With 206 host tests passing, it was time to point the compiler at an actual ESP32 target. No hardware yet — just <code>pio run -e esp32dev</code> and see what breaks. This is the first device-side compilation of the library, and it surfaced six real issues that host compilation can't catch.",

      {type:"h3", content:"The setup"},
      "ckb-light-esp is a library — it has no <code>setup()</code> or <code>loop()</code> at the root. PlatformIO tried to link it as a sketch and gave <code>undefined reference to setup()</code>. Fixed by building through an example (<code>examples/minimal_watch</code>), with the <code>.ino</code> moved into <code>src/</code> per PlatformIO's layout requirement. All six example dirs now have this structure and a <code>.gitignore</code> for <code>.pio/</code>.",

      {type:"h3", content:"Issue 1 — Arduino shim guard (wifi_transport.cpp)"},
      "The host-build shims for <code>millis()</code>, <code>delay()</code>, and <code>IRAM_ATTR</code> were wrapped in <code>#ifndef IRAM_ATTR</code>. On device, <code>IRAM_ATTR</code> isn't defined until <em>after</em> Arduino.h is pulled in — so the shims got declared before Arduino.h, then Arduino.h declared <code>millis()</code> again, causing an ambiguating redeclaration error.",
      "Fix: shims are now <code>#ifdef HOST_TEST</code> only. Device builds use Arduino.h's native declarations.",

      {type:"h3", content:"Issue 2 — LoRa transport on WiFi-only profiles"},
      "<code>lora_transport.cpp</code> uses RadioLib types (<code>SX1276</code>, <code>Module</code>, <code>RADIOLIB_ERR_NONE</code>) unconditionally in its device code paths. WiFi-only profiles don't have RadioLib in their <code>lib_deps</code>.",
      "Fix: device-side blocks in <code>begin()</code>, <code>_sendPacket()</code>, and <code>_recvPacket()</code> are now guarded with <code>#elif defined(LIGHT_PROFILE_LORA) || defined(LIGHT_PROFILE_LORAWAN)</code>, with a <code>return false</code> stub for other profiles. The library compiles for any profile without RadioLib.",

      {type:"h3", content:"Issue 3 — __int128 not available on Xtensa GCC 8.4"},
      "The RISC-V interpreter (<code>ckbvm_interp.cpp</code>) uses <code>__int128</code> for the MULH/MULHSU/MULHU opcodes — 64×64→128-bit multiply returning the high 64 bits. Xtensa GCC 8.4.0 doesn't support <code>__int128</code>.",
      "Fix: replaced with a portable 32×32→64 decomposition using four partial products, correct for all three signed/unsigned combinations. All 24 ckbvm_interp host tests still pass after the change.",

      {type:"h3", content:"Issue 4 — ckb_blake2b_256 missing from CKB-ESP32"},
      "<code>block_filter.cpp</code> calls <code>ckb_blake2b_256(data, len, out)</code>. The CKB-ESP32 library only had <code>ckb_blake2b_hash()</code> with the same signature. On host builds this was covered by the test harness's <code>blake2b_real.h</code> shim — the device compiler found the gap.",
      "Fixed upstream in CKB-ESP32: added a <code>static inline</code> alias in <code>ckb_blake2b.h</code>.",

      {type:"h3", content:"Issue 5 — ckb_blake2b.h include scope"},
      "In <code>header_chain.cpp</code>, the <code>#include &lt;ckb_blake2b.h&gt;</code> was inside the <code>#else // HOST_TEST</code> block, meaning it was included for host builds but skipped for device builds. Moved above the <code>#ifdef HOST_TEST</code> guard so it's included unconditionally.",

      {type:"h3", content:"Issue 6 — String → const char* in CKB-ESP32"},
      "<code>ckbfs.cpp</code> called <code>strlcpy(buf, resp, size)</code> where <code>resp</code> is a <code>String</code>. Arduino's <code>strlcpy</code> doesn't accept <code>String</code> directly. Fixed upstream: <code>resp.c_str()</code>.",

      {type:"h3", content:"What's documented"},
      "All of this is now in <code>PORTING.md</code> in the ckb-light-esp repo — build layout, ArduinoJson include path, LoRa profile guards, the Xtensa <code>__int128</code> workaround, the PlatformIO symlink/submodule path quirk, and the ESP32-C6 platform version requirement. The kind of notes you want when you come back to this six months later or someone else tries to build.",

      {type:"h3", content:"Status"},
      "Host tests: 206/206 passing. Device compilation: all errors resolved, linker succeeds on esp32dev. Actual flash numbers pending first hardware run (CYD board). One remaining known issue: the blake2b git submodule causes PlatformIO to generate extremely long repeated paths during build — cosmetic only, the object compiles correctly.",
    ],
    links: [
      {text:"ckb-light-esp repo", href:"https://github.com/toastmanAu/ckb-light-esp"},
      {text:"PORTING.md", href:"https://github.com/toastmanAu/ckb-light-esp/blob/master/PORTING.md"},
      {text:"CKB-ESP32 upstream fixes", href:"https://github.com/toastmanAu/CKB-ESP32/commit/d80d68c"},
    ],
  },

  // ────────────────────────────────────────────────────────────────
  {
    id: "2026-03-01-web-test-suite",
    date: "2026-03-01",
    title: "wyltek-embedded-builder: 696 host-compiled tests across 43 boards and 4 sensor drivers",
    tags: ["wyltek-embedded-builder", "testing", "C++", "ESP32", "sensors"],
    project: "wyltek-embedded-builder",
    body: [
      "wyltek-embedded-builder now has a full host-compiled test suite — 696 tests across all 43 board targets and the sensor math layer, all passing on bare Linux with no Arduino SDK. It found 14 real bugs in boards.h that were silently wrong.",

      {type:"h3", content:"The problem with #define-only board definitions"},
      "boards.h is 2000+ lines of preprocessor defines — one big <code>#if defined(WY_BOARD_FOO) / #elif</code> chain. Every board target defines its MCU type, frequency, display driver, touch controller, LED pins, and so on. There's no runtime to test. No linker error if you forget a define. If <code>WY_MCU_FREQ</code> is missing for a board, nothing breaks — it just silently returns 0 wherever the library checks clock speed.",
      "The fix: compile the header once per board with <code>g++ -DWY_BOARD_FOO -Isrc test/test_boards.cpp</code> and assert the expected defines are present and sane. No Arduino, no hardware — just the preprocessor and a binary that exits 0 or 1.",

      {type:"h3", content:"What the board suite checks (per board)"},
      {type:"ul", content:[
        "<strong>Identity</strong> — <code>WY_BOARD_NAME</code> defined and contains a recognisable brand/type string",
        "<strong>MCU</strong> — exactly one <code>WY_MCU_*</code> type flag (ESP32/S2/S3/C3/C6/P4), <code>WY_MCU_CORES</code> in [1,2], <code>WY_MCU_FREQ</code> in {80,160,240,400}, <code>WY_HAS_PSRAM</code> is 0 or 1",
        "<strong>Display</strong> — <code>WY_DISPLAY_W/H</code> sane (>0, <4000), <code>WY_DISPLAY_ROT</code> in [0,3], <code>WY_SCREEN_W/H</code> non-zero, at least one <code>WY_DISPLAY_*</code> driver define present",
        "<strong>Touch</strong> — at least one <code>WY_TOUCH_*</code> driver define present when <code>WY_HAS_TOUCH=1</code>",
        "<strong>RGB LED</strong> — all three pins in valid GPIO range (-1 or 0–48), all three distinct (with special handling for WS2812-only boards where all pins are -1)",
        "<strong>Boot button</strong> — pin in valid range when defined",
      ]},

      {type:"h3", content:"14 bugs found in boards.h"},
      "None of these would cause a compile error on Arduino — the missing defines just silently evaluate to 0 or undefined. But anything that reads boards.h on a non-Arduino host (config generator, CI, documentation tooling) would get wrong results.",
      {type:"ul", content:[
        "<strong>2 structural bugs</strong> — the extended board block (boards added later) started with <code>#elif</code> instead of <code>#if</code>, and was missing its closing <code>#endif</code>. The preprocessor wouldn't error on Arduino because the first block's <code>#endif</code> covered it — accidentally.",
        "<strong>6 main-block boards</strong> missing <code>WY_MCU_CORES</code> or <code>WY_MCU_FREQ</code>: ESP32_3248S035, SUNTON_8048S043, WT32_SC01_PLUS, LILYGO_TDISPLAY_S3, XIAO_S3_ROUND",
        "<strong>9 extended-block boards</strong> (LOLIN_S3_PRO, ESP32C3_GC9A01_128, FREENOVE_ESP32S3_CAM, and 6 more) used a different define style — <code>WY_MCU \"ESP32-S3\"</code> string + <code>WY_CPU_MHZ</code> — instead of the canonical <code>WY_MCU_ESP32S3</code> flag + <code>WY_MCU_FREQ</code>. Now both styles coexist.",
        "<strong>Multiple extended-block boards</strong> missing <code>WY_DISPLAY_*</code> driver flags and <code>WY_TOUCH_*</code> driver flags (using string-style defines instead of canonical flags)",
      ]},

      {type:"h3", content:"Sensor math suite"},
      "The sensor drivers (WyBME280, WyMQ, WyHCSR04, etc.) are inherently Arduino-coupled — they call <code>Wire.begin()</code>, <code>analogRead()</code>, <code>pulseIn()</code>. But the conversion math inside them is pure arithmetic and is entirely host-testable.",
      "Four drivers with non-trivial formulas got dedicated test coverage:",
      {type:"ul", content:[
        "<strong>WyMQ</strong> (13 tests) — ADC→voltage→Rs pipeline using the voltage-divider circuit equation (<code>Rs = (Vref − Vadc) / Vadc × Rload</code>), power-law ppm curve (<code>ppm = a × (Rs/R0)^b</code>) for MQ-135 and MQ-2, R0 calibration from N averaged ADC readings",
        "<strong>WyGP2Y0A02</strong> (8 tests) — voltage→distance power curve for all three sensor models (short/medium/long range), out-of-range clamping to -1, full ADC→voltage→cm pipeline",
        "<strong>WyHCSR04</strong> (6 tests) — temperature-compensated speed of sound (<code>(331.4 + 0.606×T) / 10000</code> cm/µs), echo duration→cm, monotonicity check",
        "<strong>WyGUVAS12SD</strong> (10 tests) — ADC→UVI pipeline, dark voltage offset subtraction, voltage divider correction (divRatio=2 halves sensorV — a common wiring gotcha), UVI category thresholds",
      ]},
      "The HC-SR04 formula is worth calling out: <code>(331.4 + 0.606 × T°C) / 10000</code> gives cm/µs. Speed of sound at 20°C is 0.034352 cm/µs. The /10000 catches people out.",

      {type:"h3", content:"Running the suite"},
      {type:"code", content:"# All 43 boards + sensor math (696 tests)\nbash test/run_tests.sh\n\n# Markdown report\nbash test/run_tests.sh --md\n\n# Single board\nbash test/run_tests.sh --board CYD\n\n# Verbose (show all test lines)\nbash test/run_tests.sh --verbose"},
      "Compiler: g++ 11.4.0, aarch64 Linux. ~4 seconds for the full run.",
      {type:"link", text:"wyltek-embedded-builder on GitHub →", href:"https://github.com/toastmanAu/wyltek-embedded-builder"},
    ],
    links: [
      {text:"wyltek-embedded-builder", href:"https://github.com/toastmanAu/wyltek-embedded-builder"},
    ]
  },

  // ────────────────────────────────────────────────────────────────
  {
    id: "2026-03-01-ckbesp32-platform-agnostic",
    date: "2026-03-01",
    title: "CKB-ESP32: platform-agnostic transport layer, 144-test host suite, all address formats fixed, unknown lock passthrough",
    tags: ["CKB", "ESP32", "CKB-ESP32", "C++", "testing", "bech32"],
    project: "CKB-ESP32",
    body: [
      "A focused session on library correctness and portability. CKB-ESP32 now compiles clean on Linux/macOS/host with zero Arduino SDK, has a 144-test host suite that catches real bugs before they reach hardware, all three CKB address formats decode correctly (two bech32 bugs fixed), and unknown lock scripts — JoyID, Spore, anything with a custom code_hash — are handled gracefully instead of silently producing malformed transactions.",

      {type:"h3", content:"Platform-agnostic transport layer"},
      "The library previously only compiled in Arduino/PlatformIO environments — pulling in the WiFi transport meant pulling in HTTPClient, which pulled in the Arduino SDK. This made host-side unit testing require a maze of shims, and made the library unusable in ESP-IDF projects.",
      "The fix: a <code>CKBTransport</code> pure virtual interface with four implementations that auto-select at compile time:",
      {type:"ul", content:[
        "<code>CKBArduinoTransport</code> — HTTPClient, selected when <code>ARDUINO</code> is defined",
        "<code>CKBIDFTransport</code> — esp_http_client, selected when <code>ESP_PLATFORM</code> is defined without Arduino",
        "<code>CKBPosixTransport</code> — BSD sockets, selected on Linux/macOS/host",
        "<code>CKBMockTransport</code> — inject canned responses for unit tests",
      ]},
      "All RPC calls in <code>CKB.cpp</code> route through whichever transport is active. Override at runtime via <code>setTransport()</code> — handy for injecting a mock in tests without recompiling. ArduinoJson added as a git submodule so non-Arduino builds have it available. A full <code>PORTING.md</code> documents the build commands for each platform.",
      "Every new source file must now compile clean with the host build command before committing — enforced in AGENTS.md. This is what made the 144-test suite possible.",

      {type:"h3", content:"144-test host suite (0 failed)"},
      "Five test suites, all running in under 10 seconds on aarch64:",
      {type:"ul", content:[
        "<strong>test_blake2b</strong> (12) — known vectors, CKB personalisation string, incremental hashing, empty input",
        "<strong>test_molecule</strong> (36) — CKBBuf ops, all mol_write_* functions, overflow protection, length correctness",
        "<strong>test_bip39</strong> (20) — mnemonic→privkey, BIP32 derivation, CKB address generation, NULL guards",
        "<strong>test_signer</strong> (24) — CKBKey load/pubkey/lockargs/address, secp256k1 sign, RFC6979 determinism",
        "<strong>test_client_static</strong> (52) — shannon math, hex utils, formatCKB, isValid*, all three address formats, lockClass()",
      ]},
      "The test runner (<code>bash test/run_tests.sh</code>) produces a colour terminal report and an optional <code>test/REPORT.md</code> with per-test detail. The suite caught five real bugs in <code>ckb_bip39.h</code> that would have been silent failures on-device.",

      {type:"h3", content:"Five bugs found and fixed in ckb_bip39.h"},
      "The BIP39 test suite ran against the actual blake2b and trezor_crypto implementations — not mocks. That's what surfaced these:",
      {type:"ul", content:[
        "<strong>Wrong blake2b API</strong> — <code>blake2b_state</code> / <code>blake2b_init</code> used directly; should be <code>CKB_Blake2b</code> / <code>ckb_blake2b_init</code> (the CKB personalised wrapper). Was producing a different hash than every other CKB address derivation in the library.",
        "<strong>Buffer overflow</strong> — address output buffer hardcoded at 97 bytes, but bech32m CKB addresses need 104. Added <code>CKB_ADDRESS_BUFSIZE 104</code> define. Would have been a silent heap corruption on embedded.",
        "<strong>NULL pointer dereference</strong> — <code>ckb_mnemonic_to_privkey()</code> and <code>ckb_privkey_to_address()</code> both accepted a NULL output pointer and wrote into it.",
        "<strong>Wrong bignum API</strong> — <code>bn_read_be(secp256k1.order, &n)</code> called with a <code>bignum256*</code> where a byte array is expected.",
        "<strong>Zero key accepted</strong> — <code>ckb_privkey_to_address()</code> would generate an address from an all-zero private key (invalid on secp256k1). Now returns -1.",
      ]},
      "All five were silent on Arduino — wrong output, no crash, no warning.",

      {type:"h3", content:"All three CKB address formats fixed"},
      "Testing revealed two bech32 bugs that had blocked the short and old-full address formats:",
      {type:"ul", content:[
        "<strong><code>strrchr</code> → <code>strchr</code></strong> in <code>_bech32Decode()</code>. The HRP separator in <code>ckb1...</code> is always the first <code>'1'</code>. Using <code>strrchr</code> (last occurrence) was finding a <code>'1'</code> inside the data portion of short addresses, splitting the string incorrectly and causing decode failure. Classic bech32 gotcha.",
        "<strong>Minimum length guard <code>46 → 33</code></strong> — short addresses are exactly 46 chars; the original guard <code>< 46</code> was rejecting them at the boundary.",
        "<strong>Wrong test vectors</strong> — the 64-char address used as a test vector was malformed (decodes to only 33 bytes — no hash_type or args). The real old-full bech32 address is 97 chars. All test vectors now derived from a known private key.",
      ]},
      "All three RFC 0021 formats now decode correctly: short deprecated (bech32, <code>fmt=0x01</code>), old full deprecated (bech32, <code>fmt=0x00</code>), and CKB2021 full (bech32m, <code>fmt=0x00</code>).",

      {type:"h3", content:"Unknown lock script passthrough (JoyID, Spore, Omnilock)"},
      "Previously, <code>buildTransfer()</code> always injected the secp256k1 dep group regardless of the from-lock type, and <code>signTx()</code> would silently apply a secp256k1 witness to any input. For a JoyID input this produces a transaction the node rejects.",
      "The fix introduces <code>CKBLockClass</code>: <code>CKB_LOCK_SECP256K1</code>, <code>CKB_LOCK_MULTISIG</code>, <code>CKB_LOCK_ACP</code>, or <code>CKB_LOCK_UNKNOWN</code>. <code>CKBScript::lockClass()</code> classifies by code_hash against a known-locks table. <code>buildTransfer()</code> only injects the secp256k1 dep when a secp-family input is actually present. <code>signTx()</code> returns <code>CKB_ERR_UNSUPPORTED</code> rather than producing a corrupt witness.",
      "The <code>CKBBuiltTx</code> struct gains two fields: <code>requiresExternalWitness</code> and <code>unknownLockCount</code>. When set, the transaction is correctly built and serialised — the caller adds the lock-specific cell dep manually and supplies the witness via <code>broadcastWithWitness()</code>.",
      "What this means in practice: sending CKB <em>to</em> a JoyID address works unchanged. Querying a JoyID balance works unchanged. Building a transaction <em>from</em> a JoyID address works — it just can't be signed on-device, because a JoyID passkey is hardware-bound to the device that created it and cannot be exported.",
    ],
    links: [
      {text:"CKB-ESP32 on GitHub", href:"https://github.com/toastmanAu/CKB-ESP32"},
      {text:"Platform-agnostic transport (commit 24a957c)", href:"https://github.com/toastmanAu/CKB-ESP32/commit/24a957c"},
      {text:"Address formats + unknown lock fix (commit 5504432)", href:"https://github.com/toastmanAu/CKB-ESP32/commit/5504432"},
    ]
  },

  // ────────────────────────────────────────────────────────────────
  {
    id: "2026-03-01-ckb-light-esp-transport",
    date: "2026-03-01",
    title: "ckb-light-esp: Merkle proofs done, WiFi transport live, two new site pages",
    tags: ["CKB", "ESP32", "ckb-light-esp", "C++", "Arduino"],
    project: "ckb-light-esp",
    body: [
      "A full day on ckb-light-esp. Two core modules implemented and host-tested against mainnet, the repo got a proper roadmap, and the site got a dedicated project page plus a full CKB stack overview. Notes on what shipped and what the implementation actually taught us.",

      {type:"h3", content:"merkle.cpp — CBMT proof verification (11/11)"},
      "CKB uses a custom Merkle tree variant called CBMT (Complete Binary Merkle Tree, RFC 0006). Three things in the implementation that would have bitten anyone going off the spec alone:",
      {type:"ul", content:[
        "<code>transactions_root</code> in the block header is NOT the CBMT root of tx hashes — it's <code>merge(txs_CBMT_root, witnesses_root)</code>. The RPC helpfully returns <code>witnesses_root</code> alongside the proof, but you have to know to use it.",
        "The proof field is called <code>lemmas</code> in the CKB RPC — not <code>siblings</code> as RFC 0006 calls them. Different name, same thing.",
        "CBMT uses top-down indexing (not the bottom-up convention common in Bitcoin-style Merkle trees). Sibling of node <code>i</code> is <code>((i+1)^1)-1</code>.",
      ]},
      "The API ended up as three levels: <code>verify()</code> computes the CBMT root from a proof, <code>verifyTransactionsRoot()</code> does the merge check against the header field, and <code>verifyInclusion()</code> combines both as a single call. All three verified against real data from block #18,731,830. 11/11 host tests passing.",

      {type:"h3", content:"wifi_transport.cpp — TCP JSON-RPC (30/30)"},
      "The WiFi transport talks to the CKB light client node RPC (port 9000) — not a full node (port 8114). Full nodes don't serve block filters. The Rust light client node handles the P2P side; the ESP just talks to its HTTP interface.",
      "Two things from reading the actual RPC README that weren't obvious from the headers we'd written:",
      {type:"ul", content:[
        "<code>set_scripts</code> takes full Script objects (<code>code_hash</code> + <code>hash_type</code> + <code>args</code>) — not script hashes. The hash is computed server-side. Our earlier header had this wrong.",
        "<code>fetch_transaction</code> is async — returns <code>fetching</code>/<code>added</code>/<code>fetched</code>/<code>not_found</code> status strings. The sync loop needs to handle retry separately from completion.",
      ]},
      "HTTP/1.1 keep-alive, handles both Content-Length and chunked transfer encoding, FetchStatus enum for the async tx fetch flow. 30/30 host tests with a WiFiClient shim that feeds canned HTTP responses. Reinforces the RFC-first rule: checking the actual README saved at least one round of debugging.",

      {type:"h3", content:"ROADMAP.md — capturing the vision"},
      "Added a proper roadmap to the repo. Five phases: core verification (done), transport + sync loop (in progress), script execution, off-grid transports + ckb-lora-bridge companion, example products. The example products section is probably the most useful for explaining what this is actually for — payment terminal, off-grid balance checker, LoRa ASIC relay, IoT payment trigger.",
      {type:"link", text:"ROADMAP on GitHub", href:"https://github.com/toastmanAu/ckb-light-esp/blob/master/ROADMAP.md"},

      {type:"h3", content:"Two new site pages"},
      "<strong>ckb-light-esp.html</strong> — dedicated project page: stack diagram, quick start code, all 5 build profiles with feature matrix, 4 transport cards, an implementation gotchas table (8 entries of things that trip up anyone going off-spec), and the phased roadmap.",
      "<strong>ckb.html</strong> — full CKB stack overview. Why this work exists (the gap: no embedded CKB tooling), the three-layer library stack diagram, all embedded repos (6 cards), all infrastructure repos (6 cards), and design principles. Meant to be the single page that explains what Wyltek's CKB work is about and how it all fits together.",
      {type:"link", text:"ckb-light-esp project page", href:"https://wyltekindustries.com/ckb-light-esp.html"},
      {type:"link", text:"CKB stack overview", href:"https://wyltekindustries.com/ckb.html"},

      {type:"h3", content:"Next: block_filter.cpp then LightClient.cpp"},
      "block_filter.cpp is the complex one — Golomb-Coded Set with SipHash-2-4 (not Blake2b), checkpoint-based initial sync to avoid downloading 19M+ filter hashes from block 0, two-phase matched-block flow (filter hit → queue → full fetch → Merkle verify). After that, the sync state machine in LightClient.cpp ties everything together.",
    ],
    links: [
      {text:"ckb-light-esp on GitHub", href:"https://github.com/toastmanAu/ckb-light-esp"},
      {text:"ckb-light-esp project page", href:"https://wyltekindustries.com/ckb-light-esp.html"},
      {text:"CKB stack overview", href:"https://wyltekindustries.com/ckb.html"},
    ]
  },

  // ────────────────────────────────────────────────────────────────
  {
    id: "2026-03-01-ckbfs-cyd-mainnet",
    date: "2026-03-01",
    title: "CYD publishes a JPEG to the CKB blockchain — RFC 0017 signing bug found and fixed",
    tags: ["CKB", "ESP32", "CKB-ESP32", "CKBFS"],
    project: "CKB-ESP32",
    body: [
      "After a long debug session starting at 3am, a CYD board (ESP32 with built-in 2.8\" display, ~$10) successfully published a 1.7KB JPEG to CKB mainnet via the CKBFS protocol. Transaction confirmed on-chain. Here's what was actually wrong and what got fixed along the way.",

      {type:"h3", content:"The bug: RFC 0017 signing hash"},
      "The -302 Script error from the node means signature verification failed. The signature itself was mathematically valid — Python's ecdsa_verify confirmed it. The issue was that the node was computing the signing hash over different bytes than we were.",
      "CKBFS transactions have two witnesses: <code>witnesses[0]</code> is the WitnessArgs (secp256k1 lock placeholder and eventual signature), <code>witnesses[1]</code> is the CKBFS content blob (magic header + JPEG bytes). RFC 0017 says the signing message must cover ALL witnesses in the same lock group — not just witnesses[0].",
      {type:"code", content:"// Correct 2-witness signing hash:\nsigning_hash = blake2b(\n  tx_hash ||\n  le64(len(w0)) || w0 ||\n  le64(len(w1)) || w1\n)"},
      "We'd reverted to wit0-only during debugging because an earlier single-witness Pi transaction had worked. That was the wrong lesson to carry forward. The two-witness signing was correct from the start — it just needed the second witness to actually be included.",

      {type:"h3", content:"Other fixes"},
      {type:"ul", content:[
        "Pi5 CKB relay service on port 8115 — the CYD can't open a TCP connection directly to the CKB node, so the Pi proxies it",
        "1.5s delay before broadcastRaw — prevents a brownout condition when opening a new TCP connection immediately after sending a Telegram message (both compete for WiFi radio power)",
        "<code>CKBBuiltTx</code> heap-allocated inside <code>ckbfs_publish_with_input()</code> — the struct is ~7KB, which blows the stack if left local",
        "UTXO tracking: each successful TX creates a new change output at index <code>[0]</code>, which becomes the input for the next TX",
        "<code>outputs_data: [\"0x\",\"0x\"]</code> in the JSON body — two empty data entries matching the two cell outputs",
      ]},

      {type:"h3", content:"Lesson"},
      "Check RFC 0017 carefully any time a transaction has extra witnesses beyond the WitnessArgs. The Python verifier and the on-chain verifier will agree once they're hashing the same bytes. If they disagree, the signing input is wrong — not the signature.",
    ],
    links: [
      {text:"CKB-ESP32 on GitHub", href:"https://github.com/toastmanAu/CKB-ESP32"},
      {text:"RFC 0017 — tx signing", href:"https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0017-tx-valid-since/0017-tx-valid-since.md"},
    ]
  },

  // ────────────────────────────────────────────────────────────────
  {
    id: "2026-02-28-infrastructure-sprint",
    date: "2026-02-28",
    title: "CKB snapshot service, Fiber hardware signer, wyltekindustries.com live",
    tags: ["CKB", "Fiber", "ESP32-S3", "Infrastructure", "Armbian", "wyltek-embedded-builder"],
    project: "Wyltek Industries",
    body: [
      "A lot landed today — snapshot infrastructure, a hardware signing module for the Fiber kiosk, a multi-OS sync page for CKB node operators, the site going live on its own domain, and the wyltek-embedded-builder growth policy formalised in writing. Notes in order.",

      {type:"h3", content:"wyltekindustries.com — live on dedicated domain"},
      "The site is live at wyltekindustries.com, hosted via Cloudflare. Previously running under a GitHub Pages subdomain — moving to the custom domain was the priority before anything else got linked.",

      {type:"h3", content:"CKB snapshot service"},
      "One of the consistent pain points for new CKB full node operators is sync time — 3 to 7 days from genesis on an SBC like an Orange Pi. There hasn't been a maintained community snapshot service. We built one.",
      "The node runs a weekly job that streams the chain DB directly to Cloudflare R2 — tar piped through zstd compression piped directly into the remote bucket. No local disk involved. The raw DB is ~135GB; compressed it lands around 47GB. Upload time on our connection is under 2 hours. Each snapshot gets a SHA256 checksum and a GPG signature so operators can verify before trusting it.",
      {type:"code", content:"# Streamed directly — no temp file\ntar -C ~/.ckb/data db/ | zstd -T0 -3 | tee >(sha256sum > hash.txt) | rclone rcat r2:ckb-snapshots/ckb-snapshot.tar.zst"},
      "Running costs: ~$2/month on R2 for 3 snapshots in rotation. R2 egress is free, so there's no cost per download regardless of how many people use it.",
      {type:"link", text:"ckb-snapshot on GitHub", href:"https://github.com/toastmanAu/ckb-snapshot"},

      {type:"h3", content:"ckb-sync page — Neuron + multi-OS"},
      "Built a sync landing page at /ckb-sync that pulls live metadata from R2 on load — current block height, snapshot date, file size, download link. Nothing hardcoded, nothing to update manually.",
      "The page handles both CKB bare node and Neuron wallet, with OS auto-detection across Windows, macOS, Linux, and SBCs. Each combination gets correct data paths pre-filled (Neuron stores its chain data in different locations per platform) and the right set of commands — aria2c for resumable Windows downloads, the correct stop/start sequence per setup, the right extraction target. Paths are editable if someone has a non-standard install.",
      "There's also a trustless sync tab covering assume_valid_target — same sync speed improvement as a snapshot, no download required, PoW still fully verified. Same concept as Bitcoin's assumevalid.",
      {type:"link", text:"CKB Sync page", href:"https://wyltekindustries.com/ckb-sync"},

      {type:"h3", content:"ESP32-S3 Fiber channel signer"},
      "The Fiber kiosk (OPi 3B running an LVGL touchscreen UI bridged to the Fiber node RPC) needed a hardware signing module. The principle: private keys shouldn't live on the same device that runs Node.js and talks to the internet. An ESP32-S3 plugs into the OPi's USB port and acts as a UART JSON-RPC signer. The kiosk can read balances and channel state with or without the signer, but can't authorise anything without it.",
      "Firmware covers secp256k1 signing via the CKB-ESP32 library, HKDF-SHA256 key derivation, AES-256-GCM encrypted key storage on LittleFS, PIN lock with a persistent attempt counter (5 failures wipes the device), 5-minute auto-lock, and MuSig2 two-round partial signing for Fiber payment channels.",
      "The S3 made sense at the budget end — ~$5–8 for a devkit, hardware SHA and AES accelerators, native USB. Same JSON-RPC protocol as the P4 variant, so swapping one for the other is purely a hardware decision.",
      {type:"link", text:"fiber-kiosk on GitHub", href:"https://github.com/toastmanAu/fiber-kiosk"},

      {type:"h3", content:"wyltek-embedded-builder — growth policy"},
      "Wrote down what was already being practised: every reusable firmware component lives in wyltek-embedded-builder first. When a project needs something new, build the Wy* component here, then use it. When wrapping a third-party library, fork it to toastmanAu/, check the license before touching anything (GPL doesn't go into a MIT library), attribute in the file header, declare as lib_deps.",
      "The S3 signer was the first project explicitly converted — removed local vendor copies of trezor_crypto and blake2b, declared CKB-ESP32 and wyltek-embedded-builder as lib_deps instead. That's the pattern for every project from here.",
      "Also added a LICENSES/ directory for third-party license files, and explicit standing rules: MIT/BSD/Apache fork freely, LGPL treated as GPL for static embedded builds, GPL hard no, no-license hard no.",

      {type:"h3", content:"WyKeyboard — on-screen touch keyboard"},
      "Added WyKeyboard to wyltek-embedded-builder — an adaptive on-screen keyboard for touchscreen projects. Key height auto-scales from display dimensions (tested 240×240 through 800×480), QWERTY/Numeric/Symbol layouts with on-screen switching, password mode with masked input, dark and light themes, zero heap allocation.",
      {type:"code", content:"kb.begin(gfx, width, height);\nkb.show(\"Enter SSID:\", 32);\n// in loop:\nif (kb.press(tx, ty) == WY_KB_DONE) use(kb.value());"},

      {type:"h3", content:"Armbian OPi 3B — build in progress"},
      "Kicked off an Armbian image build for the OPi 3B (Bookworm minimal, kernel 6.18.15 rockchip64-current) on the EliteDesk x86 build node. The Armbian build system is large and opinionated — we hit three separate blockers across the pipeline before it got past the kernel stage. Kernel is compiled and cached now. Waiting on image packaging before we know if it actually boots on the board.",
    ],
    links: [
      {text:"ckb-snapshot", href:"https://github.com/toastmanAu/ckb-snapshot"},
      {text:"CKB Sync Page", href:"https://wyltekindustries.com/ckb-sync"},
      {text:"fiber-kiosk", href:"https://github.com/toastmanAu/fiber-kiosk"},
      {text:"wyltek-embedded-builder", href:"https://github.com/toastmanAu/wyltek-embedded-builder"},
    ]
  },

  // ────────────────────────────────────────────────────────────────
  {
    id: "2026-02-27-day-one",
    date: "2026-02-27",
    title: "Day one: CKB-ESP32 library, TelegramSerial in Arduino Library Manager, 38 sensor drivers, wyltekindustries.com",
    tags: ["CKB", "ESP32", "wyltek-embedded-builder", "TelegramSerial", "Fiber", "release"],
    project: "Wyltek Industries",
    body: [
      "First real day of output. Writing this as a single post because everything that shipped is connected — the library work, the tooling, the site, and the start of the Fiber infrastructure all feed into the same direction.",

      {type:"h3", content:"CKB-ESP32 — secp256k1 signing on mainnet"},
      "The CKB-ESP32 library hit a milestone: full secp256k1 transaction signing on an ESP32, confirmed with a real mainnet transaction.",
      {type:"code", content:"TX: 0xd9440f650d2c185b1232d31695a096c95866fe32baf7e44cfe0c1d37e96b62cf\nBlock: 18,720,296\nRelay: Guition ESP32-S3 4848S040 → CKB light client → mainnet"},
      "The library handles the full on-device signing pipeline: derive compressed pubkey, compute blake160 lock args, build the WitnessArgs molecule (85-byte exact CKB layout), compute the personalised blake2b signing hash, RFC6979 deterministic ECDSA. All vendored dependencies — trezor-crypto for secp256k1, the reference BLAKE2 impl. No external library installs required.",
      "On-device testing surfaced a couple of significant bugs — generated addresses were coming out invalid (bech32m encoding), and confirmed transactions were being silently dropped by the broadcast relay. Both fixed and re-verified on hardware.",

      {type:"h3", content:"CKB-ESP32 — modular build system v3.0.0"},
      "Restructured the library around a CKBConfig.h capability system. Define what your build needs and the compiler only pulls in what matches: <code>CKB_NODE_FULL</code>, <code>CKB_NODE_LIGHT</code>, <code>CKB_INDEXER</code>, <code>CKB_SIGNING</code>. Keeps binary size down on constrained hardware.",
      "Also shipped: light client API — <code>setScripts()</code>, <code>watchAddress()</code>, <code>getTipHeader()</code>, <code>fetchTransaction()</code>, <code>getSyncState()</code>. Live-tested against ckb-light-client v0.5.4. The CKBTestBench test harness now covers 104 tests with Python-verified known vectors.",
      {type:"link", text:"CKB-ESP32 on GitHub", href:"https://github.com/toastmanAu/CKB-ESP32"},

      {type:"h3", content:"TelegramSerial — Arduino Library Manager"},
      "PR #7823 to the Arduino Library Registry merged. TelegramSerial is now in the Library Manager — searchable and installable directly from the IDE without a GitHub URL.",
      "TelegramSerial is a drop-in Serial replacement for ESP32. Swap <code>Serial.println()</code> for <code>TelegramSerial.println()</code> and output goes to a Telegram bot instead. Handy for deployed hardware you can't physically access — remote sensors, headless nodes, anything running in a corner.",
      {type:"code", content:"// PlatformIO:\nlib_deps = toastmanAu/TelegramSerial\n\n// Arduino IDE: search \"TelegramSerial\" in Library Manager"},
      {type:"link", text:"TelegramSerial on GitHub", href:"https://github.com/toastmanAu/TelegramSerial"},

      {type:"h3", content:"wyltek-embedded-builder — 38 sensors, 32 board targets"},
      "The embedded SDK grew substantially. The design principle: every driver exposes the same interface — <code>begin()</code>, <code>read()</code>, <code>driverName()</code> — returning a <code>WySensorData</code> struct with typed fields and a consistent <code>d.ok</code> / <code>d.error</code> pattern. One display or logging routine handles all of them.",
      {type:"ul", content:[
        "WyMICS5524 — MEMS gas sensor (CO, ethanol, H2, NH3). Faster response and lower power than the MQ series",
        "WyDFPlayer — DFPlayer Mini MP3 over UART. Full 10-byte protocol, interrupt-playback from /ADVERT/ folder, clone chip support",
        "WyCamera — ESP32-CAM OV2640. MJPEG stream server, snapshot endpoint, motion detection, flash LED",
        "WyEyes — animated dual GC9A01 round display robot eyes. 12 expressions, idle drift, auto-blink, per-expression iris colour",
        "WyDS18B20 — rewrite fixing a multi-sensor bus search bug, plus non-blocking API and simultaneous conversion",
        "WyLD2410, WyGUVAS12SD, WyTurbidity, WyINA219, WySoilMoisture, WyHCSR04, WyWind",
        "32 board targets — added 12 LilyGo/TTGO boards including T-Deck (LoRa+keyboard+display), T-Watch 2020 V3 (full smartwatch stack), T-Beam Meshtastic, T-Display S3 AMOLED",
        "Sensor docs added: pH calibration (Nernst equation, temp compensation), MQ series warm-up and R0 calibration"
      ]},
      {type:"link", text:"wyltek-embedded-builder on GitHub", href:"https://github.com/toastmanAu/wyltek-embedded-builder"},

      {type:"h3", content:"Guition 4848S040 — touch confirmed"},
      "The 480×480 ESP32-S3 HMI board is running as a CKB light client node and HTTP transaction relay. Confirmed the GT911 touch controller wiring and interrupt-driven coordinate reading this session — display, touch, and wallet firmware all working together on the board.",

      {type:"h3", content:"wyltekindustries.com — registered and live"},
      "Registered wyltekindustries.com for 2 years, launched on a dedicated domain via Cloudflare. OG meta tags and canonical URLs added. A BlackBox product page built — B2B framing (supplied hardware to merchants, not a DIY kit), device mockup showing a live 450 CKB invoice, enquiry CTA.",

      {type:"h3", content:"Fiber network — nodes up, RPC auth"},
      "Both Fiber nodes (ckbnode and N100) funded and running. Hit an undocumented change in v0.7.0 that introduced Biscuit token authentication — not mentioned in the changelog and nothing in the docs about setup. Worked it out, both nodes configured and passing RPC calls by end of session. Channel setup is next once N100 has enough balance to auto-accept.",

      {type:"h3", content:"CKB-SMS-Bridge — early research"},
      "Early research on using LilyGo SIM boards as CKB transaction relay nodes over SMS. Both the A7670SA and SIM7080G take physical nano SIM. Hologram looks right as a carrier — inbound SMS free, $1/month per SIM, 190+ countries. At 30 CKB/transaction fee, 100 TX/month works out to ~$53 profit. Sim research committed to <code>toastmanAu/ckb-sms-bridge</code>.",
    ],
    links: [
      {text:"CKB-ESP32", href:"https://github.com/toastmanAu/CKB-ESP32"},
      {text:"TelegramSerial", href:"https://github.com/toastmanAu/TelegramSerial"},
      {text:"wyltek-embedded-builder", href:"https://github.com/toastmanAu/wyltek-embedded-builder"},
      {text:"ckb-firmware", href:"https://github.com/toastmanAu/ckb-firmware"},
    ]
  },


  // ────────────────────────────────────────────────────────────────
  {
    id: "2026-02-26-nerdminer-ckb-core",
    date: "2026-02-26",
    title: "NerdMiner CKB — Eaglesong solo miner for ESP32",
    tags: ["ESP32", "CKB", "NerdMiner", "mining"],
    project: "NerdMiner CKB",
    body: [
      "Core implementation of NerdMiner CKB is done. This is an adaptation of the NerdMiner V2 project — a solo Bitcoin miner on an ESP32 — ported to mine CKB using the Eaglesong hash algorithm.",
      "Target hardware is the CYD (ESP32-2432S028R), the same board used for the CKB node display projects. It has a built-in 320×240 colour display showing live hashrate, pool stats, and share counts.",
      {type:"h3", content:"What's different from NerdMiner V2"},
      {type:"ul", content:[
        "Eaglesong hash algorithm instead of SHA256d — CKB's proof-of-work",
        "Stratum protocol adapted for CKB pool (ViaBTC, viabtc.com:3333 default)",
        "Worker name field added to pool connection",
        "Compatible with the local CKB Stratum Proxy for solo mining against your own node"
      ]},
      "Realistically a single ESP32 won't find a block solo mining CKB — the hashrate is orders of magnitude below competitive. But it's a working implementation, it submits real shares, and it's the kind of build that makes sense on the desk next to a full node.",
      {type:"link", text:"NerdMiner CKB on GitHub →", href:"https://github.com/toastmanAu/NerdMiner_CKB"}
    ],
    links: [
      {text:"NerdMiner CKB", href:"https://github.com/toastmanAu/NerdMiner_CKB"},
      {text:"CKB Stratum Proxy", href:"https://github.com/toastmanAu/ckb-stratum-proxy"}
    ]
  },

  // ────────────────────────────────────────────────────────────────
  {
    id: "2026-02-22-ckb-node-dashboard",
    date: "2026-02-22",
    title: "CKB Node Dashboard — live monitoring for arm64 SBCs",
    tags: ["CKB", "Node.js", "monitoring", "Orange Pi"],
    project: "CKB Node Dashboard",
    body: [
      "Shipped the CKB Node Dashboard — a lightweight monitoring interface for running CKB nodes on arm64 single board computers like the Orange Pi 3B and Raspberry Pi.",
      "It's a Node.js proxy that sits between your CKB node's RPC and a browser. The frontend polls every few seconds and shows block height, sync progress, peer count, epoch info, and tip hash. Designed to run permanently on the same SBC as the node.",
      {type:"h3", content:"Why build this"},
      "The CKB RPC is JSON-RPC over HTTP — perfectly queryable, but not human-readable at a glance. A dedicated dashboard means you can check node health without SSHing in and parsing JSON. Particularly useful when the node is running on a Pi tucked in a corner.",
      {type:"h3", content:"Setup"},
      {type:"code", content:"git clone https://github.com/toastmanAu/ckb-node-dashboard\ncd ckb-node-dashboard && npm install\nbash start.sh\n# Dashboard at http://localhost:8080"},
      {type:"link", text:"CKB Node Dashboard on GitHub →", href:"https://github.com/toastmanAu/ckb-node-dashboard"}
    ],
    links: [
      {text:"ckb-node-dashboard", href:"https://github.com/toastmanAu/ckb-node-dashboard"},
      {text:"CKB Node Guide", href:"https://github.com/toastmanAu/CKB-Node"}
    ]
  },

  // ────────────────────────────────────────────────────────────────
  {
    id: "2026-02-22-ckb-light-esp32-p4",
    date: "2026-02-22",
    title: "CKB Light Client for ESP32-P4 — C99, no deps, RFC 0044",
    tags: ["ESP32-P4", "CKB", "C99", "light-client"],
    project: "ckb-light-esp",
    body: [
      "Started ckb-light-esp — a C99 CKB light client implementation targeting the ESP32-P4, Espressif's new RISC-V chip with 400MHz dual-core and 32MB PSRAM.",
      "The goal: a self-contained CKB light client that runs entirely on an ESP32-P4 with no external dependencies. RFC 0044 defines the CKB light client protocol — our implementation handles block header sync, Merkle proof verification, and script execution validation.",
      {type:"h3", content:"Why ESP32-P4"},
      "The P4 is a meaningful step up from the S3. RISC-V architecture, hardware SHA accelerators, significantly more RAM. For a hardware wallet or signing device — which is the eventual target — the hardware SHA is especially relevant. SPHINCS+ post-quantum signing (used by Quantum Purse) needs thousands of SHA-256 calls per signature; hardware acceleration could make it practical on embedded.",
      {type:"h3", content:"Current state"},
      "Foundation only — header parsing, basic block structure, CKB molecule encoding/decoding. This is a long-term project that ties into the broader idea of a hardware companion device to the Quantum Purse post-quantum wallet.",
      {type:"link", text:"ckb-light-esp on GitHub →", href:"https://github.com/toastmanAu/ckb-light-esp"}
    ],
    links: [
      {text:"ckb-light-esp", href:"https://github.com/toastmanAu/ckb-light-esp"},
      {text:"CKB-ESP32 Library", href:"https://github.com/toastmanAu/CKB-ESP32"}
    ]
  },

];
