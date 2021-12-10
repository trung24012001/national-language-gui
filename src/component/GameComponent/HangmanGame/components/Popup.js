import React, { useEffect } from "react";
import { checkWin } from "../helpers/Helpers";

const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, playAgain, timeout }) => {
  let finalMessage = "";
  let finalMessageRevealWord = "";
  let playable = true;

  if (timeout) {
    finalMessage = "Chúc bạn may mắn lần sau. 😕";
    finalMessageRevealWord = `...từ đó là: ${selectedWord}`;
    playable = false;
  }

  if (checkWin(correctLetters, wrongLetters, selectedWord) === "win") {
    finalMessage = "Chúc mừng! Bạn đã thắng! 😃";
    playable = false;
  } else if (checkWin(correctLetters, wrongLetters, selectedWord) === "lose") {
    finalMessage = "Chúc bạn may mắn lần sau. 😕";
    finalMessageRevealWord = `...từ đó là: ${selectedWord}`;
    playable = false;
  }

  useEffect(() => {
    setPlayable(playable);
  });

  return (
    <div className="popup-container" style={finalMessage !== "" ? { display: "flex" } : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
};

export default Popup;
