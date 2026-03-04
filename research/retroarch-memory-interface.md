# Research: retroarch-memory-interface

**Date:** 2026-03-05  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://raw.githubusercontent.com/libretro/RetroArch/master/command.h, https://raw.githubusercontent.com/libretro/RetroArch/master/network/netplay/netplay.h, https://docs.libretro.com/development/retroarch/network-control-interface/, https://raw.githubusercontent.com/RetroAchievements/RAIntegration/master/README.md, https://api.github.com/repos/RetroAchievements/rcheevos/contents/

---

## Research Note: retroarch-memory-interface

**Date:** 2026-03-05

### Summary
RetroArch provides a network control interface primarily over UDP on port 55355, enabling external applications to interact with the emulator using plain text commands. This interface supports memory access operations like `READ_CORE_MEMORY` and `WRITE_CORE_MEMORY`, which use hexadecimal addresses and data, and a `GET_STATUS` command that returns a JSON string with current system information. While the UDP protocol offers low latency, specific polling limits are not defined, and performance depends on usage. The RetroAchievements system monitors emulator RAM, with game-specific address maps and achievement logic fetched dynamically from RetroAchievements.org servers, rather than being stored in local `.rAchievement` files. Specific RAM addresses for popular games are not available in the provided documentation.

### 1. READ_CORE_MEMORY / WRITE_CORE_MEMORY UDP protocol (exact byte format, response format, error handling)

*   **Protocol**: UDP, default port 55355.
*   **Command Format**: All commands are sent as plain text strings, terminated by a newline character (`\n`).

*   **READ_CORE_MEMORY**:
    *   **Request Format**: `READ_CORE_MEMORY <address> <size>\n`
        *   `<address>`: A hexadecimal string representing the memory address (e.g., `0x1234`).
        *   `<size>`: A decimal string representing the number of bytes to read (e.g., `16`).
    *   **Response Format**: `READ_CORE_MEMORY <address> <size> <hex_data>\n`
        *   `<address>`: The hexadecimal address from the request.
        *   `<size>`: The decimal size from the request.
        *   `<hex_data>`: A hexadecimal string representing the read memory bytes, with two characters per byte (e.g., `00FF1A`).
    *   **Error Handling**: If the read operation fails (e.g., due to an invalid address or size), the response will be `ERROR\n`.

*   **WRITE_CORE_MEMORY**:
    *   **Request Format**: `WRITE_CORE_MEMORY <address> <hex_data>\n`
        *   `<address>`: A hexadecimal string representing the memory address.
        *   `<hex_data>`: A hexadecimal string representing the bytes to write (e.g., `010203`).
    *   **Response Format**: `WRITE_CORE_MEMORY <address> <size_written>\n`
        *   `<address>`: The hexadecimal address from the request.
        *   `<size_written>`: A decimal string indicating the number of bytes successfully written.
    *   **Error Handling**: If the write operation fails, the response will be `ERROR\n`.

### 2. GET_STATUS response format

*   **Request Format**: `GET_STATUS\n`
*   **Response Format**: The `GET_STATUS` command returns a JSON string containing various information about the current state of RetroArch.
    *   **Example Fields (as mentioned in documentation)**: `state`, `core_name`, `game_name`, `fps`, `volume`, `paused`.
    *   **Exact JSON structure**: The precise JSON schema for the `GET_STATUS` response is not provided in the source content.

### 3. How to identify which game/core is running

*   Through the network control interface, the `GET_STATUS` command's JSON response includes the `core_name` and `game_name` fields, which can be parsed to identify the currently loaded core and content.
*   Internally, RetroArch tracks this information, as evidenced by the `netplay_room` structure (found in `network/netplay/netplay.h`), which contains fields such as `corename`, `gamename`, and `subsystem_name`.

### 4. Polling frequency limits

*   The provided documentation does not specify any explicit polling frequency limits for the network control interface.
*   However, it notes that "excessive polling might impact performance, especially on resource-constrained systems or with large memory reads." Users are expected to manage polling frequency responsibly to avoid performance degradation.

### 5. Latency characteristics

*   The network control interface uses UDP, a connectionless protocol generally known for lower overhead compared to TCP, which contributes to lower latency.
*   Actual latency will vary depending on network conditions, RetroArch's current processing load, and the size of the data being requested or sent.
*   Specific latency figures or benchmarks are not provided in the source content.
*   While the `netplay_client_info_t` struct in `netplay/netplay.h` includes a `ping` field, this is specific to netplay client-server communication and not directly applicable to the general memory interface's latency.

### 6. Libretro achievement/cheevos system — how RAM address maps work, where they're stored, format of .rAchievement files.

*   **RAM Address Maps**:
    *   RAM address maps are specific to each game and console.
    *   They are an integral part of the achievement definitions themselves, typically defined by the RetroAchievements community.
*   **Storage Location**:
    *   Achievement logic, including memory addresses, is **not** stored in separate `.rAchievement` files within the RetroArch installation.
    *   Instead, this information is stored on the RetroAchievements.org server and is downloaded by RetroArch when a game is loaded.
*   **`.rAchievement` File Format**:
    *   The format of `.rAchievement` files is not explicitly detailed in the provided content.
    *   The documentation explicitly states that these files are not stored locally in the RetroArch installation, implying that the achievement definitions are fetched dynamically from the RetroAchievements.org server in a format internal to their system and handled by the `RAIntegration` DLL.

### 7. Find 3-5 popular 2-player competitive games (Street Fighter II, Bomberman, Mario Kart, Pong variants) and their known RAM addresses for: score, health/lives, player positions, game-over state.

*   The provided source content **does not contain any specific RAM addresses** for Street Fighter II, Bomberman, Mario Kart, Pong variants, or any other games.
*   The documentation mentions that "RAM address maps are specific to each game and console" and "are typically defined by the RetroAchievements community," but it does not list any such addresses.

### Gaps / Follow-up

*   **GET_STATUS JSON Schema**: The exact JSON structure and all possible fields for the `GET_STATUS` command response are not fully detailed. A complete schema or comprehensive example would be beneficial.
*   **Polling Frequency Best Practices**: While no hard limits are stated, guidelines or recommendations for optimal polling frequencies to balance responsiveness and performance would be valuable.
*   **Latency Benchmarks**: Specific latency measurements for typical memory read/write operations under various network and system loads are not provided.
*   **RetroAchievements Internal Format**: Although `.rAchievement` files are not stored locally, understanding the internal data format of achievement definitions as they are fetched and processed by the `RAIntegration` DLL would be useful for advanced development.
*   **Game-Specific RAM Addresses**: The most significant gap is the absence of concrete RAM addresses for popular games. This information would need to be sourced from the RetroAchievements community databases or game-specific memory maps, which are beyond the scope of the provided RetroArch documentation.

### Relevant Code/API Snippets

*   **Default Network Command Port**:
    ```c
    #define DEFAULT_NETWORK_CMD_PORT 55355
    ```
    (Source: `command.h`)

*   **Netplay Room Information Structure (for internal game/core identification)**:
    ```c
    typedef struct netplay_room {
        // ... other fields ...
        int gamecrc;
        char nickname[NETPLAY_NICK_LEN];
        char frontend[NETPLAY_HOST_STR_LEN];
        char corename[NETPLAY_HOST_STR_LEN];
        char coreversion[NETPLAY_HOST_STR_LEN];
        char retroarch_version[NETPLAY_HOST_STR_LEN];
        char gamename[NETPLAY_HOST_LONGSTR_LEN];
        char subsystem_name[NETPLAY_HOST_LONGSTR_LEN];
        // ... other fields ...
    } netplay_room;
    ```
    (Source: `network/netplay/netplay.h`)

*   **RetroAchievements Hardcore Mode Toggle Command (internal event)**:
    ```c
    enum event_command {
        // ...
        CMD_EVENT_CHEEVOS_HARDCORE_MODE_TOGGLE,
        // ...
    };
    ```
    (Source: `command.h`)