import React from "react";

// Utility function to escape special regex characters in the highlight string
const escapeRegExp = (str) => {
  return str.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&'); // Escape special regex characters
};

export const HighlightedSuggestion = React.memo(({ text, highlight }) => {
  if (!highlight.trim()) return <span>{text}</span>;
  const escapedHighlight = escapeRegExp(highlight);

  // Create a regular expression with the escaped highlight term
  const regex = new RegExp(`(${escapedHighlight})`, "gi");

  // Split the text by the highlight text
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={index} className="fw-bold">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
});
