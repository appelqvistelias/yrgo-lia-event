/**
 * Format a string label by replacing underscores with spaces and capitalizing words.
 * Special cases:
 * - "three_d" becomes "3D"
 * - "ui" becomes "UI"
 * - "ux" becomes "UX"
 * For any other word, the first letter is capitalized.
 */
export function formatLabel(label) {
  const words = label.split("_");
  const formattedWords = [];
  let i = 0;

  while (i < words.length) {
    const word = words[i].toLowerCase();

    // Check for "three_d" special case
    if (
      word === "three" &&
      i + 1 < words.length &&
      words[i + 1].toLowerCase() === "d"
    ) {
      formattedWords.push("3D");
      i += 2;
    }
    // Check for "ui" special case
    else if (word === "ui") {
      formattedWords.push("UI");
      i++;
    }
    // Check for "ux" special case
    else if (word === "ux") {
      formattedWords.push("UX");
      i++;
    }
    // Default behavior: capitalize the first letter of the word
    else {
      formattedWords.push(word.charAt(0).toUpperCase() + word.slice(1));
      i++;
    }
  }

  return formattedWords.join(" ");
}
