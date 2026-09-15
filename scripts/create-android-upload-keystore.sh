#!/usr/bin/env bash
# Interactive Android upload-key setup for Play release builds.
# Run from repo root:  bash scripts/create-android-upload-keystore.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ANDROID_DIR="$ROOT/android"
JKS="$ANDROID_DIR/upload-keystore.jks"
PROPS="$ANDROID_DIR/keystore.properties"
ALIAS="wellnessshift-upload"

if [[ -f "$JKS" || -f "$PROPS" ]]; then
  echo "Refusing to overwrite existing upload keystore / keystore.properties."
  echo "  $JKS"
  echo "  $PROPS"
  exit 1
fi

echo "This creates android/upload-keystore.jks + android/keystore.properties (gitignored)."
echo "Back the keystore and passwords up in a password manager — losing them blocks Play updates."
echo

read -r -s -p "Choose store/key password (min 8 chars): " STORE_PASS
echo
read -r -s -p "Confirm password: " STORE_PASS2
echo
if [[ "$STORE_PASS" != "$STORE_PASS2" ]]; then
  echo "Passwords do not match."
  exit 1
fi
if [[ ${#STORE_PASS} -lt 8 ]]; then
  echo "Password must be at least 8 characters."
  exit 1
fi

cd "$ANDROID_DIR"
keytool -genkeypair -v -storetype PKCS12 \
  -keystore upload-keystore.jks \
  -alias "$ALIAS" \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -storepass "$STORE_PASS" \
  -keypass "$STORE_PASS" \
  -dname "CN=Wellness Shift Ltd, OU=Mobile, O=Wellness Shift Ltd, L=London, ST=England, C=GB"

cat > "$PROPS" <<EOF
storeFile=upload-keystore.jks
storePassword=$STORE_PASS
keyAlias=$ALIAS
keyPassword=$STORE_PASS
EOF

echo
echo "Done."
echo "  Keystore: $JKS"
echo "  Props:    $PROPS"
echo
echo "Next: cd android && ./gradlew bundleRelease"
echo "Then upload the AAB in Play Console (App integrity / Play App Signing)."
echo "Save the password in 1Password now — it is only in keystore.properties on disk."
