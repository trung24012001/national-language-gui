import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useHistory } from 'react-router';


export default function MediaCard({ name, path }) {
    const history = useHistory()
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                image={`${path}-game.jpg`}
                width={400}
                height={400}
                alt={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Chơi ngay
                </Typography>
            </CardContent>
            <CardActions>
                <Button startIcon={<PlayCircleIcon />} onClick={e => {
                    history.push(`/game/${path}`)
                }} size="small">PLAY</Button>
            </CardActions>
        </Card>
    );
}
