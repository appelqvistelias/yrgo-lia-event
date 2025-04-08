/**
 * Format a string label by capitalizing the first letter of each word and replacing underscores with spaces.
 * Exempel: "digital_design" → "Digital Design"
 */
export function formatLabel(label) {
  const words = label.split("_");
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
