# Research: opi3b-dual-display-dsi-hdmi-implementation

**Date:** 2026-03-22  
**Status:** AUTO-CRAWLED (Gemini gemini-2.5-flash)  
**Seeds:** https://raw.githubusercontent.com/torvalds/linux/master/Documentation/devicetree/bindings/display/rockchip/rockchip-vop2.yaml, https://raw.githubusercontent.com/torvalds/linux/master/arch/arm64/boot/dts/rockchip/rk3566-orangepi-3b.dts, https://raw.githubusercontent.com/torvalds/linux/master/arch/arm64/boot/dts/rockchip/rk356x.dtsi, https://forum.armbian.com/topic/24013-orange-pi-3b/

---

Date: 2026-03-22

## Summary

The provided `rockchip-vop2.yaml` schema details the Rockchip VOP2 display controller, indicating that the RK3566 variant supports three video output ports (VP0, VP1, VP2), each with its own pixel clock (`dclk_vp0`, `dclk_vp1`, `dclk_vp2`). This architecture strongly suggests the capability for simultaneous multi-display output. However, critical board-specific Device Tree Source (DTS) files for the Orange Pi 3B (`rk3566-orangepi-3b.dts` and `rk356x.dtsi`) were not successfully fetched. Without these specific DTS files, it is not possible to identify the exact DTS nodes for the DSI host controller and HDMI PHY, their precise connections to VOP2 ports, or to provide a concrete DTS overlay for enabling both displays. The provided content also lacks information on specific clock/bandwidth constraints or known quirks/bugs related to dual display on the RK3566.

## Questions to Answer

### 1. What are the DTS nodes needed for DSI host controller on RK3566 and how does it connect to VOP2?

The `rockchip-vop2.yaml` schema defines the VOP2 display controller itself, including its output `ports` (VP0, VP1, VP2 for RK3566). It does not, however, define the DTS node for the DSI host controller. The DSI host controller would typically be a separate device node that connects to one of the VOP2's output ports via a `port` and `endpoint` definition within the DTS.

**Cannot find the answer in the provided content.** The specific DTS nodes for the DSI host controller and its connection to VOP2 on RK3566 are not present in the `rockchip-vop2.yaml` schema. The crucial `rk3566-orangepi-3b.dts` and `rk356x.dtsi` files, which would contain this information, failed to fetch.

### 2. What are the DTS nodes for HDMI PHY on RK3566 and which VOP2 port does it use?

Similar to the DSI host controller, the `rockchip-vop2.yaml` schema defines the VOP2 output `ports` (VP0, VP1, VP2 for RK3566) but does not define the DTS node for the HDMI PHY itself. The HDMI PHY would be a distinct device node in the DTS, connecting to one of the VOP2's output ports. The schema mentions `rockchip,vo1-grf` for RK3588 HDMI control, but explicitly states `rockchip,vo1-grf: false` for `rockchip,rk3566-vop`, indicating this specific GRF is not used for HDMI on RK3566. The `rockchip,grf` property is present for RK3566 and is described as being "used for control the polarity of dclk/hsync/vsync of DPI," which could be relevant for HDMI.

**Cannot find the answer in the provided content.** The specific DTS nodes for the HDMI PHY and its connection to VOP2 on RK3566 are not present in the `rockchip-vop2.yaml` schema. The crucial `rk3566-orangepi-3b.dts` and `rk356x.dtsi` files, which would contain this information, failed to fetch.

### 3. Can DSI (VP1) and HDMI (VP2) run simultaneously on RK3566? Are there clock or bandwidth constraints?

Based on the `rockchip-vop2.yaml` schema, the RK3566 VOP2 controller (`rockchip,rk3566-vop`) is configured with:
*   `ports: required: - port@0 - port@1 - port@2`
*   `clock-names: minItems: 5 items: - const: aclk - const: hclk - const: dclk_vp0 - const: dclk_vp1 - const: dclk_vp2`

The presence of three distinct output ports (VP0, VP1, VP2) and dedicated pixel clocks (`dclk_vp0`, `dclk_vp1`, `dclk_vp2`) for each video port strongly implies that multiple displays, such as DSI and HDMI, can run simultaneously on the RK3566. The architecture supports independent clocking for each video output.

**Cannot find specific clock or bandwidth constraints in the provided content.** While the architecture suggests simultaneous operation is possible, the `rockchip-vop2.yaml` schema does not detail specific clock frequency limits or overall bandwidth constraints that might impact dual display performance.

### 4. What is the minimal DTS overlay to enable both DSI Waveshare 5" and HDMI simultaneously?

**Cannot find the answer in the provided content.** Providing a minimal DTS overlay requires specific DTS snippets for the Orange Pi 3B, including the DSI host controller, HDMI PHY, and their connections to the VOP2 ports. The `rk3566-orangepi-3b.dts` and `rk356x.dtsi` files, which would contain this information, failed to fetch. The `rockchip-vop2.yaml` is a schema and does not provide board-specific DTS examples for DSI or HDMI integration.

### 5. Are there known quirks/bugs with dual display on RK3566 BSP or mainline kernel?

**Cannot find the answer in the provided content.** The provided `rockchip-vop2.yaml` schema describes the VOP2 hardware interface but does not contain information about software-related quirks or bugs in the BSP or mainline kernel. The Armbian forum link provided was irrelevant to the RK3566 and dual display.

## Gaps / Follow-up

The primary gap is the inability to fetch the board-specific DTS files:
*   `arch/arm64/boot/dts/rockchip/rk3566-orangepi-3b.dts`
*   `arch/arm64/boot/dts/rockchip/rk356x.dtsi`

Without these files, it is impossible to:
1.  Identify the exact DTS nodes for the DSI host controller and HDMI PHY on the OPi 3B.
2.  Determine which specific VOP2 ports (VP0, VP1, or VP2) are typically assigned to DSI and HDMI.
3.  Provide a concrete DTS overlay for enabling both displays.
4.  Infer any specific clock or bandwidth constraints beyond the architectural capability.
5.  Find any documented quirks or bugs within the DTS or kernel context.

Follow-up research should focus on obtaining and analyzing these specific DTS files, or similar ones for other RK3566 boards with DSI and HDMI outputs, to understand the practical implementation details.

## Relevant Code/API Snippets

From `rockchip-vop2.yaml`:

```yaml
properties:
  compatible:
    enum:
      - rockchip,rk3566-vop
      - rockchip,rk3568-vop
      # ...
  clocks:
    minItems: 5
    items:
      - description: Clock for ddr buffer transfer via axi.
      - description: Clock for the ahb bus to R/W the regs.
      - description: Pixel clock for video port 0.
      - description: Pixel clock for video port 1.
      - description: Pixel clock for video port 2.
      # ...
  clock-names:
    minItems: 5
    items:
      - const: aclk
      - const: hclk
      - const: dclk_vp0
      - const: dclk_vp1
      - const: dclk_vp2
      # ...
  ports:
    # ...
    patternProperties: "^port@[0-3]$":
      # ...
    required:
      - port@0
      # ...
allOf:
  - if:
      properties:
        compatible:
          contains:
            enum:
              - rockchip,rk3566-vop
              - rockchip,rk3568-vop
    then:
      properties:
        clocks:
          maxItems: 5
        clock-names:
          maxItems: 5
        interrupts:
          maxItems: 1
        interrupt-names: false
        ports:
          required:
            - port@0
            - port@1
            - port@2
        rockchip,vo1-grf: false # Explicitly states not used for RK3566/RK3568
        rockchip,vop-grf: false
        rockchip,pmu: false
        required:
          - rockchip,grf
```