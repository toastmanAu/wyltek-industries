# CKB Expert: Community-Trained AI for the Nervos Ecosystem

**Proposal for Nervos Talk Discussion**
**Author:** Wyltek Industries
**Date:** April 2026
**Status:** Draft — seeking community feedback

---

## TL;DR

We're building **CKB Expert** — the first AI model that truly understands Nervos CKB. Not a ChatGPT wrapper with docs stuffed in the prompt. A model with CKB protocol knowledge baked into its weights, trained on RFCs, source code, forum discussions, and ecosystem documentation.

We're inviting trusted community members with Apple Silicon Macs to contribute training compute. Your Mac trains a small adapter file (~50MB), you share it back, and together we build something no individual could build alone.

---

## The Problem

Every CKB developer has experienced this: you ask ChatGPT about the cell model, and it confidently gives you wrong answers. It confuses CKB's cell model with Bitcoin's UTXO. It doesn't know what a type script is. It hallucinates RPC methods that don't exist. It has no idea Fiber Network exists.

General-purpose AI models know nothing about CKB. The existing solutions (CKBGPT, ckb-doc-bot) are RAG wrappers — they stuff documentation into a prompt window and hope for the best. They can't reason about the protocol. They can't generate valid CKB Script code. They forget context between questions.

## The Solution

**CKB Expert** is a family of fine-tuned models trained on the most comprehensive CKB corpus ever assembled:

- **51 RFCs** — the canonical protocol specifications
- **1,385 GitHub files** — source code, docs, issues, discussions from nervosnetwork repos
- **494 Nervos Talk threads** — community technical discussions
- **224 documentation pages** — current and legacy docs sites
- **900+ additional files** — research, ecosystem projects, code samples

From this corpus, we've generated thousands of high-quality Q&A pairs using advanced teacher models (Qwen3.5-27B). These pairs teach the model CKB concepts at every level — from "what is a cell?" to "how does the Sparse Merkle Tree in CoTA handle non-existence proofs?"

The result: models from 0.6B to 70B+ parameters that genuinely understand CKB.

## Why Community Training?

Training a single model is straightforward — we do it on our own hardware. But training a **family** of models across multiple architectures and sizes requires significant compute. More importantly, the best model comes from the best data and the most diverse training — which a community can provide better than any individual.

### What Apple Silicon Enables

Apple's M-series chips have unified memory — the CPU, GPU, and Neural Engine all share the same RAM pool. This means a Mac with 48GB of memory can train models that would require a $4,000+ NVIDIA GPU on a PC. The MLX framework (Apple's open-source ML toolkit) supports QLoRA fine-tuning natively.

| Your Mac | What You Can Train | Estimated Time |
|----------|-------------------|----------------|
| M4 Pro 48GB | Models up to 14B parameters | ~6 hours |
| M4 Max 64-128GB | Models up to 70B parameters | ~12-16 hours |
| M4 Ultra 192GB+ | 70B+ models natively | ~12 hours |
| M2/M3 Max 64GB+ | Models up to 30B parameters | ~8-12 hours |

A 70B CKB Expert model is something no individual in our community could train alone. Together, with a handful of high-memory Macs, we can build something approaching frontier model quality on CKB-specific tasks.

### What You'd Actually Do

1. **We provide:** Training data file (~20MB), training config, and a simple setup script
2. **You run:** A single command on your Mac — `mlx_lm.lora --model <assigned_model> --train --data ckb_train.jsonl`
3. **You wait:** 6-16 hours depending on your hardware and assigned model
4. **You share:** The adapter file (~50MB) back to the project
5. **We merge, test, and publish** the best results

No GPU required. No cloud accounts. No cost beyond the electricity your Mac uses overnight.

---

## Trust Model

### The Reality of Open Training

We are not proposing an open free-for-all. Research has demonstrated that malicious LoRA adapters can introduce backdoors that survive model merging ("LoRA once, backdoor every" — ICLR 2025). A single bad actor contributing poisoned weights could compromise the entire model.

This is not a theoretical concern. For a model that developers will use to understand financial protocol mechanics, code smart contracts, and make architectural decisions — integrity is non-negotiable.

### Verified Contributors Only

Participation is limited to **known, trusted community members**:

- Active Nervos Talk contributors with established history
- Known ecosystem developers (SDK maintainers, dApp builders, node operators)
- Nervos Foundation team members
- Community Fund DAO participants with verified track records
- Individuals vouched for by at least two existing verified contributors

This is deliberately exclusive. We would rather have 5 trusted contributors training 5 models than 50 anonymous contributors with uncertain motivations. Quality and integrity over quantity.

### Verification Pipeline

Every contributed adapter goes through automated validation before it touches the merged model:

**1. Automated Eval Suite**
The adapter is tested against a held-out set of CKB-specific questions with known-correct answers. If accuracy drops below baseline, the adapter is rejected. This catches both low-quality training (bad hyperparameters, insufficient compute) and obvious poisoning attempts.

**2. Behavioural Boundary Testing**
The model is probed with adversarial prompts designed to trigger backdoor behaviour — misleading financial advice, incorrect Script code patterns, subtle protocol misrepresentations. Any deviation from expected behaviour flags the adapter for manual review.

**3. Weight Anomaly Detection**
Statistical analysis of adapter weights compared to expected distributions. Poisoned adapters often show characteristic anomalies — unusually large weight magnitudes, concentrated changes in specific layers, or patterns inconsistent with legitimate fine-tuning.

**4. Reproducibility Check**
Contributors provide their training logs (MLX outputs timestamps, loss curves, and hardware info automatically). We verify that the adapter is consistent with the claimed training run. Fabricated adapters won't match expected loss trajectories.

**5. Manual Review**
For adapters that pass automated checks, a core team member reviews sample outputs across diverse prompt categories before approval.

### On-Chain Attestation (Future)

CKB's cell model enables a natural extension: each verified adapter can be attested on-chain as a Spore DOB cell containing:

- Contributor identity (JoyID or standard CKB address)
- Training configuration hash
- Eval score
- Timestamp
- Core team approval signature

This creates an immutable, verifiable record of who contributed what, scored how, and when — a provenance chain for AI model weights, native to the protocol the model is trained to understand.

---

## Model Family

CKB Expert is not one model — it's a family serving different deployment targets:

### Deployment Tiers

| Model | Size | Where It Runs | Use Case |
|-------|------|--------------|----------|
| `ckb-expert-nano` | 0.6-1.7B | Orange Pi NPU, phones, browser (WebLLM) | FAQ bot, Telegram, tooltips |
| `ckb-expert-fast` | 3-4B | Any laptop, cheap VPS, edge devices | Developer assistant, IDE integration |
| `ckb-expert-standard` | 7-14B | Desktop GPU, Mac, NucBox-class hardware | Full development assistance, code generation |
| `ckb-expert-pro` | 27-32B | High-memory Mac, workstation GPU | Protocol analysis, RFC cross-referencing |
| `ckb-expert-frontier` | 70B+ | M4 Ultra, multi-GPU server | Research-grade protocol reasoning |

Community contributors would be assigned specific models based on their hardware capability. A Mac Mini M4 Pro owner trains the 7-14B tier. A Mac Studio M4 Max owner tackles the 27-32B tier. The rare M4 Ultra owner gets the frontier 70B model.

### Service Architecture

All models are served through a unified API — any application or agent in the Nervos ecosystem can query CKB Expert at the appropriate quality tier:

```
Developer IDE Plugin  →  ckb-expert-standard (14B)
Telegram Bot          →  ckb-expert-fast (4B)
Browser Widget        →  ckb-expert-nano (WebLLM, runs locally)
Research Agent        →  ckb-expert-pro (27B)
```

The API is OpenAI-compatible and available as an MCP server, meaning any AI agent framework (Claude Code, Cursor, Cline, custom agents) can integrate CKB knowledge natively.

---

## Training Data

### Corpus Overview

| Source | Files | Description |
|--------|-------|-------------|
| GitHub (nervosnetwork org) | 1,385 | Source code, docs, READMEs, issues, PRs, discussions |
| Nervos Talk Forum | 494 | Technical community discussions |
| Official Docs | 224 | Current + legacy documentation sites |
| CKB RFCs | 51 | Canonical protocol specifications |
| Research | 335 | Technical research and analysis |
| Code Samples | 586 | Working CKB code examples |
| Knowledge Base | Various | Ecosystem explainers, architecture articles |
| **Total** | **3,258** | **59MB of CKB-specific content** |

### Q&A Generation

Raw documents are processed into instruction-response pairs using a two-teacher approach:

- **Gemma 4 E4B** (4B parameter teacher) — fast generation, ~5,000 pairs
- **Qwen3.5-27B** (27B parameter teacher) — higher quality generation, ~4,000+ pairs

The 27B teacher produces richer, more detailed answers that capture nuances a 4B teacher misses. Both datasets are available for training — contributors can choose which to use based on their quality/speed preference.

### Ongoing Corpus Expansion

The training corpus is not static. We maintain automated crawlers that monitor:

- New RFCs and protocol updates
- GitHub repository changes across the nervosnetwork org
- Nervos Talk forum activity
- Ecosystem project documentation

Each quarter (or after significant protocol changes), the corpus is refreshed and models are retrained. Community contributors can participate in each training round.

---

## How to Participate

### Requirements

- **Hardware:** Apple Silicon Mac with 48GB+ unified memory (M2/M3/M4 Pro, Max, or Ultra)
- **Software:** Python 3.10+, MLX framework (installed via pip)
- **Time:** 6-16 hours of unattended compute (run overnight)
- **Trust:** Must be a verified community member (see Trust Model above)

### Getting Started

If you're interested in contributing, the process is:

1. **Express interest** on this Nervos Talk thread with your hardware specs
2. **Verification** — core team confirms your identity and community standing
3. **Onboarding** — you receive the training data, config, and a step-by-step guide
4. **Assignment** — you're assigned a specific model based on your hardware
5. **Training** — run the training command, let it complete
6. **Submission** — upload the adapter file to the designated repository
7. **Validation** — automated eval + manual review of your adapter
8. **Publication** — approved adapters are merged and published

### What You'll Need to Run

```bash
# One-time setup (~5 minutes)
pip install "mlx-lm[train]"

# Download assigned model + training data
# (links provided after verification)

# Train (~6-16 hours, runs in background)
mlx_lm.lora \
  --model mlx-community/<assigned-model> \
  --train \
  --data ./ckb-expert-training-data/ \
  --iters 600 \
  --batch-size 1 \
  --grad-checkpoint \
  --adapter-path ./my-adapter/

# When complete, share the my-adapter/ directory (~50MB)
```

That's it. Your Mac does the work overnight. You wake up to a trained CKB Expert adapter.

---

## Project Governance

### Core Team

The core team manages training data, validation pipeline, model merging, and publication:

- **Wyltek Industries** — project lead, infrastructure, training pipeline
- **[Open for Foundation/community representatives]**

### Decision Making

- Model architecture selection: core team based on benchmark results
- Training data inclusion: core team with community input
- Adapter approval: automated eval + core team manual review
- Publication: core team after validation
- Roadmap: community discussion on Nervos Talk

### Licensing

- **Training data:** Derived from open-source repositories and public documentation (respects original licenses)
- **Model weights:** Released under Apache 2.0 — free for commercial and non-commercial use
- **Training code:** MIT license

---

## Roadmap

### Phase 1: Foundation (Current — April 2026)
- [x] Corpus collection (3,258 files, 59MB)
- [x] Q&A pair generation (5,000+ pairs from Gemma 4, 4,000+ from Qwen3.5-27B)
- [x] Training pipeline validated on RTX 3060 Ti
- [ ] POC training run: 15 models on Gemma 4 dataset
- [ ] Eval results and model selection

### Phase 2: Community Pilot (May-June 2026)
- [ ] Recruit 3-5 verified contributors with suitable hardware
- [ ] MLX training guide and tooling
- [ ] First community training round
- [ ] Validation pipeline operational
- [ ] Publish initial model family to HuggingFace

### Phase 3: Deployment (July-August 2026)
- [ ] MCP server deployment (OpenAI-compatible API)
- [ ] Telegram bot with ckb-expert-fast
- [ ] VS Code / IDE extension prototype
- [ ] RKLLM export for Orange Pi edge deployment
- [ ] Browser widget via WebLLM

### Phase 4: Scale (Q4 2026)
- [ ] Expanded corpus (second generation crawl)
- [ ] Larger model training (70B with community M4 Ultra contributors)
- [ ] On-chain adapter attestation via Spore DOB
- [ ] Self-sustaining contribution pipeline
- [ ] Explore CKB-native incentive mechanisms

---

## FAQ

**Q: Why not just use RAG (Retrieval-Augmented Generation) like CKBGPT?**
A: RAG stuffs docs into a context window — the model doesn't actually learn anything. Fine-tuning embeds knowledge into the model's weights. The result: faster inference, no retrieval latency, works offline, and the model can reason about CKB concepts rather than just pattern-matching retrieved text. The ideal production system combines both — fine-tuned base + RAG for real-time data.

**Q: Will the model hallucinate?**
A: All language models can hallucinate. The fine-tuning significantly reduces hallucination on CKB topics because the model has seen correct answers thousands of times during training. Our eval suite catches hallucination on known questions. For critical decisions (smart contract security, financial logic), the model should augment human review, not replace it.

**Q: Can I contribute without a Mac?**
A: Yes — if you have an NVIDIA GPU with 8GB+ VRAM, you can train smaller models using our standard PyTorch/Unsloth pipeline. The Mac/MLX path is specifically highlighted because unified memory enables training larger models at lower cost. Both contributions are valued.

**Q: What if I only have a Mac with 16-32GB?**
A: You can still train the nano and fast tier models (0.6B-4B). These are the models that power the Telegram bot and browser widget — every tier matters.

**Q: How is this different from Nous Research's Psyche Network or Bittensor?**
A: Those are general-purpose decentralized training networks. We're focused specifically on CKB domain knowledge — a much more tractable problem. We don't need thousands of nodes or token incentives for phase 1. A handful of trusted community members with good hardware is enough to produce something valuable. The CKB-native attestation and potential incentive layer can come later as the project matures.

**Q: Is my training data private?**
A: The training data is derived from public sources (open-source repos, public docs, public forum posts). No private or proprietary data is included. The data file you receive is the same one every contributor receives.

---

## Get Involved

If you're interested in contributing, please reply to this thread with:

1. Your hardware (Mac model, memory, chip)
2. Your availability for a training run
3. Any relevant experience (ML, CKB development, etc.)

We'll reach out to verified members to begin the pilot phase.

---

*CKB Expert is a Wyltek Industries project, developed independently with community collaboration. This proposal is submitted for community discussion and does not represent an official Nervos Foundation initiative.*
