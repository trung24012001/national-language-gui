import React, { useState, useEffect, useCallback } from "react";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Notification from "./components/Notification";
import { showNotification as show } from "./helpers/Helpers";
import { useHistory } from "react-router";
import { msToTime, removeVietnameseTones } from '../../../utils'
import "./styles/App.scss";
import {
    Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText,
    TextField, Snackbar, Alert
} from "@mui/material";
import { checkWin } from "./helpers/Helpers";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { getHangMans, getScores, sendScore } from "../../../store/reducer/game.reducer";
import Loading from "../../Loading";


export default function HangmanGame() {
    const TIME_GAME = 120000;
    const words = useSelector(state => state.gameReducer.hangMans);
    const scores = useSelector(state => state.gameReducer.scores);
    const [correctLetters, setCorrectLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [time, setTime] = useState(TIME_GAME);
    const [startGame, setStartGame] = useState(true);
    const [endGame, setEndGame] = useState(false);
    const [finalMessage, setFinalMessage] = useState('');
    const [finalMessageRevealWord, setFinalMessageRevealWord] = useState('');
    const [word, setWord] = useState(null);
    const [selectedWord, setSelectedWord] = useState(null);
    const [tvSelectedWord, setTvSelectedWord] = useState(null);
    const [score, setScore] = useState(0);
    const [register, setRegister] = useState(false);
    const [isHighScore, setIsHighScore] = useState(false);
    const [playerName, setPlayerName] = useState('');
    const [isSendScore, setIsSendScore] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHangMans({}));
        dispatch(getScores({ game: 'hangman' }))
    }, [])

    useEffect(() => {
        if (words.length) {
            let aWord = words[Math.floor(Math.random() * words.length)];
            setWord(aWord);
            setSelectedWord(aWord.word);
            setTvSelectedWord(removeVietnameseTones(aWord.word));
        }
    }, [words.length])

    useEffect(() => {
        if (selectedWord) {

            if (checkWin(correctLetters, wrongLetters, selectedWord) === "win") {
                let _score = score + correctLetters.length * 50 - wrongLetters.length * 10 + 60;
                setFinalMessage("Ch??c m???ng! B???n ???? qua m??n! ????");
                setFinalMessageRevealWord("");
                setEndGame(true);
                setScore(_score);
                setIsHighScore(highScore(_score));
            } else if (checkWin(correctLetters, wrongLetters, selectedWord) === "lose") {
                let _score = score + correctLetters.length * 50 - wrongLetters.length * 10 + 60;
                setFinalMessage("Ch??c b???n may m???n l???n sau. ????");
                setFinalMessageRevealWord(`T??? c???n t??m l??: ${selectedWord}`);
                setEndGame(true);
                setScore(_score);
                setIsHighScore(highScore(_score));
            }
        }

    }, [correctLetters, wrongLetters, selectedWord])


    useEffect(() => {
        const handleKeydown = (event) => {
            const { key, keyCode } = event;
            if (!endGame && !startGame && keyCode >= 65 && keyCode <= 90) {
                const letter = key.toLowerCase();
                let idx = tvSelectedWord.indexOf(letter);
                console.log(tvSelectedWord);
                if (idx >= 0) {

                    let engCorrectLetters = removeVietnameseTones(correctLetters.join('')).split('');
                    console.log(engCorrectLetters);
                    if (!engCorrectLetters.includes(letter)) {

                        for (let i in tvSelectedWord) {
                            if (tvSelectedWord[i] === letter) {
                                setCorrectLetters((currentLetters) => [...currentLetters, selectedWord[i]]);
                            }
                        }
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
                    setFinalMessage("Xin l???i! B???n ???? h???t th???i gian. ????");
                    setFinalMessageRevealWord(`T??? c???n t??m l??: ${selectedWord}`);
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
        let aWord = words[Math.floor(Math.random() * words.length)];
        setWord(aWord);
        setSelectedWord(aWord.word);
        setTvSelectedWord(removeVietnameseTones(aWord.word));
        timeCb();
        setTime(TIME_GAME);
        setStartGame(false);
    }


    const playAgain = () => {
        setStartGame(true);
        setEndGame(false);
        setCorrectLetters([]);
        setWrongLetters([]);
        setScore(0);
    }

    const continueGame = () => {
        setCorrectLetters([]);
        setWrongLetters([]);
        handleStartGame();
        setEndGame(false);
    }

    const showInfo = () => {
        Swal.fire({
            icon: "warning",
            title: "Quy t???c",
            text: "B???n c?? 2 ph??t ????? ho??n th??nh th??? th??ch n??y. " +
                "H??y nh???p ch??? c??i b???n ch???n t??? b??n ph??m ????? t??m ki???m t??? Ti???ng Vi???t ???????c gi???u ??i. Ch??c b???n may m???n!",
            confirmButtonColor: "#2563EB",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: "info",
                    title: "Th??ng tin",
                    text: "B???n kh??ng c???n nh???p ch??? c??i c?? d???u. H??? th???ng s??? gi??p b???n!",
                    confirmButtonColor: "#2563EB",
                });
            }
        });
    };

    const highScore = (myScore) => {
        console.log(myScore);
        if (scores.length < 5) return true;
        for (let s of scores) {
            if (myScore > s.score) {
                return true;
            }
        }

        return false;
    }

    const handleRegister = () => {
        dispatch(sendScore({ game: 'hangman', name: playerName, score }))
        setRegister(false);
        setIsHighScore(false);
        setIsSendScore(true);
    }


    return (
        <div className="hangman-game">
            {words.length > 0 ?
                <>
                    {startGame &&
                        <>
                            <div className="start-game">
                                <h2 className="title-game">
                                    Hangman Game
                                </h2>
                                <Button onClick={handleStartGame}>
                                    B???t ?????u
                                </Button>
                                <Button onClick={showInfo}>Quy t???c</Button>
                                <Button onClick={e => { history.push('/game') }}>
                                    Tho??t
                                </Button>


                            </div>
                            <div className="high-score">
                                {scores.map((s, idx) => {
                                    return (
                                        <div key={idx} style={{
                                            color: idx === 0 && 'red',
                                            marginBottom: '5px'
                                        }}>
                                            {idx + 1}. {s.name} : {s.score}
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    }
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
                                Th???i gian: {msToTime(time)}
                            </div>

                            <div className="hint">
                                G???i ??: ????y l?? {word.suggest}
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
                                    Tho??t
                                </Button>
                            </div>

                            {showNotification && <Notification showNotification={showNotification} />}
                        </>}
                </>
                :
                <Loading />
            }

            <Snackbar open={isSendScore} autoHideDuration={5000} onClose={e => { setIsSendScore(false) }}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    Ghi danh th??nh c??ng!
                </Alert>
            </Snackbar>

            <Dialog open={register}
                fullWidth={true}
                maxWidth='xs'
                onClose={e => {
                    setRegister(false)
                }}>
                <DialogTitle>Ghi danh</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        H??y cho ch??ng t??i bi???t t??n c???a b???n
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="T??n"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={e => { setPlayerName(e.target.value) }}
                        value={playerName}
                    />
                </DialogContent>
                <DialogActions className="btn-dialog-hangman">
                    <Button onClick={handleRegister}>G???i</Button>
                </DialogActions>
            </Dialog>

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
                    fontSize: '22px',
                }}>
                    {finalMessage}
                    <strong>{finalMessageRevealWord}</strong>
                    <div>
                        ??i???m c???a b???n l?? <span style={{ color: 'red' }}>{score}</span>
                        {isHighScore && '.B???n ???? v?????t qua k??? l???c, b???n c?? th??? ghi danh!'}
                    </div>
                </DialogTitle>
                <DialogActions className="btn-dialog-hangman">
                    {!finalMessageRevealWord.length && <Button onClick={continueGame}>Ti???p t???c</Button>}
                    {isHighScore && <Button onClick={e => { setRegister(true) }}>Ghi danh</Button>}
                    <Button onClick={playAgain}>Tho??t</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

