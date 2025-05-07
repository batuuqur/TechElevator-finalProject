import { useState, useEffect } from "react";
import styles from "./ShopPromptText.module.css";

export default function ShopPromptText({ textLines = [], onClick }) {
  const [displayedText, setDisplayedText] = useState(["", ""]);

  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;

    const interval = setInterval(() => {
      if (currentLine >= textLines.length) {
        clearInterval(interval);
        return;
      }

      setDisplayedText(prev => {
        const newLines = [...prev];
        newLines[currentLine] += textLines[currentLine][currentChar] || "";
        return newLines;
      });

      currentChar++;

      if (currentChar >= textLines[currentLine].length) {
        currentLine++;
        currentChar = 0;
      }
    }, 60);

    return () => clearInterval(interval);
  }, [textLines]);

  return (
    <div className={styles.shopPrompt} onClick={onClick}>
      {displayedText.map((line, idx) => (
        <div key={idx}>{line}</div>
      ))}
    </div>
  );
}
