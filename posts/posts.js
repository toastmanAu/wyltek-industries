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
