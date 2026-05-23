# Research: fiber-tap-pay-sse-vs-poll-esp32

**Date:** 2026-05-19
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)
**Priority:** MEDIUM
**Requester:** claude-code
**Seeds:** https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/protocols/esp_https_server.html,https://github.com/espressif/idf-extra-components,https://github.com/espressif/esp-idf/tree/master/examples/protocols

---

## Structured Findings Document: SSE vs. HTTP Polling for ESP32 Payment Terminal

**ID:** fiber-tap-pay-sse-vs-poll-esp32
**Goal:** For an ESP32 payment terminal on ESP-IDF receiving real-time payment-confirmed notifications from a server: compare Server-Sent Events (SSE) vs HTTP polling. Cover reliability under flaky cellular, power impact, ESP-IDF library maturity, real-world examples. Recommend.
**Priority:** MEDIUM
**Requested by:** claude-code

---

### Summary

For the Fiber Tap Pay terminal's requirement of real-time payment confirmation (1-2 second latency) on an ESP32 with battery life considerations and flaky cellular connectivity, **Server-Sent Events (SSE) is the technically superior approach over aggressive HTTP polling.** While ESP-IDF does not appear to have a dedicated, high-level SSE client library, the underlying `esp_http_client` and network stack are mature enough to implement one. HTTP polling at 1-2 second intervals, especially with HTTPS, incurs significant power and latency overhead due to repeated connection establishments and TLS handshakes, making it unsuitable for the specified latency and battery constraints.

The primary challenge with SSE will be the custom implementation of robust reconnect logic and keep-alive mechanisms to maintain the long-lived connection reliably over flaky cellular networks and aggressive NATs. Despite this implementation effort, the power efficiency and lower latency of SSE for subsequent events make it the recommended path forward.

### Key Findings

1.  **HTTP Polling Overhead (Latency & Power):**
    *   **TLS Handshake Cost:** The `esp_https_server` documentation indicates that the initial SSL session setup can take "about two seconds, or more." While this is for a server, the client-side cost for establishing a new HTTPS connection will be similar. Subsequent requests over an *already open secure socket* are "much faster (down to under 100 ms)."
    *   **Impact on Polling:** If HTTP polling at 1-2 second intervals requires re-establishing a new TCP connection and TLS handshake for each poll (common in simple polling implementations), the 2-second setup time would make it impossible to consistently meet the 1-2 second latency requirement for receiving the payment confirmation. Even with TCP connection reuse, a new TLS handshake might be needed if the session is not resumed, adding significant overhead.
    *   **Power Consumption:** Each poll involves a full network transaction (DNS, TCP handshake, TLS handshake, HTTP request/response, TCP teardown). Performing this every 1-2 seconds will keep the cellular modem and ESP32 radio active for a substantial portion of the time, leading to high power consumption and poor battery life.

2.  **SSE Advantages (Latency & Power):**
    *   **Single Connection:** SSE establishes a single, long-lived HTTP/HTTPS connection. The initial TLS handshake cost (approx. 2 seconds) is paid only once.
    *   **Efficient Data Transfer:** Subsequent payment confirmation events are sent as small data packets over this established connection, benefiting from the "<100 ms" transfer time. This meets the 1-2 second latency requirement.
    *   **Power Efficiency:** After the initial connection, the ESP32 primarily listens for data. This significantly reduces the frequency of high-power radio activity compared to repeated polling, leading to better battery life, assuming the connection remains stable.

3.  **ESP-IDF Library Maturity:**
    *   **HTTP Client:** ESP-IDF provides a mature `esp_http_client` component for making HTTP/HTTPS requests. This component forms the foundation for both polling and an SSE client implementation.
    *   **SSE Client:** There is no explicit, high-level `esp_sse_client` component mentioned in the provided documentation or commonly found as a core component. Implementing an SSE client would likely involve using `esp_http_client` to open a persistent connection, setting appropriate headers (`Accept: text/event-stream`), and then manually parsing the incoming event stream.
    *   **WebSocket Support:** The `wss_server` example (WebSocket Secure Server) demonstrates ESP-IDF's capability to handle long-lived, secure connections. This indicates that the underlying network and TLS stack are robust enough for persistent connections, which is a prerequisite for SSE.

4.  **Reliability under Flaky Cellular:**
    *   **NAT Timeouts:** Cellular networks often employ aggressive Network Address Translation (NAT) that can prematurely close idle TCP connections.
        *   **Polling:** Less susceptible to *idle connection* NAT timeouts as connections are typically short-lived. However, a poll attempt might fail if the NAT mapping has just been cleared.
        *   **SSE:** Highly susceptible. The long-lived SSE connection requires explicit keep-alive mechanisms (e.g., application-level pings from the server, or TCP KEEPALIVE from the client) to prevent NAT from closing the connection. Without these, the connection will eventually drop.
    *   **Connection Drops/Partial Reads:**
        *   **Polling:** Each poll is an independent transaction. A dropped connection or partial read results in a failed poll, which is then retried on the next interval.
        *   **SSE:** A dropped connection breaks the event stream. A robust SSE client must implement sophisticated reconnect logic with exponential backoff and jitter to handle transient network issues and avoid overwhelming the server. It also needs to handle partial event reads and buffer data correctly to reconstruct events.

### Questions Answered

*   **SSE on ESP-IDF: library maturity, known examples, reconnect behavior, header/buffer concerns:**
    *   **Library Maturity:** No dedicated, high-level SSE client library is readily apparent in core ESP-IDF. Implementation would build upon `esp_http_client`.
    *   **Known Examples:** No direct SSE client examples were found in the provided sources. The `wss_server` example shows capability for long-lived secure connections.
    *   **Reconnect Behavior:** Must be custom-implemented by the application, including exponential backoff and handling network state changes.
    *   **Header/Buffer Concerns:** `esp_http_client` can handle streaming responses, but parsing the `text/event-stream` format and managing buffers for potentially incomplete event lines would be application-specific.
*   **HTTP polling at 1-2 s intervals: TCP overhead, battery impact vs SSE:**
    *   **TCP Overhead:** High. Each poll likely involves a new TCP/TLS handshake, incurring significant overhead (approx. 2 seconds for TLS, plus TCP setup).
    *   **Battery Impact:** High. Frequent radio activity for connection setup and teardown drains battery quickly.
    *   **Vs. SSE:** Significantly worse than SSE for both latency (due to repeated TLS handshakes) and battery life (due to frequent radio bursts).
*   **Behavior under flaky cellular (NAT timeout, connection drops, partial reads):**
    *   **Polling:** More resilient to individual transient drops as each poll is independent, but still suffers from overall unreliability if the network is consistently poor. NAT timeouts are less of an issue for the *connection lifetime* but can cause individual poll failures.
    *   **SSE:** Highly susceptible to NAT timeouts and connection drops. Requires robust, custom-implemented reconnect logic and keep-alives. Partial reads require careful application-level parsing and buffering.
*   **Real-world ESP32 deployments using each pattern — gotchas they hit:**
    *   **Polling:** Gotchas include high power consumption, server overload from too many frequent requests, and difficulty meeting low-latency requirements due to connection setup times.
    *   **SSE:** Gotchas include complex client-side implementation for robust reconnects, handling server-side SSE implementation nuances (e.g., proper `Content-Type`, `Cache-Control`, `Connection: keep-alive` headers), and managing keep-alives to prevent NAT timeouts.
*   **Specific recommendation with reasoning; if SSE, name the library/example to start from:**
    *   **Recommendation:** **Server-Sent Events (SSE)**.
    *   **Reasoning:** SSE offers significantly better power efficiency and lower latency for subsequent events after the initial connection, which is critical for battery-powered devices and the 1-2 second latency requirement. HTTP polling at the required frequency is fundamentally inefficient and unlikely to meet the latency target.
    *   **Starting Point for SSE:** Begin with the `esp_http_client` component. There isn't a specific SSE library, so a custom implementation will be necessary.

### Gaps / Follow-up

1.  **Dedicated SSE Client Library Search:**
    *   **Action:** Conduct a thorough search within the `idf-extra-components` repository and the broader ESP-IDF community forums/GitHub issues for existing SSE client implementations or examples. This could save significant development time.
    *   **Rationale:** An existing community component might offer pre-built reconnect logic, event parsing, and header management, reducing the custom implementation burden.
2.  **`esp_http_client` Streaming Mode & Buffer Management:**
    *   **Action:** Investigate the `esp_http_client` API for its streaming capabilities and how to efficiently read and buffer partial HTTP responses, which is crucial for parsing SSE streams.
    *   **Rationale:** Understanding the low-level data reception will inform the design of the SSE event parser.
3.  **Keep-Alive Strategy for Cellular:**
    *   **Action:** Research best practices for maintaining long-lived TCP connections over cellular networks to mitigate NAT timeouts. This includes configuring TCP KEEPALIVE on the ESP32 and designing an application-level ping/pong mechanism with the backend server.
    *   **Rationale:** Essential for SSE reliability and preventing frequent, costly reconnects.
4.  **Backend SSE Implementation Details:**
    *   **Action:** Confirm the backend server's capability and implementation details for SSE, including event format, keep-alive frequency, and handling of client reconnects.
    *   **Rationale:** The client-side SSE implementation must be compatible with the server-side.
5.  **Power Consumption Benchmarking:**
    *   **Action:** Plan for real-world power consumption tests for both polling (at 1-2s intervals) and SSE (with various keep-alive frequencies) under simulated flaky cellular conditions.
    *   **Rationale:** Validate the theoretical power efficiency of SSE against practical measurements.

### Relevant Code/API Snippets

Since no direct SSE client library was found, the implementation would leverage the `esp_http_client` component.

**Example `esp_http_client` usage for a potential SSE connection (conceptual):**

```c
#include "esp_http_client.h"
#include "esp_log.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"

static const char *TAG = "SSE_CLIENT";

esp_err_t _http_event_handler(esp_http_client_event_t *evt) {
    switch (evt->event_id) {
        case HTTP_EVENT_ERROR:
            ESP_LOGD(TAG, "HTTP_EVENT_ERROR: %s", esp_err_to_name(evt->data));
            // Implement reconnect logic here
            break;
        case HTTP_EVENT_ON_CONNECTED:
            ESP_LOGD(TAG, "HTTP_EVENT_ON_CONNECTED");
            break;
        case HTTP_EVENT_HEADER_SENT:
            ESP_LOGD(TAG, "HTTP_EVENT_HEADER_SENT");
            break;
        case HTTP_EVENT_ON_HEADER:
            ESP_LOGD(TAG, "HTTP_EVENT_ON_HEADER, key=%s, value=%s", evt->header_key, evt->header_value);
            // Check for "Content-Type: text/event-stream"
            break;
        case HTTP_EVENT_ON_DATA:
            ESP_LOGD(TAG, "HTTP_EVENT_ON_DATA, len=%d", evt->data_len);
            // This is where SSE parsing would happen
            // evt->data contains the raw bytes
            // Need to buffer and parse line by line for "data:", "event:", "id:", "retry:"
            break;
        case HTTP_EVENT_ON_FINISH:
            ESP_LOGD(TAG, "HTTP_EVENT_ON_FINISH");
            // Connection closed by server or error, trigger reconnect
            break;
        case HTTP_EVENT_DISCONNECTED:
            ESP_LOGD(TAG, "HTTP_EVENT_DISCONNECTED");
            // Connection lost, trigger reconnect
            break;
        case HTTP_EVENT_REDIRECT:
            ESP_LOGD(TAG, "HTTP_EVENT_REDIRECT");
            break;
    }
    return ESP_OK;
}

void sse_client_task(void *pvParameters) {
    esp_http_client_config_t config = {
        .url = "https://your-backend.com/sse/payment-events", // Replace with actual SSE endpoint
        .event_handler = _http_event_handler,
        .transport_type = HTTP_TRANSPORT_OVER_SSL, // Use HTTPS
        .cert_pem = NULL, // Provide CA certificate for production
        .timeout_ms = 10000, // Connection timeout
        .buffer_size = 2048, // Adjust buffer size as needed for SSE events
        .is_async = true, // Important for non-blocking operation
    };

    while (1) {
        esp_http_client_handle_t client = esp_http_client_init(&config);
        if (client == NULL) {
            ESP_LOGE(TAG, "Failed to initialize HTTP client");
            vTaskDelay(pdMS_TO_TICKS(5000)); // Retry after delay
            continue;
        }

        // Set SSE specific headers
        esp_http_client_set_header(client, "Accept", "text/event-stream");
        esp_http_client_set_header(client, "Cache-Control", "no-cache");
        esp_http_client_set_header(client, "Connection", "keep-alive");

        esp_err_t err = esp_http_client_perform(client);

        if (err == ESP_OK) {
            ESP_LOGI(TAG, "SSE connection established. Waiting for events...");
            // The event handler will process data.
            // This loop will effectively keep the task alive while the connection is open.
            // In a real implementation, you might have a mechanism to signal a reconnect
            // from the event handler or after a timeout.
            // For now, just keep the task running.
            while (esp_http_client_get_status_code(client) == 200 && err == ESP_OK) {
                vTaskDelay(pdMS_TO_TICKS(1000)); // Keep task alive, allow event handler to run
                // Check for explicit disconnects or errors in the event handler
                // and break this loop to trigger a reconnect.
            }
        } else {
            ESP_LOGE(TAG, "SSE connection failed: %s", esp_err_to_name(err));
        }

        esp_http_client_cleanup(client);
        ESP_LOGI(TAG, "SSE connection closed. Reconnecting in 5 seconds...");
        vTaskDelay(pdMS_TO_TICKS(5000)); // Reconnect delay
    }
}

// In app_main:
// xTaskCreate(&sse_client_task, "sse_client_task", 4096, NULL, 5, NULL);
```
