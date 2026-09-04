#!/usr/bin/env python3
"""Test rapide Patchright : ouvre une page, vérifie qu'on n'est pas détecté."""
from patchright.sync_api import sync_playwright
import sys

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()
    page.goto("https://example.com", timeout=30000)
    print("Titre:", page.title())
    # Vérif stealth : navigator.webdriver doit être False/undefined
    webdriver = page.evaluate("navigator.webdriver")
    print("navigator.webdriver:", webdriver, "(False/undefined = bon, non détecté)")
    browser.close()
    print("=== PATCHRIGHT FONCTIONNE ===")
