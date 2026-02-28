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
      "Long day. A lot shipped — snapshot infrastructure, a hardware signing module for the Fiber network, a multi-OS sync page, the wyltek-embedded-builder growth policy formalised, and wyltekindustries.com finally going live. Notes in rough chronological order.",

      {type:"h3", content:"wyltekindustries.com — live"},
      "Site is live on its own domain, hosted via Cloudflare. SSL cert provisioning.",

      {type:"h3", content:"CKB snapshot service"},
      "One of the genuine pain points for running a CKB full node on an SBC is sync time — 3 to 7 days from genesis on something like an Orange Pi. Nobody has maintained a proper community snapshot service. We built one.",
      "The setup: ckbnode runs a weekly snapshot job that stops the CKB node, streams the chain DB directly to Cloudflare R2 via a tar | zstd | rclone pipeline — no local disk required (the DB is ~135GB, ~47GB compressed). The upload takes under 2 hours on our 58 Mbps connection. Each snapshot gets a SHA256 checksum and a GPG signature. A metadata JSON with block height, date, and instructions goes up alongside it.",
      "Cost: ~$2/month on R2 for 3 snapshots in rotation (141GB × $0.015/GB). Cloudflare R2 egress is free regardless of how many people download, which is the whole point.",
      {type:"code", content:"# The pipeline — zero local disk\ntar -C ~/.ckb/data db/ | zstd -T0 -3 | tee [sha256 fifo] | rclone rcat r2:ckb-snapshots/filename.tar.zst"},
      "The verify script checks both SHA256 and the GPG signature before trusting anything. Key ID CFF9573B87BB90B7, published to keys.openpgp.org.",
      {type:"link", text:"ckb-snapshot on GitHub", href:"https://github.com/toastmanAu/ckb-snapshot"},

      {type:"h3", content:"ckb-sync page — Neuron + multi-OS"},
      "Built a proper sync landing page at /ckb-sync.html. It fetches latest.json from R2 on load and auto-populates block height, date, age, and the download link. No static content to maintain.",
      "The page supports both CKB bare node and Neuron wallet, and auto-detects the OS (Windows/macOS/Linux/SBC). Each combination gets the right data path pre-filled and the right commands — aria2c on Windows for resumable downloads, wget on Linux/Mac, the correct zstd extraction target, the right stop/start commands. Neuron gets a tray-quit warning. The path is editable if your install is non-standard.",
      "Also includes a trustless sync tab for assume_valid_target — same speed as a snapshot, no download, PoW still fully verified. Same model as Bitcoin's assumevalid.",
      {type:"link", text:"CKB Sync page", href:"https://wyltekindustries.com/ckb-sync"},

      {type:"h3", content:"ESP32-S3 Fiber Channel Signer"},
      "The Fiber kiosk stack (LVGL C UI → Node.js bridge → Fiber RPC) needed a hardware signing module — somewhere private keys live that isn't the OPi 3B running Node.js and talking to the internet. The design is simple: an ESP32-S3 plugs into the OPi's USB port and acts as a UART JSON-RPC signer. The kiosk can read balances and channel state without the signer connected, but can't sign anything.",
      "The firmware: secp256k1 signing (trezor-crypto via CKB-ESP32), Blake2b, HKDF-SHA256 key derivation, AES-256-GCM key storage on LittleFS, PIN lock with NVS-persistent attempt counter (5 failures → full wipe), 5-minute auto-lock, MuSig2 two-round partial signing for Fiber channels.",
      "The ESP32-S3 was chosen as the budget variant (~$5–8 devkit vs ~$15–20 for P4). Same secp256k1 security, hardware SHA and AES accelerators, native USB. Identical JSON-RPC protocol to the P4 signer — swap one for the other without changing any kiosk code.",
      {type:"link", text:"fiber-kiosk on GitHub", href:"https://github.com/toastmanAu/fiber-kiosk"},

      {type:"h3", content:"wyltek-embedded-builder — growth policy"},
      "Formalised the rule that should have been written down earlier: every reusable firmware component goes into wyltek-embedded-builder first, not into the project repo. When wrapping a third-party library, fork it to toastmanAu/, check the license (GPL does not go into a MIT library), attribute clearly in the header, add as lib_deps.",
      "The S3 signer was the first project to be updated to use CKB-ESP32 and wyltek-embedded-builder as declared lib_deps instead of carrying local copies of trezor_crypto. That's the pattern going forward.",
      "Also added a LICENSES/ directory to the repo for third-party license files, and explicit rules: MIT/BSD/Apache fork freely, LGPL treat as GPL for static embedded builds, GPL don't incorporate, no-license hard no.",

      {type:"h3", content:"WyKeyboard — adaptive touch keyboard"},
      "Added WyKeyboard to wyltek-embedded-builder. Auto-scales key height from display dimensions (tested 240×240 through 800×480), QWERTY/Numeric/Symbol layouts with on-screen switching, shift/caps/backspace/enter/cancel, password mode with masked input, horizontal scroll in the input field, dark and light themes, zero heap allocation.",
      {type:"code", content:"kb.begin(gfx, width, height);\nkb.show(\"Enter SSID:\", 32);\n// in loop:\nif (kb.press(tx, ty) == WY_KB_DONE) use(kb.value());"},

      {type:"h3", content:"Armbian OPi 3B image — still baking"},
      "Started an Armbian build for the OPi 3B (Bookworm minimal, kernel 6.18.15 rockchip64-current) on the EliteDesk build node. Three separate failures: GitPython resolving relative .git paths incorrectly (patched patching.py), kernel patch failing on an RK3308-specific audio patch (moved it out), customize-image.sh hitting missing packages in the build chroot (made installs non-fatal). Build is running again. Kernel is compiled and cached — it's just the image packaging stage left.",
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
      "First real day of output from Wyltek Industries. Writing this up as a single post because everything that shipped today is connected — the library work, the tooling, the site, and the start of the Fiber infrastructure all feed into the same goal. Notes in order.",

      {type:"h3", content:"CKB-ESP32 — secp256k1 signing confirmed on mainnet"},
      "The CKB-ESP32 library crossed a significant line: full secp256k1 transaction signing running on an ESP32, sending real mainnet transactions. The proof is on-chain.",
      {type:"code", content:"TX: 0xd9440f650d2c185b1232d31695a096c95866fe32baf7e44cfe0c1d37e96b62cf\nBlock: 18,720,296\nRelay: Guition ESP32-S3 4848S040 → CKB light client → mainnet"},
      "The library handles the full signing pipeline on-device: derive compressed pubkey from privkey, compute blake160 lock args, build the WitnessArgs molecule (85 bytes, exact CKB layout), compute the personalised blake2b signing hash, run RFC6979 deterministic ECDSA. All vendored — trezor-crypto for secp256k1, the reference BLAKE2 impl. No external install required.",
      "Along the way: fixed a bech32m checksum bug (spurious zero byte in hrp expansion was invalidating every generated address), fixed signature byte order (was recid|r|s, should be r|s|recid), fixed a broadcast false-negative caused by an ArduinoJson parse edge case on the relay response. All on-device verified on an ESP32-D0WD-V3 at 240MHz.",

      {type:"h3", content:"CKB-ESP32 — modular build system v3.0.0"},
      "Restructured the library around CKBConfig.h capability profiles. Instead of one monolithic include, you define what your board can do and the compiler only pulls in the code that matches. <code>CKB_NODE_FULL</code> for a node running the full RPC stack, <code>CKB_NODE_LIGHT</code> for light client mode, <code>CKB_INDEXER</code> for rich indexer queries, <code>CKB_SIGNING</code> for on-device secp256k1.",
      "Also shipped: light client API with <code>setScripts()</code>, <code>watchAddress()</code>, <code>getTipHeader()</code>, <code>fetchTransaction()</code>, <code>getSyncState()</code>. Live-tested against ckb-light-client v0.5.4. The CKBTestBench automated test harness runs 104 tests with known Python-verified vectors — pass rate gates any commit.",

      {type:"h3", content:"TelegramSerial — Arduino Library Manager"},
      "PR #7823 into the Arduino Library Registry merged. TelegramSerial is now searchable and installable from the IDE Library Manager directly — no GitHub URL, no manual path setup.",
      "TelegramSerial is a drop-in Serial replacement for ESP32. Swap <code>Serial.println()</code> for <code>TelegramSerial.println()</code> and debug output goes to a Telegram bot. Useful for deployed hardware you can't physically reach. Getting into the official registry lowers the barrier from 'clone a repo and figure out the include path' to 'search and click install'.",
      {type:"code", content:"// PlatformIO:\nlib_deps = toastmanAu/TelegramSerial\n\n// Arduino IDE: search \"TelegramSerial\" in Library Manager"},

      {type:"h3", content:"wyltek-embedded-builder — 38 sensor drivers, 32 board targets"},
      "The embedded SDK grew substantially. The design principle is a uniform interface: every driver implements <code>begin()</code>, <code>read()</code>, <code>driverName()</code>, and returns a <code>WySensorData</code> struct with typed fields and a consistent <code>d.ok</code> / <code>d.error</code> pattern. One logging or display routine handles all sensors.",
      "What shipped today:",
      {type:"ul", content:[
        "38 sensor drivers total — environmental, motion, gas, distance, weight, barcode, UV, current/voltage, turbidity, camera",
        "WyMICS5524 — MEMS gas sensor (CO, ethanol, H2, NH3), faster and lower power than MQ series",
        "WyDFPlayer — DFPlayer Mini MP3, full 10-byte UART protocol, /ADVERT/ interrupt-playback, clone chip support",
        "WyCamera — ESP32-CAM OV2640, MJPEG stream + snapshot server, motion detection, flash LED",
        "WyEyes — animated dual GC9A01 round display robot eyes, 12 expressions, idle drift, auto-blink",
        "WyDS18B20 rewrite — multi-sensor bus search bug fixed, non-blocking API, simultaneous conversion",
        "WyLD2410 — HLK-LD2410 mmWave presence sensor",
        "WyGUVAS12SD — UV index sensor with index bands",
        "WyTurbidity — optical turbidity, NTU output",
        "WyINA219 — voltage/current/power with energy accumulation",
        "WySoilMoisture, WyHCSR04 (median filter rewrite), WyWind (speed + direction)",
        "32 board targets — added 12 new LilyGo/TTGO targets including T-Deck (LoRa+keyboard), T-Watch 2020 V3 (full smartwatch), T-Beam Meshtastic, T-Display S3 AMOLED",
        "Sensor docs: pH calibration guide (Nernst equation, temp compensation), MQ series warm-up and R0 calibration, WyCamera setup"
      ]},
      "The practical case for a unified SDK: at 10 sensors, building with per-sensor libraries takes roughly 3.8× more tokens and time per session than with a unified interface. The library is persistent knowledge that doesn't reset between sessions.",

      {type:"h3", content:"Guition 4848S040 — GT911 touch confirmed"},
      "The 480×480 S3 HMI board is a CKB light client node and HTTP broadcast relay. This session: confirmed GT911 touch controller wiring (SDA=19, SCL=45, INT=40, RST=41, addr=0x5D), interrupt-driven touch reading, full 480×480 coordinate range. Display + touch + wallet firmware all confirmed working together.",

      {type:"h3", content:"wyltekindustries.com — registered and live"},
      "Registered wyltekindustries.com for 2 years and launched on a dedicated URL via Cloudflare. OG meta tags and canonical URLs added throughout. A BlackBox product page built — B2B framing (supplied hardware, not a DIY kit), enquiry CTA, device mockup with live 450 CKB invoice rendering.",

      {type:"h3", content:"Fiber network — nodes running, RPC auth solved"},
      "Both Fiber nodes (ckbnode and N100) are funded and running. The late-night blocker was Biscuit token authentication in Fiber v0.7.0 — the config requires a biscuit public key and the RPC calls need a corresponding token. Generated proper keypairs, configured both nodes. Fiber RPC calls working by end of session. Channel setup is the next step once N100 gets funded above the auto-accept threshold.",

      {type:"h3", content:"CKB-SMS-Bridge — research"},
      "Early research session on using LilyGo SIM boards as CKB transaction relay nodes over SMS. Both A7670SA and SIM7080G use physical nano SIM — Hologram is the right carrier (inbound SMS free, $1/month SIM fee, 190+ countries). Economics at 30 CKB fee per transaction: 100 TX/month = ~$53 profit. Research and sim selection committed to <code>toastmanAu/ckb-sms-bridge</code>.",
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
