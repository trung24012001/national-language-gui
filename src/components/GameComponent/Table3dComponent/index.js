import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import Table3d from '../../../controllers/table3d';
import './table3d.scss';

export default function Table3dComponent() {
    const history = useHistory();
    useEffect(() => {
        const table3d = new Table3d();

        return () => {
            table3d.stop();
        }
    }, [])

    return (
        <div className='table3d'>
            <div id="container"></div>
            <div id="menu">
                <button id="table">BẢNG</button>
                <button id="sphere">HÌNH CẦU</button>
                <button id="helix">HÌNH HELIX</button>
                <button id="grid">HÌNH LƯỚI</button>
                <button onClick={e => {
                    history.push('/game');
                }} >THOÁT</button>
            </div>
        </div>
    )
}
