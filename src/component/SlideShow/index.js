import React, { useRef, useEffect } from 'react'
import './style.scss';



export default function SlideShow() {
    const slideIndex = useRef(1);

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

                <div className="mySlides fade">
                    <div className="numbertext">1 / 3</div>
                    <img src="./flag-vn.svg" style={{ width: '100%', height: '400px' }} />
                    <div className="text">Caption Text</div>
                </div>

                <div className="mySlides fade">
                    <div className="numbertext">2 / 3</div>
                    <img src="./flag-vn.svg" style={{ width: '100%', height: '400px' }} />
                    <div className="text">Caption Two</div>
                </div>

                <div className="mySlides fade">
                    <div className="numbertext">3 / 3</div>
                    <img src="./flag-vn.svg" style={{ width: '100%', height: '400px' }} />
                    <div className="text">Caption Three</div>
                </div>

                <a className="prev" onClick={e => plusSlides(-1)}>&#10094;</a>
                <a className="next" onClick={e => plusSlides(1)}>&#10095;</a>

            </div>
            <br />

            <div style={{ textAlign: 'center' }}>
                <span className="dot" onClick={e => currentSlide(1)}></span>
                <span className="dot" onClick={e => currentSlide(2)}></span>
                <span className="dot" onClick={e => currentSlide(3)}></span>
            </div >
        </div >
    )
}
