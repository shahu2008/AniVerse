"""
Notebook Setup

This file configures the Python path so that notebooks
can import modules from the backend package.
"""

import os
import sys

# Project root directory
PROJECT_ROOT = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..")
)

# Backend directory
BACKEND_PATH = os.path.join(PROJECT_ROOT, "backend")

# Add backend to Python path
if BACKEND_PATH not in sys.path:
    sys.path.insert(0, BACKEND_PATH)

print("=" * 60)
print("✓ Notebook Environment Ready")
print("Project Root :", PROJECT_ROOT)
print("Backend Path :", BACKEND_PATH)
print("=" * 60)