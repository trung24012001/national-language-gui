import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { getImageUrl } from '../../utils';
import './style.scss';



export default function SlideShow({ populatePosts }) {
    const [slideIndex, setSlideIndex] = useState(1);
    const history = useHistory();
    const plusSlides = (n) => {
        let cur = slideIndex + n;
        if (cur > 5) cur = 1;
        else if (cur < 1) cur = 5;
        setSlideIndex(cur);
    }
    const currentSlide = (n) => {
        setSlideIndex(n);
    }

    useEffect(() => {
        let interval = setInterval(() => {
            setSlideIndex(slideIndex => {
                if (slideIndex + 1 > 5) {
                    return 1;
                }
                return slideIndex + 1;

            });
        }, 5000)

        return () => {
            clearInterval(interval);
        }
    }, [])

    const getActiveSlide = (idx) => {
        if (idx === slideIndex) {
            return {
                display: 'block'
            }
        }
        return {
            display: 'none'
        }
    }

    const getActiveDot = (number) => {
        if (number === slideIndex) {
            return 'dot active';
        }

        return 'dot';
    }

    return (
        <div className="slide-show">
            <div className="slideshow-container">
                {populatePosts.map((p, idx) => {
                    return (
                        <div className="mySlides fade"
                            style={getActiveSlide(idx + 1)}
                            key={p.id}
                            onClick={e => {
                                e.preventDefault();
                                history.push(`/post/${p.id}`)
                            }}>
                            <img src={getImageUrl(p.image)} style={{ width: '100%', height: '400px' }} />
                            <div className="text"><i>{p.title}</i></div>
                        </div>
                    )
                })}
                <a className="prev" onClick={e => plusSlides(-1)}>&#10094;</a>
                <a className="next" onClick={e => plusSlides(1)}>&#10095;</a>
            </div>
            <br />

            <div style={{ textAlign: 'center', margin: '30px 0px' }}>
                <span className={getActiveDot(1)} onClick={e => currentSlide(1)}></span>
                <span className={getActiveDot(2)} onClick={e => currentSlide(2)}></span>
                <span className={getActiveDot(3)} onClick={e => currentSlide(3)}></span>
                <span className={getActiveDot(4)} onClick={e => currentSlide(4)}></span>
                <span className={getActiveDot(5)} onClick={e => currentSlide(5)}></span>
            </div >
        </div >
    )
}
