/**
 * Indique si l’événement clavier provient d’un champ de saisie (input, textarea, contenteditable).
 * Utilisé pour ne pas déclencher les raccourcis globaux quand l’utilisateur tape.
 */
export function isTypingInInput(event: KeyboardEvent): boolean {
  const target = event.target as HTMLElement;
  return (
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    !!target.isContentEditable
  );
}

/**
 * Enveloppe un gestionnaire de raccourci clavier pour qu’il ne s’exécute pas
 * lorsque le focus est dans un input, textarea ou élément contenteditable.
 */
export function createShortcutHandler(
  handler: (event: KeyboardEvent) => void
): (event: KeyboardEvent) => void {
  return (event: KeyboardEvent) => {
    if (isTypingInInput(event)) return;
    handler(event);
  };
}
