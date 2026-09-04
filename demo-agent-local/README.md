# Démo — Mini-agent LLM local avec tool-calling

Script autonome qui pilote un modèle Ollama local (`na-qwen3-4b-nothink`,
Qwen3 4B abliterated) avec support de **tool-calling** : le modèle peut décider
d'exécuter une commande shell pour répondre, exactement le principe d'un agent.

## Pourquoi c'est une démo intéressante
- **0 dépendance lourde** : uniquement la stdlib Python (urllib), pas de SDK.
- **keep_alive:0** : décharge la VRAM après chaque appel (contrainte 6 Go).
- **Boucle agent réelle** : question → tool call → exécution → synthèse.

## Prérequis
- Serveur Ollama local sur `http://localhost:11434` avec le modèle `na-qwen3-4b-nothink`.

## Exemple
```bash
python agent-local.py "Combien de modèles Ollama sont installés ?"
```
Le modèle émet un tool call `run_terminal("ollama list")`, le script l'exécute,
puis le modèle synthétise la réponse.
