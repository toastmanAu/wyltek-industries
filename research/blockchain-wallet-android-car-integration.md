# Research: blockchain-wallet-android-car-integration

**Date:** 2026-03-22  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://raw.githubusercontent.com/nervosnetwork/fiber/main/README.md, https://developer.android.com/guide/topics/connectivity/nfc/nfc, https://developer.android.com/guide/topics/ui/picture-in-picture, https://raw.githubusercontent.com/btcontract/wallet/master/README.md, https://api.github.com/repos/nervosnetwork/fiber

---

Date: 2026-03-22

## Summary

This research surveyed prior art for blockchain wallets and payment integrations on Android car headunits, focusing on CKB and Fiber. The analysis found no existing crypto wallet APKs specifically targeting automotive Android in the provided content, nor any existing Fiber payment channel client for Android. While Android's Picture-in-Picture (PiP) mode is available for general overlay UI, specific implementations for persistent payment overlays were not detailed. NFC support on specific headunit hardware like Hispo S8/MTK was not covered, though Android generally supports NFC. Real-world use cases for in-vehicle micropayments, such as tolls, parking, and EV charging, are explicitly mentioned and align well with Fiber's low-cost, low-latency capabilities.

## Questions to Answer

### 1. Are there any existing crypto wallet APKs targeting car headunits or automotive Android?

Based on the provided content, there is no explicit mention of any existing crypto wallet APKs specifically targeting car headunits or automotive Android. The `btcontract/wallet` README describes "a non-custodial BTC wallet for Android devices" but does not specify automotive use. The Android Developers documentation mentions "Android for Cars" as a development target, but does not list any specific wallet APKs.

### 2. Has anyone built a Fiber (Lightning-style) payment client for Android?

No, the provided content does not indicate that anyone has built a Fiber payment client for Android. The `nervosnetwork/fiber` README describes the Fiber Network Node (FNN) as a "reference node implementation" written in Rust, with instructions for building and running it on a testnet. It lists "Web-browser friendly runtime" as a `TODO` item, but makes no mention of an Android-specific client or SDK. The "Project Ground Truth" explicitly states a "Key gap: no official Node.js Fiber client library exists — must build from Rust RPC source," which further implies the absence of official client libraries, including for Android.

### 3. How do apps implement persistent payment overlays in PiP mode on Android?

The provided content from `developer.android.com/guide/topics/ui/picture-in-picture` explains how to "Use picture-in-picture (PiP)" mode on Android generally. It describes PiP as a feature that allows users to watch video or continue a task in a small window while navigating between other apps. However, the documentation does not specifically detail how apps implement "persistent payment overlays" using PiP mode, nor does it provide examples or best practices for payment-specific UI in this context. It focuses on the general mechanism of PiP.

### 4. Is NFC supported on typical Hispo S8 / MTK headunit hardware?

The provided content does not specify whether NFC is supported on "typical Hispo S8 / MTK headunit hardware." The `developer.android.com/guide/topics/connectivity/nfc/nfc` documentation covers "NFC basics" and general NFC capabilities within the Android ecosystem, but it does not reference specific hardware models like Hispo S8 or MTK headunits.

### 5. What real-world use cases exist for micro-payments from a vehicle (tolls, parking, EV charging)?

The provided content explicitly lists "toll payments, parking, EV charging via micro-payments" as real-world use cases for micro-payments from a vehicle in the "Goal" section of the research topic. The "Fiber Network" description further supports these use cases by highlighting Fiber's capabilities for "Extremely low-cost micropayments, e.g. 0.0001 cent payment with 0.00000001 cent fee" and "Low latency, e.g. 0.0001 cent payment in your p2p connection latency, e.g. 20ms." These characteristics make Fiber well-suited for frequent, small-value transactions required in such scenarios. The "FiberQuest" project also demonstrates a related embedded micropayment use case, where game events trigger payments via Fiber channels.

## Gaps / Follow-up

1.  **Automotive-specific Wallet APKs:** Further research is needed to identify any crypto wallet APKs specifically designed or optimized for Android Automotive OS or general Android car headunits, beyond generic Android wallets.
2.  **Fiber Android Client:** The absence of an official Fiber client library for Android (or even Node.js) indicates a significant development gap. Investigation into potential Rust-to-Android (JNI) bindings or third-party efforts to create a Fiber client for mobile platforms would be beneficial.
3.  **PiP Payment Overlay Best Practices:** While PiP is a general Android feature, specific design patterns and implementation details for persistent, always-visible payment UIs in PiP mode would require further exploration of Android UI/UX guidelines or existing app examples.
4.  **Headunit NFC Hardware Support:** A hardware-specific inquiry or review of technical specifications for Hispo S8 / MTK headunits is required to confirm NFC support, as the provided Android documentation is general.

## Relevant Code/API Snippets

*   **Fiber Network Node (FNN) Build and Run:**
    ```bash
    cargo build --release
    mkdir /folder-to/my-fnn
    cp target/release/fnn /folder-to/my-fnn
    cp config/testnet/config.yml /folder-to/my-fnn
    cd /folder-to/my-fnn
    mkdir ckb
    ckb-cli account export --lock-arg --extended-privkey-path ./ckb/exported-key
    head -n 1 ./ckb/exported-key > ./ckb/key
    rm ./ckb/exported-key
    FIBER_SECRET_KEY_PASSWORD='YOUR_PASSWORD' RUST_LOG='info' ./fnn -c config.yml -d .
    ```
    (Source: `nervosnetwork/fiber` README.md)

*   **Key Wallet (BTC) Build from Source:**
    ```bash
    ./gradlew assembleRelease
    ls -l ./app/build/outputs/apk/release/app-release.apk
    ```
    (Source: `btcontract/wallet` README.md)

*   **Android Picture-in-Picture (PiP) API:**
    The provided content refers to `developer.android.com/guide/topics/ui/picture-in-picture`, which details the general API and usage for PiP mode on Android. While no specific code snippets are provided in the *excerpt*, the full documentation would contain relevant API calls for entering/exiting PiP, managing UI in PiP, etc.

*   **Android NFC API:**
    The provided content refers to `developer.android.com/guide/topics/connectivity/nfc/nfc`, which covers NFC basics for Android. Similar to PiP, the full documentation would contain relevant API calls for NFC operations (e.g., `NfcAdapter`, `Tag`, `NdefMessage`).