#!/bin/bash
# WyTerminal daemon uninstaller
# curl -fsSL https://wyltekindustries.com/wyterminal/uninstall.sh | sudo bash
set -e

INSTALL_DIR="/opt/wyterminal"
UDEV_RULE="/etc/udev/rules.d/99-wyterminal.rules"

echo "╔══════════════════════════════════╗"
echo "║  WyTerminal Daemon Uninstaller   ║"
echo "╚══════════════════════════════════╝"

# Kill running daemon
if [ -f /tmp/wyterminal-daemon.pid ]; then
    kill $(cat /tmp/wyterminal-daemon.pid) 2>/dev/null || true
    rm -f /tmp/wyterminal-daemon.pid
fi
pkill -f wyrelay-daemon 2>/dev/null || true

# Remove udev rule
[ -f "$UDEV_RULE" ] && rm -f "$UDEV_RULE" && echo "[*] Removed udev rule"
udevadm control --reload-rules 2>/dev/null || true

# Remove old systemd service if present
if systemctl is-active --quiet wyterminal-daemon 2>/dev/null; then
    systemctl stop wyterminal-daemon
    systemctl disable wyterminal-daemon
fi
rm -f /etc/systemd/system/wyterminal-daemon.service
systemctl daemon-reload 2>/dev/null || true

# Remove files
[ -d "$INSTALL_DIR" ]     && rm -rf "$INSTALL_DIR"
[ -d "/etc/wyterminal" ]  && rm -rf "/etc/wyterminal"
rm -f /tmp/wyterminal-daemon.log

echo ""
echo "✅ WyTerminal daemon fully removed."
echo "   Device still works as a USB keyboard."
