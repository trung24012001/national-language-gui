import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { useHistory } from "react-router";
import { Button } from "@mui/material";
import { msToTime } from "../../../utils";
import { getMemories } from '../../../store/reducer/game.reducer';
import Loading from '../../Loading';
import { v4 } from 'uuid';
import "./styles.scss";

import Grid from "./Grid";


export default function MemoryGame() {
  const memories = useSelector(state => state.gameReducer.memories);
  const [newGame, setNewGame] = useState(true);
  const [list, setList] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [duration, setDuration] = useState(0);
  const [finishedItems, setFinishedItems] = useState([]);
  const [winner, setWinner] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();
  const intervalRef = useRef(null);

  const checkItems = (firstIndex, secondIndex) => {
    if (firstIndex !== secondIndex && list[firstIndex].url && list[firstIndex].url) {
      if (
        firstIndex !== secondIndex &&
        list[firstIndex].url === list[secondIndex].url
      ) {
        setTimeout(() => {
          setFinishedItems([...finishedItems, firstIndex, secondIndex]);
        }, 600);

      } else {
        setTimeout(() => {
          setVisibleItems([]);
        }, 600);
      }

    } else {
      if (
        firstIndex !== secondIndex &&
        list[firstIndex].isSame === list[secondIndex].isSame
      ) {
        setTimeout(() => {
          setFinishedItems([...finishedItems, firstIndex, secondIndex]);
        }, 600);

      } else {
        setTimeout(() => {
          setVisibleItems([]);
        }, 600);
      }
    }
  };

  const checkUrl = (text) => {
    let urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(text);
  }

  useEffect(() => {
    if (memories.length && !newGame && level) {
      console.log('abas')
      let arr = [];
      for (let item of memories) {
        let isSame = v4();
        arr.push({
          id: v4(),
          [checkUrl(item.first_word) ? 'url' : 'content']: item.first_word,
          isSame
        })

        arr.push({
          id: v4(),
          [checkUrl(item.second_word) ? 'url' : 'content']: item.second_word,
          isSame
        })
      }
      arr.sort(() => (0.5 - Math.random()))
      setList(arr);
      setDuration(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = durationIntervalCb();
    }


  }, [memories.length, newGame])

  useEffect(() => {
    if (!newGame && level === 0) {
      axios.get(
        "https://api.unsplash.com/search/photos/?client_id=c0c103ae0af5122685dec516d4275b6471e81c388d2ce0791c61bb8f47285d5d&query=flower&per_page=6"
      )
        .then(res => {
          const newList = res.data.results.map(item => {
            return {
              id: item.id,
              url: item.urls.thumb,
              description: item.alt_description
            };
          });
          console.log(newList);
          setList(
            newList
              .concat(
                newList.map(item => {
                  return {
                    ...item,
                    id: item.id + "1"
                  };
                })
              )
              .sort(() => {
                return 0.5 - Math.random();
              })
          );
        });

      setDuration(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = durationIntervalCb();
    }
  }, [newGame])



  const durationIntervalCb = useCallback(() => {
    let interval = setInterval(() => {
      setDuration(duration => {
        return duration += 1;
      });

    }, 1000)
    return interval;
  })


  useEffect(
    () => {
      if (finishedItems.length > 0 && finishedItems.length === list.length) {
        setWinner(true);
        setScore(Math.round(3600 / duration));
        clearInterval(intervalRef.current);
      }
    },
    [finishedItems]
  );

  const playAgain = () => {
    setWinner(false);
    setNewGame(true);
    setDuration(0);
    clearInterval(intervalRef.current);
  }

  const startGame = (level) => {
    if (level !== 0) dispatch(getMemories({ level }));
    setLevel(level);
    setNewGame(false);
    setVisibleItems([]);
    setFinishedItems([]);
    setList([]);
    setWinner(false);

  }

  return (
    <div className="memory-game">
      {newGame &&
        <div className="start-game">
          <h2>Memory Game</h2>
          <Button
            onClick={e => { startGame(0) }}
          >
            Luyện tập
          </Button>
          <Button
            onClick={e => { startGame(1) }}
          >
            Mức 1
          </Button>
          <Button
            onClick={e => { startGame(2) }}
          >
            Mức 2
          </Button>
          <Button
            onClick={e => { startGame(3) }}
          >
            Mức 3
          </Button>
          <Button onClick={e => {
            history.push('/game');
          }}>
            Thoát
          </Button>
        </div>}

      {winner && (
        <div className="start-game">
          <div>
            <strong>Chúc mừng!</strong> Bạn đã
            hoàn thành màn chơi trong {duration} giây. Điểm của bạn là <strong style={{ color: 'red' }}>{score}</strong>
          </div>
          <span></span>
          <div className="btn-list">
            <Button onClick={playAgain}>
              Chơi lại
            </Button>
            <Button onClick={e => { history.push('/game') }}>
              Thoát
            </Button>
          </div>
        </div>
      )}

      {(!newGame && !winner) &&
        <>
          {
            list.length === 0 ? (
              <Loading />
            ) : (
              <>
                <div className="header">
                  <div className="time">
                    Thời gian: {msToTime(duration * 1000)}
                  </div>
                </div>
                <Grid
                  list={list}
                  visibleItems={visibleItems}
                  setVisibleItems={setVisibleItems}
                  finishedItems={finishedItems}
                  checkItems={checkItems}
                  level={level}
                />
                <div style={{ position: 'fixed', bottom: 0, left: 0 }}>
                  <Button onClick={playAgain}>
                    Thoát
                  </Button>
                </div>
              </>
            )
          }
        </>}
    </div >
  );
}

