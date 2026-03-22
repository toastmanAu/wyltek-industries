# Research: ickb-fiber-channel-compatibility

**Date:** 2026-03-22  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://raw.githubusercontent.com/ickb/whitepaper/main/2024_overview.md, https://api.github.com/repos/ickb/v1-core/issues?state=open&per_page=10, https://api.github.com/repos/nervosnetwork/fiber/issues?state=open&labels=UDT&per_page=10, https://raw.githubusercontent.com/nervosnetwork/fiber/main/docs/specs/xudt.md

---

Date: 2026-03-22

## Research Note: ickb-fiber-channel-compatibility

### Summary
Research into iCKB and Fiber compatibility, yield harvesting, depeg scenarios, and CCC integration is significantly limited by the lack of accessible documentation. While the Fiber network explicitly supports routing payments in UDTs, specific confirmation regarding iCKB xUDT compatibility, tools for yield harvesting, details on depeg resilience mechanisms for iCKB, or the current status of CCC integration within iCKB are not found in the provided content. Fiber channels are opened and closed via CKB on-chain transactions, and while UDTs can be routed, it is not explicitly stated if iCKB can be used for the initial channel funding itself.

### 1. Is iCKB xUDT explicitly confirmed compatible with Fiber payment channels? Any docs/issues from the teams?
Fiber is designed to route payments in both CKB and UDTs. The "Fiber Network" section states: "Fiber CANNOT store arbitrary data or files — only routes payments (CKB, UDTs)". Given that iCKB is referred to as an "xUDT" in the research question, this implies that iCKB, as a UDT, should be routable through Fiber channels in principle.

However, explicit confirmation *specifically for iCKB xUDT* compatibility with Fiber payment channels, or any specific documentation/issues from either the iCKB or Fiber teams addressing this, are **not found in the provided content**. The attempts to fetch `ickb/whitepaper`, `ickb/v1-core/issues`, `nervosnetwork/fiber/issues` (filtered for UDTs), and `nervosnetwork/fiber/main/docs/specs/xudt.md` either resulted in fetch errors (404 Not Found) or returned empty results.

### 2. Are there tools or APIs for automatic iCKB yield harvesting and CKB conversion?
Information regarding tools or APIs for automatic iCKB yield harvesting and CKB conversion is **not found in the provided content**.

### 3. What are the real-world depeg scenarios for iCKB and what resilience mechanisms exist?
Details on real-world depeg scenarios for iCKB and any existing resilience mechanisms are **not found in the provided content**.

### 4. What is the current status of CCC integration in iCKB? Is Lumos fully replaced or still in progress?
The provided content mentions `@ckb-ccc/core` as the "primary JS SDK for CKB transaction building" and notes its use in the `ckb-dob-minter`. However, there is **no information found in the provided content** regarding the current status of CCC integration specifically within iCKB, nor any mention of Lumos in relation to iCKB or its replacement status.

### 5. Can iCKB be used as channel funding in Fiber or only CKB?
The "Fiber Network" section states: "Fiber channels open/close via CKB on-chain transactions; everything in between is off-chain". This indicates that the on-chain transactions for opening and closing Fiber channels are denominated in CKB. While Fiber "routes payments (CKB, UDTs)", which implies UDTs (like iCKB) can be transferred within an established channel, the provided content **does not explicitly state** whether iCKB can be used for the *initial channel funding* itself, or if only CKB can fund the channel capacity that then allows for UDT transfers.

### Gaps / Follow-up
The primary gap is the complete absence of specific documentation from the iCKB project (whitepaper, issues) and detailed Fiber documentation concerning xUDT integration. This severely limits the ability to answer most questions.

Follow-up actions should include:
*   Locating the current iCKB whitepaper or official documentation.
*   Searching for iCKB project repositories for discussions or issues related to Fiber compatibility, yield, or CCC integration.
*   Investigating Fiber documentation for explicit details on UDT channel funding mechanisms beyond just routing.

### Relevant Code/API Snippets
No relevant code or API snippets could be extracted from the provided source content that directly answer the research questions, as the external links either returned 404 errors or empty results.

---

## ⚠️ Quality Note

Findings are thin — seeds did not return sufficient content to answer the research questions. This task has been automatically re-queued with a request for better seeds.

**Thin phrase count:** 8  
**Content length:** 4018 chars
