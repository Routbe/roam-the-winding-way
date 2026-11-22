# Plan: organisatieverificatie (migratie 0300) afbouwen

De sleutels en de Neon-koppeling blijven staan. Neon staat op 0298. 0300 staat in de code, maar is nog niet uitgevoerd. Stap 1 uit het dossier is lokaal gecontroleerd en in orde. Dit plan voert de stappen 2 tot en met 5 van het dossier uit.

## Wat er gebouwd wordt
1. **Serverkant (stap 2)**
   - Domeincontrole via een DNS TXT-record (`_rout.<domein>`) of via `.well-known/rout.json`, samen met een bevestigd werk-e-mailadres.
   - Controle van het BTW- en KBO-nummer (via VIES) en van het LEI-nummer (via GLEIF). Er komen alleen gepeperde nullifiers en digests in de database, geen ruwe registergegevens.
   - Tijdelijke, versleutelde opslag van KBO-uittreksels met een nieuwe sleutel `ROUT_EVIDENCE_KEK`. Die vraag ik op via het beveiligde formulier.
   - Serverfuncties die zijn afgeschermd met `requireAuth` of `requireDeveloperAccess`.
2. **Schermen (stap 3)**
   - In de Studio-instellingen een tabblad "Verificatie & vertrouwen" met drie wizards: domein, bedrijfsregister en volmacht.
   - Een admin-scherm `/admin/mandates`, beschermd met 2FA en Sudo Mode, om uittreksels te beoordelen.
   - Een vertrouwensbadge op `/w/$slug` die laag 1, 2 en 3 toont.
   - Alle nieuwe teksten in het Nederlands, Engels, Frans en Duits.
3. **Automatische taak (stap 4)**
   - Een nieuw adres `/api/public/cron/attestation-sweep`, beveiligd met `CRON_SECRET`. Het controleert de DNS opnieuw, laat zegels vervallen na 72 uur uitval of 12 maanden, en wist uittreksels na 7 dagen.
4. **Uitrol (stap 5), alleen na jouw GO per stap**
   - 0300 uitvoeren via `scripts/migration-rollout.ts --apply`.
   - Daarna `CODE_SCHEMA_LEVEL` op 0300 zetten en het schema opnieuw vastleggen.
   - 0299 pas verplaatsen en uitvoeren zodra rout.be minstens 0298 meldt.
   - Tot slot de bijlage van `docs/HANDOVER.md` bijwerken.

## Regels die blijven gelden
- Geen persoonsgegevens in Neon zonder versleuteling.
- Cryptografie in de browser loopt alleen via de bestaande crypto-worker.
- De app benadert de database alleen via SECURITY DEFINER-functies.
- In de schermen alleen de eigen kleurvariabelen gebruiken, geen vaste kleuren.

## Technisch
- Nieuwe bestanden komen in `src/lib/org-attestation/`, met tests naast de bestaande tests.
- `server-fn-auth-guard.test.ts` moet blijven slagen.
- Ik voer zelf geen migratie uit op Neon. Dat gebeurt alleen met jouw expliciete GO.
