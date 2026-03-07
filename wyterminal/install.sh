#!/bin/bash
# WyTerminal daemon installer
# curl -fsSL https://wyltekindustries.com/wyterminal/install.sh | sudo bash
set -e

BOT_TOKEN=""
CHAT_ID=""
PORT="auto"   # auto-detect ESP32 serial port
INSTALL_DIR="/opt/wyterminal"
SERVICE="wyterminal-daemon"

# ── Parse args ────────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
    case $1 in
        --token) BOT_TOKEN="$2"; shift 2 ;;
        --chat)  CHAT_ID="$2";  shift 2 ;;
        --port)  PORT="$2";     shift 2 ;;
        *) shift ;;
    esac
done

echo "╔══════════════════════════════════╗"
echo "║   WyTerminal Daemon Installer    ║"
echo "║   wyltekindustries.com           ║"
echo "╚══════════════════════════════════╝"

# ── Detect bot config from existing running daemon ────────────────────
if [ -f /etc/wyterminal/config ]; then
    source /etc/wyterminal/config
    echo "[*] Found existing config"
fi

# ── Get config from firmware via serial if not provided ───────────────
if [ -z "$BOT_TOKEN" ]; then
    # Try to read from a config file left by a previous install
    if [ -f "$INSTALL_DIR/.config" ]; then
        source "$INSTALL_DIR/.config"
    fi
fi

# ── If still no token, prompt ─────────────────────────────────────────
if [ -z "$BOT_TOKEN" ]; then
    echo ""
    echo "Enter your WyTerminal bot token (from @TgKeyboardBot):"
    read -r BOT_TOKEN
fi
if [ -z "$CHAT_ID" ]; then
    echo "Enter your Telegram chat ID:"
    read -r CHAT_ID
fi

# ── Auto-detect serial port ───────────────────────────────────────────
if [ "$PORT" = "auto" ]; then
    PORT=""
    for p in /dev/ttyACM0 /dev/ttyACM1 /dev/ttyUSB0 /dev/ttyUSB1; do
        if [ -e "$p" ]; then
            # Check if it's an Espressif device
            if udevadm info "$p" 2>/dev/null | grep -q "Espressif\|303a"; then
                PORT="$p"
                break
            fi
            # Fallback: just use first available ACM
            [ -z "$PORT" ] && PORT="$p"
        fi
    done
fi

if [ -z "$PORT" ]; then
    echo "[!] No serial port found. Connect WyTerminal USB and retry."
    exit 1
fi
echo "[*] Using serial port: $PORT"

# ── Install dependencies ──────────────────────────────────────────────
echo "[*] Installing dependencies..."
pip3 install pyserial requests Pillow --quiet --break-system-packages 2>/dev/null || \
pip3 install pyserial requests Pillow --quiet

# Screenshot tools
if command -v apt-get &>/dev/null; then
    apt-get install -y -q scrot xclip 2>/dev/null || true
elif command -v pacman &>/dev/null; then
    pacman -S --noconfirm scrot xclip 2>/dev/null || true
fi

# ── Install daemon ────────────────────────────────────────────────────
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
PORT="$PORT"
EOF

# ── Create systemd service ────────────────────────────────────────────
DISPLAY_ENV=""
if [ -n "$DISPLAY" ]; then
    DISPLAY_ENV="Environment=DISPLAY=$DISPLAY"
elif [ -e /tmp/.X11-unix/X0 ]; then
    DISPLAY_ENV="Environment=DISPLAY=:0"
fi

cat > /etc/systemd/system/${SERVICE}.service << EOF
[Unit]
Description=WyTerminal Daemon
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/python3 -u $INSTALL_DIR/wyrelay-daemon.py --port $PORT --token $BOT_TOKEN --chat $CHAT_ID
Restart=always
RestartSec=3
$DISPLAY_ENV

[Install]
WantedBy=multi-user.target
EOF

# Add user to dialout for serial access
usermod -aG dialout "${SUDO_USER:-$USER}" 2>/dev/null || true

systemctl daemon-reload
systemctl enable "$SERVICE"
systemctl restart "$SERVICE"

sleep 2
if systemctl is-active --quiet "$SERVICE"; then
    echo ""
    echo "✅ WyTerminal daemon installed and running!"
    echo "   Port:    $PORT"
    echo "   Service: systemctl status $SERVICE"
    echo "   Logs:    journalctl -u $SERVICE -f"
    echo ""
    echo "Check your Telegram — daemon startup notification sent."
else
    echo "❌ Service failed to start"
    journalctl -u "$SERVICE" -n 10 --no-pager
    exit 1
fi
