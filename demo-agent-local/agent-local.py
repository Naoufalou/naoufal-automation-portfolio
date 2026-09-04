#!/usr/bin/env python3
"""agent-local.py — mini-agent LLM local (démo, zéro dépendance lourde).

Pilote un modèle Ollama local (na-qwen3-4b-nothink) avec support de tool-calling,
illustrant l'orchestration agent ↔ modèle local optimisée pour 6 Go VRAM.

Usage:
    python agent-local.py "Quel est le dernier modèle Ollama installé ?"

Le script envoie la question au modèle local, qui peut émettre un tool call
('run_terminal'), l'exécute, puis synthétise la réponse. keep_alive:0 décharge
la VRAM à chaque appel.
"""
import json
import subprocess
import sys
import urllib.request

OLLAMA = "http://localhost:11434"


def ask(model, messages, tools=None):
    payload = {"model": model, "messages": messages, "stream": False,
               "keep_alive": 0}
    if tools:
        payload["tools"] = tools
    req = urllib.request.Request(
        f"{OLLAMA}/api/chat",
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=120) as r:
        return json.load(r)


def run_terminal(command):
    return subprocess.run(command, shell=True, capture_output=True,
                          text=True, timeout=30).stdout.strip()


def main():
    model = "na-qwen3-4b-nothink"
    question = sys.argv[1] if len(sys.argv) > 1 else "Dis bonjour"

    tools = [{
        "type": "function",
        "function": {
            "name": "run_terminal",
            "description": "Exécute une commande shell et retourne sa sortie",
            "parameters": {"type": "object", "properties": {
                "command": {"type": "string"}}, "required": ["command"]},
        },
    }]

    messages = [{"role": "user", "content": question}]
    resp = ask(model, messages, tools)
    msg = resp.get("message", {})

    if msg.get("tool_calls"):
        # Le modèle a demandé un outil → on l'exécute
        for tc in msg["tool_calls"]:
            name = tc["function"]["name"]
            args = tc["function"]["arguments"]
            if name == "run_terminal":
                out = run_terminal(args["command"])
                messages.append({"role": "assistant", "content": "",
                                 "tool_calls": [tc]})
                messages.append({"role": "tool", "content": out})
        final = ask(model, messages)
        print(final.get("message", {}).get("content", "(pas de réponse)"))
    else:
        print(msg.get("content", "(pas de réponse)"))


if __name__ == "__main__":
    main()
