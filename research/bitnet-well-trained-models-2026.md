# Research Finding: bitnet-well-trained-models-2026

Date: 2026-03-19
Task: bitnet-well-trained-models-2026
Priority: HIGH

---

Date: 2026-03-19

## Brief Summary
The analysis focuses on 1-bit/1.58-bit language models suitable for local CPU inference via `bitnet.cpp`, prioritizing models trained on a substantial number of tokens (ideally 1T+). The Microsoft BitNet b1.58 2B4T model stands out as the only model explicitly trained on 4 trillion tokens, making it the most "adequately trained" candidate found. Other models like Falcon-E series and community BitNet 3B models have significantly lower or undisclosed token counts. While `bitnet.cpp` offers substantial efficiency gains, there are no clear announcements for new 7B+ 1.58-bit models with high token counts expected in 2026 within the provided content.

## Questions and Answers

### 1. What is the training token count for each available 1-bit/1.58-bit model (BitNet 2B, Falcon-E 1B/3B, Llama3-8B-1.58, BitNet 3B)? Which ones are adequately trained?

*   **Microsoft BitNet b1.58 2B4T**: Trained on **4 Trillion tokens**.
    *   *Source:* `microsoft/BitNet-b1.58-2B-4T` Hugging Face model card: "Trained on a corpus of 4 trillion tokens".
*   **Falcon-E 1B/3B models (e.g., tiiuae/Falcon-E-1B-Instruct, tiiuae/Falcon-E-3B-Instruct)**: The training token count is **missing** from the provided content. The model cards state, "For more details about the training protocol of this model, please refer to the Falcon-E technical blogpost," which was not included.
*   **Llama3-8B-1.58-100B-tokens**: Trained on **100 Billion tokens**.
    *   *Source:* `microsoft/BitNet/main/README.md` lists `HF1BitLLM/Llama3-8B-1.58-100B-tokens` as a supported model. The token count is explicitly in its name.
*   **1bitLLM/bitnet_b1_58-3B**: Trained on **100 Billion tokens**.
    *   *Source:* `1bitLLM/bitnet_b1_58-3B` Hugging Face model card: "The models are trained with RedPajama dataset for 100B tokens."

**Adequately Trained Models:**
Based on the goal of 1T+ tokens and the explicit statement that the Llama3-8B-1.58 model trained on 100B tokens was poor quality, only the **Microsoft BitNet b1.58 2B4T (4 Trillion tokens)** is considered adequately trained among the listed models.

### 2. How does benchmark quality of the properly-trained models (e.g. BitNet 2B-4T at 4T tokens) compare to standard Q4 quantised models of similar size?

The `microsoft/BitNet-b1.58-2B-4T` model card states that it "demonstrates that native 1-bit LLMs can achieve performance comparable to leading open-weight, full-precision models of similar size".
*   *Source:* `microsoft/BitNet-b1.58-2B-4T` Hugging Face model card.

However, the provided content **does not offer direct benchmark comparisons** of the BitNet b1.58 2B4T model against standard Q4 quantized models. The comparison is made against "full-precision models."

For the `1bitLLM/bitnet_b1_58-3B` (100B tokens), benchmarks show its performance (e.g., Avg 49.6) is comparable to its FP16 counterpart (FP16 3B reported Avg 49.7). This is a comparison to FP16, not Q4.

### 3. Are there any announced or in-progress 7B+ 1.58-bit models with high token counts that are expected to release in 2026?

Based on the provided content:
*   The `bitnet.cpp` README lists `Llama3-8B-1.58-100B-tokens` (8.0B parameters) and `Falcon3 Family` (1B-10B parameters) as "Supported Models." However, the Llama3 model has only 100B training tokens, which is explicitly noted as poor quality in the task description. No specific Falcon3 7B+ model with a high token count (1T+) is detailed or announced.
*   The `microsoft/BitNet` GitHub repository's open issues labeled "model-release" are empty (`[]`), indicating no public announcements for new models through this channel.
*   The "What's New" section in the `bitnet.cpp` README mentions a "BitNet CPU Inference Optimization" on `01/15/2026`, but this refers to an optimization, not a new model release. It also mentions `bitnet.cpp` can run a "100B BitNet b1.58 model" on a single CPU, but this refers to a model with 100B *parameters* and is presented as a hypothetical capability, not an available model with a high token count.

Therefore, there are **no specific announced or in-progress 7B+ 1.58-bit models with high token counts (1T+) that are expected to release in 2026** within the provided web content.

### 4. What are the Falcon-E models — are they properly trained and what token counts do they use? Do they outperform BitNet 2B?

*   **What they are:** The Falcon-E models (e.g., `tiiuae/Falcon-E-1B-Instruct`, `tiiuae/Falcon-E-3B-Instruct`) are 1.58-bit causal decoder-only transformer models developed by the Technology Innovation Institute (TII). They are designed for efficient inference, particularly for edge devices, and offer significantly reduced memory footprints compared to their full-precision Falcon-3 counterparts (e.g., Falcon-E-3B uses 955MB vs. Falcon-3-3B's 6.46GB). They are compatible with `bitnet.cpp` for inference.
    *   *Source:* `tiiuae/Falcon-E-3B-Instruct` and `tiiuae/Falcon-E-1B-Instruct` Hugging Face model cards.

*   **Properly trained and token counts:** The training token counts for the Falcon-E models are **not provided** in the web content. The model cards refer to a "Falcon-E technical blogpost" for training protocol details, which is not included. Without this information, it cannot be determined if they are "properly trained" in terms of having a high token count (e.g., 1T+).

*   **Outperform BitNet 2B?** The provided evaluation tables for Falcon-E models compare them against other models like Qwen and Falcon-3 series within their respective parameter scales (1B and 3B). However, there is **no direct benchmark comparison** of Falcon-E models against the `microsoft/BitNet-b1.58-2B-4T` model in the provided content. Therefore, it cannot be determined if Falcon-E models outperform BitNet 2B.

### 5. Is there a clear "best" 1-bit model for chat/reasoning tasks available today that runs via bitnet.cpp?

Based on the criteria of being "properly trained" (high token count, ideally 1T+) and available for `bitnet.cpp` inference:

*   The **Microsoft BitNet b1.58 2B4T** model is the only one explicitly stated to be trained on a substantial 4 Trillion tokens. Its model card claims "performance comparable to leading open-weight, full-precision models of similar size," suggesting good quality. It is available in GGUF format for `bitnet.cpp` inference.
    *   *Code for inference:*
        ```bash
        huggingface-cli download microsoft/BitNet-b1.58-2B-4T-gguf --local-dir models/BitNet-b1.58-2B-4T
        python setup_env.py -md models/BitNet-b1.58-2B-4T -q i2_s
        python run_inference.py -m models/BitNet-b1.58-2B-4T/ggml-model-i2_s.gguf -p "You are a helpful assistant" -cnv
        ```
        *Source:* `microsoft/BitNet-b1.58-2B-4T` Hugging Face model card and `microsoft/BitNet/main/README.md`.

*   The `Llama3-8B-1.58-100B-tokens` is explicitly noted in the task description as being "poor quality" due to its low training token count (100B).
*   The `1bitLLM/bitnet_b1_58-3B` is also trained on only 100B tokens, which is significantly less than 1T+.
*   The Falcon-E models, while showing competitive benchmarks against other models in their size class, lack disclosed training token counts, making it difficult to assess their "proper training" level for complex chat/reasoning tasks.

Given the explicit high token count and the claim of comparable performance to full-precision models, the **Microsoft BitNet b1.58 2B4T** is the strongest candidate for the "best" properly-trained 1-bit model for chat/reasoning tasks available today that runs via `bitnet.cpp`.

## Key Facts, Code Snippets, Version Numbers

*   **Microsoft BitNet b1.58 2B4T:**
    *   Parameters: ~2 Billion
    *   Training Tokens: 4 Trillion
    *   Quantization: Native 1.58-bit weights and 8-bit activations (W1.58A8), trained from scratch.
    *   Availability: GGUF format for `bitnet.cpp`.
    *   Technical Report: `arxiv:2504.12285` ("BitNet b1.58 2B4T Technical Report").
    *   Release Date: `createdAt: 2025-04-15T04:25:13.000Z`.
*   **`bitnet.cpp`:**
    *   Official inference framework for 1-bit LLMs (e.g., BitNet b1.58).
    *   Achieves speedups of 1.37x to 6.17x and energy reductions of 55.4% to 82.2% on CPUs.
    *   Version: 1.0 released `10/17/2024`.
    *   Latest optimization (CPU inference): `01/15/2026`.
    *   Based on `llama.cpp` framework.
*   **Falcon-E Models (1B/3B):**
    *   Parameters: Falcon-E-1B-Instruct (1.8B), Falcon-E-3B-Instruct (3B).
    *   Architecture: Pure-transformer - 1.58bit version.
    *   Memory Footprint: Significantly reduced (e.g., 955MB for 3B vs 6.46GB for Falcon-3-3B).
    *   Inference via `bitnet.cpp` supported.
    *   *Code for inference:*
        ```bash
        python setup_env.py --hf-repo tiiuae/Falcon-E-3B-Instruct -q i2_s
        python run_inference.py -m models/Falcon-E-3B-Instruct/ggml-model-i2_s.gguf -p "You are a helpful assistant" -cnv
        ```
*   **1bitLLM/bitnet_b1_58-3B:**
    *   Parameters: 3B
    *   Training Tokens: 100 Billion.
    *   Evaluation: PPL 9.88, Avg 49.6 (reproduced) comparable to FP16 3B.
    *   *Code for evaluation:*
        ```bash
        pip install lm-eval==0.3.0
        python eval_ppl.py --hf_path 1bitLLM/bitnet_b1_58-3B --seqlen 2048
        python eval_task.py --hf_path 1bitLLM/bitnet_b1_58-3B \
        --batch_size 1 \
        --tasks \
        --output_path result.json \
        --num_fewshot 0 \
        --ctx_size 2048
        ```

## Gaps / Unanswered Questions

*   **Training Token Counts for Falcon-E Models:** The exact number of training tokens for the Falcon-E 1B and 3B models is not provided.
*   **Direct Benchmarks vs. Q4 Quantized Models:** There are no direct benchmark comparisons of 1-bit/1.58-bit models (especially BitNet b1.58 2B4T) against standard Q4 quantized models of similar size.
*   **Direct Benchmarks between BitNet 2B4T and Falcon-E:** The provided content does not include a direct comparison of benchmark quality between the Microsoft BitNet b1.58 2B4T and the Falcon-E series models.
*   **Upcoming 7B+ 1.58-bit Models (1T+ tokens) for 2026:** No specific announcements or details about such models were found.

## Recommended Next Steps

1.  **Investigate Falcon-E Training Details:** Seek out the "Falcon-E technical blogpost" mentioned in the Falcon-E model cards to determine their training token counts and assess their "properly trained" status.
2.  **Search for Q4 vs. 1-bit Benchmarks:** Look for external benchmarks or papers that directly compare the performance of 1-bit/1.58-bit models (like BitNet b1.58 2B4T) against common Q4 quantized models (e.g., Llama.cpp GGUF Q4_K_M) on standard LLM evaluation tasks.
3.  **Monitor Microsoft BitNet Releases:** Keep an eye on the official Microsoft BitNet GitHub repository and Hugging Face pages for any future announcements of larger (7B+) 1.58-bit models with high token counts.

## Sources Consulted

*   https://huggingface.co/microsoft/BitNet-b1.58-2B-4T
*   https://raw.githubusercontent.com/microsoft/BitNet/main/README.md
*   https://huggingface.co/tiiuae/Falcon-E-3B-Instruct
*   https://huggingface.co/tiiuae/Falcon-E-1B-Instruct
*   https://api.github.com/repos/microsoft/BitNet/issues?state=open&labels=model-release&per_page=10
*   https://huggingface.co/1bitLLM/bitnet_b1_58-3B