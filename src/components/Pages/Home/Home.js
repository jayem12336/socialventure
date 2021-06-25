import React from 'react'
import { useHistory } from 'react-router-dom'
import firebase from '../../../utils/firebase'
import Button from '@material-ui/core/Button'
import Header from '../../Header/Header'
import { makeStyles } from '@material-ui/core/styles'
import SideBarDrawer from '../../ResponsiveDrawer/SideBarDrawer'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Post from './Post'
import ImageUpload from './ImageUpload'

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        boxShadow: "1px 1px 2px 2px #ccc",
        marginBottom: 50,
    },
    postContainer: {
        boxShadow: "1px 1px 2px 2px #ccc",
        padding: 25,
        marginBottom: 50
    },
    btnPostStyle: {
        marginTop: 8
    }
}))
export default function Home({ userProfile }) {


    const history = useHistory();

    const classes = useStyles();


    const logout = () => {
        firebase.auth().signOut().then(() => {
            history.push('/login')
        }).catch((error) => {
            // An error happened.
        });
    }
    console.log(userProfile)
    return (
        <div>
            <Header userProfile={userProfile} />
            <SideBarDrawer userProfile={userProfile}>
                <ImageUpload userProfile={userProfile && userProfile.firstname}/>
                <Grid container className={classes.postContainer}>
                    <Avatar />
                    <Grid item xs={9}>
                        <Grid container justify="flex-end" style={{ marginLeft: 30 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="What's on your mind?"
                            />
                        </Grid>
                    </Grid>
                    <Grid item sm={2}>
                        <Grid container justify="flex-end">
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.btnPostStyle}
                            >
                                Post it!
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Post
                    firstname={userProfile && userProfile.firstname}
                    lastname={userProfile && userProfile.lastname}
                    time="12 hours ago"
                />
                <Post
                    firstname={userProfile && userProfile.firstname}
                    lastname={userProfile && userProfile.lastname}
                    time="12 hours ago"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={logout}
                    style={{ marginTop: 20 }}
                >
                    Logout
                </Button>
            </SideBarDrawer>
        </div>
    )
}
