#!/usr/bin/env python3
"""
Script para corrigir delivery dos crons
Troca modo "announce" para delivery direto no Telegram DM do Dr. Henrique
"""

import json
import sys

CONFIG_PATH = "/data/.openclaw/openclaw.json"

def main():
    # Ler config
    with open(CONFIG_PATH, 'r') as f:
        config = json.load(f)
    
    # Backup
    with open(CONFIG_PATH + ".backup-cron-delivery", 'w') as f:
        json.dump(config, f, indent=2)
    
    print("✅ Backup criado: openclaw.json.backup-cron-delivery")
    
    # Ajustar delivery dos 4 crons
    crons_to_fix = [
        "b220a99c-2d0d-43c5-8d28-8da397388a50",  # Daily Briefing 7h
        "20dd0668-c0fe-4a0b-b13e-17045246bb1d",  # Watchdog 8h
        "fbf579e2-f490-4b26-a6e0-d461ef57c535",  # Git Backup 2h
        "ebc04ad3-256d-4847-8add-7c48c16076b2",  # Heartbeat 10h/14h/18h
    ]
    
    for job_id in crons_to_fix:
        # Buscar cron job
        for job in config.get("cronJobs", []):
            if job.get("id") == job_id:
                # Atualizar delivery
                job["delivery"] = {
                    "mode": "none"  # Crons ficam silenciosos exceto Daily Briefing
                }
                
                # Daily Briefing envia para Telegram DM
                if job_id == "b220a99c-2d0d-43c5-8d28-8da397388a50":
                    job["delivery"] = {
                        "mode": "announce",
                        "channel": "telegram",
                        "to": "7630266660"
                    }
                
                print(f"✅ Corrigido: {job.get('name')}")
    
    # Salvar
    with open(CONFIG_PATH, 'w') as f:
        json.dump(config, f, indent=2)
    
    print("\n✅ Config atualizado com sucesso!")
    print("⚠️ PRÓXIMO PASSO: reiniciar gateway")
    print("   docker restart openclaw")

if __name__ == "__main__":
    main()
