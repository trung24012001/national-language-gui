import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { Button } from "@mui/material";
import { msToTime } from "../../../utils";
import "./styles.scss";

import Grid from "./Grid";


export default function MemoryGame() {
  const [newGame, setNewGame] = useState(true);
  const [list, setList] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [duration, setDuration] = useState(0);
  const [finishedItems, setFinishedItems] = useState([]);
  const [winner, setWinner] = useState(false);
  const [score, setScore] = useState(0);
  const history = useHistory();
  const intervalRef = useRef(null);

  const checkItems = (firstIndex, secondIndex) => {
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
  };

  useEffect(() => {
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
  }, [newGame]);

  

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

  const startGame = () => {
    setNewGame(false);
    setVisibleItems([]);
    setFinishedItems([]);
    setWinner(false);
    setDuration(0);
    intervalRef.current = durationIntervalCb();

  }

  return (
    <div className="memory-game">
      {newGame &&
        <div className="start-game">
          <h2>Memory Game</h2>
          <Button
            onClick={startGame}
          >
            Bắt đầu
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
              <div>...Loading</div>
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
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
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

