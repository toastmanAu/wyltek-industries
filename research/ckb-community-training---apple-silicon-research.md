# Apple Silicon Community LLM Fine-Tuning: Research Report

**Date:** 2026-04-03
**Purpose:** Feasibility analysis for a Nervos CKB community collaborative fine-tuning initiative using Apple Silicon Macs
**Status:** Research complete - ready for proposal drafting

---

## Table of Contents

1. [MLX Framework Capabilities](#1-mlx-framework-capabilities)
2. [Apple Silicon Hardware Comparison](#2-apple-silicon-hardware-comparison)
3. [Distributed & Community Training Approaches](#3-distributed--community-training-approaches)
4. [MLX vs PyTorch/CUDA Comparison](#4-mlx-vs-pytorchcuda-comparison)
5. [Practical Community Workflow](#5-practical-community-workflow)
6. [Existing Projects & Precedents](#6-existing-projects--precedents)
7. [Feasibility Assessment for Nervos CKB](#7-feasibility-assessment-for-nervos-ckb)

---

## 1. MLX Framework Capabilities

### Overview

MLX (v0.31.1, March 2026) is Apple's open-source array framework purpose-built for Apple Silicon ML workloads. The companion `mlx-lm` package provides turnkey LLM fine-tuning via LoRA, QLoRA, DoRA, and full fine-tuning.

### Supported Fine-Tuning Methods

| Method | Description | Memory Savings |
|--------|-------------|----------------|
| **LoRA** (default) | Low-rank adaptation, trains r x (d+k) instead of d x k | ~99% parameter reduction |
| **QLoRA** | LoRA on 4-bit NF4-quantized base model | ~50% less RAM than LoRA |
| **DoRA** | Weight-decomposed low-rank adaptation | Similar to LoRA with improved quality |
| **Full** | Full weight fine-tuning (all parameters trainable) | None - requires full model in memory |

### Supported Model Architectures (40+)

MLX-LM supports automatic architecture detection for 40+ model families:

- **Core:** Llama (3/3.1/3.2/3.3/4), Qwen (2/2.5/3/3.5), Mistral, Mixtral, Gemma (2/3)
- **MoE:** DeepSeek V2/V3/R1, Mixtral, DBRX
- **Others:** Phi-3/4, GLM-4, Mamba, RecurrentGemma, OLMo, MiniCPM, InternLM2, CodeLlama, Yi, ChatGLM, Nemotron, Codestral, XVERSE, Step, Kimi
- **Multimodal:** Gemma3n (with AltUp/Laurel), vision-language models

Architecture aliases are handled automatically (e.g., Mistral uses Llama architecture internally).

### Training Commands & Configuration

```bash
# Install
pip install "mlx-lm[train]"

# Basic LoRA fine-tuning
mlx_lm.lora --model mlx-community/Qwen2.5-7B-4bit --train --data ./data --iters 600

# QLoRA (automatic when using quantized model)
mlx_lm.lora --model mlx-community/Qwen2.5-7B-4bit --train --data ./data

# Key optimization flags
mlx_lm.lora --model <model> --train --data <path> \
  --batch-size 1 \
  --num-layers 4 \
  --grad-accumulation-steps 8 \
  --grad-checkpoint \
  --mask-prompt \
  --resume-adapter-file adapters/

# Fuse adapter into base model
mlx_lm.fuse --model <base> --adapter-path adapters/ --upload-repo <hf-repo>

# Generate with adapter
mlx_lm.generate --model <base> --adapter-path adapters/ --prompt "..."
```

### Data Format Support

- **Chat:** Messages with role/content pairs (system/user/assistant)
- **Tools:** Chat format with function calling
- **Completions:** Prompt/completion pairs
- **Text:** Raw text sequences
- Accepts local JSONL files or Hugging Face datasets

### Export Formats

| Format | Support | Notes |
|--------|---------|-------|
| **Safetensors** | Native | Default MLX output, sharded weight files |
| **GGUF** | Limited | Only Mistral, Mixtral, Llama in fp16 via `mlx_lm.fuse` then llama.cpp conversion |
| **HuggingFace Hub** | Direct | `mlx_lm.fuse --upload-repo <repo>` |

**Typical workflow:** MLX training -> safetensors adapters -> fuse with base -> convert to GGUF via llama.cpp's `convert_hf_to_gguf.py` for broader compatibility.

### Serving (mlx_lm.server)

- OpenAI-compatible chat completions API
- Streaming and complete response modes
- Configurable batch sizes for prefill and completion
- Supports loading LoRA adapters at inference time
- Not recommended for production (basic security only)
- Alternative: `vllm-mlx` for production serving with continuous batching, 400+ tok/s

### Experiment Tracking

- Weights & Biases: `--report-to wandb`
- SwanLab: `--report-to swanlab`

### Training Speed Benchmarks

| Hardware | Model | Method | Speed | Memory |
|----------|-------|--------|-------|--------|
| M1 Max 32GB | Mistral-7B-v0.1 | LoRA | ~250 tok/s | ~14GB |
| M2 MacBook Pro 16GB | Mistral-7B | QLoRA | ~40 tok/s (inference) | ~7GB |
| M1 Max 32GB | Llama-7B | LoRA | ~200 tok/s | ~14GB |
| M1 Max 32GB | Llama-7B | QLoRA | ~150 tok/s | ~7GB |
| M1 Max 32GB | Mistral-7B | QLoRA | ~175 tok/s | ~6GB |

**Note:** Training benchmarks are scarce compared to inference benchmarks. Most published numbers are inference tok/s, not training tok/s. Training throughput is typically 3-10x lower than inference throughput.

---

## 2. Apple Silicon Hardware Comparison

### Chip Specifications

#### Base Chips (Entry Level)

| Chip | Year | CPU Cores | GPU Cores | Neural Engine | Memory BW | Max RAM | NE TOPS |
|------|------|-----------|-----------|---------------|-----------|---------|---------|
| M1 | 2020 | 8 | 8 | 16-core | 68.2 GB/s | 16 GB | 11 |
| M2 | 2022 | 8 | 10 | 16-core | 100 GB/s | 24 GB | 15.8 |
| M3 | 2023 | 8 | 10 | 16-core | 100 GB/s | 24 GB | 18 |
| M4 | 2024 | 10 | 10 | 16-core | 120 GB/s | 32 GB | 38 |
| M5 | 2026 | 10+ | 10+ | 16-core+ | 153 GB/s | 32 GB | >45 (est.) |

#### Pro Chips

| Chip | CPU Cores | GPU Cores | Memory BW | Max RAM | NE TOPS |
|------|-----------|-----------|-----------|---------|---------|
| M1 Pro | 10 | 16 | 200 GB/s | 32 GB | 11 |
| M2 Pro | 12 | 19 | 200 GB/s | 32 GB | 15.8 |
| M3 Pro | 12 | 18 | 150 GB/s | 36 GB | 18 |
| M4 Pro | 14 | 20 | 273 GB/s | 64 GB | 38 |
| M5 Pro | 14 | 20 | ~280+ GB/s | 64 GB | >45 (est.) |

#### Max Chips

| Chip | CPU Cores | GPU Cores | Memory BW | Max RAM | NE TOPS |
|------|-----------|-----------|-----------|---------|---------|
| M1 Max | 10 | 32 | 400 GB/s | 64 GB | 11 |
| M2 Max | 12 | 38 | 400 GB/s | 96 GB | 15.8 |
| M3 Max | 16 | 40 | 400 GB/s | 128 GB | 18 |
| M4 Max (32-core GPU) | 14 | 32 | 410 GB/s | 64 GB | 38 |
| M4 Max (40-core GPU) | 16 | 40 | 546 GB/s | 128 GB | 38 |

#### Ultra Chips (Two Max dies fused via UltraFusion)

| Chip | CPU Cores | GPU Cores | Memory BW | Max RAM | NE TOPS |
|------|-----------|-----------|-----------|---------|---------|
| M1 Ultra | 20 | 64 | 800 GB/s | 128 GB | 22 |
| M2 Ultra | 24 | 76 | 800 GB/s | 192 GB | 31.6 |
| M3 Ultra | 32 | 80 | 819 GB/s | 256 GB | 36 |
| M4 Ultra | Not released (may not ship) | - | - | - | - |

**Critical insight for LLM training:** Memory bandwidth is the dominant performance factor. An M3 Max (400 GB/s) will train faster than an M4 Pro (273 GB/s) despite being an older chip. The 40-core M4 Max (546 GB/s) is the current sweet spot for consumer training.

### M5 GPU Neural Accelerators (New for 2026)

Apple's M5 introduced dedicated Neural Accelerators inside every GPU core, yielding:
- **3.3-4.1x faster time-to-first-token** vs M4 (compute-bound improvement)
- **19-27% faster token generation** vs M4 (memory-bandwidth-bound improvement)
- New Metal 4 TensorOps and Metal Performance Primitives
- A MacBook Pro M5 with 24GB can handle 8B models in BF16 or 30B MoE quantized models

### Current Mac Pricing (April 2026)

| Machine | Chip | RAM | Price (USD) | Best For |
|---------|------|-----|-------------|----------|
| Mac Mini M4 | M4 | 16 GB | $599 | Budget entry, small model inference |
| Mac Mini M4 | M4 | 32 GB | ~$799 | Small model QLoRA (7B) |
| Mac Mini M4 Pro | M4 Pro | 24 GB | $1,399 | 7B-13B QLoRA training |
| Mac Mini M4 Pro | M4 Pro | 64 GB | ~$2,000 | 13B-30B QLoRA training |
| MacBook Pro 14" M4 Pro | M4 Pro | 48 GB | ~$2,800 | Portable training node |
| MacBook Pro 16" M4 Max | M4 Max | 64 GB | ~$3,500 | Serious training, 30B+ models |
| MacBook Pro 16" M4 Max | M4 Max | 128 GB | ~$4,300 | 70B QLoRA training |
| Mac Studio M4 Max (base) | M4 Max 32-core | 36 GB | $1,999 | Training workhorse |
| Mac Studio M4 Max (40-core) | M4 Max 40-core | 128 GB | $3,699 | Best price/performance for training |
| Mac Studio M3 Ultra | M3 Ultra | 96 GB | $3,999 | Large model training |
| Mac Studio M3 Ultra | M3 Ultra | 256 GB | ~$6,000+ | 70B+ full-precision models |

**Best value for community training nodes:**
- **Budget:** Mac Mini M4 Pro 64GB (~$2,000) - 273 GB/s bandwidth, can QLoRA 13B-30B
- **Sweet spot:** Mac Studio M4 Max 128GB ($3,699) - 546 GB/s bandwidth, can QLoRA up to 70B
- **Maximum:** Mac Studio M3 Ultra 256GB (~$6,000+) - 819 GB/s bandwidth, largest model capacity

### Memory Requirements for QLoRA Fine-Tuning

| Model Size | QLoRA (4-bit) RAM | Minimum Mac |
|------------|-------------------|-------------|
| 3B | ~3 GB | Any M-series (8GB+) |
| 7B | ~6-7 GB | M-series 16GB |
| 13B | ~10-12 GB | M-series 24GB |
| 30B (dense) | ~20-24 GB | M4 Pro 48GB or M4 Max 36GB |
| 30B (MoE, e.g. Mixtral) | ~16-18 GB | M4 Pro 24GB |
| 70B | ~40-46 GB | M4 Pro 64GB or M4 Max 64GB |

---

## 3. Distributed & Community Training Approaches

### 3.1 Can LoRA Adapters Be Trained Independently and Merged?

**Yes.** This is the most practical approach for community training. Multiple strategies exist:

| Merge Strategy | How It Works | Quality |
|----------------|-------------|---------|
| **Linear merge** | Weighted average of adapter parameters | Good for similar tasks |
| **TIES merge** | Subtracts base weights, sparsifies, sign-based consensus | Better for diverse adapters |
| **DARE merge** | Random dropout of delta parameters before merging | Good interference reduction |
| **SVD-based** | Reconstructs new LoRA from principal components | Best for federated settings |
| **LoRAHub** | Learns optimal mixing coefficients | Requires validation set |
| **Retrieval-weighted fusion** | Dynamic merge using similarity retrieval from vector DB | Best for multi-task |

**Key tools for merging:**
- `mlx_lm.fuse` - Merge adapter into base model
- `mergekit` - General-purpose model merge toolkit
- `peft` (HuggingFace) - LoRA adapter merging utilities
- `AdapterHub` - Adapter composition and merging library
- Custom scripts using SVD aggregation (as in FedMomentum)

### 3.2 Federated Fine-Tuning Approaches

#### BlossomTuneLLM-MLX (Flower + MLX)

The most directly relevant project for our use case:

- **Framework:** Flower (flower.ai) + MLX-LM
- **How it works:** Central server (Superlink) coordinates training rounds. Each client (Supernode) trains LoRA/DoRA adapters locally on private data, sends only adapter weight updates to server for aggregation.
- **Two modes:** Single-machine simulation or multi-machine federated
- **Privacy:** Raw data never leaves participant devices
- **No Docker required** - native macOS execution
- **Setup:**
  ```bash
  # Server
  flower-superlink --insecure

  # Client (each Mac)
  flower-supernode --superlink <server-ip>:9092 --partition-id <N>

  # Run
  flwr run . local-deployment
  ```

#### FedMomentum (2026 Research)

- Server distributes backbone model + initialized LoRA modules to all clients
- Each client trains on own dataset, uploads updated weights
- Server performs SVD-based aggregation, reconstructing new LoRA modules from principal components
- Clients merge residuals into the backbone
- Preserves training momentum across rounds

#### Federated Sketching LoRA (FeSLoRA)

- Clients selectively update subsets of LoRA columns/rows each round
- Reduces computation and communication costs
- Handles heterogeneous hardware (different Mac capabilities)

### 3.3 MLX Native Distributed Training

MLX v0.31.1 has built-in distributed communication:

**Backends:**
| Backend | Transport | Requirements | Best For |
|---------|-----------|-------------|----------|
| **Ring** | TCP sockets | None (always available) | LAN or internet training |
| **MPI** | MPI library | MPICH/OpenMPI install | HPC-style setups |
| **JACCL** | RDMA over Thunderbolt 5 | macOS 26.2+, TB5 cable | Directly connected Macs (lowest latency) |
| **NCCL** | NVIDIA GPUs | CUDA environment | Not relevant for Apple Silicon |

**Communication primitives:** `all_sum()`, `all_gather()`, `send()`, `recv()`

**Launch:**
```bash
# Local multi-process
mlx.launch -n 4 my_script.py

# Multi-machine via SSH
mlx.launch --hosts mac1.local,mac2.local,mac3.local my_script.py
```

**JACCL (Thunderbolt 5):** Achieves communication latency an order of magnitude lower than Ring backend. Requires macOS 26.2+ and fully-connected mesh topology. Ideal for co-located Mac cluster.

### 3.4 EXO + DiLoCo (Decentralized Training)

EXO Labs has implemented DiLoCo (Distributed Low-Communication Training) on Apple Silicon:

- **Key insight:** Instead of synchronizing after every step (DDP), each device trains independently for H steps (e.g., 500) before syncing
- **Bandwidth reduction:** 100-1000x less than traditional DDP
- **Performance example** (7B model, 1000 batches):
  - Single GPU: 1,000 minutes
  - 2 GPUs (data center DDP): 505 minutes
  - 2 GPUs (internet DDP): 10,500 minutes (bandwidth bottleneck)
  - 2 GPUs (DiLoCo H=500): 520 minutes (internet viable!)
- **Bandwidth math:** 7B model in float16 = ~14GB. At 100 Mbps home internet, sync takes ~20 minutes. With H=500, you only sync twice in 1,000 batches.
- Open-source DiLoCo simulator available for experimentation

### 3.5 Ensuring Consistent Training

For community contributors to produce compatible adapters:

1. **Shared configuration file:** YAML/JSON with all hyperparameters (learning rate, batch size, LoRA rank, alpha, target modules, number of layers)
2. **Pinned base model:** Exact HuggingFace model ID + revision hash
3. **Deterministic seed:** Fixed random seed for reproducibility
4. **Data format specification:** Standardized JSONL schema with train/valid/test splits
5. **Validation checkpoints:** Required evaluation on shared validation set at fixed intervals
6. **Hash verification:** SHA-256 checksums on training data files
7. **Adapter naming convention:** Include base model, data version, hyperparameter hash

---

## 4. MLX vs PyTorch/CUDA Comparison

### Training Speed

| Aspect | MLX on Apple Silicon | PyTorch on CUDA | Gap |
|--------|---------------------|-----------------|-----|
| Raw training throughput | 1x (baseline) | ~2-3x faster | CUDA wins |
| Token generation (inference) | MLX 20-87% faster for <14B | - | MLX wins for small models |
| Memory transfer overhead | Zero (unified memory) | PCIe bottleneck | MLX advantage |
| Epoch time (benchmarked) | 21-27 seconds | 10-14 seconds | ~2x CUDA advantage |

**Context:** PyTorch MPS (Metal Performance Shaders) on Apple Silicon is actually faster than MLX for some training workloads (10-14s vs 21-27s per epoch in one benchmark), but MLX is catching up and offers a more native, simpler API.

### Feature Comparison

| Feature | MLX | PyTorch/CUDA |
|---------|-----|-------------|
| LoRA/QLoRA/DoRA | Full support | Full support (via PEFT) |
| Mixed precision (AMP) | Limited FP16 support | Mature AMP |
| Flash Attention | Supported | Supported (FlashAttention-2/3) |
| Gradient checkpointing | Supported | Supported |
| FSDP (Fully Sharded Data Parallel) | Basic (via mlx.distributed) | Mature |
| DeepSpeed | Not available | Full support |
| Quantization-aware training | Limited | Extensive |
| Distributed training | Ring/MPI/JACCL | NCCL (highly optimized) |
| Model architectures | 40+ | Near-universal |
| Profiling tools | Basic | CUDA profiler, Nsight |
| Ecosystem maturity | Growing rapidly | Dominant, mature |

### Gotchas and Limitations

1. **No CUDA backend parity:** MLX CUDA backend exists but has missing operations; primarily for Apple Silicon
2. **Mixed precision:** FP16 AMP support is less mature than CUDA's
3. **Some CUDA-optimized libraries have no MLX equivalent** (e.g., certain kernel fusions)
4. **Training is 2-3x slower** than equivalent CUDA hardware for raw throughput
5. **Profiling tools are basic** compared to NVIDIA's ecosystem
6. **GGUF export limited** to Mistral/Mixtral/Llama families in fp16
7. **Unified memory advantage:** Eliminates CPU-GPU transfer overhead, partially offsetting raw speed gap

### When MLX Makes Sense

- Already own Apple Silicon hardware (no additional GPU cost)
- Privacy-sensitive data that cannot go to cloud
- Inference-heavy workloads (MLX excels here)
- Small-to-medium models (7B-30B) with QLoRA
- Community/federated scenarios where many participants have Macs
- Development and prototyping before scaling to CUDA

---

## 5. Practical Community Workflow

### 5.1 Files to Share

| File | Size | Purpose |
|------|------|---------|
| Training data (JSONL) | Varies (typically 10-500 MB) | Shared dataset for all contributors |
| Config YAML | <1 KB | Hyperparameters, model ID, LoRA settings |
| Validation set | 1-10 MB | Quality control benchmark |
| LoRA adapter weights | **10-100 MB** (see below) | Trained adapter output |
| Training logs | <1 MB | Metrics for quality verification |
| Eval results | <1 MB | Benchmark scores on shared test set |

### 5.2 LoRA Adapter Sizes

Adapter size depends on LoRA rank (r), number of adapted layers, and model dimensions:

| Base Model Size | LoRA Rank | Typical Adapter Size |
|-----------------|-----------|---------------------|
| 3B | r=8 | ~5-15 MB |
| 7B | r=8 | ~10-30 MB |
| 7B | r=16 | ~20-60 MB |
| 13B | r=8 | ~20-50 MB |
| 13B | r=16 | ~40-100 MB |
| 30B | r=8 | ~40-80 MB |
| 70B | r=8 | ~80-160 MB |
| 70B | r=16 | ~160-300 MB |

**Key point:** Even for 70B models, adapter files are measured in megabytes, not gigabytes. This makes them trivially shareable and storable, even on-chain (if desired as hashes/pointers).

### 5.3 How to Merge Adapters from Different Contributors

**Option A: Sequential application**
```python
# Load base model, apply adapters one at a time
model = load("base-model")
model = apply_lora(model, "adapter-domain-knowledge")
model = apply_lora(model, "adapter-code-understanding")
```

**Option B: Weight averaging**
```python
# Average adapter weights
merged = {}
for key in adapter_keys:
    merged[key] = sum(adapters[i][key] * weight[i] for i in range(n)) / sum(weights)
```

**Option C: TIES/DARE merge (recommended for diverse adapters)**
```python
# Using mergekit or custom implementation
# 1. Subtract base model weights from each adapter
# 2. Sparsify (trim small deltas)
# 3. Resolve sign conflicts via majority vote
# 4. Merge surviving parameters
```

**Option D: Federated aggregation (FedAvg)**
```python
# Server-side after each training round
global_adapter = federated_average([client_adapters], weights=[dataset_sizes])
```

### 5.4 Quality Control

| Check | Method | Threshold |
|-------|--------|-----------|
| Loss convergence | Training loss curve must decrease | Final loss < initial loss * 0.3 |
| Validation perplexity | Eval on shared validation set | Must beat base model perplexity |
| Task-specific benchmark | Domain-specific Q&A accuracy | >70% accuracy on CKB test set |
| Toxicity/safety | Automated safety eval | 0 critical failures |
| Adapter weight stats | Check for NaN, extreme values | No NaN, weights within 3 std dev |
| Reproducibility | Same data + config = similar results | Loss within 5% of reference run |

### 5.5 Security Considerations

**Risks are real and documented:**

1. **Backdoor injection:** A malicious LoRA adapter can contain hidden triggers that survive merging with other adapters. Research shows "LoRA once, backdoor every" - a backdoor-infected LoRA can be merged with multiple clean adapters while retaining malicious capabilities.

2. **Weight poisoning:** Adapter weights can contain patterns that cause specific harmful outputs when triggered by particular inputs, while behaving normally on standard benchmarks.

3. **Supply chain attacks:** LoRA adapters downloaded from untrusted sources can contain hidden malicious code that executes when loaded.

**Mitigations for community training:**

| Mitigation | Implementation |
|------------|---------------|
| **Trusted contributor list** | Require CKB wallet signature to submit adapters |
| **Automated safety eval** | Run safety benchmarks on every submitted adapter |
| **Weight anomaly detection** | Statistical analysis of adapter weights (detect outliers) |
| **Canary inputs** | Test with known-tricky prompts to detect backdoors |
| **Reproducibility verification** | Rerun training on subset of data, compare weights |
| **Gradual integration** | Merge and test adapters incrementally, not all at once |
| **On-chain attestation** | Hash adapter weights + training config on CKB for auditability |
| **Sandboxed evaluation** | Test merged models in isolated environment before deployment |

---

## 6. Existing Projects & Precedents

### 6.1 BlossomTuneLLM-MLX

- **What:** Federated LLM fine-tuning on Apple Silicon using Flower + MLX
- **Status:** Proof of concept, MIT licensed, small community
- **Relevance:** Directly applicable - shows Flower + MLX + LoRA working across multiple Macs
- **Limitation:** No published benchmarks or quality metrics
- **URL:** https://github.com/ethicalabs-ai/BlossomTuneLLM-MLX

### 6.2 EXO (Distributed Inference + Training)

- **What:** Distributed AI framework, supports inference across heterogeneous devices
- **Training:** DiLoCo implementation for decentralized training on Apple Silicon
- **Key achievement:** 100-1000x bandwidth reduction vs DDP, making internet training viable
- **Status:** Active development, growing community
- **URL:** https://github.com/exo-explore/exo

### 6.3 MLX Distributed Training Framework

- **What:** Privacy-first distributed training on MLX for Apple Silicon
- **Target:** 1B parameter decoder-only transformer matching Llama 3.2
- **Approach:** Data parallelism with `mx.distributed.all_sum`
- **Status:** Beta, single contributor, 11 stars
- **URL:** https://github.com/jbarnes850/mlx-disitrubted-training

### 6.4 Petals (BitTorrent-style LLM Training)

- **What:** Decentralized inference and fine-tuning, developed by BigScience
- **How:** Shards model across volunteer GPUs, pipeline parallelism
- **Training:** Supports collaborative fine-tuning of large models
- **Limitation:** Primarily GPU-focused (NVIDIA), not optimized for Apple Silicon
- **URL:** https://github.com/bigscience-workshop/petals

### 6.5 Nous Research / Psyche Network

- **What:** Decentralized AI training infrastructure on Solana blockchain
- **Funding:** $65M raised ($50M from Paradigm)
- **Approach:** Built on DisTrO (distributed training optimizer), reduces data transfer by orders of magnitude
- **Blockchain role:** Coordination, fault tolerance, censorship resistance via Solana
- **Models:** Training "Consilience" (40B) and released Hermes-3 (Llama-based)
- **Relevance:** Direct precedent for blockchain + community training. Uses crypto incentives for compute contribution.
- **URL:** https://nousresearch.com/nous-psyche/

### 6.6 Bittensor

- **What:** Decentralized ML network where contributors share models
- **Incentive:** TAO token rewards based on model performance
- **Approach:** Models compete and collaborate on subnets
- **Relevance:** Economic model for incentivizing compute contributions

---

## 7. Feasibility Assessment for Nervos CKB

### Strengths of This Approach

1. **Mac prevalence in developer community:** Many blockchain/crypto developers use Macs, ensuring a ready hardware pool
2. **Privacy preservation:** Training data stays local - important for any proprietary CKB documentation or code
3. **Low barrier to entry:** Mac Mini M4 ($599) can participate in inference; M4 Pro ($1,399+) can train
4. **Small adapter sizes:** 10-100 MB adapters are trivially storable and transferable
5. **On-chain coordination natural fit:** CKB cells can store adapter hashes, training configs, contribution records
6. **Precedent exists:** Nous/Psyche proved blockchain + community training works (on Solana); this adapts it for CKB
7. **MLX ecosystem mature enough:** 40+ architectures, LoRA/QLoRA, distributed backends, Flower integration

### Recommended Architecture

```
[Community Members' Macs] --LoRA adapters--> [Aggregation Server]
        |                                           |
   Local training                              Merge + Eval
   (MLX + mlx_lm.lora)                        (mergekit/FedAvg)
        |                                           |
   Private CKB data                           Quality gates
   stays on device                                  |
        |                                    [Final Model]
        v                                           |
   CKB attestation cell                     Published to HF
   (config hash, adapter hash,              + CKB CKBFS
    contributor wallet)
```

### Recommended Base Models

For a CKB domain expert, consider:

| Model | Parameters | QLoRA RAM | Why |
|-------|-----------|-----------|-----|
| **Qwen 2.5-7B** | 7B | ~7 GB | Best multilingual, strong coding, most community members can train |
| **Qwen 2.5-14B** | 14B | ~12 GB | Better quality, needs 24GB+ Mac |
| **Llama 3.2-3B** | 3B | ~3 GB | Ultra-accessible, even base M4 Mac Mini can train |
| **DeepSeek-R1-7B** | 7B | ~7 GB | Strong reasoning for technical Q&A |

**Recommendation:** Start with **Qwen 2.5-7B-4bit** - wide hardware compatibility, excellent multilingual support (important for global CKB community), strong coding ability, and well-supported in MLX.

### Proposed Incentive Structure (CKB Native)

Drawing from Nous/Psyche and Bittensor precedents:

1. **Contribution tokens:** CKB tokens or custom UDT rewarding training contributions
2. **On-chain records:** Each adapter submission creates a CKB cell with:
   - Contributor address
   - Adapter weights hash (SHA-256)
   - Training config hash
   - Validation score
   - Timestamp
3. **Quality-weighted rewards:** Higher validation scores = larger rewards
4. **Data contribution credits:** Reward high-quality CKB domain training data
5. **Governance:** Community votes on training priorities, base model selection

### Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| Malicious adapter injection | HIGH | Automated safety eval + contributor staking |
| Training speed insufficient | MEDIUM | DiLoCo approach, async contribution, Mac Studio hubs |
| Low participation | MEDIUM | CKB token incentives, clear onboarding docs |
| Model quality too low | MEDIUM | Start with proven base model, iterative quality gates |
| MLX framework instability | LOW | MLX v0.31 is mature; Apple committed (WWDC25 sessions) |
| Hardware heterogeneity | LOW | QLoRA + flexible batch sizing handles different Macs |

### Next Steps

1. **Prototype:** Set up BlossomTuneLLM-MLX with 2-3 test Macs using CKB documentation data
2. **Data pipeline:** Curate CKB domain training data (docs, RFCs, code, forum posts)
3. **Benchmarks:** Run MLX LoRA training benchmarks on available hardware (driveThree, NucBox)
4. **Smart contract:** Design CKB cell structure for training attestation and rewards
5. **Community RFC:** Publish proposal to CKB community with this research backing

---

## Sources

### MLX Framework
- [mlx-lm LoRA documentation](https://github.com/ml-explore/mlx-lm/blob/main/mlx_lm/LORA.md)
- [MLX examples LoRA README](https://github.com/ml-explore/mlx-examples/blob/main/lora/README.md)
- [MLX Distributed Communication docs](https://ml-explore.github.io/mlx/build/html/usage/distributed.html)
- [mlx-lm DeepWiki reference](https://deepwiki.com/ml-explore/mlx-lm)
- [MLX v0.31.1 release](https://github.com/ml-explore/mlx/releases)
- [Exploring LLMs with MLX and M5 Neural Accelerators](https://machinelearning.apple.com/research/exploring-llms-mlx-m5)
- [WWDC25: Explore LLMs on Apple Silicon with MLX](https://developer.apple.com/videos/play/wwdc2025/298/)

### Fine-Tuning Guides
- [Fine-Tuning LLMs Locally Using MLX LM - DZone](https://dzone.com/articles/fine-tuning-llms-locally-using-mlx-lm-guide)
- [Run and Fine-Tune LLMs on Mac with MLX-LM 2026](https://markaicode.com/run-fine-tune-llms-mac-mlx-lm/)
- [LoRA Fine-Tuning On Your Apple Silicon MacBook](https://towardsdatascience.com/lora-fine-tuning-on-your-apple-silicon-macbook-432c7dab614a/)
- [Fine-Tuning LLMs with LoRA and MLX-LM](https://medium.com/@levchevajoana/fine-tuning-llms-with-lora-and-mlx-lm-c0b143642deb)
- [Fine-tune LLMs with QLoRA & MLX](https://medium.com/rahasak/fine-tune-llms-on-your-pc-with-qlora-apple-mlx-c2aedf1f607d)

### Benchmarks & Comparisons
- [How Fast Is MLX? Benchmark on Apple Silicon and CUDA GPUs](https://towardsdatascience.com/how-fast-is-mlx-a-comprehensive-benchmark-on-8-apple-silicon-chips-and-4-cuda-gpus-378a0ae356a0/)
- [MLX vs MPS vs CUDA Benchmark](https://towardsdatascience.com/mlx-vs-mps-vs-cuda-a-benchmark-c5737ca6efc9/)
- [MLX vs PyTorch Comparison](https://metalcloud.space/blog/mlx-vs-pytorch-comparison/)
- [Apple Silicon vs NVIDIA CUDA 2025](https://scalastic.io/en/apple-silicon-vs-nvidia-cuda-ai-2025/)
- [Mac Mini M4 for Local LLMs: Benchmarks](https://like2byte.com/mac-mini-m4-16gb-local-llm-benchmarks-roi/)
- [GPU Benchmarks on LLM Inference](https://github.com/XiongjieDai/GPU-Benchmarks-on-LLM-Inference)

### Apple Silicon Specs
- [Ultimate Apple Silicon Guide M1-M5 (2026)](https://safa.tech.blog/2026/03/07/apple-silicon-m5-vs-m4-m3-m2-m1-comparison-guide/)
- [Apple M4 - Wikipedia](https://en.wikipedia.org/wiki/Apple_M4)
- [Apple M3 - Wikipedia](https://en.wikipedia.org/wiki/Apple_M3)
- [Mac Studio Technical Specifications](https://www.apple.com/mac-studio/specs/)
- [Local LLMs Apple Silicon Mac 2026](https://www.sitepoint.com/local-llms-apple-silicon-mac-2026/)

### Distributed & Federated Training
- [BlossomTuneLLM-MLX: Federated Fine-Tuning on Apple Silicon](https://github.com/ethicalabs-ai/BlossomTuneLLM-MLX)
- [Flower MLX Quickstart](https://flower.ai/docs/examples/quickstart-mlx.html)
- [EXO: Decentralized Training (Day 5)](https://blog.exolabs.net/day-5/)
- [EXO GitHub](https://github.com/exo-explore/exo)
- [MLX Distributed Training Framework](https://github.com/jbarnes850/mlx-disitrubted-training)
- [Petals: Decentralized LLM Inference/Training](https://github.com/bigscience-workshop/petals)
- [FedMomentum: Preserving LoRA Training Momentum](https://arxiv.org/html/2603.08014)
- [Federated Sketching LoRA](https://arxiv.org/html/2501.19389)
- [HAFLQ: Heterogeneous Adaptive Federated LoRA](https://arxiv.org/html/2411.06581)

### LoRA Merging & Adapter Management
- [LoRAFusion: Efficient LoRA Fine-Tuning](https://arxiv.org/html/2510.00206v1)
- [Merging Adapters - LoRAX Docs](https://loraexchange.ai/guides/merging_adapters/)
- [AdapterHub: Merging Adapters](https://docs.adapterhub.ml/merging_adapters.html)
- [Task-Aware LoRA Composition via Vector DB](https://arxiv.org/abs/2602.21222)

### Security
- [Attack on LLMs: LoRA Once, Backdoor Every](https://openreview.net/pdf?id=0owyEm6FAk)
- [Supply Chain Attacks via Poisoned LoRA Adapters](https://dev.to/cyberpath/supply-chain-attacks-on-ai-models-how-attackers-inject-backdoors-through-poisoned-lora-adapters-1eb)

### Blockchain + AI Precedents
- [Nous Research / Psyche Network](https://nousresearch.com/nous-psyche/)
- [Nous Research $65M Funding](https://radicaldatascience.wordpress.com/2025/04/25/open-source-ai-lab-raises-65m-launches-decentralized-training-network/)
- [AI in Blockchain 2026](https://www.blockchain-council.org/blockchain/ai-in-blockchain/)
- [Crypto AI Investment Thesis 2025](https://cyber.fund/content/crypto-ai-investment-thesis-2025)

### Pricing
- [Mac Studio Pricing](https://prices.appleinsider.com/mac-studio-2025)
- [Mac Mini M4 Pricing](https://prices.appleinsider.com/mac-mini-m4)
- [Apple Mac Studio Store](https://www.apple.com/shop/buy-mac/mac-studio)
- [Apple Mac Mini Store](https://www.apple.com/shop/buy-mac/mac-mini)
