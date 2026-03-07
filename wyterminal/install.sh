#!/bin/bash
# WyTerminal relay installer
# Installs wyrelay.py on this machine and starts it via udev (plug=start, unplug=stop)
# Usage: curl -fsSL https://wyltekindustries.com/wyterminal/install.sh | bash

set -e
INSTALL_DIR="$HOME/.wyterminal"
RELAY_URL="https://raw.githubusercontent.com/toastmanAu/WyTerminal/master/relay/wyrelay.py"
RELAY_BIN="$INSTALL_DIR/wyrelay.py"
VID="303a"
PID="1001"

echo "WyTerminal relay installer"
echo "=========================="

# ── Check deps ────────────────────────────────────────────────────
install_py_dep() {
  python3 -c "import $1" 2>/dev/null && return
  echo "Installing $1..."
  pip3 install "$2" --break-system-packages -q 2>/dev/null || pip3 install "$2" -q
}

install_py_dep flask flask
install_py_dep PIL pillow

# ── Screenshot tool ───────────────────────────────────────────────
if ! command -v gnome-screenshot &>/dev/null && ! command -v scrot &>/dev/null; then
  sudo apt-get install -y scrot 2>/dev/null || true
fi

# ── Download relay ────────────────────────────────────────────────
mkdir -p "$INSTALL_DIR"
echo "Downloading relay..."
curl -fsSL "$RELAY_URL" -o "$RELAY_BIN"
chmod +x "$RELAY_BIN"

# ── udev rules ────────────────────────────────────────────────────
UDEV_RULE="/etc/udev/rules.d/99-wyterminal.rules"
ON_CONNECT="$INSTALL_DIR/on-connect.sh"
ON_DISCONNECT="$INSTALL_DIR/on-disconnect.sh"

# Detect DISPLAY/WAYLAND for screenshot support
ACTIVE_DISPLAY=$(who | awk '{print $5}' | grep -o ':[0-9]*' | head -1 || echo ":0")
WAYLAND=$(ls /run/user/$(id -u)/wayland-* 2>/dev/null | head -1 | xargs basename 2>/dev/null || echo "")

cat > "$ON_CONNECT" << EOF
#!/bin/bash
export DISPLAY=${ACTIVE_DISPLAY:-:0}
export WAYLAND_DISPLAY=${WAYLAND:-wayland-0}
export DBUS_SESSION_BUS_ADDRESS="unix:path=/run/user/$(id -u)/bus"
PORT=\$1
# Start relay if not already running
if ! pgrep -f wyrelay.py > /dev/null; then
  nohup python3 "$RELAY_BIN" >> /tmp/wyrelay.log 2>&1 &
  echo "WyTerminal relay started"
fi
EOF
chmod +x "$ON_CONNECT"

cat > "$ON_DISCONNECT" << EOF
#!/bin/bash
# Stop relay on unplug — only if WyTerminal started it
if [ -f "$INSTALL_DIR/.we_started_relay" ]; then
  pkill -f wyrelay.py 2>/dev/null
  rm -f "$INSTALL_DIR/.we_started_relay"
  echo "WyTerminal relay stopped"
fi
EOF
chmod +x "$ON_DISCONNECT"

# Write udev rule
sudo tee "$UDEV_RULE" > /dev/null << EOF
# WyTerminal T-Display S3 (VID=${VID} PID=${PID})
ACTION=="add", SUBSYSTEM=="usb", ATTR{idVendor}=="${VID}", ATTR{idProduct}=="${PID}", \
  RUN+="/bin/su $(whoami) -c '$ON_CONNECT'"
ACTION=="remove", SUBSYSTEM=="usb", ATTR{idVendor}=="${VID}", ATTR{idProduct}=="${PID}", \
  RUN+="/bin/su $(whoami) -c '$ON_DISCONNECT'"
EOF

sudo udevadm control --reload-rules 2>/dev/null || true

# ── Start relay now ───────────────────────────────────────────────
echo "Starting relay on port 7799..."
touch "$INSTALL_DIR/.we_started_relay"
export DISPLAY="${ACTIVE_DISPLAY:-:0}"
export WAYLAND_DISPLAY="${WAYLAND:-wayland-0}"
export DBUS_SESSION_BUS_ADDRESS="unix:path=/run/user/$(id -u)/bus"
nohup python3 "$RELAY_BIN" >> /tmp/wyrelay.log 2>&1 &
sleep 2

if curl -sf http://localhost:7799/health > /dev/null; then
  echo "✅ WyTerminal relay running at http://localhost:7799"
  echo "✅ udev rules installed — plug/unplug now auto-manages relay"
else
  echo "⚠️  Relay may still be starting — check: curl http://localhost:7799/health"
fi

echo ""
echo "To uninstall: curl -fsSL https://wyltekindustries.com/wyterminal/uninstall.sh | bash"
