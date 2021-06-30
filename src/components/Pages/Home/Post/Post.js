import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { IconButton, makeStyles } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button'
import { useTheme } from '@material-ui/core/styles'
import './Post.css'
import { db } from '../../../../utils/firebase'
import moment from 'moment'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ChatIcon from '@material-ui/icons/Chat';
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
    postContainer: {
        padding: 40,
        marginTop: 40,
        boxShadow: "1px 1px 2px 2px #ccc",
    },
    btnStyle: {
        width: 150,
        '&:hover': {
            background: '#4877c2',
        },
        "@media (max-width: 600px)": {
            width: 120,
        },
    },
    comment_show: {
        display: "flex",
        flexDirection: "row",
    },
    container_comments: {
        boxShadow: "1px 1px 2px 2px #ccc",
        padding: 10,
        width: "92%",
        borderRadius: 10,
        "@media (max-width: 600px)": {
            boxShadow: "1px 1px 2px 2px #ccc",
            padding: 10,
            borderRadius: 10,
            width: "80%",
        },
    },
    like: {
        paddingLeft: 60,
        marginTop: 10,
        "@media (max-width: 600px)": {
            paddingLeft: 0
        },
    },
    commentContainer: {
        width: "100%",
        "@media (max-width: 600px)": {
            width: "100%",
        },
    }
}))

export default function Post({
    postId,
    userName,
    userId,
    caption,
    imageUrl,
    noLikes,
    timestamp,
    userProfile,
}) {

    const classes = useStyles();

    const theme = useTheme();

    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [show, setShow] = useState('like2');
    const [show2, setShow2] = useState('textforlike');
    const [open, setOpen] = useState(false);
    const [totalDoclNumbers, setTotalDoclNumbers] = useState(0)

    useEffect(() => {
        let unsubscribe;

        if (postId) {
            unsubscribe = db.collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()))
                    setTotalDoclNumbers(snapshot.docs.length);
                })
        }

        return () => {
            unsubscribe();
        }
    }, [postId])

    useEffect(() => {
        db.collection("posts")
            .doc(postId)
            .collection("likes")
            .doc(userId)
            .get()
            .then(doc2 => {
                if (doc2.data()) {
                    if (show === 'like2') {
                        setShow('like2 blue');
                        setShow2('textforlike bluetextforlike')
                    } else {
                        setShow('like2');
                        setShow2('textforlike')
                    }
                }
            })
    }, [postId, userId, show]);


    const likeHandle = (event) => {

        event.preventDefault();
        if (show === 'like2') {
            setShow('like2 blue');
            setShow2('textforlike bluetextforlike')
        } else {
            setShow('like2');
            setShow2('textforlike')
        }

        db.collection('posts')
            .doc(postId)
            .get()
            .then(docc => {
                const data = docc.data()
                console.log(show)
                if (show === 'like2') {
                    db.collection("posts")
                        .doc(postId)
                        .collection("likes")
                        .doc(userId)
                        .get()
                        .then(doc2 => {
                            if (doc2.data()) {
                                console.log(doc2.data())
                            } else {
                                db.collection("posts").doc(postId).collection("likes").doc(userId).set({
                                    likes: 1
                                });
                                db.collection('posts').doc(postId).update({
                                    noLikes: data.noLikes + 1
                                });
                            }
                        })

                } else {
                    db.collection('posts').doc(postId).collection('likes').doc(userId).delete().then(function () {
                        db.collection('posts').doc(postId).update({
                            noLikes: data.noLikes - 1
                        });
                    })
                }
            })
    }

    const postComment = (e) => {
        e.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            userName: userProfile.firstname,
            timestamp: new Date(),
        })
        setOpen(true);
        setComment("")


    }


    const handleOpen = () => {
        setOpen(!open);
    }

    return (
        <Grid>
            <Grid container className={classes.postContainer}>
                <Grid item sm={11}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Avatar />
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">{userName}</Typography>
                            <Grid container justify="flex-start">
                                <Typography variant="caption">{moment(timestamp.toDate().toString()).calendar()}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={1}>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <IconButton>
                                <MoreHorizIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justify="flex-start" style={{ margin: 20 }}>
                    {caption}
                </Grid>
                {
                    imageUrl === "" ? "" :
                        <Grid container justify="center">
                            <img src={imageUrl} alt="" style={{ width: isMatch ? "100%" : "90%", height: "100%" }} />
                        </Grid>
                }
                <Grid container spacing={1} className={classes.like}>
                    <Grid item>
                        <Grid container>
                            <Grid item>
                                <ThumbUpAltIcon style={{ color: "blue", fontSize: 30 }} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <Grid item>
                                <Typography variant="h5">{noLikes}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={11}>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button onClick={handleOpen}>{totalDoclNumbers}Comment</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justify="center" spacing={3} style={{ marginTop: 10 }}>
                    <Grid item onClick={likeHandle}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.btnStyle}
                        >
                            <ThumbUpAltIcon className={show} />
                            <Typography className={show2}>Like</Typography>
                        </Button>

                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="inherit"
                            className={classes.btnStyle}
                            onClick={handleOpen}
                        >
                            <ChatIcon />
                            <Typography>Comment</Typography>
                        </Button>
                    </Grid>
                </Grid>
                <form onSubmit={postComment} className={classes.commentContainer}>
                    <Grid container style={{ paddingTop: 20 }}>

                        <Grid item>
                            <Grid container style={{ paddingRight: 10 }}>
                                <Avatar />
                            </Grid>
                        </Grid>
                        <Grid item sm={11}>
                            <Grid container >
                                <TextField
                                    placeholder={`What's on your mind ${userProfile && userProfile.firstname} ?`}
                                    variant="outlined"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    fullWidth
                                />
                                <input type="submit" disabled={!comment} style={{ display: "none" }} />
                            </Grid>
                        </Grid>

                    </Grid>
                </form>


                {open ? <Grid container>
                    {
                        comments.map((comment) => (
                            <Grid container justify="flex-start" style={{ marginTop: 10 }}>
                                <Grid item >
                                    <Grid container style={{ paddingRight: 10 }}>
                                        <Avatar />
                                    </Grid>
                                </Grid>
                                <Grid container className={classes.container_comments}>
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <Typography style={{ color: "blue", }}>{comment.userName}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography>{comment.text}</Typography>
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Grid>
                        ))
                    }
                </Grid> : ""

                }
            </Grid>
        </Grid>
    )
}
