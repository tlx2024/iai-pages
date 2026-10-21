#!/usr/bin/env bash
# Runs on the web host. Called by deploy/deploy.ps1 after it uploads the files to $STAGE.
# Swaps the www root atomically, installs the redirect snippet, and reloads nginx only
# after `nginx -t` passes. Any failure restores the previous root and snippet.
set -euo pipefail

STAGE="${1:?stage dir}"
WEB_ROOT="${2:-/var/www/iai-www}"
SNIPPET=/etc/nginx/snippets/iai-www-redirects.conf
STAMP="$(date +%Y%m%d-%H%M%S)"
NEW="${WEB_ROOT}.new-${STAMP}"
OLD="${WEB_ROOT}.bak"

sudo mkdir -p "$NEW"
sudo tar -xzf "$STAGE/www.tgz" -C "$NEW"
test -f "$NEW/index.html" || { echo "index.html missing in archive" >&2; sudo rm -rf "$NEW"; exit 1; }

had_snippet=0
if sudo test -f "$SNIPPET"; then had_snippet=1; sudo cp "$SNIPPET" "$SNIPPET.bak"; fi
sudo mkdir -p "$(dirname "$SNIPPET")"
sudo install -m 0644 "$STAGE/www-redirects.conf" "$SNIPPET"

if ! sudo grep -rqs "iai-www-redirects.conf" /etc/nginx/sites-enabled /etc/nginx/conf.d; then
  echo "WARN: no server block includes $SNIPPET yet; redirects stay inactive." >&2
  echo "      Add 'include snippets/iai-www-redirects.conf;' to the www server block once." >&2
fi

restore_snippet() {
  if [ "$had_snippet" = 1 ]; then sudo mv "$SNIPPET.bak" "$SNIPPET"; else sudo rm -f "$SNIPPET"; fi
}

if ! sudo nginx -t; then
  echo "nginx -t failed; restoring snippet, web root untouched" >&2
  restore_snippet
  sudo rm -rf "$NEW"
  exit 1
fi

# Keep exactly one previous copy for rollback.
sudo rm -rf "$OLD"
if [ -d "$WEB_ROOT" ]; then sudo mv "$WEB_ROOT" "$OLD"; fi
sudo mv "$NEW" "$WEB_ROOT"
sudo chmod -R a+rX "$WEB_ROOT"

if ! sudo systemctl reload nginx; then
  echo "nginx reload failed; rolling back" >&2
  sudo rm -rf "$WEB_ROOT"
  if [ -d "$OLD" ]; then sudo mv "$OLD" "$WEB_ROOT"; fi
  restore_snippet
  exit 1
fi
sudo rm -f "$SNIPPET.bak"
rm -rf "$STAGE"
echo "deployed to $WEB_ROOT (previous copy at $OLD)"
