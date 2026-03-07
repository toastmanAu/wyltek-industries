#!/bin/bash
# WyTerminal daemon uninstaller
# curl -fsSL https://wyltekindustries.com/wyterminal/uninstall.sh | sudo bash
set -e

SERVICE="wyterminal-daemon"
INSTALL_DIR="/opt/wyterminal"

echo "╔══════════════════════════════════╗"
echo "║  WyTerminal Daemon Uninstaller   ║"
echo "╚══════════════════════════════════╝"

# Stop and disable service
if systemctl is-active --quiet "$SERVICE" 2>/dev/null; then
    echo "[*] Stopping service..."
    systemctl stop "$SERVICE"
fi
if systemctl is-enabled --quiet "$SERVICE" 2>/dev/null; then
    echo "[*] Disabling service..."
    systemctl disable "$SERVICE"
fi

# Remove files
[ -f "/etc/systemd/system/${SERVICE}.service" ] && rm -f "/etc/systemd/system/${SERVICE}.service"
[ -d "$INSTALL_DIR" ] && rm -rf "$INSTALL_DIR"
[ -d "/etc/wyterminal" ] && rm -rf "/etc/wyterminal"

systemctl daemon-reload

echo ""
echo "✅ WyTerminal daemon removed."
echo "   The WyTerminal device still works as a USB keyboard."
