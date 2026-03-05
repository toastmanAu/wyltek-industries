# Research: retroachievements-live-api-payment-triggers

**Date:** 2026-03-05  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://docs.retroachievements.org/developer-docs/rich-presence.html, https://docs.retroachievements.org/developer-docs/achievement-development-overview.html, https://docs.retroachievements.org/developer-docs/condition-syntax.html, https://api.retroachievements.org/API/API_GetGameInfoAndUserProgress.php, https://raw.githubusercontent.com/RetroAchievements/RAInterface/master/README.md

---

Date: 2026-03-05

## Summary

RetroAchievements (RA) offers valuable data for FiberQuest's payment triggers, primarily through its machine-readable achievement definitions and Rich Presence scripts. Achievement conditions, detailed in the developer documentation, directly map to game memory addresses and logic, making them ideal for detecting specific game events like "player dealt damage." While Rich Presence scripts also expose RAM addresses and game state, their update frequency (every two minutes) makes them unsuitable for *live* payment triggers. The provided content does not indicate a real-time RA API or local event system within RetroArch's RA client, suggesting that direct, real-time event detection would require parsing achievement logic and monitoring RAM addresses independently via RetroArch's UDP memory polling.

## Questions to Answer

### 1. RA Rich Presence protocol — parse scripts for RAM addresses and game state logic?

Yes, the RA Rich Presence protocol allows for parsing scripts to extract RAM addresses and game state logic. The `rich-presence.html` documentation explicitly states that Rich Presence scripts "check the player's game memory and reports the values of certain addresses with definitions assigned by the developer."

**Example from Super Mario Bros. Rich Presence script:**
*   `@Mode(0xh770)`: Reads an 8-bit value at memory address `0x770` and applies a `Mode` lookup.
*   `@Digit(0xh75f_v1)`: Reads an 8-bit value at memory address `0x75f` (with `_v1` indicating a specific value definition) and formats it as a digit.
*   `Lookup:Mode 0=[Demo] 2=[World Complete]`: Defines how raw memory values are converted into user-friendly strings.
*   `Format:Digit FormatType=VALUE`: Defines how a value should be formatted.

However, the `rich-presence.html` document also states that this information is "reported back to the website once every two minutes," meaning it is not suitable for *live* payment triggers that require real-time event detection.

### 2. RA Achievement definitions — parse achievement conditions to detect game events?

Yes, RA achievement definitions can be parsed to detect game events. The `achievement-development-overview.html` and `condition-syntax.html` documents detail how achievements are constructed using conditions tied to specific RAM addresses, values, and logical operations. These conditions are machine-readable and designed to detect precise game state changes.

**Key elements for parsing achievement conditions:**
*   **Memory Sizes:** Prefixes like `0xH` for 8-bit, `0x` for 16-bit, `0xX` for 32-bit, `0xM` for Bit0, etc. (from `condition-syntax.html`).
*   **Prefixes:** `d` for Delta (value change), `p` for Prior (previous value), `b` for BCD (Binary-Coded Decimal) (from `condition-syntax.html`).
*   **Logical Flags:** `T:` for Trigger, `P:` for PauseIf, `R:` for ResetIf, `N:` for AndNext, `O:` for OrNext, etc. (from `condition-syntax.html`).
*   **Comparisons:** `=`, `<`, `<=`, `>`, `>=`, `!=` (from `achievement-development-overview.html`).

For example, a condition like `T:0xH1234=1` (from `condition-syntax.html`) indicates a trigger event when the 8-bit value at memory address `0x1234` becomes `1`. This structure is highly suitable for detecting specific game events like "player dealt damage" if the corresponding RAM addresses for health are known and monitored.

### 3. RA API — is there a live/websocket API, or only a REST polling API? Can we query current game state, active achievements, rich presence string in real-time? Rate limits? Auth requirements?

Based on the provided content, there is **no explicit mention of a live/websocket API** for RetroAchievements. The `rich-presence.html` document states that Rich Presence information is updated on the website "once every two minutes," which strongly implies a polling mechanism rather than real-time push.

The attempt to access `https://api.retroachievements.org/API/API_GetGameInfoAndUserProgress.php` resulted in an `HTTP Error 404: Not Found`, so no information could be gathered from that specific API endpoint.

Therefore, the provided content **does not offer information** on:
*   Whether a live/websocket API exists.
*   The ability to query current game state, active achievements, or rich presence strings in real-time via an API.
*   Any specific rate limits for API usage.
*   Authentication requirements for API access.

### 4. RetroArch + RA integration — hook into RetroArch's existing RA client to get achievement unlock events locally, without hitting the RA API at all? Is there a local event/callback system?

The provided content **does not explicitly state** if RetroArch's existing RA client exposes local events or a callback system for achievement unlock events or real-time RAM state changes that a third-party application could directly hook into.

The `RAInterface` README (`raw.githubusercontent.com/RetroAchievements/RAInterface/master/README.md`) indicates that emulators integrate with the RetroAchievements server by including `RA_Interface.cpp` and calling "hooks provided in RA_Interface.cpp at appropriate times to integrate with the RetroAchievements server via the RA_Integration.dll." This describes the client-server communication mechanism but does not specify any local, outward-facing event system for other applications running on the same machine.

### 5. Practical: for SF2 Turbo SNES, does RA have a rich presence script that reads health values?

The provided content **does not contain any specific Rich Presence scripts or achievement definitions for "SF2 Turbo SNES" or any other specific game's health values.**

While the Super Mario Bros. example in `rich-presence.html` shows how "lives" are read (`@Digit(0xh75a_v1)`), which is conceptually similar to health, this is not for SF2 Turbo. Therefore, based *solely* on the provided documents, it cannot be confirmed if RA has a rich presence script that reads health values for SF2 Turbo SNES.

## Gaps / Follow-Up

*   **RA API Documentation:** Investigate the official RetroAchievements API documentation (beyond the 404 link provided) to determine if there are any real-time APIs (websockets, server-sent events), specific polling endpoints for game state, rate limits, and authentication methods.
*   **RetroArch RA Client Source Code:** Examine the source code of RetroArch's RetroAchievements integration (e.g., `RA_Interface.cpp`, `RA_Integration.dll` if publicly available or through reverse engineering) to identify any local event hooks, callbacks, or memory-mapped files that could be used for real-time local event detection without relying on the RA server API.
*   **Game-Specific RA Data:** Access the RetroAchievements website for "SF2 Turbo SNES" (or other target games) to manually inspect published Rich Presence scripts and achievement definitions. This would confirm the existence of RAM addresses for health, score, or other relevant game events.

## Relevant Code/API Snippets

**Rich Presence Script Structure (from `developer-docs/rich-presence.html`):**

```
Format:Digit FormatType=VALUE
Lookup:Mode 0=[Demo] 2=[World Complete]
Lookup:Paused 0x81=▌▌ 0x80=▌▌ 1=▌▌
Display: @Mode(0xh770)@Paused(0xh776)@Star(0xM79f_0xN79f_0xo79f_0xP79f_0xQ79f_0xR79f)@Powerup(0xh0756) Mario in @Digit(0xh75f_v1)-@Digit(0xh75c_v1)@Swimming(0xh704)@Status(0xhe), 🚶:@Digit(0xh75a_v1), @Quest(0xh7fc) Quest
```

**Memory Address and Size Prefixes (from `developer-docs/condition-syntax.html`):**

| Size      | Prefix | Example   | Description                               |
| :-------- | :----- | :-------- | :---------------------------------------- |
| Bit0      | `0xM`  | `0xM01234` | Reads the 0th bit of the byte at 0x1234   |
| 8bit      | `0xH`  | `0xH01234` | Reads the 8-bit value at 0x1234           |
| 16bit     | `0x`   | `0x01234`  | Reads the 16-bit value at 0x1234          |
| 32bit     | `0xX`  | `0xX01234` | Reads the 32-bit value at 0x1234          |
| Lower4    | `0xL`  | `0xL01234` | Reads the lower 4 bits of the byte at 0x1234 |
| Upper4    | `0xU`  | `0xU01234` | Reads the upper 4 bits of the byte at 0x1234 |

**Modifier Prefixes (from `developer-docs/condition-syntax.html`):**

| Modifier | Prefix | Example   | Description                               |
| :------- | :----- | :-------- | :---------------------------------------- |
| Delta    | `d`    | `d0xH1234` | Value change of the 8-bit value at 0x1234 |
| Prior    | `p`    | `p0xH1234` | Previous value of the 8-bit value at 0x1234 |
| BCD      | `b`    | `b0xH1234` | BCD value of the 8-bit value at 0x1234    |

**Logical Flags (from `developer-docs/condition-syntax.html`):**

| Flag      | Prefix | Example    | Description                               |
| :-------- | :----- | :--------- | :---------------------------------------- |
| Trigger   | `T:`   | `T:0xH1234=1` | Triggers when 8-bit value at 0x1234 equals 1 |
| PauseIf   | `P:`   | `P:0xH1234=1` | Pauses achievement evaluation if condition is true |
| ResetIf   | `R:`   | `R:0xH1234=1` | Resets achievement progress if condition is true |
| AndNext   | `N:`   | `N:0xH1234=1` | Logical AND with the next condition       |
| OrNext    | `O:`   | `O:0xH1234=1` | Logical OR with the next condition        |