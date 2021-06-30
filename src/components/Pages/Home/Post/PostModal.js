import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles, CircularProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { v4 as uuidV4 } from "uuid";
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { db, storage } from '../../../../utils/firebase';

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(3),
        width: 530,
        borderRadius: "100px",
        "@media (max-width: 600px)": {
            width: 320
        },
    },
    icon: {
        fontSize: 50
    },
}))


export default function PostModal({ setOpen, userProfile }) {

    const classes = useStyles();

    const [values, setValues] = useState({
        isLoading: false,
        comment: '',
        noLikes: 0,
        progress: '',
    });

    const [image, setImage] = useState('');

    const [caption, setCaption] = useState('');

    const handleClose = () => {
        setOpen(false);
    }

    const uploadFileWithClick = () => {
        document.getElementsByClassName('imageFile')[0].click()
    }

    //#region 
    //PostBtn
    const handleUpload = (event) => {
        event.preventDefault()
        setValues({...values, isLoading: true });
        const id = uuidV4();
        if (image === '') {
            db.collection("posts").add({
                timestamp: new Date(),
                caption: caption,
                imageUrl: image,
                noLikes: values.noLikes,
                firstname: userProfile.firstname,
                lastname: userProfile.lastname
            })
            setValues({ ...values, isLoading: false });
            handleClose();
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
                            });
                            handleClose();
                            setValues({ ...values, progress: 0, isLoading: false })
                            setCaption("");
                            setImage(null);
                        })
                }
            )
        }
    }

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
            <Grid container className={classes.content}>
                <Grid container justify="flex-start">
                    <Grid item sm={2}>
                        <Avatar />
                    </Grid>
                    <Grid item sm={10}>
                        <TextField
                            variant="outlined"
                            multiline
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder={`What's on your mind ${userProfile && userProfile.firstname} ?`}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    style={{ marginTop: 20, width: "10%", cursor: "pointer" }}
                    onClick={uploadFileWithClick} >
                    <PhotoSizeSelectActualIcon className={classes.icon} />
                    <input type="file" className="imageFile" onChange={handleChange} style={{ display: "none" }} />
                </Grid>
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
                        <Typography variant="caption" className={`imageText ${image && 'show'}`}>Image is added and will be displayed after clicking the Post button</Typography>
                    }
                </Grid>
                <Grid container>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpload}
                        fullWidth
                    >
                        Post
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}
