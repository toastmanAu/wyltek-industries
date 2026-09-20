# Research: oculink-egpu-fan-control-gmktec-k8-plus

**Date:** 2026-03-23  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://raw.githubusercontent.com/NVIDIA/nvidia-settings/master/README.md, https://raw.githubusercontent.com/RadeonOpenCompute/ROCm/master/README.md, https://raw.githubusercontent.com/NVIDIA/open-gpu-kernel-modules/master/README.md, https://raw.githubusercontent.com/GMKTEC/OCuLink-Adapter/main/README.md, https://raw.githubusercontent.com/ollama/ollama/main/README.md, https://raw.githubusercontent.com/ggerganov/llama.cpp/master/README.md

---

## Research Note: OCuLink eGPU for AI Inference on GMKTEC K8 Plus

**Date:** 2026-03-23

### Summary
This research investigates the integration of an OCuLink eGPU with the GMKTEC K8 Plus for AI inference, focusing on compute-only configuration, fan control, and Ollama integration. Based on the provided content, there is no information regarding OCuLink interface specifics, compatible eGPU enclosures/cables, or known issues with OCuLink on the GMKTEC K8 Plus. Similarly, specific fan control APIs for NVIDIA (`nvidia-settings`, `nvidia-smi`) and AMD (`rocm-smi`, `amdgpu`) GPUs, or methods for programmatic fan adjustment based on temperature, are not detailed. While Ollama and its `llama.cpp` backend support GPU acceleration (CUDA for NVIDIA, HIP for AMD, Vulkan, SYCL), the provided documentation does not specify how to configure them to leverage an eGPU for inference while using an integrated GPU for display, nor does it offer performance benchmarks for such a setup.

### Questions to Answer

1.  **What is the OCuLink interface and what eGPU enclosures/cables are compatible with GMKTEC K8 Plus?**
    The provided content does not define the OCuLink interface or list compatible eGPU enclosures/cables for the GMKTEC K8 Plus. The `GMKTEC/OCuLink-Adapter` README, which would likely contain this information, returned a `[FETCH ERROR: HTTP Error 404: Not Found]`.

2.  **How do you configure an eGPU as compute-only (not primary display) on Ubuntu with NVIDIA/AMD drivers?**
    The provided content does not contain instructions on how to configure an eGPU as a compute-only device (not primary display) on Ubuntu using NVIDIA or AMD drivers. The `NVIDIA/nvidia-settings` README was not found, and the `NVIDIA/open-gpu-kernel-modules` README focuses on building kernel modules, not display configuration. The `RadeonOpenCompute/ROCm` README describes the software stack for GPU computation but does not detail eGPU display configuration.

3.  **What fan control APIs exist for NVIDIA GPUs (nvidia-settings, nvidia-smi) and AMD GPUs (rocm-smi, amdgpu)?**
    The provided content does not explicitly list or describe fan control APIs such as `nvidia-settings`, `nvidia-smi`, `rocm-smi`, or `amdgpu`. The `NVIDIA/nvidia-settings` README was not found, and the `NVIDIA/open-gpu-kernel-modules` README does not mention fan control. The `RadeonOpenCompute/ROCm` README mentions "drivers, development tools, and APIs" but does not specify fan control functionalities.

4.  **How can fan speed be programmatically adjusted based on GPU temperature for AI inference workloads?**
    The provided content does not offer methods or APIs for programmatically adjusting fan speed based on GPU temperature for AI inference workloads. This information would typically rely on the fan control APIs which were not found in the provided documentation.

5.  **What Ollama or llama.cpp configuration is needed to leverage eGPU for inference while using integrated GPU for display?**
    The `ollama` README states that it uses `llama.cpp` as its backend. The `llama.cpp` README indicates support for GPU acceleration: "Custom CUDA kernels for running LLMs on NVIDIA GPUs (support for AMD GPUs via HIP and Moore Threads GPUs via MUSA)" and "Vulkan and SYCL backend support". It also mentions "CPU+GPU hybrid inference". However, neither `ollama` nor `llama.cpp` documentation specifies a configuration or command-line option to explicitly select an eGPU for inference while simultaneously using an integrated GPU for display. The tools are designed to leverage available GPU resources, but the mechanism for distinguishing between multiple GPUs (e.g., eGPU vs. iGPU) or assigning specific roles is not detailed.

6.  **Are there any known issues with OCuLink eGPU on GMKTEC K8 Plus (PCIe lanes, power delivery, thermal throttling)?**
    The provided content does not mention any known issues with OCuLink eGPU on the GMKTEC K8 Plus, specifically regarding PCIe lanes, power delivery, or thermal throttling. The `GMKTEC/OCuLink-Adapter` README, which might have contained such information, returned a `[FETCH ERROR: HTTP Error 404: Not Found]`.

7.  **What benchmarks show performance difference between eGPU vs integrated GPU for AI inference on this setup?**
    The provided content does not include any benchmarks or performance comparisons between an eGPU and an integrated GPU for AI inference on the GMKTEC K8 Plus setup.

### Gaps / Follow-up
The following critical information was not found in the provided content:
*   Definition of the OCuLink interface and compatible eGPU enclosures/cables for the GMKTEC K8 Plus.
*   Instructions for configuring an eGPU as compute-only on Ubuntu with NVIDIA/AMD drivers.
*   Specific fan control APIs (e.g., `nvidia-settings`, `nvidia-smi`, `rocm-smi`, `amdgpu`) and their usage.
*   Methods for programmatic fan speed adjustment based on GPU temperature.
*   Detailed `ollama` or `llama.cpp` configuration for explicit eGPU selection when an iGPU is also present and used for display.
*   Known issues (PCIe lanes, power delivery, thermal throttling) specific to OCuLink eGPU on the GMKTEC K8 Plus.
*   Performance benchmarks comparing eGPU vs. integrated GPU for AI inference on this specific setup.

### Relevant Code/API Snippets

**Ollama REST API Example:**
```shell
curl http://localhost:11434/api/chat -d '{
  "model": "gemma3",
  "messages": [{ "role": "user", "content": "Why is the sky blue?" }],
  "stream": false
}'
```
*(Source: `ollama/ollama` README)*

**Ollama Python Client Example:**
```python
from ollama import chat
response = chat(model='gemma3', messages=[
  {
    'role': 'user',
    'content': 'Why is the sky blue?',
  },
])
print(response.message.content)
```
*(Source: `ollama/ollama` README)*

**Ollama JavaScript Client Example:**
```javascript
import ollama from "ollama";
const response = await ollama.chat({
  model: "gemma3",
  messages: [{ role: "user", content: "Why is the sky blue?" }],
});
console.log(response.message.content);
```
*(Source: `ollama/ollama` README)*

**llama.cpp CLI Examples:**
```sh
# Use a local model file
llama-cli -m my_model.gguf

# Or download and run a model directly from Hugging Face
llama-cli -hf ggml-org/gemma-3-1b-it-GGUF

# Launch OpenAI-compatible API server
llama-server -hf ggml-org/gemma-3-1b-it-GGUF
```
*(Source: `ggerganov/llama.cpp` README)*

---

## ⚠️ Quality Note

Findings are thin — seeds did not return sufficient content to answer the research questions. This task has been automatically re-queued with a request for better seeds.

**Thin phrase count:** 9  
**Content length:** 6364 chars
