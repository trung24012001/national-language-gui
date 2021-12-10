import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Popup from "./components/Popup";
import Notification from "./components/Notification";
import { showNotification as show } from "./helpers/Helpers";
import "./styles/App.scss";

const words = [
    "xin chao",
];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
    const [playable, setPlayable] = useState(true);
    const [correctLetters, setCorrectLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval = setInterval(() => {
            setTime(time => {
                return time += 1;
            });
        }, 1000)


        return () => {
            clearInterval(interval);
        }
    }, [])

    const getSecondToTime = (seconds) => {
        if (seconds < 10) return `0:0${time}`;
        else if (seconds < 60) return `0:${time}`;
        else {
            let minutes = Math.round(seconds / 60);

            if (seconds % 60 < 10) {
                return `${minutes}:0${seconds % 60}`;
            }

            return `${minutes}:${seconds % 60}`;
        }
    }

    useEffect(() => {
        const handleKeydown = (event) => {
            const { key, keyCode } = event;
            if (playable && keyCode >= 65 && keyCode <= 90) {
                const letter = key.toLowerCase();
                if (selectedWord.includes(letter)) {
                    if (!correctLetters.includes(letter)) {
                        setCorrectLetters((currentLetters) => [...currentLetters, letter]);
                    } else {
                        show(setShowNotification);
                    }
                } else {
                    if (!wrongLetters.includes(letter)) {
                        setWrongLetters((currentLetters) => [...currentLetters, letter]);
                    } else {
                        show(setShowNotification);
                    }
                }
            }
        };
        window.addEventListener("keydown", handleKeydown);

        return () => window.removeEventListener("keydown", handleKeydown);
    }, [correctLetters, wrongLetters, playable]);

    function playAgain() {
        setPlayable(true);

        // Empty Arrays
        setCorrectLetters([]);
        setWrongLetters([]);
        setTime(0);

        const random = Math.floor(Math.random() * words.length);
        selectedWord = words[random];
    }

    return (
        <div className="hangman-game">
            <div style={{
                position: 'absolute',
                fontSize: '20px',
                fontWeight: 600,
                left: '50px',
                top: '50px'
            }}>
                Time: {getSecondToTime(time)}
            </div>
            <Header />
            <div className="game-container">
                <Figure wrongLetters={wrongLetters} />
                <WrongLetters wrongLetters={wrongLetters} />
                <Word selectedWord={selectedWord} correctLetters={correctLetters} />
            </div>
            <Popup correctLetters={correctLetters} wrongLetters={wrongLetters}
                selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain}
                timeout={time > 300}
            />
            {showNotification && <Notification showNotification={showNotification} />}
        </div>
    );
}

export default App;
