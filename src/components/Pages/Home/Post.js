import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { IconButton, makeStyles } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import bgImage from '../../../assets/bgImage.png'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ChatIcon from '@material-ui/icons/Chat';

const useStyles = makeStyles((theme) => ({
    postContainer: {
        padding: 20,
        marginTop: 40,
        boxShadow: "1px 1px 2px 2px #ccc",
    },
    btnStyle: {
        '&:hover': {
            background: '#4877c2',
        },
        width: 150,
    }
}))

export default function Post({ firstname, lastname, time }) {

    const classes = useStyles();

    const theme = useTheme();

    const isMatch = useMediaQuery(theme.breakpoints.down('md'));


    return (
        <Grid>
            <Grid container className={classes.postContainer}>
                <Grid item sm={10}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Avatar />
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1"> {firstname + " " + lastname}</Typography>
                            <Grid container justify="flex-start">
                                <Typography variant="caption"> {time} </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={2}>
                    <Grid container justify="flex-end">
                        <IconButton>
                            <MoreHorizIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid container justify="center">
                    <img src={bgImage} alt="" style={{ width: isMatch ? "100%" : "90%", height: "100%" }} />
                </Grid>
                <Grid container justify="center" spacing={4} style={{ marginTop: 20 }}>
                    <Grid item>
                        <Button
                            variant="contained"
                            startIcon={<ThumbUpIcon />}
                            color="primary"
                            className={classes.btnStyle}
                        >
                            Like
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            startIcon={<ChatIcon />}
                            color="primary"
                            className={classes.btnStyle}
                        >
                            Comment
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
