import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import './style.scss';



export default function SlideShow({ populatePosts }) {
    const slideIndex = useRef(1);
    const history = useHistory();

    const showSlides = (n) => {
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) { slideIndex.current = 1 }
        if (n < 1) { slideIndex.current = slides.length }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex.current - 1].style.display = "block";
        dots[slideIndex.current - 1].className += " active";
    }

    const plusSlides = (n) => {
        showSlides(slideIndex.current + n);
        slideIndex.current += n;
    }

    const currentSlide = (n) => {
        showSlides(n);
        slideIndex.current = n;
    }

    useEffect(() => {
        showSlides(slideIndex.current);
        let interval = setInterval(() => {
            slideIndex.current += 1;
            showSlides(slideIndex.current);
        }, 5000)

        return () => {
            clearInterval(interval);
        }
    }, [])
    return (
        <div className="slide-show">
            <div className="slideshow-container">
                {populatePosts.map(p => {
                    return (
                        <div className="mySlides fade"
                            key={p.id}
                            onClick={e => {
                                e.preventDefault();
                                history.push(`/post/${p.id}`)
                            }}>
                            {/* <div className="numbertext">1 / 5</div> */}
                            <img src={p.image} style={{ width: '100%', height: '400px' }} />
                            <div className="text"><i>{p.title}</i></div>
                        </div>
                    )
                })}
                <a className="prev" onClick={e => plusSlides(-1)}>&#10094;</a>
                <a className="next" onClick={e => plusSlides(1)}>&#10095;</a>
            </div>
            <br />

            <div style={{ textAlign: 'center', margin: '30px 0px' }}>
                <span className="dot" onClick={e => currentSlide(1)}></span>
                <span className="dot" onClick={e => currentSlide(2)}></span>
                <span className="dot" onClick={e => currentSlide(3)}></span>
                <span className="dot" onClick={e => currentSlide(4)}></span>
                <span className="dot" onClick={e => currentSlide(5)}></span>
            </div >
        </div >
    )
}
