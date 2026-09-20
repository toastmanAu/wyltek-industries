# Research: opi3b-dual-display-dsi-hdmi-simultaneous

**Date:** 2026-03-22  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://raw.githubusercontent.com/orangepi-xunlong/orangepi-build/main/build/config/boards/opi3b.conf, https://raw.githubusercontent.com/rockchip-linux/kernel/release-5.10/arch/arm64/boot/dts/rockchip/rk3566-orangepi-3b.dtsi, https://raw.githubusercontent.com/torvalds/linux/master/drivers/gpu/drm/rockchip/, https://raw.githubusercontent.com/torvalds/linux/master/drivers/gpu/drm/bridge/synopsys/dw-hdmi.c, https://raw.githubusercontent.com/torvalds/linux/master/Documentation/devicetree/bindings/display/, https://raw.githubusercontent.com/xorg-x11-server/xorg-x11-server/master/doc/Xserver.7.sgml

---

Date: 2026-03-22

## Research Note: opi3b-dual-display-dsi-hdmi-simultaneous

### Summary
The provided content, primarily the `dw-hdmi.c` driver, offers insights into the HDMI output capabilities and its integration with the Linux DRM/KMS subsystem, including EDID reading and video mode management. However, due to `FETCH ERROR` for critical files like the Orange Pi 3B device tree and Rockchip DRM documentation, most questions regarding the RK3566 SoC's specific display architecture (VOP2, VP0/VP1 routing), DSI capabilities, Armbian's default configuration, and simultaneous dual-display management (DSI + HDMI) cannot be answered from the given sources. The feasibility of independent framebuffers for both outputs and hardware-level constraints remain largely unaddressed.

### Questions to Answer

1.  **What are the RK3566 SoC's native display output capabilities (VOP2, VP0/VP1 routing, HDMI/DSI capable)?**
    The provided content does not contain information about the RK3566 SoC's native display output capabilities, including details on VOP2, VP0/VP1 routing, or its DSI capabilities. The `dw-hdmi.c` file only pertains to the DesignWare HDMI controller.

2.  **How are DSI1 and HDMI routed in the device tree for OPi3B?**
    The `rk3566-orangepi-3b.dtsi` file, which would contain device tree routing information for DSI1 and HDMI on the Orange Pi 3B, returned a `FETCH ERROR` and was not available for analysis. Therefore, this question cannot be answered from the provided content.

3.  **Can both outputs be assigned to separate VOP2 video ports (VP0 for DSI, VP1 for HDMI)?**
    Information regarding the RK3566's VOP2 architecture and the assignment of display outputs to specific video ports (VP0, VP1) is not present in the provided `dw-hdmi.c` driver or any other accessible content. This question cannot be answered from the provided content.

4.  **What DRM/KMS configurations are needed to expose both displays as independent monitors to userspace?**
    The `dw-hdmi.c` driver demonstrates its integration with the Linux DRM/KMS framework. It declares a `struct drm_connector connector;` and `struct drm_bridge bridge;` within its `struct dw_hdmi`, indicating that the HDMI output is exposed to the DRM subsystem as a connector. The driver also manages `struct drm_display_mode` for video modes.
    However, the provided content only covers the HDMI driver. It does not detail the specific DRM/KMS configurations required to expose *both* DSI and HDMI outputs as independent monitors to userspace, nor does it describe how the DRM framework would manage two distinct display pipelines from the RK3566's VOP2.

5.  **Does Armbian's default DT enable both simultaneously, or are changes needed (DT overlay, /boot/extlinux config)?**
    The `opi3b.conf` and `rk3566-orangepi-3b.dtsi` files, which would provide insight into Armbian's default device tree configuration for the Orange Pi 3B, returned `FETCH ERROR` and were not available for analysis. Therefore, this question cannot be answered from the provided content.

6.  **How do EDID and timing negotiation work when both displays are connected?**
    For the HDMI output, the `dw-hdmi.c` driver explicitly handles EDID (Extended Display Identification Data) reading. The driver defines `HDMI_EDID_LEN 512` and stores EDID data in `u8 edid[HDMI_EDID_LEN];` within the `struct dw_hdmi`. It uses an internal I2C adapter (`struct dw_hdmi_i2c`) for communication, likely for DDC (Display Data Channel) to read EDID from the connected display. Functions like `dw_hdmi_i2c_wait` and `dw_hdmi_i2c_unwedge` manage I2C bus stability. Video mode information is stored in `struct hdmi_vmode` and `struct hdmi_data_info`. The `handle_plugged_change` function suggests dynamic detection of display connection status.

    However, the provided content *only* describes the EDID and timing negotiation for the HDMI output. It does not provide any information on how DSI panel timing negotiation works, nor does it describe how the system manages or prioritizes EDID/timing negotiation when *both* DSI and HDMI displays are connected simultaneously.

7.  **What are the bandwidth/power constraints of running both DSI (Waveshare panel) + HDMI concurrently?**
    The provided `dw-hdmi.c` driver is a software component and does not contain information regarding the hardware-level memory bandwidth or power consumption constraints of the RK3566 SoC or the Orange Pi 3B board when running dual displays. This question cannot be answered from the provided content.

8.  **Are there known limitations in the RK3566 or Armbian kernel that prevent dual-display output?**
    The provided content does not contain any information about known limitations in the RK3566 SoC or the Armbian kernel that would prevent simultaneous dual-display output. This question cannot be answered from the provided content.

### Gaps / Follow-up
The primary gap is the lack of access to the Orange Pi 3B's specific device tree files (`rk3566-orangepi-3b.dtsi`) and Armbian's configuration (`opi3b.conf`), which are crucial for understanding the hardware routing and default kernel setup. Without these, it's impossible to determine:
*   The RK3566's VOP2 architecture and how display pipelines (VP0/VP1) are configured.
*   Whether DSI and HDMI are physically routed to separate VOP2 ports.
*   Armbian's default support for simultaneous dual-display.
*   The specific device tree overlays or kernel parameters needed for dual-display.
*   Details on the DSI driver (`dw-mipi-dsi`) and its interaction with the DRM/KMS framework alongside HDMI.
*   Hardware-level performance implications (memory bandwidth, power consumption) of the RK3566.

Follow-up research should focus on obtaining the correct device tree source files for the Orange Pi 3B with RK3566, examining the Rockchip DRM driver (`drivers/gpu/drm/rockchip/`) for multi-display capabilities, and consulting Armbian documentation or kernel configurations specific to the OPi3B.

### Relevant Code/API Snippets

The `dw-hdmi.c` driver provides the following relevant snippets demonstrating its DRM/KMS integration and EDID handling:

**DRM/KMS Integration:**
The `struct dw_hdmi` includes `drm_connector` and `drm_bridge` members, indicating its role in the DRM pipeline:
```c
struct dw_hdmi {
    struct drm_connector connector;
    struct drm_bridge bridge;
    // ... other members
};
```

**EDID Handling:**
The driver defines a buffer for EDID data and uses an internal I2C interface for DDC communication:
```c
#define HDMI_EDID_LEN 512
// ...
struct dw_hdmi {
    // ...
    u8 edid[HDMI_EDID_LEN];
    // ...
    struct dw_hdmi_i2c *i2c;
    // ...
};
```
The `dw_hdmi_i2c` structure manages the I2C adapter for DDC:
```c
struct dw_hdmi_i2c {
    struct i2c_adapter adap;
    struct mutex lock; /* used to serialize data transfers */
    struct completion cmp;
    u8 stat;
    u8 slave_reg;
    bool is_regaddr;
    bool is_segment;
};
```
The driver also includes logic to handle I2C bus issues, such as `dw_hdmi_i2c_unwedge`, which attempts to recover a stuck I2C bus, crucial for reliable EDID reading.

**Video Mode Management:**
The driver uses `struct hdmi_vmode` and `struct hdmi_data_info` to store and manage video mode parameters:
```c
struct hdmi_vmode {
    bool mdataenablepolarity;
    unsigned int mpixelclock;
    unsigned int mpixelrepetitioninput;
    unsigned int mpixelrepetitionoutput;
    unsigned int mtmdsclock;
};

struct hdmi_data_info {
    unsigned int enc_in_bus_format;
    unsigned int enc_out_bus_format;
    unsigned int enc_in_encoding;
    unsigned int enc_out_encoding;
    unsigned int pix_repet_factor;
    unsigned int hdcp_enable;
    struct hdmi_vmode video_mode;
    bool rgb_limited_range;
};
```