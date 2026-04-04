# CKB Knowledge Infrastructure: Enterprise Inference Platform Report

**Prepared:** April 2026
**Author:** Wyltek Industries Research
**Classification:** Internal / Partner Discussion

---

## Executive Summary

This report evaluates the feasibility of building a dedicated CKB (Common Knowledge Base) AI inference platform — a fine-tuned large language model trained exclusively on the Nervos CKB protocol, ecosystem documentation, and community knowledge, served globally via MCP (Model Context Protocol) and OpenAI-compatible APIs.

The platform would provide the blockchain community with an AI expert capable of:
- Explaining CKB protocol mechanics at any depth
- Generating and reviewing CKB Script code (lock scripts, type scripts)
- Analyzing transaction structures and cell models
- Advising on protocol design decisions
- Identifying optimization opportunities
- Cross-referencing RFCs and protocol specifications

**Key finding:** A $25,000 investment achieves a production-grade platform serving 50+ concurrent users with a 30B fine-tuned model. A $10,000 budget delivers a compelling MVP. Scale to $50K-$100K unlocks 70B+ models with quality approaching commercial frontier models on CKB-specific tasks.

---

## 1. The Opportunity

No CKB-specialized AI model exists today. Community members, developers, and researchers rely on general-purpose LLMs (ChatGPT, Claude) which:
- Hallucinate CKB-specific details (confuse cell model with UTXO, wrong RPC methods)
- Lack knowledge of recent protocol changes and RFCs
- Cannot generate valid CKB Script code
- Have no understanding of Fiber, Spore/DOB, or ecosystem tooling

A purpose-trained CKB model would be the authoritative AI resource for the entire Nervos ecosystem — analogous to how Solana has Sol-GPT or Ethereum has specialized coding assistants, but none exist for CKB.

### Training Data Advantage

Our current corpus (in progress):
- 51 CKB RFCs (canonical protocol specifications)
- 1,385 GitHub files from nervosnetwork repos (code, docs, issues, discussions)
- 494 Nervos Talk forum threads (community technical discussions)
- 165 docs.nervos.org pages + 59 legacy docs pages
- 335 research documents
- 586 code samples
- **Total: 3,258 files, 59MB of CKB-specific content**
- **Q&A pairs generated: 1,700+ (and growing)**

This corpus is irreplaceable — it represents the accumulated knowledge of the CKB ecosystem in a training-ready format.

---

## 2. Model Tiers & Capabilities

### What Each Model Size Can Realistically Do

| Model Size | CKB Knowledge | Code Generation | Protocol Analysis | Architecture Review |
|-----------|--------------|-----------------|-------------------|-------------------|
| **0.6-2B** | FAQ answers, terminology, quick lookups | No | No | No |
| **3-4B** | Solid explanations, tutorial-level answers | Basic snippets | Surface level | No |
| **7-8B** | Detailed technical answers, RFC cross-reference | Working code examples | Good | Basic |
| **14B** | Expert-level answers, nuanced understanding | Production-quality CKB Script code | Strong | Good |
| **27-32B** | Frontier CKB expert, multi-hop reasoning | Full smart contract generation | Excellent | Strong |
| **70B** | Approaching human expert level | Complex multi-file code generation | Comprehensive | Expert-level |

### Recommended Model Family

Based on our comparative analysis of 28 models across 6 families:

| Deployment Target | Recommended Model | Why |
|-------------------|------------------|-----|
| Edge/NPU (OPi 5+) | Qwen3-0.6B or 1.7B | RKLLM compatible, runs on 6 TOPS NPU |
| Telegram/Discord bot | SmolLM3-3B or Qwen3-4B | Fast inference, good FAQ answers |
| Developer assistant | Qwen3-14B or Qwen3.5-27B | Code generation + deep explanations |
| Protocol analysis | Qwen3.5-27B or DeepSeek-R1-32B | Multi-step reasoning, RFC cross-reference |
| Full platform (MCP) | Qwen3.5-27B (primary) + Qwen3-4B (fast) + Qwen3-0.6B (edge) | Tiered routing |

---

## 3. Infrastructure Tiers

### Tier 1: $10,000 USD — Community MVP

**Hardware:**
- 2x RTX 4090 24GB (used, ~$2,200 each)
- AMD Ryzen 9 7950X, 128GB DDR5
- 2TB NVMe storage
- **Total VRAM: 48GB**

**What this serves:**
- Primary model: Qwen3-14B fine-tuned on CKB data (10GB VRAM, fits one GPU)
- Secondary model: Qwen3-4B for fast queries (3GB, fits alongside)
- Edge export: GGUF + RKLLM for OPi 5+ deployment
- **Concurrent users: 15-25** for chat-style queries
- **Inference speed: ~40 tok/s** on 14B model
- **Latency: <200ms TTFT**

**What this trains:**
- QLoRA fine-tune up to 14B models: 3-6 hours
- QLoRA 30B MoE with CPU offload: overnight
- Full fine-tune 7B: possible across 2 GPUs

**Capabilities delivered:**
- Accurate CKB concept explanations
- Basic CKB Script code generation
- RFC lookup and summarization
- Ecosystem project knowledge
- Telegram/Discord bot deployment
- MCP server for developer tooling integration

**Monthly operating cost:** ~$50-80 (electricity at 500-700W average)

---

### Tier 2: $25,000 USD — Production Platform

**Hardware:**
- 2x RTX 5090 32GB ($3,900 each) OR 1x A100 80GB (used, ~$13,000)
- AMD EPYC 9354 32-core, 256GB DDR5 ECC
- 4TB NVMe RAID
- 25GbE networking
- **Total VRAM: 64GB (5090s) or 80GB (A100)**

**What this serves:**
- Primary model: Qwen3.5-27B fine-tuned (18GB, fits one GPU)
- Secondary: Qwen3-8B for medium queries
- Fast tier: Qwen3-4B for FAQ
- **Can run all three simultaneously** on 64GB VRAM
- **Concurrent users: 30-50** across all tiers
- **Inference speed: ~25 tok/s** on 27B model, ~80 tok/s on 8B
- **Latency: <150ms TTFT** for primary model

**What this trains:**
- QLoRA 27B-32B: 4-8 hours
- QLoRA 70B: possible on A100 80GB (tight)
- Full fine-tune 14B: feasible
- Continued pretraining 7B on raw CKB corpus

**Capabilities delivered:**
Everything in Tier 1, plus:
- Production-quality CKB Script code generation
- Multi-step protocol analysis and reasoning
- Smart contract audit assistance
- Architecture review and recommendations
- Cross-RFC analysis (e.g., "how does RFC 0037 affect DAO deposits?")
- Ecosystem-wide dependency analysis
- Global API serving with acceptable latency

**Monthly operating cost:** ~$100-150 (electricity at 1.0-1.5kW average)

---

### Tier 3: $50,000 USD — Enterprise Grade

**Hardware:**
- 2x A100 80GB SXM (used/refurbished, ~$14,000 each) with NVLink
- Dual AMD EPYC 9354, 512GB DDR5 ECC
- 8TB NVMe RAID
- 100GbE networking
- **Total VRAM: 160GB with NVLink interconnect**

**What this serves:**
- Primary model: 70B fine-tuned (FP16, runs natively across 2x A100)
- Full model family simultaneously: 70B + 27B + 8B + 4B
- **Concurrent users: 50-100** on 70B model
- **Inference speed: ~50 tok/s** on 70B (vLLM, FP8)
- **Throughput: ~1,850 tok/s** at 50 concurrent requests
- **Latency: <120ms TTFT** at moderate load

**What this trains:**
- QLoRA 70B: 8-16 hours
- LoRA 70B: feasible
- Full fine-tune 14B-30B
- Continued pretraining 7B-14B on full raw corpus
- Hyperparameter search across model variants

**Capabilities delivered:**
Everything in Tier 2, plus:
- Near-human-expert level CKB protocol knowledge
- Complex multi-file smart contract generation
- Full protocol design reviews
- Optimization recommendations with reasoning
- Multi-language code generation (Rust, C, JS/TS, Go) for CKB
- Long-context analysis (128K tokens = multiple RFCs simultaneously)
- Production-grade SLA (redundancy, monitoring, auto-scaling)

**Monthly operating cost:** ~$200-300 (electricity at 2.0-3.0kW average)

---

### Tier 4: $100,000 USD — Frontier Platform

**Hardware:**
- 4x H100 80GB PCIe ($25,000 each) OR refurbished DGX A100 (8x A100 80GB, ~$85,000)
- Dual AMD EPYC 9654 96-core, 1TB DDR5 ECC
- 16TB NVMe array
- InfiniBand + 100GbE
- **Total VRAM: 320GB (4x H100) or 640GB (DGX A100)**

**What this serves:**
- Primary model: 70B+ fine-tuned at FP16 with maximum quality
- Multiple 70B models for A/B testing
- Experimental 140B+ models with quantization
- **Concurrent users: 100-300+**
- **Inference speed: ~130 tok/s** per H100 on 70B
- **Aggregate throughput: ~2,780 tok/s** at 100 concurrent
- **Latency: <100ms TTFT** with disaggregated serving

**What this trains:**
- Full fine-tune 70B: days (feasible)
- Continued pretraining 30B-70B on custom corpus
- QLoRA on 140B+ models
- Multi-run hyperparameter optimization
- Reinforcement learning from human feedback (RLHF)

**Capabilities delivered:**
Everything in Tier 3, plus:
- Frontier-quality CKB protocol AI
- Full-stack smart contract development assistance
- Protocol specification drafting
- Security audit automation
- Community-scale serving (hundreds of concurrent developers)
- Research-grade model experimentation
- Potential to offer as a paid API service

**Monthly operating cost:** ~$400-600 (electricity at 4-6kW average)

---

## 4. MCP Service Architecture

### Global Serving Model

```
                    ┌──────────────┐
                    │  Cloudflare  │
                    │  DNS + Edge  │
                    └──────┬───────┘
                           │
                    ┌──────┴───────┐
                    │  API Gateway │
                    │  (Auth, Rate │
                    │   Limiting)  │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
        ┌─────┴─────┐ ┌───┴───┐ ┌─────┴─────┐
        │  vLLM /   │ │ vLLM  │ │  rkllama  │
        │  SGLang   │ │       │ │  (edge)   │
        │  70B/27B  │ │ 4B/8B │ │  0.6-2B   │
        │  Primary  │ │ Fast  │ │  OPi 5+   │
        └───────────┘ └───────┘ └───────────┘
```

### API Design (OpenAI-compatible + MCP)

```
POST /v1/chat/completions
  model: "ckb-expert"     → routes to 27B/70B
  model: "ckb-fast"       → routes to 4B/8B
  model: "ckb-code"       → routes to code-specialized model
  model: "ckb-auto"       → auto-routes based on query complexity

MCP Tools:
  ask_ckb(question)       → general CKB knowledge
  explain_rfc(rfc_number) → RFC deep dive
  review_script(code)     → CKB Script code review
  analyze_tx(tx_hash)     → transaction analysis
  design_protocol(spec)   → protocol design assistance
```

### Pricing Model (if commercialized)

| Tier | Price | Includes |
|------|-------|----------|
| Free | $0/month | 100 queries/day, ckb-fast only |
| Developer | $20/month | 1,000 queries/day, all models, MCP access |
| Team | $100/month | 10,000 queries/day, priority routing, SLA |
| Enterprise | Custom | Dedicated capacity, custom fine-tuning, on-prem option |

### Cost Per Query (Self-Hosted)

| Model | Cost per 1K tokens | Cost per typical query (~500 tok) |
|-------|-------------------|----------------------------------|
| ckb-nano (0.6B) | ~$0.001 | ~$0.0005 |
| ckb-fast (4B) | ~$0.005 | ~$0.0025 |
| ckb-expert (27B) | ~$0.02 | ~$0.01 |
| ckb-scout (70B) | ~$0.05 | ~$0.025 |

At $25K infrastructure cost, serving 50,000 queries/day at an average of $0.01/query = $500/day revenue potential. **Break-even in 50 days** at full utilization.

---

## 5. Expected Model Capabilities by Investment

### $10K Investment — What the Model Can Do

**Reliable (90%+ accuracy):**
- Explain CKB cell model, lock scripts, type scripts
- Describe Nervos DAO mechanics
- Explain Fiber Network payment channels
- Answer testnet/mainnet configuration questions
- Explain JoyID authentication flow
- Describe Eaglesong mining algorithm
- Summarize any specific RFC

**Usable (70-85% accuracy):**
- Generate basic CKB Script boilerplate code
- Suggest transaction structure for common operations
- Explain cross-RFC interactions
- Describe Spore/DOB protocol patterns
- Basic smart contract review (flag obvious issues)

**Unreliable at this tier:**
- Complex multi-step protocol design
- Novel smart contract architecture
- Optimization recommendations
- Security audit-level code review

---

### $25K Investment — What the Model Can Do

**Reliable (90%+ accuracy):**
Everything from $10K tier, plus:
- Generate working CKB Script code (Rust, C)
- Build transaction structures programmatically
- Cross-reference multiple RFCs in answers
- Explain cell capacity calculations
- Generate Lumos/SDK code for common operations
- Explain ecosystem project architecture (Fiber, RGB++, Spore)

**Usable (70-85% accuracy):**
- Protocol design review and suggestions
- Smart contract optimization recommendations
- Migration guide generation (e.g., CKB2021 changes)
- Code review for type/lock script correctness
- Generate test cases for CKB scripts

**Emerging capabilities:**
- Multi-step reasoning about protocol security
- Architecture comparison (CKB vs Ethereum patterns)
- Novel pattern suggestion based on cell model properties

---

### $50K Investment — What the Model Can Do

**Reliable (90%+ accuracy):**
Everything from $25K tier, plus:
- Complex multi-file smart contract generation
- Protocol design from specification
- Comprehensive code review with security focus
- Performance optimization of CKB scripts
- Full transaction lifecycle debugging
- Cross-chain interaction pattern design

**Usable (70-85% accuracy):**
- Novel protocol mechanism design
- Security audit automation (common vulnerability classes)
- Ecosystem-wide architectural review
- Long-context codebase analysis (entire repos)
- RFC drafting assistance

---

### $100K Investment — What the Model Can Do

**Reliable (90%+ accuracy):**
Everything from $50K tier, plus:
- Approaching human core-developer level for CKB protocol questions
- Full smart contract development from specification to deployment
- Comprehensive security audit with detailed reasoning
- Protocol specification review and improvement suggestions
- Automated test generation covering edge cases

**Frontier capabilities:**
- Novel CKB primitive discovery (finding patterns the community hasn't explored)
- Cross-ecosystem analysis (how CKB patterns compare to other L1s)
- Research-grade protocol analysis
- Potential for autonomous code contribution to CKB repos

---

## 6. Benchmark Resources for Ongoing Evaluation

| Resource | URL | What to Track |
|----------|-----|---------------|
| InferenceX (SemiAnalysis) | inferencex.semianalysis.com | GPU inference perf updates |
| Artificial Analysis | artificialanalysis.ai | Model quality vs cost rankings |
| LMArena | lmarena.ai | Human preference Elo rankings |
| Open LLM Leaderboard | huggingface.co/spaces/open-llm-leaderboard | Base model benchmarks |
| LiveBench | livebench.ai | Contamination-free benchmarks |
| SWE-bench | swebench.com | Coding task benchmarks |

---

## 7. Recommendations

### Immediate (April 2026)
1. **Complete POC on current hardware** (3060 Ti 8GB) — validates training pipeline and data quality
2. **Acquire RX 7900 XTX** ($1,229 AUD) — 3x VRAM, enables 14B-27B training and fast inference
3. **Deploy self-hosted Firecrawl** on NucBox — unlimited corpus expansion

### Short-term (Q2 2026)
4. **Train winner models** on RX 7900 XTX with expanded corpus
5. **Deploy MCP server** on existing infrastructure (NucBox + driveThree)
6. **Launch Telegram bot** with 4B model as public CKB knowledge resource
7. **RKLLM export** to OPi 5+ for edge deployment proof-of-concept

### Medium-term (Q3-Q4 2026)
8. **Evaluate community adoption** and query patterns
9. **If demand warrants:** invest $25K in dedicated inference server (2x RTX 5090 or 1x A100 80GB)
10. **Expand to 27B-70B models** with larger training corpus
11. **Launch developer API** with MCP integration for IDE plugins

### Long-term (2027+)
12. **Scale based on adoption:** $50K-$100K infrastructure if community/enterprise demand materializes
13. **Continuous retraining** as CKB protocol evolves (new RFCs, hard forks)
14. **Potential revenue model:** Developer API subscription, enterprise licensing
15. **Research collaboration:** Partner with Nervos Foundation for official endorsement and expanded training data

---

## 8. Risk Factors

| Risk | Mitigation |
|------|------------|
| Model hallucination on critical protocol details | Eval suite of 10+ CKB-specific questions, regular testing against known-correct answers |
| Protocol changes invalidate training data | Automated corpus refresh pipeline, retrain on new RFC additions |
| Low community adoption | Start with free tier, demonstrate value through Telegram bot and social media |
| Hardware depreciation | Cloud bursting for peak load, only buy hardware for baseline capacity |
| ROCm software compatibility (AMD path) | Maintain CUDA fallback, test training stack before hardware purchase |
| Competitor launches similar product | First-mover advantage with most comprehensive CKB training corpus |

---

*This report represents a feasibility analysis based on current market conditions as of April 2026. Hardware prices, model capabilities, and framework performance are subject to rapid change in the AI industry. Recommendations should be re-evaluated quarterly.*
