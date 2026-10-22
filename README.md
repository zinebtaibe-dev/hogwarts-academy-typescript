# Hogwarts Academy — Projet TypeScript (TAF)

Projet basé sur le TAF du cours `TypeScript.pdf`. Il reprend le démarrage fourni dans `hogwarts-academy.zip` et complète les 6 exercices en séparant les responsabilités.

## Prérequis
- Node.js 18 ou supérieur
- npm
- Git

## Installation et lancement
```bash
npm install
npm run typecheck
npm start
```

`npm start` utilise `tsx` pour exécuter directement les fichiers TypeScript. Cela évite de lancer d'anciens fichiers compilés dans `dist/`.

## Organisation des fichiers (Single Responsibility Principle)
- `src/types.ts` : types et modèles de données.
- `src/repository.ts` : stockage en mémoire et opérations de persistance.
- `src/decorators.ts` : décorateurs de journalisation, mesure du temps, validation et cache.
- `src/type-guards.ts` : validation des données inconnues.
- `src/event-handler.ts` : traitement des événements `spell-cast`.
- `src/calculator.ts` : exemple indépendant pour tester le cache.
- `src/academy-service.ts` : opérations métier de l'académie.
- `src/main.ts` : point d'entrée, instanciation et démonstration des six exercices.

## Les 6 exercices du TAF
1. `NewWizard = Omit<Wizard, "id">` et création avec identifiant automatique.
2. `findByHouse(house: House)` dans `WizardRepository`.
3. `Extract<AcademyEvent, { type: "spell-cast" }>` pour ne traiter que les événements de lancement de sorts.
4. `ValidateSpellPower` rejette les sorts dont la puissance est négative.
5. `Cache` mémorise les résultats pour les mêmes arguments, séparément pour chaque instance.
6. `isHouse` vérifie l'appartenance aux quatre maisons autorisées et `isWizard` l'utilise.

## Git : versionner le projet
Dans le dossier du projet :
```bash
git init
git add .
git commit -m "chore: initialiser le projet TypeScript"
```

Après chaque exercice, vérifiez le projet (`npm run typecheck`, puis `npm start`) et créez un commit :
```bash
git add src/types.ts src/repository.ts
git commit -m "feat: ajouter la création et la recherche des sorciers"
```

Exemples de messages de commit :
- `feat: ajouter la création automatique des sorciers`
- `feat: filtrer les sorciers par maison`
- `feat: typer les événements de lancement de sorts`
- `feat: valider la puissance des sorts`
- `feat: ajouter le cache des calculs`
- `fix: renforcer les type guards des maisons`
- `docs: expliquer l'architecture du projet`

Pour publier sur GitHub, créez un dépôt vide sur GitHub, puis utilisez l'URL fournie par GitHub :
```bash
git branch -M main
git remote add origin URL_DU_DEPOT_GITHUB
git push -u origin main
```
Ne copiez pas littéralement `URL_DU_DEPOT_GITHUB` : remplacez-la par l'URL réelle de votre dépôt.
