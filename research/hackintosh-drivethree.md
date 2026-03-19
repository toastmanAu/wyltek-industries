# Research Finding: hackintosh-drivethree

Date: 2026-03-19
Task: hackintosh-drivethree
Priority: HIGH

---

Date: 2026-03-19

## Research Findings: Hackintosh on driveThree (i7-14700K, RTX 3060 Ti)

### Brief Summary
The provided web content introduces OpenCore as a bootloader for installing macOS on x86-based PCs and explains the role of ACPI tables (DSDT/SSDTs) in correcting hardware compatibility for macOS. It also details the ProperTree plist editor, which assists in configuring OpenCore's `config.plist`. The latest stable OpenCore version is 1.0.6. However, the content lacks specific details regarding the compatibility of the i7-14700K (Raptor Lake Refresh) CPU and the RTX 3060 Ti GPU with macOS, as well as a comprehensive list of required kexts for this particular hardware. It does highlight general ACPI patching needs for modern Intel systems.

### Answers to Questions

#### 1. Is the i7-14700K (Raptor Lake Refresh) supported by OpenCore for macOS? Which macOS versions work best?
*   **Support:** The provided content does **not explicitly state** whether the i7-14700K (Raptor Lake Refresh) is supported by OpenCore for macOS. The "Getting started with ACPI" guide mentions "Intel Haswell and newer CPUs" for native CPU power management via the "Plugin type" SSDT, which broadly covers newer Intel architectures, but does not specifically confirm 14th generation Raptor Lake Refresh support.
*   **Best macOS Versions:** The content does **not provide information** on which macOS versions work best with the i7-14700K. The Dortania OpenCore Install Guide is a general guide for "Installing macOS on an X86-based PC" but does not specify macOS version compatibility based on CPU generation.

#### 2. Is the RTX 3060 Ti supported in macOS natively or via patching? If not, can iGPU (Intel UHD 770) handle display output?
*   **RTX 3060 Ti Support:** The provided content does **not mention** the RTX 3060 Ti, NVIDIA 30 series GPUs, or any specific NVIDIA GPU support (native or via patching) in macOS.
*   **iGPU (Intel UHD 770) Support:** The provided content does **not mention** the Intel UHD 770 iGPU or any specific Intel integrated graphics support for display output.

#### 3. What kexts are required for i7-14700K (Lilu, WhateverGreen, AppleALC, etc.) and where to get them?
*   The provided content does **not explicitly list** specific kexts (like Lilu, WhateverGreen, AppleALC, etc.) required for the i7-14700K.
*   The Dortania OpenCore Install Guide mentions that OpenCore is used to "inject new data for macOS such as SMBIOS, ACPI tables and kexts," but it does not specify which kexts are needed for a 14th gen Intel CPU.
*   The "Getting started with ACPI" guide focuses on ACPI patches (SSDTs) for CPU power management ("Plugin type" for "Intel Haswell and newer CPUs"), embedded controllers, and system clocks, which are distinct from kexts.
*   **Where to get them:** The content does not provide direct links or instructions on where to obtain specific kexts.

#### 4. What are the known pitfalls or unsupported features (USB mapping, Wi-Fi, sleep, etc.)?
Based on the "Getting started with ACPI" guide, the following are known areas requiring attention (pitfalls if not addressed) for modern Intel systems, which would likely apply to the i7-14700K:
*   **Embedded Controllers (EC):** Semi-modern Intel machines' ECs are generally incompatible with macOS and can cause panics. They need to be hidden, and a dummy EC created for macOS Catalina and newer.
*   **CPU Power Management (Plugin Type):** An SSDT is required for native CPU power management (XCPM) on "Intel Haswell and newer CPUs."
*   **AWAC System Clock:** For 300 series motherboards (and newer), macOS cannot communicate with AWAC clocks. This requires forcing the legacy RTC clock or creating a fake one.
*   **NVRAM:** True 300 series motherboards (non-Z370) may not declare the FW chip as MMIO in ACPI, requiring an SSDT to restore NVRAM support.
*   **IRQ Conflicts:** While "Skylake and newer systems rarely have IRQ conflicts," older systems might need IRQ SSDT and ACPI patches.
*   **Unsupported Features:** The content does **not mention** specific pitfalls or unsupported features related to USB mapping, Wi-Fi, or sleep for this particular hardware configuration.

#### 5. What is the complete EFI folder structure needed for OpenCore to boot macOS on this hardware?
The provided content does not offer a complete, explicit, step-by-step EFI folder structure. However, the ProperTree README, when describing the "OC Snapshot" function, implies the following core directories within the OpenCore EFI structure:
*   `EFI/OC/ACPI/`: For ACPI files (SSDTs, DSDTs).
*   `EFI/OC/Drivers/`: For UEFI drivers (e.g., HfsPlus.efi, OpenRuntime.efi).
*   `EFI/OC/Kexts/`: For kernel extensions (kexts).
*   `EFI/OC/Tools/`: For OpenCore tools (e.g., OpenShell.efi).
*   `EFI/OC/config.plist`: The main configuration file.

This structure is inferred from ProperTree's functionality, which "walk[s] the contents of ACPI, Kexts, Tools, and Drivers directories within that folder - comparing all entries to the current document's `ACPI -> Add`, `Kernel -> Add`, `Misc -> Tools`, and `UEFI -> Drivers` respectively."

### Key Facts, Code Snippets, Version Numbers
*   **OpenCore Version:** The latest stable OpenCore version is `1.0.6`. (Source: `api.github.com/repos/acidanthera/OpenCorePkg/releases/latest`)
*   **OpenCore Purpose:** "OpenCore is what we refer to as a "boot loader" – it is a complex piece of software that we use to prepare our systems for macOS – specifically by injecting new data for macOS such as SMBIOS, ACPI tables and kexts." (Source: `dortania/OpenCore-Install-Guide/master/README.md`)
*   **ProperTree:** A cross-platform GUI plist editor for configuring OpenCore's `config.plist`. It features "OC (Clean) Snapshot" to manage ACPI, Drivers, Kexts, and Tools entries. (Source: `corpnewt/ProperTree/master/README.md`)
*   **ACPI Patches:** Essential for "Intel Haswell and newer CPUs" for XCPM, and for addressing issues with Embedded Controllers, AWAC clocks, and NVRAM on modern motherboards. (Source: `dortania/Getting-Started-With-ACPI/master/README.md`)

### Gaps / Unanswered Questions
*   Explicit confirmation of i7-14700K (Raptor Lake Refresh) support by OpenCore and specific macOS versions known to work best.
*   Support status of the RTX 3060 Ti dGPU in macOS (native drivers or patching requirements).
*   Support status of the Intel UHD 770 iGPU for display output.
*   A definitive list of required kexts (e.g., Lilu, WhateverGreen, AppleALC) for the i7-14700K.
*   Specific known pitfalls or unsupported features related to USB mapping, Wi-Fi, and sleep for this exact hardware configuration.
*   A complete, detailed EFI folder structure with all necessary files and their recommended placement, beyond the top-level directories.

### Recommended Next Steps
1.  **Consult the full Dortania OpenCore Install Guide:** The provided content is only the `README.md` of the guide. The full guide (e.g., `prerequisites.md`, `why-oc.md`, and subsequent pages) would likely contain more specific information on CPU/GPU compatibility, required kexts, and detailed EFI setup.
2.  **Research specific hardware compatibility:** Search for community-reported compatibility for i7-14700K (Raptor Lake Refresh) and RTX 3060 Ti with OpenCore and macOS versions on forums like r/Hackintosh or the Hackintosh Discord, as suggested by the Dortania guide.
3.  **Identify necessary kexts:** Based on the full Dortania guide or community resources, determine the specific kexts required for the i7-14700K, motherboard, and other components (e.g., audio, Ethernet).
4.  **Plan ACPI patches:** Utilize the "Getting started with ACPI" guide (and its subsequent pages, e.g., `ssdt-platform.md`) to identify and create the necessary SSDTs for CPU power management, EC, AWAC, and NVRAM, considering the 14th gen Intel CPU and likely 600/700 series motherboard.

### Sources Consulted
*   `https://raw.githubusercontent.com/acidanthera/OpenCorePkg/master/README.md`
*   `https://raw.githubusercontent.com/dortania/OpenCore-Install-Guide/master/README.md`
*   `https://api.github.com/repos/acidanthera/OpenCorePkg/releases/latest`
*   `https://raw.githubusercontent.com/dortania/Getting-Started-With-ACPI/master/README.md`
*   `https://raw.githubusercontent.com/corpnewt/ProperTree/master/README.md`