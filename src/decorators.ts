export function Log(
  _target: object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = descriptor.value as (...args: unknown[]) => unknown;

  descriptor.value = function (this: unknown, ...args: unknown[]): unknown {
    console.log(`[CALL] ${String(propertyKey)}`, args);
    try {
      const result = originalMethod.apply(this, args);
      console.log(`[RETURN] ${String(propertyKey)}`, result);
      return result;
    } catch (error: unknown) {
      console.error(`[ERROR] ${String(propertyKey)}`, error);
      throw error;
    }
  };
}

export function MeasureTime(
  _target: object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = descriptor.value as (...args: unknown[]) => unknown;

  descriptor.value = function (this: unknown, ...args: unknown[]): unknown {
    const start = Date.now();
    try {
      return originalMethod.apply(this, args);
    } finally {
      console.log(`[TIME] ${String(propertyKey)}: ${Date.now() - start} ms`);
    }
  };
}

/**
 * Valide le premier argument d'une méthode : s'il ressemble à un sort
 * (objet avec une propriété power numérique), une puissance négative est refusée.
 */
export function ValidateSpellPower(
  _target: object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = descriptor.value as (...args: unknown[]) => unknown;

  descriptor.value = function (this: unknown, ...args: unknown[]): unknown {
    const spell = args[0];

    if (
      typeof spell === "object" &&
      spell !== null &&
      "power" in spell &&
      typeof (spell as { power: unknown }).power === "number" &&
      (spell as { power: number }).power < 0
    ) {
      throw new Error("La puissance du sort ne peut pas être négative.");
    }

    return originalMethod.apply(this, args);
  };
}

/**
 * Cache les résultats par instance et par combinaison d'arguments.
 * La Map d'une instance n'est pas partagée avec les autres instances.
 */
export function Cache(
  _target: object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = descriptor.value as (...args: unknown[]) => unknown;
  const cacheByInstance = new WeakMap<object, Map<string, unknown>>();

  descriptor.value = function (this: object, ...args: unknown[]): unknown {
    let instanceCache = cacheByInstance.get(this);

    if (!instanceCache) {
      instanceCache = new Map<string, unknown>();
      cacheByInstance.set(this, instanceCache);
    }

    const key = JSON.stringify(args);

    if (instanceCache.has(key)) {
      console.log(`[CACHE HIT] ${String(propertyKey)}(${key})`);
      return instanceCache.get(key);
    }

    console.log(`[CACHE MISS] ${String(propertyKey)}(${key})`);
    const result = originalMethod.apply(this, args);
    instanceCache.set(key, result);
    return result;
  };
}
