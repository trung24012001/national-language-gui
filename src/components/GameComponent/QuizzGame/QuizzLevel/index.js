import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { Button, DialogTitle, Dialog, DialogActions } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { msToTime } from '../../../../utils';
import Tag from './Tag';
import './quizzLevel.scss';


export default function QuizzLevel() {
    const TIME_END = 300000;
    const params = useParams();
    const history = useHistory();
    const questions = useSelector(state => state.gameReducer.questions);
    const [questions_lv] = useState(questions.filter(q => q.level == params.level));
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [checkCorrect, setCheckCorrect] = useState(false);
    const [time, setTime] = useState(TIME_END);
    const [startGame, setStartGame] = useState(true);
    const [endGame, setEndGame] = useState(false);

    useEffect(() => {
        console.log(questions_lv);
        if (!questions_lv.length) {
            history.push('/game/quizz')
        }

        return () => {
            clearInterval(timeCb)
        }
    }, [])

    const timeCb = useCallback(() => {
        let interval = setInterval(() => {
            setTime(time => {
                if (time <= 0) {
                    clearInterval(interval);
                    setEndGame(true);
                    return 0;
                }
                return time -= 1000;
            });
        }, 1000)
    })

    const nextQuestion = () => {
        let next = currentQuestion + 1;
        if (next >= questions_lv.length) {
            setEndGame(true);
        }
        setCurrentQuestion(next);
        setOpenModal(false);
    }

    const handleAnswer = (e, obj) => {
        e.preventDefault();
        let trueAnswer = obj.answers.find(a => a.is_true === 1);
        if (obj.type === 1) {
            if (trueAnswer.id === obj.id) {
                setCheckCorrect(true);
                setScore(score => score += 1);
            } else {
                setCheckCorrect(false);
            }

        } else if (obj.type === 2) {
            let myContent = obj.content.split(' ').join('').toLowerCase();
            let trueContent = trueAnswer.content.split(' ').join('').toLowerCase();
            if (trueContent == myContent) {
                setScore(score => score += 1);
                setCheckCorrect(true);
            } else {
                setCheckCorrect(false);
            }
        }

        setOpenModal(true);
    }

    const handleStartGame = () => {
        timeCb();
        setTime(TIME_END);
        setScore(0);
        setCurrentQuestion(0);
        setEndGame(false);
        setStartGame(false);
    }

    const getLevel = (number) => {
        if (number == 1) return <span style={{ color: 'green' }}>D???</span>;
        else if (number == 2) return <span style={{ color: 'greenyellow' }}>D??? v???a</span>;
        else if (number == 3) return <span style={{ color: 'yellow' }}>B??nh th?????ng</span>;
        else if (number == 4) return <span style={{ color: 'orange' }}>Kh??</span>;
        else if (number == 5) return <span style={{ color: 'red' }}>Si??u kh??</span>;
    }

    return (
        <div className='quizz-level'>

            {startGame &&
                <div className='game'>
                    <div className='tutorial'>
                        <div>
                            C???p ?????: {getLevel(params.level)}
                        </div>
                        <div style={{ marginTop: '50px' }}>
                            H??y ch???n c??u tr??? l???i ch??nh x??c. B???n c?? <strong>5 ph??t</strong> ????? ho??n th??nh th??? th??ch n??y !!!
                        </div>
                    </div>
                    <div className='btn-list'>
                        <Button onClick={handleStartGame}>B???t ?????u</Button>
                        <Button onClick={e => { history.push('/game/quizz') }}>Ch???n l???i c???p</Button>
                    </div>
                </div>}
            {endGame &&
                <div className='game'>
                    <div className='tutorial'>
                        ???? ho??n th??nh th??? th??ch. S??? ??i???m c???a b???n l?? <span style={{ color: 'red' }}>{score}</span>
                    </div>
                    <div className='btn-list'>
                        <Button onClick={e => {
                            setEndGame(false);
                            setStartGame(true);
                        }}>Ch??i l???i</Button>
                        <Button onClick={e => {
                            history.push('/game');
                        }}>Tho??t</Button>
                    </div>
                </div>}

            {(!startGame && !endGame) &&
                <>
                    <div className='header'>
                        <div className='time'>
                            Time: {msToTime(time)}
                        </div>
                        <div className='score'>
                            <span>Question {currentQuestion + 1} / {questions_lv.length}</span>
                        </div>
                        <div className='high-score'>
                            Best : {score}
                        </div>
                    </div>
                    <Tag question={questions_lv[currentQuestion]}
                        current={currentQuestion}
                        score={score}
                        handleAnswer={handleAnswer} />
                    <div className='bottom-btn'>
                        <Button onClick={e => {
                            history.push('/game/quizz')
                        }}>Tho??t</Button>
                        <Button onClick={nextQuestion}>Skip</Button>
                    </div>
                </>}
            <Dialog
                open={openModal}
                fullWidth={true}
                maxWidth='xs'
                className="dialog"

            >
                <DialogTitle sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '26px',
                }}>
                    {
                        checkCorrect ?
                            <>
                                <span>C??u tr??? l???i ch??nh x??c</span> <CheckIcon color="success" />
                            </>
                            :
                            <>
                                <span>Ti???c qu??! Sai m???t r???i</span> <CloseIcon color="error" />
                            </>
                    }
                </DialogTitle>
                <DialogActions sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: '60px',
                    marginTop: '30px'
                }}>
                    <Button onClick={nextQuestion} style={{
                        width: '150px',
                        margin: '15px',
                        fontSsize: '18px',
                        backgroundColor: '#252d4a',
                        borderRadius: '15px',
                        display: 'flex',
                        padding: '5px',
                        alignItems: 'center',
                        color: '#fff',
                    }}>Ti???p theo</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}
