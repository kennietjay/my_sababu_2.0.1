export function titleCase(text) {
  if (typeof text !== "string") {
    return "";
  }

  // Separate camelCase words by inserting spaces before each uppercase letter
  let separatedText = text.replace(/([a-z])([A-Z])/g, "$1 $2");

  // Replace dashes and underscores with spaces
  separatedText = separatedText.replace(/[-_]/g, " ");

  // Split the text into words and title case each word
  const words = separatedText
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  // Join the title-cased words back into a single string
  return words.join(" ");
}
