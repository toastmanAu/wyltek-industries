#!/bin/bash
# WyTerminal daemon installer — with udev auto-start/stop
# curl -fsSL https://wyltekindustries.com/wyterminal/install.sh | sudo bash
set -e

BOT_TOKEN=""
CHAT_ID=""
INSTALL_DIR="/opt/wyterminal"
UDEV_RULE="/etc/udev/rules.d/99-wyterminal.rules"
# WyTerminal USB IDs: Espressif ESP32-S3
VID="303a"
PID="1001"

while [[ $# -gt 0 ]]; do
    case $1 in
        --token) BOT_TOKEN="$2"; shift 2 ;;
        --chat)  CHAT_ID="$2";  shift 2 ;;
        *) shift ;;
    esac
done

echo "╔══════════════════════════════════╗"
echo "║   WyTerminal Daemon Installer    ║"
echo "║   wyltekindustries.com           ║"
echo "╚══════════════════════════════════╝"

# Load existing config if present
[ -f /etc/wyterminal/config ] && source /etc/wyterminal/config

if [ -z "$BOT_TOKEN" ]; then
    echo "Enter WyTerminal bot token:"
    read -r BOT_TOKEN
fi
if [ -z "$CHAT_ID" ]; then
    echo "Enter your Telegram chat ID:"
    read -r CHAT_ID
fi

# Detect DISPLAY for screenshot support
DISPLAY_VAL="${DISPLAY:-:0}"

# ── Dependencies ──────────────────────────────────────────────────────
echo "[*] Installing dependencies..."
pip3 install pyserial requests Pillow --quiet --break-system-packages 2>/dev/null || \
pip3 install pyserial requests Pillow --quiet
command -v apt-get &>/dev/null && apt-get install -y -q scrot xclip 2>/dev/null || true

# ── Install files ─────────────────────────────────────────────────────
mkdir -p "$INSTALL_DIR"
echo "[*] Downloading daemon..."
curl -fsSL "https://raw.githubusercontent.com/toastmanAu/WyTerminal/master/daemon/wyrelay-daemon.py" \
    -o "$INSTALL_DIR/wyrelay-daemon.py"
chmod +x "$INSTALL_DIR/wyrelay-daemon.py"

# Save config
mkdir -p /etc/wyterminal
cat > /etc/wyterminal/config << EOF
BOT_TOKEN="$BOT_TOKEN"
CHAT_ID="$CHAT_ID"
DISPLAY_VAL="$DISPLAY_VAL"
EOF

# ── on-connect.sh ─────────────────────────────────────────────────────
cat > "$INSTALL_DIR/on-connect.sh" << 'SCRIPT'
#!/bin/bash
# Called by udev on WyTerminal plug-in
DEVNAME="$1"
source /etc/wyterminal/config

# Wait for device to be ready
sleep 1

export DISPLAY="$DISPLAY_VAL"
PYTHONUNBUFFERED=1 python3 -u /opt/wyterminal/wyrelay-daemon.py \
    --port "$DEVNAME" \
    --token "$BOT_TOKEN" \
    --chat "$CHAT_ID" \
    >> /tmp/wyterminal-daemon.log 2>&1 &

echo $! > /tmp/wyterminal-daemon.pid
SCRIPT
chmod +x "$INSTALL_DIR/on-connect.sh"

# ── on-disconnect.sh ──────────────────────────────────────────────────
cat > "$INSTALL_DIR/on-disconnect.sh" << 'SCRIPT'
#!/bin/bash
# Called by udev on WyTerminal unplug
source /etc/wyterminal/config

if [ -f /tmp/wyterminal-daemon.pid ]; then
    PID=$(cat /tmp/wyterminal-daemon.pid)
    kill "$PID" 2>/dev/null || true
    rm -f /tmp/wyterminal-daemon.pid
fi

# Also kill any stray daemon processes
pkill -f wyrelay-daemon 2>/dev/null || true

# Notify via Telegram
curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
    -H "Content-Type: application/json" \
    -d "{\"chat_id\": \"${CHAT_ID}\", \"text\": \"🔴 WyTerminal unplugged — daemon stopped\"}" \
    >> /tmp/wyterminal-daemon.log 2>&1 &
SCRIPT
chmod +x "$INSTALL_DIR/on-disconnect.sh"

# ── udev rule ─────────────────────────────────────────────────────────
echo "[*] Installing udev rule..."
cat > "$UDEV_RULE" << EOF
# WyTerminal — auto-start/stop daemon on plug/unplug
# VID=${VID} PID=${PID} = Espressif ESP32-S3 CDC

ACTION=="add", SUBSYSTEM=="tty", \\
    ATTRS{idVendor}=="${VID}", ATTRS{idProduct}=="${PID}", \\
    RUN+="${INSTALL_DIR}/on-connect.sh %E{DEVNAME}"

ACTION=="remove", SUBSYSTEM=="tty", \\
    ATTRS{idVendor}=="${VID}", ATTRS{idProduct}=="${PID}", \\
    RUN+="${INSTALL_DIR}/on-disconnect.sh"
EOF

udevadm control --reload-rules
udevadm trigger

# ── Remove old systemd service if present ─────────────────────────────
if systemctl is-active --quiet wyterminal-daemon 2>/dev/null; then
    systemctl stop wyterminal-daemon
    systemctl disable wyterminal-daemon
    rm -f /etc/systemd/system/wyterminal-daemon.service
    systemctl daemon-reload
    echo "[*] Removed old systemd service (replaced by udev)"
fi

echo ""
echo "✅ WyTerminal installed!"
echo ""
echo "   From now on:"
echo "   • Plug in WyTerminal → daemon starts automatically"
echo "   • Unplug WyTerminal → daemon stops automatically"
echo ""
echo "   Logs: tail -f /tmp/wyterminal-daemon.log"
echo ""
echo "   Unplug and replug WyTerminal now to activate."
