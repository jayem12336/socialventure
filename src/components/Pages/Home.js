import React from 'react'

import { useHistory } from 'react-router-dom'
import firebase from '../../utils/firebase'
import Button from '@material-ui/core/Button'
import Header from '../Header/Header'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ResponsiveDrawer from '../ResponsiveDrawer/ResponsiveDrawer'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Logo from '../../assets/socialventureLogo.png'
import IconButton from '@material-ui/core/IconButton'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ChatIcon from '@material-ui/icons/Chat';

const useStyles = makeStyles((theme) => ({

    gridContainer: {
        padding: 20,
        boxShadow: "1px 1px 2px 2px #ccc",
        marginBottom: 20
    },


}))
export default function Home() {

    const history = useHistory();

    const classes = useStyles();

    const logout = () => {
        firebase.auth().signOut().then(() => {
            history.push('/login')
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <div>
            <Header />
            <ResponsiveDrawer>
                <Grid container justify="center">
                    <Grid container className={classes.gridContainer}>
                        <Grid item>
                            <Grid container>
                                <Avatar />
                            </Grid>
                        </Grid>
                        <Grid item sm={10}>
                            <Grid cotainer style={{ paddingLeft: 10 }}>
                                <TextField
                                    placeholder="What's News Nico"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid item style={{paddingLeft:20}}>
                            <Grid container justify="flex-end">
                                <Button
                                    variant="contained"
                                    color="primary"
                                >
                                    Post it
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container className={classes.gridContainer}>
                        <Grid container justify="flex-end" >
                            <MoreHorizIcon />
                        </Grid>
                        <Grid container justify="flex-start" alignItems="center">
                            <Grid item>
                                <Avatar />
                            </Grid>
                            <Grid item variant="subtitle1" sm={11}>
                                <Grid style={{ paddingLeft: 10 }}>
                                    <Typography>JM</Typography>
                                    <Typography>12 hours ago</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid container justify="center">
                                <img src={Logo} alt="Logo" style={{ height: 300, width: 300 }} />
                            </Grid>
                            <Grid item>
                                <Grid container style={{ display: "flex", paddingRight: 100 }}>
                                    <IconButton>
                                        <ThumbUpAltIcon />
                                    </IconButton>
                                    <Typography style={{ marginTop: 10 }}>Like</Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container style={{ display: "flex" }}>
                                    <IconButton>
                                        <ChatIcon />
                                    </IconButton>
                                    <Typography style={{ marginTop: 10 }}>Comment</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={logout}
                    style={{ marginTop: 20 }}
                >
                    Logout
                </Button>
            </ResponsiveDrawer>
        </div>
    )
}
