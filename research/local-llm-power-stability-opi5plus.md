# Research: local-llm-power-stability-opi5plus

**Date:** 2026-03-21  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://raw.githubusercontent.com/orangepi-xunlong/OrangePiRK3588_android13/master/README.md, https://raw.githubusercontent.com/armbian/documentation/master/docs/User-Guide_Armbian-for-Rockchip.md, https://ollama.ai/library/qwen2.5, https://github.com/ggerganov/llama.cpp/issues

---

Date: 2026-03-21

## Research Note: local-llm-power-stability-opi5plus

### Summary
This research aimed to diagnose power instability issues on the OPi5+ (192.168.68.100) when running large Ollama models, specifically `qwen2.5:7b`, which causes brownouts. The provided source content, however, was severely limited due to fetch errors for critical hardware and OS documentation (OrangePiRK3588_android13 README and Armbian documentation). The only accessible content was the `ollama.ai/library/qwen2.5` page, which details model sizes and capabilities but provides no information on hardware power draw, PSU specifications, voltage sag, kernel logging, or CPU frequency management. Consequently, most of the specific diagnostic questions regarding the OPi5+ power issues cannot be answered from the provided materials.

### Questions to Answer

#### 1. What is the actual power draw of qwen2.5:7b on RK3588 CPU vs GPU under full load?
The provided content from `https://ollama.ai/library/qwen2.5` lists the size of the `qwen2.5:7b` model as 4.7GB. However, this source does not provide any information regarding the actual power draw (in watts or amps) of the model when running on specific hardware like the RK3588 CPU or GPU under full load, nor does it detail how Ollama utilizes these components for inference. The other provided links failed to fetch.

#### 2. Is the current PSU rated for 5A, and what voltage sag occurs under load?
The provided source content does not contain any information about the current PSU rating for the OPi5+ (192.168.68.100) or any data on voltage sag observed under load. The problem description mentions a potential upgrade from 5A to 8A+, but this is part of the problem statement, not a fact derived from the provided content. The other provided links failed to fetch.

#### 3. Can CPU frequency capping (via sysfs) prevent brownouts while keeping inference viable?
The provided source content does not discuss CPU frequency capping, the use of `sysfs` for system management, or its potential impact on preventing brownouts or maintaining inference viability. The `ollama.ai` page focuses solely on the `qwen2.5` models themselves. The other provided links failed to fetch.

#### 4. What PSU model with 8A+ capacity is compatible with OPi5+ barrel connector?
The provided source content does not specify the barrel connector type for the OPi5+ or recommend any specific PSU models with 8A+ capacity that are compatible. The `ollama.ai` page is irrelevant to this hardware-specific question. The other provided links failed to fetch.

#### 5. How to log kernel brownout events (dmesg, PMIC voltage monitors) to confirm diagnosis?
The provided source content does not offer instructions or details on how to log kernel brownout events using `dmesg` or by monitoring PMIC (Power Management Integrated Circuit) voltages. The `ollama.ai` page is unrelated to system-level logging, and the `llama.cpp` issues link is too general to provide specific guidance on this topic. The other provided links failed to fetch.

### Gaps / Follow-up
The primary gap is the lack of access to hardware-specific documentation for the Orange Pi 5 Plus (OPi5+) and its Rockchip RK3588 processor. The `FETCH ERROR: HTTP Error 404: Not Found` for `orangepi-xunlong/OrangePiRK3588_android13/master/README.md` and `armbian/documentation/master/docs/User-Guide_Armbian-for-Rockchip.md` prevented access to crucial information that would likely cover:
*   RK3588 power consumption characteristics (CPU/GPU).
*   Recommended PSU specifications for the OPi5+.
*   Details on the OPi5+ barrel connector type.
*   System-level power management (e.g., `sysfs` paths for CPU frequency scaling).
*   Methods for monitoring system voltages and logging kernel events related to power issues (e.g., PMIC drivers, `dmesg` output interpretation for brownouts).

To answer the research questions, direct access to the OPi5+ hardware documentation, Armbian OS documentation for Rockchip devices, or specific power consumption benchmarks for Ollama on RK3588 is required.

### Relevant Code/API Snippets
The only relevant snippet from the provided content is how to interact with the `qwen2.5` model via Ollama, which is not directly related to the power stability diagnosis but confirms the model's usage:

```bash
# CLI example to run qwen2.5
ollama run qwen2.5
```

```bash
# CLI example to chat with qwen2.5 via API
curl http://localhost:11434/api/chat \
  -d '{ "model": "qwen2.5", "messages": [{"role": "user", "content": "Hello!"}] }'
```

The `ollama.ai/library/qwen2.5` page also lists the model sizes:
*   `qwen2.5:3b`: 1.9GB
*   `qwen2.5:7b`: 4.7GB