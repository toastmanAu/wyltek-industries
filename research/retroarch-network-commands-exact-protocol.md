# Research: retroarch-network-commands-exact-protocol

**Date:** 2026-03-05  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://raw.githubusercontent.com/libretro/RetroArch/master/command.c, https://raw.githubusercontent.com/libretro/RetroArch/master/network/net_http.c, https://raw.githubusercontent.com/libretro/RetroArch/master/command.h, https://retropie.org.uk/docs/RetroArch-Network-Commands/, https://raw.githubusercontent.com/libretro/RetroArch/master/retroarch.cfg

---

Date: 2026-03-05

## Summary

RetroArch's network command protocol uses UDP for stateless, plaintext communication. Commands are sent as newline-delimited strings to a default port of 55355. Responses are also sent via UDP as plaintext. While the general mechanism for network commands is evident in `command.c` and `command.h`, the specific command strings, argument formats, and response data structures for `READ_CORE_MEMORY` and `WRITE_CORE_MEMORY` are not present in the provided source content. Similarly, the exact `retroarch.cfg` settings to enable this functionality are not included. There are no explicit rate limits or keepalive mechanisms defined in the provided code, consistent with a stateless UDP protocol.

## Questions to Answer

### (1) Exact UDP packet format for READ_CORE_MEMORY request — is it plaintext or binary?

The UDP packet format for RetroArch network commands is **plaintext**.

*   `command.c` shows that incoming UDP data is received into a `char buf[2048]` buffer (`ssize_t ret = recvfrom(netcmd->net_fd, buf, sizeof(buf) - 1, 0, (struct sockaddr*)&netcmd->cmd_source, &netcmd->cmd_source_len);`).
*   This buffer is then processed by `command_parse_msg`, which uses `strtok_r(buf, "\n", &save)` to split commands by newline characters. This confirms a string-based, newline-delimited protocol.
*   Each token (command) is then passed to `command_parse_sub_msg` as a `const char *tok`.

**However, the exact command string and argument format for `READ_CORE_MEMORY` are NOT found in the provided source content.** The `enum event_command` in `command.h` does not list `CMD_EVENT_READ_CORE_MEMORY`, and the `command_parse_sub_msg` function in `command.c` does not contain logic for this specific command.

### (2) Exact response format — how is data returned, encoding?

Responses are returned via UDP as plaintext.

*   The `network_command_reply` function in `command.c` is responsible for sending responses: `sendto(netcmd->net_fd, s, len, 0, (struct sockaddr*)&netcmd->cmd_source, netcmd->cmd_source_len);`. It takes a `const char *s` and `size_t len`, indicating a string-based response.

**However, the exact format and encoding of the data returned for a `READ_CORE_MEMORY` command are NOT found in the provided source content.** The code does not specify how memory content would be serialized into the `const char *s` buffer.

### (3) How to enable network commands in RetroArch config (retroarch.cfg settings)?

**The provided `retroarch.cfg` snippet does NOT contain the specific settings to enable network commands.**

However, based on the presence of `HAVE_NETWORK_CMD` preprocessor directives and the `command_network_new` function in `command.c`, it is highly probable that there are configuration options in `retroarch.cfg` such as `network_cmd_enable` (a boolean) and `network_cmd_port` (an integer) to control this functionality. The default port is `55355` as defined in `command.h`.

### (4) Is there a keepalive or connection concept, or is each read stateless?

Each read is **stateless**.

*   The `network_command_reply` function in `command.c` explicitly states: `/* Respond (fire and forget since it's UDP) */`.
*   The use of `sendto` and `recvfrom` (UDP socket functions) inherently implies a connectionless, stateless protocol where each packet is independent. There is no concept of a persistent connection or keepalive mechanism in the provided code.

### (5) WRITE_CORE_MEMORY format — useful for resetting state or injecting values for demo purposes?

**The exact command string and argument format for `WRITE_CORE_MEMORY` are NOT found in the provided source content.** Similar to `READ_CORE_MEMORY`, `CMD_EVENT_WRITE_CORE_MEMORY` is not listed in the `enum event_command` in `command.h`, and there is no specific parsing logic for it in the provided `command.c` snippet.

If it exists and follows the general command structure, it would be a plaintext command string followed by arguments (e.g., memory address, value, length) separated by spaces or colons.

### (6) Any rate limit or timing constraints on polling frequency?

**There are no explicit rate limits or timing constraints on polling frequency defined within the provided `command.c` source code.**

The `command_network_poll` function is called periodically by RetroArch's main loop. The frequency at which this function is invoked would determine how quickly incoming UDP commands are processed, but the function itself does not contain any internal throttling mechanisms. The only constraint is the `CMD_BUF_SIZE` (2048 bytes for network commands) for the incoming UDP packet buffer.

## Gaps / Follow-up

1.  **`READ_CORE_MEMORY` and `WRITE_CORE_MEMORY` Command Strings and Formats:** The most critical gap is the absence of the actual command strings, argument structures (e.g., address, length, data), and response formats for `READ_CORE_MEMORY` and `WRITE_CORE_MEMORY`. These commands are not listed in the provided `command.h` enum or handled in the `command.c` parsing logic. Further investigation into a more complete or specific RetroArch codebase (potentially the one used for FiberQuest) is required to find these definitions.
2.  **RetroArch Configuration for Network Commands:** The `retroarch.cfg` snippet provided does not include the settings to enable network commands (e.g., `network_cmd_enable`, `network_cmd_port`). These settings would be necessary to activate the network command listener.
3.  **`retropie.org.uk/docs/RetroArch-Network-Commands/`:** The provided URL resulted in a 404 error, so this external documentation could not be consulted. If an updated or alternative link exists, it should be investigated.
4.  **Error Handling for `READ_CORE_MEMORY`:** The provided code does not detail how errors (e.g., invalid address, out-of-bounds read) would be communicated in the response for memory-related commands.

## Relevant Code/API Snippets

**`command.h`**
```c
#define DEFAULT_NETWORK_CMD_PORT 55355
```

**`command.c`**
```c
#if defined(HAVE_NETWORK_CMD)
typedef struct {
   /* Network socket FD */
   int net_fd;
   /* Source address for the command received */
   struct sockaddr_storage cmd_source;
   /* Size of the previous structure in use */
   socklen_t cmd_source_len;
} command_network_t;

static void network_command_reply(command_t *cmd, const char *s, size_t len) {
   command_network_t *netcmd = (command_network_t*)cmd->userptr;
   /* Respond (fire and forget since it's UDP) */
   sendto(netcmd->net_fd, s, len, 0, (struct sockaddr*)&netcmd->cmd_source, netcmd->cmd_source_len);
}

static void command_network_poll(command_t *handle) {
   ssize_t ret;
   char buf[2048]; // Buffer for incoming UDP data
   command_network_t *netcmd = (command_network_t*)handle->userptr;

   if (netcmd->net_fd < 0)
      return;

   netcmd->cmd_source_len = sizeof(netcmd->cmd_source);
   if ((ret = recvfrom(netcmd->net_fd, buf, sizeof(buf) - 1, 0, (struct sockaddr*)&netcmd->cmd_source, &netcmd->cmd_source_len)) < 0) {
      if (errno == EAGAIN || errno == EWOULDBLOCK)
         return;
      RARCH_ERR("[NetCMD] recvfrom failed: %s\n", strerror(errno));
      return;
   }

   buf[ret] = '\0'; // Null-terminate the received data
   command_parse_msg(handle, buf); // Parse the received plaintext message
}

command_t* command_network_new(const char *addr, unsigned port) {
   // ... (socket creation, binding, non-blocking setup)
   // Binds to the specified address and port (or default 55355 if not specified)
   // ...
}
#endif

static void command_parse_msg(command_t *handle, char *buf) {
   char *save = NULL;
   const char *tok = strtok_r(buf, "\n", &save); // Splits messages by newline
   while (tok) {
      command_parse_sub_msg(handle, tok); // Processes each command token
      tok = strtok_r(NULL, "\n", &save);
   }
}

static bool command_get_arg(const char *tok, const char **arg, unsigned *index) {
   // Utility to parse arguments from a command string
   // ...
}
```