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
    id: "2026-02-27-wyltek-sensor-sprint",
    date: "2026-02-27",
    title: "wyltek-embedded-builder: 38 sensor drivers, 19 board targets",
    tags: ["ESP32", "wyltek-embedded-builder", "sensors", "C++"],
    project: "wyltek-embedded-builder",
    body: [
      "Big sprint on the embedded SDK today. The wyltek-embedded-builder library hit a milestone worth writing up — 38 sensor drivers and 19 display board targets, all zero external dependencies.",
      "The core idea is a uniform interface: every driver implements <code>begin()</code>, <code>read()</code>, and <code>driverName()</code>. Every read returns a <code>WySensorData</code> struct with typed fields and a consistent <code>d.ok</code> / <code>d.error</code> pattern. One display or logging routine handles all sensors — no per-sensor boilerplate.",
      {type:"h3", content:"What landed today"},
      {type:"ul", content:[
        "WyMICS5524 — MEMS reducing gas sensor (CO, ethanol, H2, NH3). Faster and lower power than MQ series, proper Rs/R0 calibration workflow",
        "WyDFPlayer — DFPlayer Mini MP3 module. Full 10-byte UART protocol, /ADVERT/ folder interrupt-playback, BUSY pin fast path, clone chip support",
        "WyCamera — ESP32-CAM OV2640 module. MJPEG stream server at /stream, snapshot at /capture, motion detection, flash LED control",
        "WyEyes — animated dual GC9A01 round display robot eyes. 12 expressions, idle drift, auto-blink, per-expression iris colour",
        "WyDS18B20 rewrite — bug fix in multi-sensor search algorithm, non-blocking API, simultaneous conversion for multiple probes",
        "Board targets: TTGO T-Display, Waveshare 1.47\"/2.0\", Double EYE dual-round, ILI9341 Adafruit/generic/M5Stack, ST7789 generic, ESP32-CAM, ESP32-S3-EYE"
      ]},
      {type:"h3", content:"Why a unified SDK instead of per-sensor libraries"},
      "The traditional approach — find a library per sensor, wire them together — works fine for one or two sensors. At six it gets painful: conflicting APIs, different error conventions, version pinning, SPI/I2C bus conflicts, heap pressure from six separate library globals. Every new session an AI has to re-research each library from scratch.",
      "With a unified SDK, a 6-sensor weather station goes from ~95 minutes of back-and-forth to ~14 minutes. The library is persistent knowledge that survives context resets. The numbers back it up — at 10 sensors the unified approach uses 3.8× fewer tokens per build.",
      {type:"link", text:"View on GitHub →", href:"https://github.com/toastmanAu/wyltek-embedded-builder"}
    ],
    links: [
      {text:"wyltek-embedded-builder", href:"https://github.com/toastmanAu/wyltek-embedded-builder"}
    ]
  },

  // ────────────────────────────────────────────────────────────────
  {
    id: "2026-02-27-telegramserial-library-manager",
    date: "2026-02-27",
    title: "TelegramSerial is live in the Arduino Library Manager",
    tags: ["ESP32", "TelegramSerial", "Arduino", "release"],
    project: "TelegramSerial",
    body: [
      "PR #7823 into the Arduino Library Registry merged today. TelegramSerial is now searchable and installable directly from the Arduino IDE Library Manager — no GitHub URL needed.",
      "TelegramSerial is a drop-in replacement for <code>Serial</code> on ESP32. Swap <code>Serial.println()</code> for <code>TelegramSerial.println()</code> and your debug output goes straight to a Telegram bot. Useful for remote hardware that you can't be physically next to — remote sensors, deployed nodes, anything running headless.",
      {type:"h3", content:"Install"},
      {type:"code", content:'// Arduino IDE: search "TelegramSerial" in Library Manager\n// PlatformIO:\nlib_deps = toastmanAu/TelegramSerial'},
      "Getting into the official registry was the right call — it lowers the barrier from 'clone a GitHub repo and figure out the path' to 'search and click install'. The library has been stable for a while; the registry listing just makes it accessible.",
      {type:"link", text:"TelegramSerial on GitHub →", href:"https://github.com/toastmanAu/TelegramSerial"}
    ],
    links: [
      {text:"TelegramSerial", href:"https://github.com/toastmanAu/TelegramSerial"}
    ]
  },

  // ────────────────────────────────────────────────────────────────
  {
    id: "2026-02-27-ckb-s3-broadcast-mainnet",
    date: "2026-02-27",
    title: "ESP32-S3 confirmed broadcasting CKB transactions on mainnet",
    tags: ["ESP32-S3", "CKB", "ckb-firmware", "milestone"],
    project: "ckb-firmware",
    body: [
      "End-to-end confirmed: the Guition 4848S040 ESP32-S3 board is now a functioning CKB transaction relay node on mainnet.",
      "The board runs a local HTTP server. POST a raw CKB transaction to <code>/broadcast</code> and it forwards it to the light client, which submits it to the network. The board also displays live chain stats — block height, sync status, peer count — on its 480×480 touchscreen.",
      {type:"h3", content:"Confirmed on-chain"},
      {type:"code", content:"TX: 0xd9440f650d2c185b1232d31695a096c95866fe32baf7e44cfe0c1d37e96b62cf\nBlock: 18,720,296\nRelay: ESP32-S3 Guition 4848S040 → light client → mainnet"},
      "The architecture: CKB-ESP32 library handles RPC communication and transaction signing (secp256k1 on-device, RFC6979 deterministic). The S3 node firmware adds the HTTP relay layer. A standalone device, no laptop required, submitting real mainnet transactions.",
      {type:"h3", content:"What's next"},
      "Porting the S3 dashboard to the CYD (Cheap Yellow Display) board via wyltek-embedded-builder. The CYD is a $12 board with a 320×240 touchscreen — a much lower barrier to entry for CKB node operators who want a physical display.",
      {type:"link", text:"ckb-firmware on GitHub →", href:"https://github.com/toastmanAu/ckb-firmware"}
    ],
    links: [
      {text:"ckb-firmware", href:"https://github.com/toastmanAu/ckb-firmware"},
      {text:"CKB-ESP32 Library", href:"https://github.com/toastmanAu/CKB-ESP32"}
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
