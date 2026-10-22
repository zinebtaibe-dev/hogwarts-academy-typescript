// Ce fichier traite uniquement les événements de lancement de sorts.

import type { AcademyEvent, SpellCastEvent } from "./types";

// Exercice 3 
export function getSpellCastEvents(events: AcademyEvent[]): SpellCastEvent[] {
  return events.filter(
    (event): event is Extract<AcademyEvent, { type: "spell-cast" }> =>
      event.type === "spell-cast"
  );
}

export function handleSpellCast(event: SpellCastEvent): void {
  console.log(
    `Événement reçu : le sorcier #${event.wizardId} a lancé ${event.spellName}.`
  );
}
