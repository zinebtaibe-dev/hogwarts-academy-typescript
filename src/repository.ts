import type {
  House,
  NewSpell,
  NewWizard,
  Spell,
  Wizard,
  WizardSummary,
  WizardUpdate
} from "./types";
import { Log, MeasureTime, ValidateSpellPower } from "./decorators";

export class Repository<T extends { id: number }> {
  private readonly items: T[] = [];

  @Log
  add(item: T): void {
    this.items.push(item);
  }

  @MeasureTime
  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }

  getAll(): T[] {
    return [...this.items];
  }

  protected nextId(): number {
    return this.items.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;
  }

  update(id: number, changes: Partial<T>): boolean {
    const item = this.findById(id);
    if (!item) return false;
    Object.assign(item, changes);
    return true;
  }
}
  // Exercice 1 
export class WizardRepository extends Repository<Wizard> {
 createWizard(data: NewWizard): Wizard {
    const nextId =
        this.getAll().reduce(
            (max, wizard) => Math.max(max, wizard.id),
            0
        ) + 1;

    const wizard = Object.assign({}, data, {
        id: nextId
    }) as Wizard;

    this.add(wizard);

    return wizard;
}


  // Exercice 2 
  findByHouse(house: Wizard["house"]): WizardSummary[] {
    return this.getAll()
      .filter(wizard => wizard.house === house)
      .map(({ id, name, house: wizardHouse }) => ({
        id,
        name,
        house: wizardHouse
      }));
  }

  updateWizard(id: number, changes: WizardUpdate): boolean {
    return this.update(id, changes);
  }
}

export class SpellRepository extends Repository<Spell> {
  // Exercice 4
  @ValidateSpellPower
  addSpell(spell: NewSpell): Spell {
    const createdSpell: Spell = { ...spell, id: this.nextId() };
    this.add(createdSpell);
    return createdSpell;
  }
}
