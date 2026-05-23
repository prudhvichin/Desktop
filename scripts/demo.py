#!/usr/bin/env python3

import sys
import datetime

def main():
    print("Hello from Python script")
    print("Time:", datetime.datetime.now())

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print("Error:", e)
        sys.exit(1)