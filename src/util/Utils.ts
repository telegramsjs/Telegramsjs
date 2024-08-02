/**
 * Checks if a given string follows camelCase naming convention, is completely lowercase, or contains only digits.
 * @param str - The string to check.
 * @returns Returns `true` if the string is in camelCase format or completely lowercase, otherwise `false`.
 */
function isCamelCase(str: string) {
  const camelCasePattern = /^[a-z]+([A-Z][a-z]*)*$/;
  const lowercasePattern = /^[a-z]+$/;
  const digitPattern = /^\d+$/;
  return (
    camelCasePattern.test(str) ||
    lowercasePattern.test(str) ||
    digitPattern.test(str)
  );
}

export { isCamelCase };
