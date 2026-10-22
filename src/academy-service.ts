import type { House, WizardSummary } from "./types";
import { WizardRepository, SpellRepository } from "./repository";
import { Log } from "./decorators";

export class AcademyService {
  constructor(
    private readonly wizards: WizardRepository,
    private readonly spells: SpellRepository
  ) {}

  @Log
  castSpell(wizardId: number, spellId: number): string {
    const wizard = this.wizards.findById(wizardId);
    const spell = this.spells.findById(spellId);

    if (!wizard || !spell) {
      throw new Error("Sorcier ou sort introuvable.");
    }

    return `${wizard.name} lance ${spell.name} !`;
  }

  findByHouse(house: House): WizardSummary[] {
    return this.wizards.findByHouse(house);
  }
}
