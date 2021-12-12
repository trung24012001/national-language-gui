import { useSelector, useDispatch, } from 'react-redux';
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Button, TextField } from '@mui/material';
import './quizzLevel.scss';


export default function Tag({ question, current, handleAnswer, score }) {
    const [content, setContent] = useState('');
    const [animateStyle, setAnimateStyle] = useState({ opacity: 0.1 });

    useEffect(() => {
        setContent('');
        setAnimateStyle({ opacity: 0.1 })
        setTimeout(() => {
            setAnimateStyle({ opacity: 1, transition: 'opacity .6s' })
        }, 300)

    }, [current])

    const onContentChange = (e) => {
        setContent(e.target.value);
    }

    const getQuestionContent = (question) => {

        let result = useMemo(() => {
            let type = question.type;
            if (type === 2) {
                return (
                    <>
                        <div className='question-intro'>
                            Hoàn thành câu sau:
                        </div>
                        <div className='question-text'>{question.content}</div>
                        <div className='answer-section'>
                            <div className='input'>
                                <input onChange={onContentChange} value={content} placeholder='Nhập câu trả lời...' />
                            </div>
                            <div className='answer-btn'>
                                <Button onClick={e => handleAnswer(e, { type: 2, content, answers: question.answers })}>Trả lời</Button>
                            </div>
                        </div>

                    </>
                )
            } else if (type === 1) {
                let answers = [...question.answers].sort(() => Math.random() - 0.5);
                return (
                    <>
                        <div className='question-intro'>
                            Chọn đáp án đúng:
                        </div>
                        <div className='question-text'>{question.content}</div>
                        <div className='answer-section'>
                            {answers.map((a, idx) => {
                                return (
                                    <Button key={a.id} onClick={e => handleAnswer(e, { type: 1, id: a.id, answers: question.answers })}>
                                        {a.content}
                                    </Button>
                                )
                            })}
                        </div>

                    </>
                )
            }
        }, [question, content])

        return result;

    }

    return (
        <div className="tag" style={animateStyle}>
            {question &&
                <>
                    <div className='question-count'>
                        <span>Score: {score}</span>
                    </div>
                    {getQuestionContent(question)}
                </>
            }

        </div >


    );
}
