import React, { useState, useEffect, useCallback } from "react";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Notification from "./components/Notification";
import { showNotification as show } from "./helpers/Helpers";
import { useHistory } from "react-router";
import { msToTime, removeVietnameseTones } from '../../../utils'
import "./styles/App.scss";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { checkWin } from "./helpers/Helpers";
import Swal from "sweetalert2";

const words = [
    "xin chào", "tạm biệt", "quyển sách"
];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let tvSelectedWord = removeVietnameseTones(selectedWord);

function App() {
    const TIME_GAME = 120000;
    const [correctLetters, setCorrectLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [time, setTime] = useState(TIME_GAME);
    const [startGame, setStartGame] = useState(true);
    const [endGame, setEndGame] = useState(false);
    const [finalMessage, setFinalMessage] = useState('');
    const [finalMessageRevealWord, setFinalMessageRevealWord] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (selectedWord) {
            if (checkWin(correctLetters, wrongLetters, selectedWord) === "win") {
                setFinalMessage("Chúc mừng! Bạn đã thắng! 😃");
                setFinalMessageRevealWord("");
                setEndGame(true);
            } else if (checkWin(correctLetters, wrongLetters, selectedWord) === "lose") {
                setFinalMessage("Chúc bạn may mắn lần sau. 😕");
                setFinalMessageRevealWord(`Từ cần tìm là: ${selectedWord}`);
                setEndGame(true);
            }
        }

    }, [correctLetters, wrongLetters, selectedWord])


    useEffect(() => {
        const handleKeydown = (event) => {
            const { key, keyCode } = event;
            if (!endGame && !startGame && keyCode >= 65 && keyCode <= 90) {
                const letter = key.toLowerCase();
                let idx = tvSelectedWord.indexOf(letter);
                if (idx >= 0) {
                    let engCorrectLetters = removeVietnameseTones(correctLetters.join('')).split('');
                    if (!engCorrectLetters.includes(letter)) {
                        setCorrectLetters((currentLetters) => [...currentLetters, selectedWord[idx]]);
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
    }, [correctLetters, wrongLetters, endGame, startGame]);

    const timeCb = useCallback(() => {
        let interval = setInterval(() => {
            setTime(time => {
                if (time <= 0) {
                    clearInterval(interval);
                    setFinalMessage("Xin lỗi! Bạn đã hết thời gian. 😕");
                    setFinalMessageRevealWord(`Từ cần tìm là: ${selectedWord}`);
                    setEndGame(true);
                    return 0;
                }
                return time -= 1000;
            });
            setEndGame(endGame => {
                if (endGame) {
                    clearInterval(interval);
                }
                return endGame;
            })
        }, 1000)
    })

    const handleStartGame = () => {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        tvSelectedWord = removeVietnameseTones(selectedWord);
        timeCb();
        setTime(TIME_GAME);
        setStartGame(false);
    }


    function playAgain() {
        setStartGame(true);
        setEndGame(false);
        setCorrectLetters([]);
        setWrongLetters([]);
        setTime(TIME_GAME);
    }

    const showInfo = () => {
        Swal.fire({
            icon: "warning",
            title: "Quy tắc",
            text: "Bạn có 2 phút để hoàn thành thử thách này. " +
                "Hãy nhập chữ cái bạn chọn từ bàn phím để tìm kiếm từ Tiếng Việt được giấu đi. Chúc bạn may mắn!",
            confirmButtonColor: "#2563EB",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: "info",
                    title: "Thông tin",
                    text: "Bạn không cần nhập chữ cái có dấu. Hệ thống sẽ giúp bạn!",
                    confirmButtonColor: "#2563EB",
                });
            }
        });
    };

    return (
        <div className="hangman-game">
            {startGame &&
                <div className="start-game">
                    <h2 className="title-game">
                        Hangman Game
                    </h2>
                    <Button onClick={handleStartGame}>
                        Bắt đầu
                    </Button>
                    <Button onClick={showInfo}>Quy tắc</Button>
                    <Button onClick={e => { history.push('/game') }}>
                        Thoát
                    </Button>
                </div>}
            {(!startGame) &&
                <>
                    <h2 className="title-game">
                        Hangman Game
                    </h2>
                    <div style={{
                        position: 'absolute',
                        fontSize: '20px',
                        fontWeight: 600,
                        left: '50px',
                        top: '50px'
                    }}>
                        Thời gian: {msToTime(time)}
                    </div>

                    <div className="game-container">
                        <Figure wrongLetters={wrongLetters} />
                        <WrongLetters wrongLetters={wrongLetters} />
                        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
                    </div>

                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        margin: '30px'
                    }}>
                        <Button style={{ backgroundColor: 'transparent', }} onClick={e => { history.push('/game') }}>
                            Thoát
                        </Button>
                    </div>

                    {showNotification && <Notification showNotification={showNotification} />}
                </>}

            <Dialog
                open={endGame}
                fullWidth={true}
                maxWidth='xs'
                className="dialog"

            >
                <DialogTitle sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    fontSize: '26px',
                }}>
                    {finalMessage}
                    <strong> {finalMessageRevealWord}</strong>
                </DialogTitle>
                <DialogActions sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: '60px',
                    marginTop: '30px'
                }}>
                    <Button onClick={playAgain} style={{
                        backgroundColor: '#2563eb',
                        borderRadius: '20px',
                        border: 'none',
                        color: 'white',
                        padding: '10px 20px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        fontSize: '14px',
                    }}>Chơi lại</Button>
                </DialogActions>
            </Dialog>


        </div >
    );
}

export default App;
