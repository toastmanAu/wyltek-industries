# Research: retroachievements-ram-maps

**Date:** 2026-03-05  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://retroachievements.org/devoops.php, https://api.retroachievements.org/v1/game/228/achievements, https://raw.githubusercontent.com/RetroAchievements/rcheevos/master/README.md, https://retroachievements.org/game/228

---

## Research Note: retroachievements-ram-maps

**Date:** 2026-03-05

### Summary
The provided content primarily describes the `rcheevos` C library, which helps emulators process RetroAchievements data, including achievements and leaderboards. It outlines how clients should interact with RetroAchievements servers (using `rc_client_t` and `rapi` to build URLs, but clients must handle HTTP requests themselves) and how games are identified (`rhash`). However, the content explicitly states that `rcheevos` does not handle network connections, and crucial API endpoints and documentation links (e.g., `api.retroachievements.org`, `retroachievements.org/devoops.php`, `developer-docs`) resulted in fetch errors (403 Forbidden or 404 Not Found). Consequently, specific details about the RetroAchievements data format, public API endpoints for fetching RAM maps, concrete game-specific RAM addresses, or a "rich presence" feature are largely unavailable in the provided sources.

### Achievement Condition Format
The provided content does not explicitly detail the `.json` or achievement condition format that specifies memory addresses and conditions. It states that `rcheevos` is a library that "tries to make it easier for emulators to process RetroAchievements data, providing support for achievements and leaderboards." It also mentions that "An understanding about how achievements are developed may be useful, you can read more about it [here](https://docs.retroachievements.org/developer-docs/)," but this link was not provided for analysis. The failed API call to `https://api.retroachievements.org/v1/game/228/achievements` would likely have provided an example of this format.

### Fetching Game RAM Maps via RA Public API
The provided content does not specify a public API endpoint for fetching game RAM maps, nor does it confirm if such an API exists without authentication.
The `rcheevos` library itself "does *not* provide HTTP network connections. Clients must get data from RetroAchievements, and pass the response down to **rcheevos** for processing." The `rapi` component "builds URLs to access many RetroAchievements web services" but "does *not* make HTTP requests." The `rc_client_t` functions are described as the "preferred way to have a client interact with the server" and include "callback functions which allow the client to implement dependent functionality (UI and HTTP calls)."
While `rc_consoles.h` is mentioned to enumerate supported platforms, noting that "some consoles in the enum are not yet fully supported (may require a memory map or some way to uniquely identify games)," this indicates that memory maps are a concept within the RetroAchievements ecosystem, but no API to fetch them is provided in the given text.

### Specific RAM Addresses for Games
The provided content does not contain any specific RAM addresses for Street Fighter II (health bars, round win, game over), Bomberman (lives, kills), or any Pong variant (scores). The `rcheevos` README focuses on the library's functionality and integration, not on game-specific data.

### RetroAchievements "Rich Presence" Feature
The provided content does not mention a "rich presence" feature that tracks general game state beyond what is necessary for achievements and leaderboards. The `rc_client_t` functions are noted for "building the active/inactive achievements list for the UI," but there is no indication of a broader game state tracking or querying mechanism.

### Lookup Table: Game → RAM Addresses → Payment Trigger Conditions
Based on the provided content, it is not possible to construct the requested lookup table.
1.  **Game:** While game identification (`rhash`) is discussed, no specific game IDs are provided in context with RAM addresses.
2.  **RAM Addresses:** No concrete RAM addresses for any game are present in the source material.
3.  **Payment Trigger Conditions:** The specific format or details of achievement conditions (which would serve as "payment trigger conditions") are not described, although the `rcheevos` library processes them.

### Gaps / Follow-up
A significant amount of information is missing due to the "FETCH ERROR" messages for key URLs:
*   `https://retroachievements.org/devoops.php`: This URL was forbidden (403), and likely contained developer-specific information.
*   `https://api.retroachievements.org/v1/game/228/achievements`: This specific API endpoint for game achievements was not found (404), preventing direct inspection of the achievement data format.
*   `https://retroachievements.org/game/228`: This game page was forbidden (403), which might have shown achievement details or links to memory maps.
*   The `https://docs.retroachievements.org/developer-docs/` link mentioned in the `rcheevos` README was not provided for analysis. This documentation would be crucial for understanding the achievement data format and potentially API specifics.
*   The `https://github.com/RetroAchievements/rcheevos/wiki` link was mentioned multiple times but not provided for analysis. This wiki likely contains detailed API documentation for `rcheevos` and `rapi` functions, which might shed light on how to fetch or interpret achievement data and memory maps.

To answer the research questions fully, access to the RetroAchievements developer documentation, API documentation (especially the wiki), and live API endpoints would be required.

### Relevant Code/API Snippets
The provided content describes the `rcheevos` library's structure and components rather than specific API calls for fetching data.

*   **Error Handling:**
    ```c
    const char* rc_error_str(int ret);
    ```
    (Used to convert `rc_error.h` return codes to human-readable strings.)

*   **Game Hashing (Identification):**
    ```c
    void rc_hash_initialize_iterator(rc_hash_iterator_t* iterator, const char* path, const uint8_t* buffer, size_t buffer_size);
    int rc_hash_generate(char hash[33], uint32_t console_id, const rc_hash_iterator_t* iterator);
    int rc_hash_iterate(char hash[33], rc_hash_iterator_t* iterator);
    void rc_hash_destroy_iterator(rc_hash_iterator_t* iterator);
    ```
    (Functions from `rc_hash.h` for generating a RetroAchievements hash for a given game.)

The content mentions `rc_client_t` functions for managing an active game and interacting with the server, and `rapi` headers (`rc_api_user.h`, `rc_api_runtime.h`, `rc_api_common.h`) for building URLs, but the specific functions for fetching achievement data or memory maps are not detailed in the provided text.