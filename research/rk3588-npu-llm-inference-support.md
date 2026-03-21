# Research: rk3588-npu-llm-inference-support

**Date:** 2026-03-22  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://github.com/airockchip/rknn-toolkit2/blob/master/README.md, https://api.github.com/repos/airockchip/rknn-toolkit2, https://github.com/airockchip/rknn_model_zoo/blob/main/README.md, https://raw.githubusercontent.com/rockchip-linux/rknpu2/master/README.md, https://forum.armbian.com/topic/27030-orange-pi-5-plus/

---

Date: 2026-03-22

## Summary
The Rockchip RK3588 NPU, supported by RKNN Toolkit 2 and RKNPU2, offers hardware acceleration for various neural network operations, including convolutions, matrix multiplication (`MatMul`), and improved `transformer support`. It explicitly supports INT8 quantization, which is relevant for efficient LLM inference, but there is no mention of ternary (1.58-bit) quantization. While `transformer support` suggests potential for LLMs, the provided content does not explicitly confirm specific LLM models like Llama, GPT, or BitNet running on the RK3588 NPU, nor does it provide performance benchmarks comparing NPU inference to CPU NEON for token generation. Models are converted to the RKNN format using RKNN Toolkit 2.

## 1. What operations does the RK3588 NPU support (convolutions, matrix multiply, attention)?
The RK3588 NPU, through the RKNPU2 interface, supports a range of operations critical for neural networks:
*   **Matrix Multiply (`MatMul`):** Explicitly supported and improved. "Improved matmul api support" and "Add GPU back-end implementations for some operators such as matmul" are mentioned in `rknpu2/README.md` (ReleaseLog 1.5.2). It is also listed as a supported NPU operator in ReleaseLog 1.4.0.
*   **Convolutions:** Implied by the support for fused operators like "Conv-Silu/Conv-Swish/Conv-Hardswish/Conv-sigmoid/Conv-HardSwish/Conv-Gelu" (`rknpu2/README.md`, ReleaseLog 1.5.0).
*   **Attention:** While "attention" is not explicitly listed as a standalone operator, "Improve transformer support" is noted in `rknpu2/README.md` (ReleaseLog 1.5.2). Transformers heavily rely on attention mechanisms, suggesting underlying support for these operations.
*   **Other key operators for LLMs:** `LayerNorm` (ReleaseLog 1.2.0), `Softmax` (ReleaseLog 1.5.0), `Lstm` (ReleaseLog 1.5.0, 1.1.0), `GRU` (ReleaseLog 1.5.0, 1.2.0), `Gather`, `Transpose`, `Reshape`, `Pad`, `Mul`, `Maxpool`, `Sigmoid`, `Gelu` are also supported (`rknpu2/README.md`, various ReleaseLogs).

## 2. Is there any evidence of LLM inference (Llama, GPT, BitNet) running on RK3588 NPU?
The provided content indicates "Improve transformer support" in `rknpu2/README.md` (ReleaseLog 1.5.2), which is a foundational architecture for LLMs like Llama and GPT. However, there is **no explicit evidence or mention** of specific LLM models such as Llama, GPT, or BitNet running on the RK3588 NPU within the provided text. The `rknn_model_zoo/README.md` is referenced, but its content is not provided, so we cannot check for specific LLM examples there.

## 3. Does RKNN Toolkit 2 support ternary (1.58-bit) or int8 quantization schemes used by bitnet.cpp?
Yes, RKNN Toolkit 2 supports INT8 quantization. `rknpu2/README.md` (ReleaseLog 1.1.0) states: "Support INT8+FP16 mixed quantization to improve model accuracy." It also mentions "Support per-channel quantitative model" in ReleaseLog 1.0.

However, there is **no mention** of support for ternary (1.58-bit) quantization schemes in the provided content.

## 4. If NPU support exists, how do you compile a model for NPU deployment (ONNX → RKNN conversion)?
To compile a model for NPU deployment on RK3588, the model must be converted to the `.rknn` format using `RKNN Toolkit 2`. The `rknpu2/README.md` explicitly states: "The rknn model must be generated using RKNN Toolkit 2: https://github.com/rockchip-linux/rknn-toolkit2".

While the question specifically asks about "ONNX → RKNN conversion," the provided `rknn-toolkit2/README.md` content is truncated and does not explicitly detail the supported input formats (like ONNX) for the conversion process. It only confirms that `RKNN Toolkit 2` is the tool used to generate the `.rknn` model.

## 5. What is the realistic speedup (if any) of using NPU vs CPU NEON for token-by-token LLM generation?
There is **no information** in the provided content regarding the realistic speedup of using the RK3588 NPU versus CPU NEON for token-by-token LLM generation. The `rknpu2/README.md` mentions general performance optimizations for `rknn_init` and `rknn_inputs_set` but does not provide benchmarks for inference speed or comparisons with CPU performance for LLMs.

## Gaps / Follow-up
*   The full content of `https://github.com/airockchip/rknn-toolkit2/blob/master/README.md` and `https://github.com/airockchip/rknn_model_zoo/blob/main/README.md` would be necessary to confirm specific input model formats (e.g., ONNX) supported by RKNN Toolkit 2 and to identify any existing LLM examples in the model zoo.
*   Specific performance benchmarks for LLM inference (e.g., tokens/second) on the RK3588 NPU, especially compared to CPU (NEON) performance, are missing.
*   Confirmation of whether `llama.cpp` or `bitnet.cpp` have existing NPU backends for the RK3588 is not available in the provided content.
*   Further investigation into the "OP support list document" mentioned in `rknpu2/README.md` (ReleaseLog 1.0) could provide a comprehensive list of supported NPU operations.

## Relevant Code/API Snippets
The provided content refers to API support but does not include specific code snippets for NPU operations.
*   `rknpu2/README.md` (ReleaseLog 1.5.2): "Improved matmul api support"
*   `rknpu2/README.md` (ReleaseLog 1.5.0): "Provide MATMUL API"

---

## ⚠️ Quality Note

Findings are thin — seeds did not return sufficient content to answer the research questions. This task has been automatically re-queued with a request for better seeds.

**Thin phrase count:** 6  
**Content length:** 5258 chars
