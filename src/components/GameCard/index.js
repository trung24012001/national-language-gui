import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useHistory } from 'react-router';
import './gameCard.scss'

export default function GameCard({ name, path }) {
    const history = useHistory();
    const [shadow, setShadow] = useState(3);

    const getPreview = (path) => {
        if (path === '3d') {
            return 'Xem bảng chữ cái tiếng việt trong không gian 3D'
        } else if (path === 'quizz') {
            return 'Hãy thử sức sự hiểu biết về tiếng việt của bạn'
        } else if (path === 'memory') {
            return 'Bạn có phải là người có trí nhớ tốt ?'
        } else if (path === 'hangman') {
            return 'Đây là một câu đố.'
        }
    }

    return (
        <Card
            onMouseOver={e => {
                setShadow(8)
            }}
            onMouseOut={e => {
                setShadow(3)
            }}
            onClick={e => {
                history.push(`/game/${path}`)
            }}
            elevation={shadow}
            className="game-card"
        >
            <CardMedia
                component="img"
                image={`${path}-game.jpg`}

                style={{
                    width: '345px',
                    height: '400px'
                }}
                alt={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary" component="div">
                    {getPreview(path)}
                    <p>
                        Chơi ngay
                    </p>
                </Typography>
            </CardContent>
        </Card>
    );
}
