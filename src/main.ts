import type {
  AcademyEvent,
  HousePoints,
  NewWizard,
  SpellOutput,
  ArrayElement,
  Spell,
  AttackSpell,
  NonHealingCategory,
  SpellCategory
} from "./types";
import { WizardRepository, SpellRepository } from "./repository";
import { AcademyService } from "./academy-service";
import { getSpellCastEvents, handleSpellCast } from "./event-handler";
import { isHouse, isWizard } from "./type-guards";
import { Calculator } from "./calculator";

const wizards = new WizardRepository();
const spells = new SpellRepository();

// Exercice 1
const harryData: NewWizard = {
  name: "Harry Potter",
  house: "Gryffindor",
  level: 5,
  active: true,
  patronus: "Stag"
};
const harry = wizards.createWizard(harryData);
const hermione = wizards.createWizard({
  name: "Hermione Granger",
  house: "Gryffindor",
  level: 8,
  active: true
});
wizards.createWizard({
  name: "Draco Malfoy",
  house: "Slytherin",
  level: 6,
  active: true
});
console.log("\\n=== Exercice 1 : création automatique ===");
console.log(harry, hermione);

const expelliarmus = spells.addSpell({
  name: "Expelliarmus",
  category: "attack",
  power: 80
});
spells.addSpell({ name: "Protego", category: "defense", power: 60 });

const academy = new AcademyService(wizards, spells);
console.log("\\n=== Exercice 2 : recherche par maison ===");
console.log(academy.findByHouse("Gryffindor"));

console.log("\\n=== Test du service : lancer un sort ===");
console.log(academy.castSpell(harry.id, expelliarmus.id));

// Exercice 3 — Extract
console.log("\\n=== Exercice 3 : filtrer les événements spell-cast ===");
const events: AcademyEvent[] = [
  { type: "spell-cast", wizardId: harry.id, spellName: "Lumos" },
  { type: "level-up", wizardId: hermione.id, newLevel: 9 },
  { type: "wizard-expelled", wizardId: 3 },
  { type: "spell-cast", wizardId: hermione.id, spellName: "Wingardium Leviosa" }
];
const spellEvents = getSpellCastEvents(events);
spellEvents.forEach(handleSpellCast);

// Exercice 4 — décorateur de validation
console.log("\\n=== Exercice 4 : validation de la puissance ===");
try {
  console.log(spells.addSpell({
    name: "Lumos",
    category: "defense",
    power: 10
  }));
} catch (error: unknown) {
  console.error(error);
}
try {
  spells.addSpell({
    name: "Sort interdit",
    category: "attack",
    power: -10
  });
} catch (error: unknown) {
  console.log("Sort refusé :", error instanceof Error ? error.message : error);
}

// Exercice 5 — décorateur Cache
console.log("\\n=== Exercice 5 : cache ===");
const calculator = new Calculator();
console.log("Résultat :", calculator.multiply(5, 6));
console.log("Résultat :", calculator.multiply(5, 6)); // CACHE HIT attendu
console.log("Résultat :", calculator.multiply(2, 4)); // CACHE MISS attendu

// Exercice 6 — Type Guard strict
console.log("\\n=== Exercice 6 : Type Guards ===");
console.log("Gryffindor valide :", isHouse("Gryffindor"));
console.log("Durmstrang valide :", isHouse("Durmstrang"));
console.log("Harry est un sorcier valide :", isWizard(harry));
console.log("Objet invalide :", isWizard({
  id: 99, name: "Victor", house: "Durmstrang", level: 4, active: true
}));

console.log("\\n=== Autres exemples du cours ===");
const points: HousePoints = {
  Gryffindor: 100,
  Slytherin: 80,
  Ravenclaw: 90,
  Hufflepuff: 70
};
console.log("Points par maison :", points);

type CastArguments = Parameters<AcademyService["castSpell"]>;
type CastResult = ReturnType<AcademyService["castSpell"]>;
type AttackOutput = SpellOutput<"attack">;
type HealingOutput = SpellOutput<"healing">;
type SpellItem = ArrayElement<Spell[]>;
type AttackSpellExample = AttackSpell;
type RemainingCategories = NonHealingCategory;
type CategoryExample = SpellCategory;

const typeExamples: [
  CastArguments, CastResult, AttackOutput, HealingOutput,
  SpellItem, AttackSpellExample["category"], RemainingCategories, CategoryExample
] | null = null;
void typeExamples;
