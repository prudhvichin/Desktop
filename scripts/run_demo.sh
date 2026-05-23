#!/usr/bin/env bash

set -euo pipefail

LOG_DIR="."
LOG_FILE="$LOG_DIR/demo.log"

mkdir -p "$LOG_DIR"

echo "Starting Python script..." | tee -a "$LOG_FILE"

python3 demo.py 2>&1 | tee -a "$LOG_FILE"

echo "Script finished successfully." | tee -a "$LOG_FILE"