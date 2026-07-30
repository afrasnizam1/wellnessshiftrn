#!/usr/bin/env bash
# Dismisses the Android 16KB page-size compatibility dialog on 16KB emulators (API 35+).
# RN 0.73 prebuilt native libs trigger this once per fresh install; the app runs fine after OK.
set -euo pipefail

DEVICE="${ANDROID_SERIAL:-$(adb devices 2>/dev/null | awk '/^emulator-/{print $1; exit}')}"
[ -z "${DEVICE}" ] && exit 0

sleep 3

adb -s "${DEVICE}" shell uiautomator dump /sdcard/ui.xml >/dev/null 2>&1 || exit 0
XML="$(adb -s "${DEVICE}" shell cat /sdcard/ui.xml 2>/dev/null || true)"

if ! echo "${XML}" | grep -q 'Android App Compatibility'; then
  exit 0
fi

tap_button() {
  local label="$1"
  local bounds
  bounds="$(echo "${XML}" | tr '>' '\n' | grep "text=\"${label}\"" | grep -o 'bounds="\[[0-9]*,[0-9]*\]\[[0-9]*,[0-9]*\]"' | head -1 | grep -oE '[0-9]+' | tr '\n' ' ')"
  [ -z "${bounds}" ] && return 1
  read -r x1 y1 x2 y2 <<< "${bounds}"
  local x=$(( (x1 + x2) / 2 ))
  local y=$(( (y1 + y2) / 2 ))
  adb -s "${DEVICE}" shell input tap "${x}" "${y}"
}

tap_button "Don't Show Again" || tap_button "OK" || true
