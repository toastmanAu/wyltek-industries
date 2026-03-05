# Research: retroachievements-ram-map-access-strategy

**Date:** 2026-03-05  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://retroachievements.org/devoops.php, https://api.retroachievements.org/API/API_GetGameInfoAndUserProgress.php, https://docs.retroachievements.org/developer-docs/achievement-development-overview.html, https://docs.retroachievements.org/developer-docs/condition-syntax.html, https://raw.githubusercontent.com/RetroAchievements/rcheevos/master/README.md

---

## Research Note: retroachievements-ram-map-access-strategy

**Date:** 2026-03-05

### Summary
The primary challenge for scaling FiberQuest's integration with RetroAchievements (RA) is programmatically accessing community-verified RAM maps and achievement conditions. Based on the provided content, there is no explicit unauthenticated or developer-level API endpoint that directly exposes achievement logic for a given game ID. While the `rcheevos` library exists to process RA data, clients are responsible for obtaining this data, and the public API endpoints provided resulted in errors. However, the exact syntax for achievement conditions, including RAM addresses, memory sizes, modifiers, and logical flags, is comprehensively documented, providing a clear blueprint for parsing once the raw condition strings can be acquired.

### 1. Is there an unauthenticated or developer-level API endpoint that exposes achievement conditions (including RAM addresses and logic) for a given game ID?
Based on the provided content, there is **no explicit unauthenticated or developer-level API endpoint** that exposes achievement conditions, including RAM addresses and logic, for a given game ID.
*   The attempt to access `https://retroachievements.org/devoops.php` resulted in an `HTTP Error 403: Forbidden`, indicating restricted access.
*   The attempt to access `https://api.retroachievements.org/API/API_GetGameInfoAndUserProgress.php` resulted in an `HTTP Error 404: Not Found`, meaning this specific endpoint does not exist.
*   The `rcheevos` library's `README.md` explicitly states that "**rcheevos** does *not* provide HTTP network connections. Clients must get data from RetroAchievements, and pass the response down to **rcheevos** for processing." It also notes that "Not all structures defined by **rcheevos** can be created via the public API," implying limitations on direct data retrieval. The `rapi` component is described as building URLs but not making HTTP requests.

### 2. Can we scrape or parse the achievement definition pages (if accessible) to extract RAM map data? What are the legal/ethical implications?
The provided content **does not include any actual "achievement definition pages"** from retroachievements.org that could be parsed. The `devoops.php` page, which might have contained such information, was inaccessible (403 Forbidden). The documentation pages (`achievement-development-overview.html`, `condition-syntax.html`) describe the *syntax* and *components* of achievement conditions but do not present live, game-specific achievement definitions or RAM map data for scraping.

Regarding legal/ethical implications, the provided content **does not discuss** the legal or ethical implications of scraping RetroAchievements.org. The documentation pages are released under the GPL-3 License and copyrighted by RetroAchievements, but this pertains to the documentation itself, not the data on the main site or the act of scraping.

### 3. Are there any community-maintained databases or tools that aggregate RA RAM map data that we could leverage?
Based on the provided content, **no community-maintained databases or tools that aggregate RA RAM map data are explicitly mentioned or identified** as leverageable for programmatic access. The `rcheevos` library is a C library for processing RA data, but it requires the client to obtain the data first, acting as a processing engine rather than a data source. "RATools" is mentioned in the developer documentation, but its function as a data aggregator is not described.

### 4. What is the exact format of achievement conditions (e.g., `0xH0000=0xV`) and how can it be parsed into a usable structure for event detection?
The exact format of achievement conditions is comprehensively detailed in the `https://docs.retroachievements.org/developer-docs/condition-syntax.html` document. Conditions are composed of several parts:

**General Structure:** `[FlagPrefix:]MemorySizePrefix[ModifierPrefix]Address[Operator]Value`

**Components:**
*   **Memory Size Prefixes:** Define the data size and endianness to read from RAM.
    *   Bits: `0xM` (Bit0), `0xN` (Bit1), `0xO` (Bit2), `0xP` (Bit3), `0xQ` (Bit4), `0xR` (Bit5), `0xS` (Bit6), `0xT` (Bit7)
    *   Bytes/Words: `0xL` (Lower4), `0xU` (Upper4), `0xH` (8bit), `0x` (16bit), `0xW` (24bit), `0xX` (32bit)
    *   Big Endian: `0xI` (16bit BE), `0xJ` (24bit BE), `0xG` (32bit BE)
    *   Special: `0xK` (BitCount), `fF` (Float), `fB` (Float BE), `fH` (Double32), `fI` (Double32 BE), `fM` (MBF32), `fL` (MBF32 LE)
*   **Modifier Prefixes:** Alter how the memory value is interpreted.
    *   `d`: Delta (value change since last frame)
    *   `p`: Prior (value from previous frame)
    *   `b`: BCD (Binary-Coded Decimal)
    *   `~`: Invert (bitwise NOT)
*   **Address:** A hexadecimal memory address (e.g., `01234`).
*   **Operators:** Comparison or arithmetic operations.
    *   General Comparisons: `=`, `<`, `<=`, `>`, `>=`, `!=` (from `achievement-development-overview.html`)
    *   Flag Specific Comparisons: `*`, `/`, `&` (from `achievement-development-overview.html`)
*   **Value:** The target value for comparison, typically hexadecimal or decimal.
*   **Logical Flags:** Control achievement state and logic.
    *   `P:` (PauseIf), `R:` (ResetIf), `Z:` (ResetNextIf), `A:` (AddSource), `B:` (SubSource), `C:` (AddHits), `D:` (SubHits), `I:` (AddAddress), `N:` (AndNext), `O:` (OrNext), `M:` (Measured), `G:` (Measured %), `Q:` (MeasuredIf), `T:` (Trigger), `K:` (Remember)

**Example:** `P:0xH1234=1`
*   `P:`: PauseIf flag
*   `0xH`: 8-bit memory size
*   `1234`: RAM address `0x1234`
*   `=`: Equality operator
*   `1`: Value to compare against

**Parsing into a usable structure for event detection (for the Node.js sidecar):**
A parser would need to:
1.  **Tokenize** the condition string to separate the flag, memory definition, address, operator, and value.
2.  **Identify the `Flag Prefix`**: This determines the condition's role (e.g., `Trigger` for completion, `ResetIf` for resetting progress).
3.  **Extract `Memory Size Prefix`**: This dictates the number of bytes to read from the game's RAM (via RetroArch's UDP READ_CORE_MEMORY protocol on port 55355) and how to interpret them (e.g., `0xH` for 1 byte, `0xX` for 4 bytes, `0xL` for lower nibble).
4.  **Extract `Modifier Prefix`**: Apply pre-processing to the raw RAM value (e.g., `d` requires storing the previous frame's value, `b` for BCD conversion).
5.  **Parse `Address`**: Convert the hexadecimal address to an integer for direct memory lookup.
6.  **Identify `Operator`**: Determine the comparison or arithmetic operation to perform.
7.  **Parse `Value`**: Convert the target value to the appropriate numeric type for comparison.
8.  **Construct a data structure**: Represent each condition as an object containing these parsed components. This object would then be evaluated against the live RAM data polled from RetroArch to detect game events (e.g., health damage, score changes) and trigger Fiber micropayments.

### Gaps / Follow-up
1.  **API for Achievement Data Retrieval:** The most critical gap is the lack of a documented, accessible API endpoint to programmatically retrieve achievement conditions (RAM maps and logic) for a given game ID. Further investigation into the `rcheevos` wiki (`https://github.com/RetroAchievements/rcheevos/wiki`) or the official RetroAchievements public API documentation (if it exists beyond the failed `API_GetGameInfoAndUserProgress.php` attempt) is required.
2.  **Scraping Feasibility & Policy:** Without access to actual achievement definition pages, the feasibility of scraping is unknown. A direct inquiry to RetroAchievements regarding their data access policy for non-interactive programmatic use would be beneficial to understand legal and ethical boundaries.
3.  **Community Tools/Databases:** While no such tools were identified in the provided content, a broader search for community-maintained repositories or databases of RA RAM maps (e.g., on GitHub, forums) could be a follow-up action.

### Relevant Code/API Snippets
*   **Condition Syntax Examples (from `condition-syntax.html`):**
    *   `P:0xH1234=1` (PauseIf 8-bit value at 0x1234 equals 1)
    *   `R:0xH1234=1` (ResetIf 8-bit value at 0x1234 equals 1)
    *   `A:0xH1234/2` (AddSource: 8-bit value at 0x1234 divided by 2)
*   **Memory Size Prefixes (from `condition-syntax.html`):**
    *   `0xH`: 8-bit
    *   `0x`: 16-bit
    *   `0xX`: 32-bit
    *   `0xL`: Lower4 (nibble)
    *   `d`: Delta modifier
    *   `p`: Prior modifier
*   **`rcheevos` Game Hashing (from `rcheevos/README.md`):**
    ```c
    void rc_hash_initialize_iterator(rc_hash_iterator_t* iterator, const char* path, const uint8_t* buffer, size_t buffer_size);
    int rc_hash_generate(char hash[33], uint32_t console_id, const rc_hash_iterator_t* iterator);
    ```
    *(Note: This is for game identification, not achievement data retrieval.)*