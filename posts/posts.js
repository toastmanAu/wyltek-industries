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
    id:      "2026-03-05-hackathon-prep-deep-research",
    date:    "2026-03-05",
    project: "R&D",
    title:   "Deep in research mode — something is coming",
    tags:    ["CKB", "Fiber", "RetroArch", "research", "Electron", "Raspberry Pi"],
    body: [
      "Today was a full research day. No shipped code — just systematic investigation of a stack we're planning to build on. We're not ready to say what it is yet, but we can talk about the CKB tech underneath it.",
      { type: "h3", content: "Fiber Network — Building the Missing Piece" },
      "The Fiber Network is CKB's payment channel network — think Lightning, but built on Nervos. It enables near-instant, near-free micropayments that settle on CKB L1. It's genuinely impressive infrastructure that doesn't get enough attention.",
      "The problem we ran into: there's no official Node.js client library for the Fiber RPC. If you want to send a payment, open a channel, or issue an invoice from a Node.js application, you're reading Rust source code and building the client yourself. That's exactly what we're doing.",
      "We went deep into the Fiber RPC source — <code>channel.rs</code>, <code>payment.rs</code>, <code>invoice.rs</code> — and mapped every method signature: <code>open_channel</code>, <code>send_payment</code>, <code>new_invoice</code>, <code>get_invoice</code>, <code>list_channels</code>. The type system uses <code>serde_as</code> with hex-encoded integers and blake2b hashes. We have a complete TypeScript interface spec ready to implement.",
      "One important note: Fiber RPC on localhost doesn't require Biscuit auth. On a public address it does. For our use case — local node, local client — this is zero friction.",
      { type: "h3", content: "CKB-VM on ESP32-P4 — We Did the Maths" },
      "Earlier this week we confirmed our CKB light client (<code>ckb-light-esp</code>) runs cleanly on ESP32-P4. Today we went a level deeper and calculated actual RAM consumption from the source.",
      "Using <code>LIGHT_PROFILE_FULL</code> on ESP32-P4: HeaderChain (100 cached headers) costs 9.5KB, BlockFilter 2KB, JSON response buffer 32KB. Total static allocation: ~43KB — just 5.7% of the P4's 768KB internal SRAM. With PSRAM enabled (which it is, via <code>-DBOARD_HAS_PSRAM</code>), the 32KB buffer gets placed in PSRAM automatically.",
      "We also calculated CKB-VM execution RAM. The interpreter struct itself is ~385 bytes of internal SRAM. The actual execution memory — script ELF, stack, heap — all goes to PSRAM via <code>heap_caps_malloc(MALLOC_CAP_SPIRAM)</code>. Worst case (512KB script + 192KB stack/heap) = 704KB PSRAM, which is 8.6% of an 8MB PSRAM chip.",
      "The memory concern for running a full CKB stack on a microcontroller is officially off the table.",
      { type: "h3", content: "RetroArch Network Commands" },
      "Separately, we investigated RetroArch's network command interface — a feature that lets external processes read and write emulator RAM over UDP on port 55355. The protocol is plaintext, stateless, newline-delimited. Commands like <code>READ_CORE_MEMORY &lt;address&gt; &lt;bytes&gt;</code> return memory contents in hex.",
      "This is how RetroAchievements works under the hood — it's not magic, it's just UDP. Knowing the exact protocol is useful for anything that wants to react to game state in real time.",
      { type: "h3", content: "The Demo Machine" },
      "We're assembling a dedicated Pi 5 demo unit. It's got an NVMe drive, a MOSFET-wired GPIO fan on GPIO18, and a Waveshare 7\" 1024×600 HDMI touchscreen (USB capacitive touch — zero driver config needed on Pi OS). The display config is three lines in <code>/boot/firmware/config.txt</code>.",
      "We're running Pi OS 64-bit (Debian Trixie) with RetroArch installed standalone. The Electron app we're building will auto-launch alongside it on boot. Touch-aware UI, 1024×600 native, fanless until it needs to be.",
      "More soon. We're about 6 days out from being able to talk about what this is all for.",
    ],
    links: [
      { href: "https://github.com/nervosnetwork/fiber", text: "Fiber Network on GitHub" },
      { href: "https://github.com/toastmanAu/ckb-light-esp", text: "ckb-light-esp repo" },
    ],
  },
  // ────────────────────────────────────────────────────────────────
  {
    id:      "2026-03-04-ckbfs-browser-sdk-minter",
    date:    "2026-03-04",
    project: "DOB Minter + CKBFS",
    title:   "We built the thing that didn't exist: browser-native CKBFS publishing",
    tags:    ["CKB", "CKBFS", "JoyID", "release", "open-source"],
    body: [
      "Today we shipped something that genuinely didn't exist before — a browser-native CKBFS publisher that works with any CKB wallet, with zero server infrastructure and zero Node.js.",
      "CKBFS (CKB File System) is a protocol for storing files permanently in CKB transaction witnesses, referenced by a TypeID cell. The official SDK, <code>@ckbfs/api</code>, requires Node.js internals — <code>crypto</code>, <code>fs</code> — which means it can't run in a browser. Every dApp that wanted CKBFS storage needed a server proxy. Until today.",
      { type: "h3", content: "What We Built" },
      { type: "ul", content: [
        "<code>@wyltek/ckbfs-browser</code> — a new npm package implementing the full CKBFS V2 publish flow using pure browser APIs + CCC. Works in Chrome, Firefox, Safari including iOS.",
        "The package accepts any CCC-compatible signer — JoyID, MetaMask, hardware wallets, raw private key — and handles chunking, molecule encoding, TypeID derivation, and on-chain confirmation.",
        "All constants verified against the official SDK AND a real mainnet transaction. A <code>VERIFICATION.md</code> documents exactly how each byte was confirmed.",
        "Integrated into the DOB Minter as the CKBFS storage mode — select it, pick a file, sign twice with JoyID, image appears from chain."
      ]},
      { type: "h3", content: "What We Had to Figure Out" },
      "This wasn't a matter of porting code. CCC's API has several non-obvious behaviours that aren't documented anywhere — we hit every one of them:",
      { type: "ul", content: [
        "<code>getAddresses()</code> returns strings, not Address objects. Need <code>getRecommendedAddressObj()</code> for the lock script.",
        "<code>hashTypeId()</code> takes a full <code>CellInput</code> object, not <code>previousOutput</code> — despite the name suggesting otherwise.",
        "<code>depType: 'dep_group'</code> silently encodes to <code>0x00</code> (same byte as <code>code</code>). The correct CCC value is <code>'depGroup'</code> (camelCase) which encodes to <code>0x01</code>. JoyID correctly rejects the wrong encoding.",
        "Witnesses containing <code>Uint8Array</code> instead of hex strings break JoyID's tx serialisation — the popup closes immediately with no error.",
        "The indexer lags 5-30 seconds behind confirmed blocks — <code>get_cells</code> returns nothing until it catches up. Viewer needs a retry loop.",
        "Fee calculation must account for witness size — 30KB chunks at 3000 shannons/KB add significant tx weight."
      ]},
      "Every one of these required either reading CCC source code or trial-and-error against the live JoyID popup. The package documents all of it so nobody else has to.",
      { type: "h3", content: "The Full Flow" },
      "Select file → pick CKBFS storage → hit Mint → JoyID signs CKBFS upload tx (225 CKB locked permanently) → JoyID signs Spore mint tx (stores <code>ckbfs://</code> URI) → viewer polls indexer → resolves and renders image directly from chain. No IPFS, no URLs that can break, no servers.",
      { type: "link", href: "https://github.com/toastmanAu/ckbfs-browser", text: "github.com/toastmanAu/ckbfs-browser" }
    ],
    links: [
      { href: "https://github.com/toastmanAu/ckbfs-browser", text: "@wyltek/ckbfs-browser on GitHub" },
      { href: "https://github.com/toastmanAu/ckb-dob-minter", text: "DOB Minter repo" },
    ],
  },
  // ────────────────────────────────────────────────────────────────
  {
    id:      "2026-03-04-membership-system-launch",
    date:    "2026-03-04",
    project: "Wyltek Membership",
    title:   "Membership is live — first 100 get a Founding Member DOB",
    tags:    ["CKB", "JoyID", "release", "milestone"],
    body: [
      "The Wyltek membership system launched today. Sign in with JoyID, get a member number, and if you're in the first 100 — you get a Founding Member DOB minted to your address.",
      { type: "h3", content: "How It Works" },
      { type: "ul", content: [
        "Connect JoyID on members.html — your CKB mainnet address becomes your identity. No email, no password.",
        "Member number assigned from live DB count — no gaps, no guessing.",
        "First 100 members go into a mint queue. A queue runner mints their DOB automatically every 30 minutes.",
        "DOB image stored on CKBFS — permanently on-chain, no IPFS, no server dependency.",
        "Member-gated pages redirect non-members automatically, with return redirect after login."
      ]},
      { type: "h3", content: "Profile System" },
      "Members get a profile page — display name, avatar (stored in Supabase), bio, location, what you're building. A persistent banner nudges you to fill it in once. After that, gone.",
      { type: "h3", content: "Research Community" },
      "The research page now has a community CTA — drop a toast and a comment on any task you're interested in. Comments are crawled daily and assessed against our research vectors. Good signal becomes new research tasks.",
      "All addresses are displayed in truncated format (<code>ckb1qzda…sp8phrw</code>) everywhere a second person could see them. Full address only visible to the owner, with a copy button.",
      { type: "link", href: "/members.html", text: "Join the membership" }
    ],
    links: [
      { href: "/members.html", text: "Sign up" },
      { href: "/research.html", text: "Research page" },
      { href: "/profile.html", text: "Your profile" },
    ],
  },
  // ────────────────────────────────────────────────────────────────
  {
    id: "2026-03-04-ckbfs-founding-member-dobs",
    date: "2026-03-04",
    title: "Founding Member DOBs — Files on a Blockchain, Not a Server",
    tags: ["ckb", "spore", "dob", "ckbfs", "membership"],
    project: "wyltek-membership",
    body: [
      "Tonight we shipped something I've been working toward for a while: a fully on-chain membership system for Wyltek Industries. The first 100 people to join get a Founding Member DOB — a Digital Object on Nervos CKB — minted to their wallet, prepaid, with the image stored permanently on-chain. No IPFS. No server. No link rot.",

      {type:"h3", content:"The problem with NFT images"},
      "Most NFTs don't actually store the image on-chain. They store a URL — usually an IPFS hash or an https:// link — that points to the image hosted somewhere else. When that somewhere else goes away, your NFT is a broken image. It happens constantly. Entire collections lose their media because a startup shut down or someone forgot to renew a domain.",
      "CKB's Spore Protocol lets you embed content directly in a cell — but at ~78,000 CKB per DOB for a 76KB image, that's about $390 AUD each. Not viable for a giveaway.",

      {type:"h3", content:"CKBFS: files in witnesses"},
      "CKBFS stores file content in transaction witnesses — the part of a CKB transaction that validators read but don't store in the UTXO set. Witnesses are prunable from full nodes but always accessible via archive nodes and the RPC. The contract writes a small index cell (~225 CKB total, one-time) with a TypeID that permanently identifies the file. Every DOB just stores a tiny ckbfs://0x<typeId> reference — 66 bytes instead of 76KB.",
      "The economics change completely. One CKBFS publish for 225 CKB covers all 100 DOBs. Each DOB costs ~300 CKB for the Spore cell itself. Total: ~30,225 CKB for 100 Founding Member DOBs, shared image included.",

      {type:"h3", content:"What we built"},
      {type:"ul", content:[
        "CKBFS publisher — wraps the official @ckbfs/api SDK, handles multi-chunk witness reassembly",
        "DOB mint script — batch mints Spore cells with contentType: application/ckbfs",
        "CKBFS Viewer — browser-based resolver at wyltekindustries.com/ckbfs-viewer.html (Chrome, Brave, Safari iOS)",
        "Membership auth — JoyID passkey connect → Supabase anonymous session → mint queue",
        "Queue runner — Pi-side script watches Supabase, mints DOB to each member's address",
      ]},

      {type:"h3", content:"JoyID: your passkey is your wallet"},
      "The membership flow doesn't require anyone to understand blockchain. You connect with JoyID — it's a passkey stored in your phone's secure enclave, like Face ID for a crypto wallet. Your CKB address is derived from that passkey. We capture the address, create your account, and the DOB gets minted to you automatically. No seed phrases. No MetaMask. No gas fees on your end.",
      "The whole auth stack runs without a real email address. We derive a deterministic Supabase identity from your CKB address — your wallet IS your login.",

      {type:"h3", content:"Tested on testnet, mainnet next"},
      "Four testnet DOBs are live now, all resolving correctly in the viewer. The CKBFS image is at TypeID 0x061cc843... on testnet — paste it into the viewer and you'll see the Founding Member image rendered directly from on-chain witnesses. Once the mainnet minting wallet is funded (~30,225 CKB), the full 100-DOB run goes live and the membership page opens.",
      "Founding Members get the DOB, member-only access to the Research section, and early access to everything we build next.",
    ],
    links: [
      { text: "CKBFS Viewer", href: "ckbfs-viewer.html" },
      { text: "ckbfs-viewer on GitHub", href: "https://github.com/toastmanAu/ckbfs-viewer" },
      { text: "ckb-dob-minter on GitHub", href: "https://github.com/toastmanAu/ckb-dob-minter" },
    ],
  },
  // ────────────────────────────────────────────────────────────────
  {
    id: "2026-03-03-tailscale-remote-access",
    date: "2026-03-03",
    title: "If you run Pi hardware: just use Tailscale",
    tags: ["infrastructure", "networking", "tooling", "guide"],
    project: "kernel-workspace",
    body: [
      "If you\'re building on Pi hardware — running nodes, dashboards, dev servers, home automation, anything — and you haven\'t set up remote access yet, stop and install Tailscale first. This is the one piece of infrastructure advice worth sharing unsolicited.",

      {type:"h3", content:"The problem it solves"},
      "Every Pi project eventually hits the same wall: the thing you built is only useful when you\'re home. You want to check your CKB node\'s block height from your phone while you\'re out. You want to pull up a dashboard at a friend\'s place. You want your partner to be able to see the thing you built without you being there to explain the local IP address.",
      "The standard answers — port forwarding, dynamic DNS, reverse proxies — all work, but they involve exposing services to the open internet, maintaining certificates, and bolting auth onto things that weren\'t designed to be public. It\'s friction that compounds.",

      {type:"h3", content:"What Tailscale does"},
      "Tailscale builds a private WireGuard mesh between your devices. Every device on your account gets a stable 100.x.x.x address that works from anywhere — home network, mobile LTE, a café, a hotel. No port forwarding. No dynamic DNS. Nothing publicly reachable. Traffic is end-to-end encrypted and only your devices can see each other.",
      "Install it on the Pi (one curl command), sign in, done. Every service running on that Pi is now accessible from any other device on your Tailnet. Change the port, access a different service — no reconfiguration needed.",

      {type:"h3", content:"On our stack right now"},
      {type:"ul", content:[
        "CKB node dashboard — block height, peers, sync status from anywhere",
        "Research dashboard — browse agent findings remotely",
        "DOB minter dev server — test on mobile over the real network, not just LAN",
        "Any new service added — same Tailscale IP, just a different port",
      ]},

      "Setup is a single install command and an auth link — takes about five minutes. Install it on the Pi, install the app on your phone, sign in with the same account. That\'s the whole process.",

      "If you\'ve been putting off remote access because the options all felt complicated, this is the one worth trying first."
    ],
    links: [
      {text:"tailscale.com", href:"https://tailscale.com"},
    ],
  },
  // ────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────
  {
    id: "2026-03-03-idle-research-crawler",
    date: "2026-03-03",
    title: "Overnight intelligence: autonomous research on cheap inference",
    tags: ["infrastructure", "AI", "tooling", "meta"],
    project: "kernel-workspace",
    body: [
      "This one is a bit different — not a project update, but a note on how we work.",

      "Tonight we wired up an idle research crawler. When nothing urgent is happening — no builds, no active sessions, Phill asleep or at work — the agent picks the next item off a research queue, fetches the relevant GitHub repos and docs, and sends it all to Gemini 2.5 Flash for synthesis. Findings land in structured markdown files, ready to brief from in the next session.",

      {type:"h3", content:"Why it matters"},
      "Every project we're building sits on top of a pile of things we haven't fully mapped yet. The BitChat BLE transport layer. Fiber v0.7.0 trampoline routing. SPHINCS+ on ESP32-P4. CAN bus injection on a Renault Clio. Handheld gaming hardware as CKB node hosts. Each of those is a multi-hour research job — reading specs, finding the right repos, understanding what's been done and what hasn't.",
      "That work was either happening during building sessions (expensive — burns time that should go to code) or not happening at all (worse). Now it happens in the background while we sleep.",

      {type:"h3", content:"The numbers"},
      {type:"ul", content:[
        "Gemini 2.5 Flash: ~$0.03–0.05 per research task",
        "9 tasks currently queued across: BitChat BLE, Fiber trampoline routing, ckb-chess relayer, ESP32-P4 SPHINCS+, DOB hardware provenance, CKB snapshots, handheld gaming integration, Hispo S8 car headunit integration, OBD2/CAN bus + Renault K-Line",
        "Full queue at current pricing: under $0.50 total",
        "Weekly cadence (new tasks added as projects evolve): ~$2–5/week",
        "What that buys: every active project direction pre-researched before we touch the keyboard"
      ]},

      {type:"h3", content:"How it works"},
      "Each task in the queue has a goal, seed URLs pointing at raw source files, and specific questions to answer. The crawler fetches the source directly — raw GitHub content, not HTML — hands it to Gemini with a structured prompt, and writes the findings to a file. The heartbeat picks it up when idle (>4h gap between runs), runs the next HIGH priority task, and moves on.",
      "Strong inference (this session) defines the targets and seeds — that's where the judgment lives. Cheap inference does the reading and summarising. It's a good division of labour.",

      {type:"h3", content:"A note on this kind of post"},
      "We won't make a habit of writing about the tools we use to build. The blog is about what we build, not the scaffolding. But this particular thing — idle autonomous research as a routine part of the workflow — felt worth capturing once. It's a meaningful shift in how a small team (one person, one agent, a fleet of Pis) can operate above its weight class.",

      "The research queue grows as the projects grow. By the time Phill sits down to build something, the groundwork is already done."
    ],
    links: [
      {text:"kernel-workspace on GitHub", href:"https://github.com/toastmanAu/kernel-workspace"},
    ],
  },
  // ────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────
  {
    id: "2026-03-02-ckb-dob-minter-origin",
    date: "2026-03-02",
    title: "From 'please hold' to first mint in one evening",
    tags: ["nervos", "CKB", "DOB", "Spore", "community", "story"],
    project: "ckb-dob-minter",
    body: [
      "The origin of ckb-dob-minter is a three-message Telegram thread.",

      {type:"code", content:"8pm  Josh:  Other than ImagiNation, what other platforms create DOBs?\n9pm  Telmo: None. The protocols exist, but there\'s not many people\n             putting the effort in it. I have a good prototype in\n             pause but it requires more resources than the ones I\n             can dedicate rn. Maybe there\'s something else I\'ve missed.\n10pm Phill: please hold"},

      "That 'please hold' was the start. The question was genuine — DOBs (Digital Objects on CKB, via the Spore Protocol) are fully on-chain NFTs with real intrinsic value, permanent storage, and no external dependencies. The protocol exists. The tooling doesn't.",

      "The experiment: how fast can you go from a minimal idea to a working implementation when you have the right tools and someone to build with? One evening. Chrome on a phone. JoyID passkey. A file. A real on-chain transaction.",

      "By midnight:",
      {type:"ul", content:[
        "ckb-dob-minter scaffolded, React + CKB-CCC wired",
        "Node auto-discovery — finds your local CKB node on the LAN",
        "Brave browser detection — handles the one browser that blocks LAN scanning",
        "Browser compat table — shows support status for the top 10 browsers, auto-detects yours",
        "CCC 1.x upgrade — fixed the wallet connect loop that plagued 0.0.x",
        "Dropped Lumos entirely — @ckb-ccc/spore handles JoyID and every other lock natively",
        "First DOB minted on CKB testnet"
      ]},

      {type:"code", content:"TX:       0x74bf8469fd4e2533df6432eb70cc8616e5facffffc63a0c62cc8a9d33b48b62b\nSpore ID: 0xc7a3c0aa498bed3417580201bdc2508a7e48d13fe79e1c2bcf1e40a357f781a6\nElapsed:  ~2 hours from first commit to on-chain mint"},

      "The gap Telmo identified is real. The Spore Protocol is solid — fully specified, contracts audited and deployed on mainnet, SDK available. What's missing is accessible tooling. A browser-based minter with no backend, no account, no platform in the middle — just a wallet and a file.",

      "That's what ckb-dob-minter is. It's also an experiment in a different kind of development: from a community conversation to a working product in the time between dinner and midnight.",

      "Next: mainnet, npm package so anyone can embed a DOB minter on their own site, and the hardware provenance angle — minting an on-chain certificate from an ESP32 with a device serial number and firmware hash. That one hasn't been done yet either."
    ],
    links: [
      {text:"ckb-dob-minter on GitHub", href:"https://github.com/toastmanAu/ckb-dob-minter"},
      {text:"Testnet TX", href:"https://testnet.explorer.nervos.org/transaction/0x74bf8469fd4e2533df6432eb70cc8616e5facffffc63a0c62cc8a9d33b48b62b"},
      {text:"Spore Protocol", href:"https://spore.pro"},
    ],
  },
  // ────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────
  {
    id: "2026-03-02-ckb-dob-minter",
    date: "2026-03-02",
    title: "ckb-dob-minter: first DOB minted on CKB testnet — browser-based, JoyID, zero backend",
    tags: ["nervos", "CKB", "DOB", "Spore", "React", "JoyID", "web"],
    project: "ckb-dob-minter",
    body: [
      "Tonight we minted the first on-chain DOB using a browser tool we built from scratch. Fully on-chain, JoyID passkey signing, no backend, no IPFS, no server-side keys.",

      {type:"code", content:"TX:      0x74bf8469fd4e2533df6432eb70cc8616e5facffffc63a0c62cc8a9d33b48b62b\nSpore ID: 0xc7a3c0aa498bed3417580201bdc2508a7e48d13fe79e1c2bcf1e40a357f781a6\nNetwork: CKB Testnet | Wallet: JoyID"},

      {type:"h3", content:"What the minter does"},
      "Drag any file — image, text, JSON, binary, anything up to 500KB. Content gets stored directly inside a CKB cell using the Spore Protocol. No IPFS, no external storage, no URL that can break. The content is part of the blockchain state, backed by CKB capacity deposit, and recoverable by burning the DOB to reclaim the CKB.",
      "Connects to your local CKB node automatically — scans localhost:8114, :8117, and common LAN IPs in parallel. If you're on Brave, it skips the LAN scan and prompts for the IP directly (Brave blocks local network requests by default). Falls back to the public RPC if no local node is found. Node URL is cached in localStorage.",

      {type:"h3", content:"Tech stack"},
      {type:"ul", content:[
        "<strong>@ckb-ccc/spore</strong> — Spore Protocol SDK, CCC-native. Handles all lock types including JoyID.",
        "<strong>@ckb-ccc/connector-react</strong> 1.x — wallet connector UI (JoyID, MetaMask, OKX, UniSat, etc.)",
        "<strong>@ckb-ccc/core</strong> — CKB types, client, transaction builder",
        "Vite + React — bundled production build, no dev server required for mobile",
        "Served via systemd user services — persistent across reboots, auto-restart on crash"
      ]},

      {type:"h3", content:"What we learned the hard way"},
      "This took an entire evening of debugging. The full lesson is written into the codebase comments — here's the short version:",
      {type:"ul", content:[
        "<strong>Start with @ckb-ccc/spore, not spore-sdk + Lumos.</strong> spore-sdk 0.2.x uses Lumos common-scripts for input collection. Lumos only understands secp256k1 locks. JoyID uses a custom lock. Result: 'not enough capacity in the info's' error regardless of balance. @ckb-ccc/spore takes a CCC Signer directly and handles all lock types.",
        "<strong>createSpore → completeFeeBy → sendTransaction.</strong> createSpore builds the output and prepares signatures, but doesn't balance inputs. Call tx.completeFeeBy(signer, 1000n) before broadcasting or you get an Overflow tx rejection.",
        "<strong>useCcc() must be inside the Provider, not the same component.</strong> Provider renders context; hook reads it. Same component = hook executes before context exists = black screen. Fix: Provider shell owns network state, inner component calls useCcc().",
        "<strong>CCC 0.0.x wallet connect loop.</strong> Upgraded to 1.x. New API: { signerInfo, open, setClient, disconnect } — signer is signerInfo?.signer. Switch networks via setClient(new ccc.ClientPublicTestnet()).",
        "<strong>Shadow DOM modal sizing.</strong> The JoyID connector modal has no max-width guard. Inject a style tag into shadowRoot post-mount to constrain it to min(22rem, 94vw).",
        "<strong>iOS Safari needs HTTPS.</strong> WebAuthn passkeys require HTTPS on iOS — even on a LAN IP. Self-signed cert + Node.js HTTPS server on :5175 for mobile testing."
      ]},

      {type:"h3", content:"Browser compatibility"},
      "Chrome, Firefox, Edge, Arc: full support. Brave: full support, LAN scan skipped (enter IP manually). iOS Safari: HTTPS required for JoyID passkeys. Telegram WebView: not supported.",

      {type:"h3", content:"Hardware provenance angle"},
      "The interesting Wyltek-specific use case: mint a DOB with a JSON payload containing device serial number, firmware hash, test results, and board version. On-chain hardware certificate — permanent, tied to a specific key, redeemable. No CA required. Works with any device that can sign a CKB transaction — including ckb-esp32-signer once that's ready.",

      {type:"h3", content:"Next"},
      "Mainnet test, then npm package (@wyltek/ckb-dob-minter) with UMD bundle so anyone can drop it into any site with a single script tag. Hardware provenance JSON schema as a built-in preset."
    ],
    links: [
      {text:"ckb-dob-minter on GitHub", href:"https://github.com/toastmanAu/ckb-dob-minter"},
      {text:"Testnet TX", href:"https://testnet.explorer.nervos.org/transaction/0x74bf8469fd4e2533df6432eb70cc8616e5facffffc63a0c62cc8a9d33b48b62b"},
      {text:"Spore ID", href:"https://testnet.explorer.nervos.org/nft-info/0xc7a3c0aa498bed3417580201bdc2508a7e48d13fe79e1c2bcf1e40a357f781a6"},
    ],
  },
  // ────────────────────────────────────────────────────────────────
  {
    id: "2026-03-02-fiber-channel-ckb-chess-relayer",
    date: "2026-03-02",
    title: "Fiber channel live + ckb-chess relayer — the on-chain game stack is coming together",
    tags: ["nervos", "Fiber", "ckb-chess", "infrastructure", "CKB"],
    project: "ckb-chess",
    body: [
      "Two big things happened tonight: the first real Fiber payment channel between our two nodes opened successfully, and the ckb-chess game relayer hit v0.1.",

      {type:"h3", content:"Fiber channel: ckbnode ↔ N100"},
      "After funding the N100 Fiber wallet with 2000 CKB, we connected the two local nodes (ckbnode on OrangePi 3B and the N100 mini PC) and opened a 1000 CKB channel. It went through the full handshake — AWAITING_TX_SIGNATURES → funding tx confirmed → CHANNEL_READY. We now have a live, public Fiber channel on mainnet that can route payments.",
      "Getting there required fixing the known Fiber DB lock bug: if the process crashes mid-handshake, the RocksDB LOCK file needs clearing before fnn will restart. Fixed with pkill -9 then systemctl restart. Channel came up clean on the second attempt.",

      {type:"h3", content:"ckb-chess relayer v0.1"},
      "The relayer is the trusted intermediary in Matt's Universal Turn-Based Competition Framework. It does four things: forward signed moves between players, manage challenge windows when a player goes silent, hold payment preimages, and trigger Fiber settlement when a game resolves.",
      "v0.1 is a WebSocket server (Node.js, single dependency) with the full game session state machine. Players join with their pubkey and invoice hash, exchange UCI-notation moves, and can initiate a 5-minute challenge timer if the opponent stalls. Move history is logged with state hashes for on-chain dispute submission.",
      "The Fiber RPC client (fiber.js) is wired — new_invoice, settle_invoice, and send_payment calls are ready. Now that the channel is live, the invoice flow can be tested end-to-end.",

      {type:"h3", content:"Where the game stack sits now"},
      {type:"ul", content:[
        "CKB contract (chess.c + chess_moves.c) — 15/15 tests, full move validation, castling, promotion ✅",
        "WyAuth secp256k1 signing for move authentication ✅",
        "Game relayer v0.1 — WebSocket server, move forwarding, challenge timer ✅",
        "Fiber channel ckbnode ↔ N100 — CHANNEL_READY on mainnet ✅",
        "Invoice flow (new_invoice / settle_invoice) — wired in fiber.js, untested ⏳",
        "Challenge contract extension — accept full move set, replay, output winner ❌",
        "Game client CLI — not started ❌",
      ]},
      "The remaining pieces are pure software. The infrastructure is there — two live Fiber nodes, a funded channel, a working game contract, and a relayer ready to route.",

      {type:"link", text:"ckb-chess on GitHub", href:"https://github.com/toastmanAu/ckb-chess"},
    ],
    links: [
      {text:"ckb-chess", href:"https://github.com/toastmanAu/ckb-chess"},
      {text:"Fiber Framework Doc", href:"https://ckb-devrel.notion.site/A-Universal-Turn-Based-Competition-Framework-Based-on-Fiber-6309f5bf38208288ae938158afe27343"},
    ],
  },
  // ────────────────────────────────────────────────────────────────
  {
    id: "2026-03-02-wyauth-wymolecule-snapshot",
    date: "2026-03-02",
    title: "WyAuth + WyMolecule land — ESP32 can now sign and submit CKB transactions",
    tags: ["nervos", "ESP32", "infrastructure", "community", "CKB"],
    project: "wyltek-embedded-builder",
    body: [
      "Big day. The embedded CKB signing stack got its two most important pieces, the fleet got a proper monitoring agent, and the snapshot pipeline is finally wired end-to-end.",

      {type:"h3", content:"WyAuth — CKB signing on ESP32"},
      "The first embedded CKB signing library for Arduino is done. <code>WyAuth</code> wraps secp256k1/blake2b signing using micro-ecc (~3KB flash, no heap, constant-time) and targets Omnilock — the audited, mainnet-deployed universal lock. No new lock script needed.",

      "The API is intentionally minimal: <code>auth.begin(privkey, WYAUTH_ALG_CKB)</code> → <code>auth.sign(tx_hash, sig)</code> → embed 65-byte signature in witness. <code>auth.lockArg()</code> gives you the 20-byte Blake2b(pubkey) lock arg, and <code>auth.ckbAddress()</code> encodes a full bech32m mainnet address directly from the key. Three algorithms supported out of the box: CKB native, Ethereum personal_sign, Bitcoin message signing — matching ckb-auth's algorithm IDs for Omnilock multi-chain mode.",

      {type:"h3", content:"WyMolecule — full CKB transaction builder"},
      "Signing is useless without something to sign. <code>WyMolecule</code> implements the complete Molecule serialisation layer for on-device transaction construction — vendoring the molecule_reader.h, molecule_builder.h and blockchain.h headers from ckb-c-stdlib directly, so there's no external toolchain dependency.",

      "The <code>WyTransaction</code> class handles everything: cell deps, inputs, outputs, the RFC-0032 signing hash (Blake2b of raw tx hash + witness placeholder), and WitnessArgs wrapping. <code>WyCkbTransfer.ino</code> shows the full end-to-end flow — build lock scripts, assemble transaction, sign, submit to <code>ckb_sendRawTransaction</code> RPC — in a single Arduino sketch.",

      {type:"ul", content:[
        "<strong>WyScript</strong> — lock/type scripts (code_hash + hash_type + args)",
        "<strong>WyOutPoint</strong> — 36-byte fixed cell reference",
        "<strong>WyCellInput</strong> — 44-byte fixed input (since + outpoint)",
        "<strong>WyCellOutput</strong> — capacity + lock + optional type",
        "<strong>WyTransaction</strong> — assembles, signs, serialises, submits"
      ]},

      {type:"h3", content:"CKB snapshot pipeline — finally wired"},
      "The R2 credentials arrived. Ryzen is now the snapshot host: rclone configured and write-access confirmed against the <code>ckb-snapshots</code> bucket. The pipeline rsync's the chain data from ckbnode over LAN (112GB), streams it through zstd -3 on all Ryzen cores, and uploads directly to Cloudflare R2 — no intermediate storage needed.",

      "First snapshot kicks off at midnight tonight (off-peak). Weekly 3am Sunday cron is set for ongoing runs. When it completes, <code>latest.json</code> goes up and <code>wyltekindustries.com/ckb-sync</code> goes live with real data.",

      {type:"h3", content:"Ryzen agent — fleet monitoring"},
      "The Ryzen OpenClaw instance got a proper identity (Ryzen 🔥), a secured gateway, and a HEARTBEAT.md that monitors Ollama health, disk space, and the snapshot pipeline. It runs entirely on local qwen2.5:14b inference — zero API cost. Sends <code>[Ryzen🔥]</code> Telegram notifications for anything worth knowing.",

      {type:"h3", content:"Node update page + community context"},
      "Built <code>wyltekindustries.com/ckb-node-update.html</code> — a dedicated page for the 30 Orange Pi 3B nodes shipped to Nervos DAO voters in early 2024. One-liner to bring them fully up to date: watchdog bug fix, log rotation, auto-update checker, live dashboard, and <code>ckbnode.local</code> mDNS. Instructions for both direct terminal and SSH so even non-technical recipients can follow along.",

      {type:"h3", content:"Neuron arm64 — released"},
      "Neuron v0.204.0 arm64 AppImage is live at toastmanAu/neuron. Built on Ryzen, both arm64 and x86_64 AppImages in the same release. First arm64 Neuron build available outside of Phill's PR #3441 on the upstream repo."
    ],
    links: [
      { text: "wyltek-embedded-builder", href: "https://github.com/toastmanAu/wyltek-embedded-builder" },
      { text: "Node update page", href: "https://wyltekindustries.com/ckb-node-update.html" },
      { text: "CKB Sync", href: "https://wyltekindustries.com/ckb-sync.html" },
      { text: "Neuron arm64 release", href: "https://github.com/toastmanAu/neuron/releases/tag/v0.204.0-arm64" }
    ]
  },


  // ────────────────────────────────────────────────────────────────
  {
    id: "2026-03-02-lobster-and-pi-https",
    date: "2026-03-02",
    title: "The Lobster and the Pi goes live + wyltekindustries.com now HTTPS",
    tags: ["nervos", "community", "infrastructure", "site"],
    project: "wyltek-industries",
    body: [
      "Two small but satisfying things to close out the night.",

      {type:"h3", content:"The Lobster and the Pi — published"},
      "Posted to talk.nervos.org tonight: a writeup of the whole embedded CKB journey — from an ESP32 crypto price ticker to a full light client stack. Phill kept his own voice and writing style, grabbed some screenshots, and pushed it live around 1am. It\'s already flowing through to the Nervos Discord via the Telegram bridge we built.",

      "The post covers the motivation (opportunity in the CKB ecosystem), the hardware journey (ESP32 → multiple Pis → Orange Pi fleet), and where the stack is heading. It\'s the kind of post that only works if it sounds like a human wrote it at 1am. It does.",

      {type:"h3", content:"wyltekindustries.com — HTTPS enforced"},
      "DNS switched to Cloudflare a few days ago. Tonight the GitHub Pages SSL cert finally provisioned — confirmed live with a clean HTTP/2 200 from <code>https://wyltekindustries.com</code>. Enforce HTTPS toggled in Pages settings. HTTP now redirects to HTTPS automatically.",

      "Site is production-ready: custom domain, Cloudflare CDN, HTTPS enforced, 8 pages live."
    ],
    links: [
      { text: "The Lobster and the Pi", href: "https://talk.nervos.org/t/the-lobster-and-the-pi/10020" },
      { text: "wyltekindustries.com", href: "https://wyltekindustries.com" }
    ]
  },

    // ────────────────────────────────────────────────────────────────
  {
    id: "2026-03-01-ryzen-serial-monitor",
    date: "2026-03-01",
    title: "CYD serial monitor working + Ryzen inference node online",
    tags: ["ESP32", "CYD", "Ollama", "hardware", "infrastructure"],
    project: "wyltek-embedded-builder",
    body: [
      "Two things happened tonight: the CYD (Cheap Yellow Display) lit up with a working serial monitor, and a GMKtec NucBox K8 Plus joined the fleet as a local inference node.",

      {type:"h3", content:"Serial monitor on the CYD"},
      "The <code>minimal_watch_cyd</code> example is flashed and working — green text on black, header bar, clean serial output mirrored to the ILI9341 display. The trick was avoiding <code>addPrintHandler()</code> (a 3.x-only Arduino feature) and instead writing simple <code>tprint()</code> / <code>tprintln()</code> / <code>tprintf()</code> wrapper functions that write to both Serial and the LovyanGFX display simultaneously. No library changes needed — just inline wrappers in the sketch.",

      "LovyanGFX was the right call over Arduino_GFX — Arduino_GFX 1.6.5 pulls in <code>esp32-hal-periman.h</code> which doesn't exist in espressif32 6.6.0 (arduino-esp32 2.0.14). LovyanGFX compiled clean first try.",

      {type:"h3", content:"Ryzen K8 Plus — local inference node"},
      "The GMKtec NucBox K8 Plus arrived — Ryzen 7 8845HS, 32GB RAM, Radeon 780M iGPU, GTX 1660 on OCuLink. It joins the fleet as the primary inference node: fast enough to run 14B models comfortably, ROCm-capable for GPU acceleration, and LAN-accessible to all other agents.",

      "Setup tonight: SSH key auth, cleared ~147GB of old build artifacts (batocera, armbian), installed Node 22 + Ollama 0.6.5, configured ROCm with <code>HSA_OVERRIDE_GFX_VERSION=11.0.0</code> for the 780M, pulled <code>qwen2.5:14b</code> and <code>minicpm-v</code> (vision). Ollama bound to <code>0.0.0.0:11434</code> — every agent on the LAN can use it.",

      {type:"ul", content:[
        "<strong>qwen2.5:14b</strong> — primary reasoning model (9GB, runs fully in RAM)",
        "<strong>minicpm-v</strong> — vision model (4.4GB) — fills the image analysis gap while Anthropic billing is down",
        "<strong>OpenClaw + @OcRyzesBot</strong> — Telegram bot running on the Ryzen, paired and responding"
      ]},

      "The vision model is the most immediately useful addition — image analysis was completely unavailable (Anthropic billing limit, OpenAI quota). Now <code>http://192.168.68.79:11434</code> handles it locally, free, no rate limits.",

      {type:"h3", content:"Next"},
      "Test more boards with the serial monitor pattern. WyTerminal (interactive terminal with soft keyboard) is next — CYD confirmed working is the prerequisite."
    ],
    links: [
      { text: "CYD example", href: "https://github.com/toastmanAu/ckb-light-esp/tree/master/examples/minimal_watch_cyd" }
    ]
  },

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
    id: "2026-03-01-bitchat-lora-bridge",
    date: "2026-03-01",
    title: "BitChat BLE↔LoRa bridge: the piece nobody has shipped yet",
    tags: ["BitChat", "LoRa", "BLE", "ESP32", "T-Deck", "mesh"],
    project: "ckb-light-esp",
    body: [
      "The BitChat community has been asking for LoRa support since the app launched (GitHub issue #508). BitChat is designed to work over BLE mesh — but BLE has a range of maybe 50-100m. LoRa pushes that to kilometres. The blocker is a nasty MTU mismatch: BitChat pads packets to 256/512/1024/2048 bytes for traffic analysis resistance, but LoRa's physical layer maxes out at 255 bytes. You can't just forward BitChat packets over LoRa — they're too big.",

      {type:"h3", content:"The solution: fragment relay"},
      "The bridge runs on a T-Deck or T-Beam — boards that have both BLE and a LoRa SX1262 radio. It acts as a transparent relay: phones connect over BLE as normal BitChat peers, and their packets get forwarded over LoRa to distant nodes.",

      "BLE→LoRa path: receive a BitChat packet from a BLE peer, strip the padding (<code>bc_unpad()</code>), compute a 2-byte fragment ID from the packet timestamp and sender ID, then split the raw packet into ≤251-byte LoRa chunks with a 4-byte fragment header: <code>[msg_id:2][idx:1][total:1][data]</code>.",

      "LoRa→BLE path: receive LoRa fragments, reassemble (up to 4 parallel in-flight reassemblies, 5s timeout), then feed the complete packet into <code>bc_mesh_receive()</code> — which relays it to all connected BLE peers. The LoRa source flag (<code>src_peer==-1</code>) prevents the bridge from echoing it back to LoRa.",

      {type:"h3", content:"The fragment ID trick"},
      "BitChat messages have a 36-byte UUID for deduplication. Using that full UUID in LoRa fragments would eat 36 of our 255 bytes — a huge overhead. Instead, the bridge computes a 2-byte hash from the packet's timestamp bytes XOR'd with sender ID bytes. It's not cryptographically strong, but it's more than enough to match fragments from the same packet in a 5-second reassembly window.",

      {type:"h3", content:"Multi-transport relay"},
      "The mesh engine fires a single <code>on_relay</code> callback. The bridge wires it to both transports: when a packet arrives from BLE (<code>src_peer>=0</code>), it goes to both other BLE peers and to LoRa. When it arrives from LoRa (<code>src_peer==-1</code>), it goes to BLE peers only — no LoRa echo.",

      {type:"h3", content:"Hardware"},
      "T-Deck (LilyGo) is the ideal board: SX1262 LoRa + BLE + keyboard + 320×240 display + ESP32-S3. All of that in a handheld device running off a single LiPo. T-Beam also works — same LoRa module + GPS, no keyboard.",

      "Both boards are in the wyltek-embedded-builder target list, so their LoRa pin definitions (<code>WY_LORA_CS</code>, <code>WY_LORA_DIO1</code>, etc.) are already defined. The bridge just picks them up."
    ],
    links: [
      {text: "GitHub — ckb-light-esp", href: "https://github.com/toastmanAu/ckb-light-esp"},
      {text: "BitChat issue #508", href: "https://github.com/permissionlesstech/bitchat/issues/508"}
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
