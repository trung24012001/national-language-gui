import React, { useState, useEffect } from 'react'
import './loading.scss'
export default function Loading() {
    const [dot, setDot] = useState(1);

    useEffect(() => {
        let interval = setInterval(() => {
            setDot(dot => {
                if (dot >= 3) dot = 0;
                return dot += 1;
            })
        }, 300)
        return () => {
            clearInterval(interval);
        }
    }, [])

    const insertDot = (idx) => {
        if (dot === idx) return 'dot';
        return ''
    }



    return (
        <div className="loading-component">
            <div className="loader"></div>
            <div className='loading-text'>Loading
                <span className={insertDot(1)}>  .</span>
                <span className={insertDot(2)}>  .</span>
                <span className={insertDot(3)}>  .</span>
            </div>
        </div>

    )
}
