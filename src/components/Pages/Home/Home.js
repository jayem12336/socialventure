import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from '../../../utils/firebase'
import Button from '@material-ui/core/Button'
import Header from '../../Header/Header'
import { makeStyles } from '@material-ui/core/styles'
import SideBarDrawer from '../../ResponsiveDrawer/SideBarDrawer'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Post from './Post/Post'
import { db, storage } from '../../../utils/firebase'
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Typography from '@material-ui/core/Typography';
import { v4 as uuidV4 } from "uuid";
import CircularProgress from '@material-ui/core/CircularProgress'


const useStyles = makeStyles((theme) => ({
    root: {
        overflow: "hidden"
    },
    gridContainer: {
        boxShadow: "1px 1px 2px 2px #ccc",
        marginBottom: 50,

    },
    postContainer: {
        boxShadow: "1px 1px 2px 2px #ccc",
        padding: 25,
        marginBottom: 50,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2pxZ solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 1),
    },
    icon: {
        fontSize: 40,
    },
    btnStyle: {
        width: 100,
        marginLeft: 50,
        marginTop: 8,
        '&:hover': {
            background: '#4877c2',
        },

    }
}))
export default function Home({ userProfile }) {


    const history = useHistory();

    const classes = useStyles();

    const [posts, setPosts] = useState([]);

    const [image, setImage] = useState('');

    const [caption, setCaption] = useState("");

    const [values, setValues] = useState({
        isLoading: false,
        noLikes: 0,
        progress: '',
    });

    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
            })));
        })
    }, []);

    const logout = () => {
        firebase.auth().signOut().then(() => {
            history.push('/login')
        }).catch((error) => {
            // An error happened.
        });
    }

    const uploadFileWithClick = () => {
        document.getElementsByClassName('imageFile')[0].click()
    }

    //#region 
    //PostBtn
    const handleUpload = (event) => {
        event.preventDefault()
        const id = uuidV4();
        if (!caption && image === '') {
            alert("please fill up the following fields")
            setValues({ ...values, isLoading: false });
        }
        else if (image === '') {
            setValues({ ...values, isLoading: true });
            db.collection("posts").add({
                timestamp: new Date(),
                caption: caption,
                imageUrl: image,
                noLikes: values.noLikes,
                firstname: userProfile.firstname,
                lastname: userProfile.lastname
            })
            setValues({ ...values, isLoading: false });
            setCaption("");

        } else {
            const uploadTask = storage.ref(`images/${id}`).put(image);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100

                    );
                    setValues({ ...values, progress: progress });
                },
                (error) => {
                    console.log(error);
                    alert(error.message);
                },
                () => {
                    setValues({ ...values, isLoading: true });
                    storage
                        .ref("images")
                        .child(id)
                        .getDownloadURL()
                        .then(url => {
                            db.collection("posts").add({
                                timestamp: new Date(),
                                caption: caption,
                                imageUrl: url,
                                noLikes: values.noLikes,
                                firstname: userProfile.firstname,
                                lastname: userProfile.lastname
                            })
                            setValues({ ...values, progress: 0, isLoading: false })
                            setCaption("");
                            setImage('');
                        })
                }
            )
        }
    }

    //#endregion

    //#endregion

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    if (values.isLoading) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                // flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                justifyItems: 'center',
                height: '100vh',
                width: '100vw'
            }}>
                <CircularProgress color="primary" size={200} />
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <Header userProfile={userProfile} />
            <SideBarDrawer userProfile={userProfile}>
                <Grid container className={classes.postContainer} >
                    <Avatar style={{ marginTop: 7 }} />
                    <Grid item sm={10}>
                        <Grid container justify="flex-start" style={{ marginLeft: 10 }}>
                            <Grid item sm>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    placeholder={`What's on your mind ${userProfile && userProfile.firstname} ?`}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.btnStyle}
                            onClick={handleUpload}
                        >
                            Post it
                        </Button>
                    </Grid>
                    <Grid container>
                        <Grid
                            container
                            style={{ marginTop: 20, width: "3%", cursor: "pointer" }}
                            onClick={uploadFileWithClick}
                        >
                            <PhotoSizeSelectActualIcon className={classes.icon} />
                            <input type="file" className="imageFile" onChange={handleChange} style={{ display: "none" }} />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid container spacing={2}>
                            <Grid item>
                                <CheckCircleIcon />
                            </Grid>
                            <Grid item>
                                <MenuBookIcon />
                            </Grid>
                            <Grid item>
                                <Typography>News Feed</Typography>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            {image === "" ? "" :
                                <Typography variant="subtitle1" className={`imageText ${image && 'show'}`}>Image is added and will be displayed after clicking the Post button</Typography>
                            }
                        </Grid>
                    </Grid>

                </Grid>
                {
                    posts.map(({ id, post }) => (
                        <Post
                            key={id}
                            postId={id}
                            userName={post.firstname}
                            userId={userProfile && userProfile.uid}
                            userProfile={userProfile}
                            timestamp={post.timestamp}
                            caption={post.caption}
                            imageUrl={post.imageUrl}
                            noLikes={post.noLikes}
                        />
                    ))
                }

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
