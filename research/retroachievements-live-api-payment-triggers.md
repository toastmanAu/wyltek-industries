# Research: retroachievements-live-api-payment-triggers

**Date:** 2026-03-05  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://docs.retroachievements.org/developer-docs/rich-presence.html, https://docs.retroachievements.org/developer-docs/achievement-development-overview.html, https://docs.retroachievements.org/developer-docs/condition-syntax.html, https://api.retroachievements.org/API/API_GetGameInfoAndUserProgress.php, https://raw.githubusercontent.com/RetroAchievements/RAInterface/master/README.md

---

Date: 2026-03-05

## Summary

RetroAchievements (RA) offers structured data formats for both Rich Presence scripts and Achievement definitions, which are highly suitable for extracting game RAM addresses and associated logic. Rich Presence scripts, like the Super Mario Bros. example, clearly define memory locations (e.g., `0xh770`) and how to interpret their values into human-readable strings. Achievement conditions use a similar syntax (`0xH1234=1`) to specify memory addresses, sizes, and comparison logic, making them machine-readable for event detection. The RA platform primarily uses a polling mechanism for status updates (every two minutes) rather than a live/websocket API. RetroArch integrates with RA via local C++ hooks and a `RA_Integration.dll`, suggesting potential local access to events, though specific local event callbacks are not detailed. The provided content does not include game-specific RAM maps for SF2 Turbo SNES.

## Questions to Answer

### 1. RA Rich Presence protocol — Can we parse RA Rich Presence scripts to get RAM addresses and game state logic for free, without writing our own RAM maps?

Yes, it is possible to parse RA Rich Presence scripts to extract RAM addresses and game state logic. The documentation explicitly details the structure of these scripts, which consist of `Format` objects, `Lookup` objects, and a `Display` object.

*   **RAM Address Extraction:** The `Display` string uses macros like `@Macro(value)` where `value` is a "value definition" that often includes a memory address. For example, the Super Mario Bros. example shows `Display: @Mode(0xh770)`. Here, `0xh770` represents a memory address (`0x770`) with a size prefix (`h` for 8-bit). The `condition-syntax.html` document further details these memory size prefixes (e.g., `0xH` for 8bit, `0x` for 16bit, `0xX` for 32bit).
*   **Game State Logic:** `Lookup` objects define mappings from raw memory values to user-friendly strings (e.g., `Lookup:Mode 0=[Demo] 2=[World Complete]`). `Format` objects define how raw values should be formatted (e.g., `Format:Score FormatType=SCORE`). By parsing these components, the logic for interpreting RAM values into meaningful game states can be programmatically extracted.

The Rich Presence scripts are essentially pre-written RAM maps with associated display logic, maintained by the RA community, making them a valuable resource for FiberQuest.

### 2. RA Achievement definitions — Can we parse achievement conditions to detect game events?

Yes, achievement conditions are machine-readable and can be parsed to detect specific game events. The `achievement-development-overview.html` and `condition-syntax.html` documents describe the syntax for defining achievement logic.

*   **Condition Structure:** Achievement conditions are built using various flags, memory value types, sizes, and comparisons. For example, a condition might specify `P:0xH1234=1` (PauseIf the 8-bit value at `0x1234` is `1`) or `T:0xH5678>0` (Trigger if the 8-bit value at `0x5678` is greater than `0`).
*   **RAM Address and Logic Extraction:** The `condition-syntax.html` page provides a comprehensive table of memory sizes (e.g., `0xM` for Bit0, `0xH` for 8bit, `0xX` for 32bit), prefixes (e.g., `d` for Delta, `p` for Prior, `b` for BCD), and logical flags (e.g., `P:` for PauseIf, `R:` for ResetIf, `T:` for Trigger, `A:` for AddSource, `N:` for AndNext). These elements allow for precise identification of RAM addresses, the data size to read, and the logical operations (comparisons, deltas, hit counts) that define a game event.
*   **Event Detection:** A "Player dealt damage" event could be represented by an achievement condition that checks for a decrease in a player's health memory address (e.g., using a Delta value comparison `d0xHHEALTH_ADDRESS < p0xHHEALTH_ADDRESS`). The `Trigger` flag (`T:`) is specifically designed to mark the condition that, when met, causes the achievement to unlock, making it a perfect indicator for a payment trigger.

### 3. RA API — Is there a live/websocket API, or only a REST polling API? Can we query current game state, active achievements, rich presence string in real-time? Rate limits? Auth requirements?

Based on the provided content:

*   **API Type:** The `rich-presence.html` document states that Rich Presence information "is reported back to the website once every two minutes." It further clarifies, "Every two minutes after that, the Rich Presence script will be evaluated again, and the 'Last Seen In' will be updated again." This indicates a **polling mechanism**, not a live/websocket API.
*   **Real-time Querying:** The 2-minute update interval suggests that querying current game state, active achievements, or the rich presence string in "real-time" (i.e., sub-second latency) via the RA API is **not supported** by the described mechanism. The updates are infrequent.
*   **Rate Limits/Auth:** The provided content does not mention any specific rate limits or authentication requirements for the RA API.
*   **API URL:** The provided URL `https://api.retroachievements.org/API/API_GetGameInfoAndUserProgress.php` resulted in an `HTTP Error 404: Not Found`, so no information could be retrieved from that specific endpoint.

### 4. RetroArch + RA integration — Can we hook into RetroArch's existing RA client to get achievement unlock events locally, without hitting the RA API at all? Is there a local event/callback system?

The `RAInterface/master/README.md` suggests a local integration approach:

*   **Local Integration:** "An emulator should include RA_Interface.cpp in its build and link against winhttp.lib. Then, the emulator can be modified to call the hooks provided in RA_Interface.cpp at appropriate times to integrate with the RetroAchievements server via the RA_Integration.dll."
*   **Event/Callback System:** While the README mentions "hooks provided in RA_Interface.cpp" and integration via `RA_Integration.dll`, it **does not explicitly detail a local event/callback system** for achievement unlock events. It implies that the emulator itself is the client and interacts with the server through this DLL. To determine if specific local callbacks for events like achievement unlocks are available, further investigation into the `RA_Interface.cpp` source code or the `RA_Integration.dll` would be required. The current content confirms a local integration point but not a direct "local event/callback system" for consumption by external processes without modifying the emulator itself.

### 5. Practical: for SF2 Turbo SNES, does RA have a rich presence script that reads health values? If yes, those RAM addresses are already verified and community-maintained — we can use them directly.

The provided source content **does not contain any game-specific Rich Presence scripts or RAM addresses for SF2 Turbo SNES**. The `rich-presence.html` document includes an "Example (Super Mario Bros.)" script, but this is a generic example to illustrate the format, not a comprehensive database of game-specific RAM maps. Therefore, based *solely* on the provided content, we cannot confirm if RA has a rich presence script that reads health values for SF2 Turbo SNES.

## Gaps / Follow-up

1.  **RetroArch RA Client Events:** Investigate the `RA_Interface.cpp` source code (or the `RA_Integration.dll` if source is unavailable) to determine if there are explicit local hooks or callbacks for achievement unlock events, game state changes, or Rich Presence string updates that can be accessed by an external process without modifying RetroArch itself. This is crucial for a non-invasive integration.
2.  **RetroAchievements API Documentation:** Locate the official and current RetroAchievements API documentation to understand available endpoints, data structures, rate limits, and authentication methods. The provided `API_GetGameInfoAndUserProgress.php` URL was a 404, indicating it might be outdated or incorrect.
3.  **Game-Specific RAM Maps:** To answer the SF2 Turbo SNES question, a direct query to the RetroAchievements website or community forums would be necessary to find the specific Rich Presence script or achievement definitions for that game, and extract the relevant RAM addresses for health.
4.  **Parsing Library/Tooling:** Research existing libraries or tools that can parse RA Rich Presence scripts and achievement condition syntax, or plan to develop a custom parser for the identified formats.

## Relevant Code/API Snippets

### Rich Presence Script Example (Super Mario Bros.)

From `https://docs.retroachievements.org/developer-docs/rich-presence.html`:

```
Format:Digit FormatType=VALUE
Lookup:Mode 0=[Demo] 2=[World Complete]
Lookup:Paused 0x81=▌▌ 0x80=▌▌ 1=▌▌
Lookup:Star 5=🌟 4=🌟 3=🌟 2=🌟 1=🌟
Lookup:Powerup 0=Small 1=Super 2=Fire
Lookup:Swimming 1= swimming
Lookup:Status 0= [Loading] 1= taking a vine warp 2= entering a warp pipe 3= entering a warp pipe 4= 🚩 5= [Stage Complete] 6= [Game Over] 7= [Entering Area] 9= growing 0xA= shrinking 0xB= 💀 0xC= powering up
Lookup:Quest 0x0=1st 0x1=2nd
Display: @Mode(0xh770)@Paused(0xh776)@Star(0xM79f_0xN79f_0xo79f_0xP79f_0xQ79f_0xR79f)@Powerup(0xh0756) Mario in @Digit(0xh75f_v1)-@Digit(0xh75c_v1)@Swimming(0xh704)@Status(0xhe), 🚶:@Digit(0xh75a_v1), @Quest(0xh7fc) Quest
```
*   **RAM Address Example:** `0xh770` (8-bit value at address `0x770`)
*   **Logic Example:** `Lookup:Mode 0=[Demo]` (maps value `0` to string `[Demo]`)

### Condition Syntax - Memory Sizes and Prefixes

From `https://docs.retroachievements.org/developer-docs/condition-syntax.html`:

**Memory sizes:**
| Size     | Prefix | Example    |
| :------- | :----- | :--------- |
| Bit0     | `0xM`  | `0xM01234` |
| 8bit     | `0xH`  | `0xH01234` |
| 16bit    | `0x`   | `0x01234`  |
| 32bit    | `0xX`  | `0xX01234` |
| Lower4   | `0xL`  | `0xL01234` |
| Upper4   | `0xU`  | `0xU01234` |

**Modifiers:**
| Modifier | Prefix | Example    |
| :------- | :----- | :--------- |
| Delta    | `d`    | `d0xH1234` |
| Prior    | `p`    | `p0xH1234` |
| BCD      | `b`    | `b0xH1234` |

**Logical Flags:**
| Flag        | Prefix | Example       |
| :---------- | :----- | :------------ |
| PauseIf     | `P:`   | `P:0xH1234=1` |
| ResetIf     | `R:`   | `R:0xH1234=1` |
| Trigger     | `T:`   | `T:0xH1234=1` |
| AndNext     | `N:`   | `N:0xH1234=1` |
| AddSource   | `A:`   | `A:0xH1234/2` |

### RetroArch RA Client Integration

From `https://raw.githubusercontent.com/RetroAchievements/RAInterface/master/README.md`:

```markdown
# RAInterface
This code is intended to be loaded into another repository as a submodule. An emulator should include RA_Interface.cpp in its build and link against winhttp.lib. Then, the emulator can be modified to call the hooks provided in RA_Interface.cpp at appropriate times to integrate with the RetroAchievements server via the RA_Integration.dll. See wiki for more details.
```