import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import firebase from '../../utils/firebase'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import { InputAdornment } from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { FcGoogle } from 'react-icons/fc';
import { Alert } from "@material-ui/lab";
import CircularProgress from '@material-ui/core/CircularProgress';

import bgImage from '../../assets/bgImage.png'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        // flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: "100vh",
        backgroundColor: 'white'
    },
    bgStyle: {
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        // margin: 'auto',
        height: '100vh',
        display: 'flex',
        "@media (max-width: 600px)": {
            height: '100%'
        },
    },
    formContainer: {
        backgroundColor: 'white',
        padding: 40,
        borderRadius: 25,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        width: 400
    },
    textMargin: {
        marginTop: 20
    },
    btnStyle: {
        marginTop: 20,
        borderRadius: 15,
        padding: 10
    },
    googleBtn: {
        marginTop: 25,
        fontSize: 15,
        borderRadius: 15
    },
    errorMessage: {
        fontSize: 15,
        marginTop: 10
    },
}))

export default function Login() {

    const history = useHistory();

    const classes = useStyles();

    const [values, setValues] = useState({
        email: "",
        password: "",
        showPassword: false,
        errors: "",
        isLoading: false,
    })

    const handleChange = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value })
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const login = (e) => {

        e.preventDefault();

        setValues({ ...values, isLoading: true });

        if (!values.email || !values.password) {
            setValues({ ...values, errors: "Please Complete all fields", isLoading: false, password: "" })
        }
        else {
            firebase.auth().signInWithEmailAndPassword(values.email, values.password)
                .then((userCredential) => {
                    // Signed  
                    //var user = userCredential.user;
                    // ...
                    setValues({ ...values, errors: "", isLoading: false })
                    history.push('/home')
                })
                .catch((error) => {
                    //var errorCode = error.code;
                    var errorMessage = error.message;
                    setValues({ ...values, errors: errorMessage, isLoading: false, password: "" })
                });
        };
    }

    if (values.isLoading) {
        return (
            <div className={classes.root}>
                <CircularProgress color="primary" size={200} />
            </div>
        );
    }

    return (
        <Grid className={classes.bgStyle}>
            <Grid container justify="center" style={{ margin: '100px auto' }}>
                <Grid style={{ width: '75%' }}>
                    <Grid container justify="flex-start">
                        <Grid className={classes.formContainer}>
                            <Grid align='center'>
                                <h2>Sign In</h2>
                            </Grid>
                            {values.errors && (
                                <Alert className={classes.errorMessage} severity="error">
                                    {values.errors}
                                </Alert>)}
                            <form>
                                <Grid container>
                                    <TextField
                                        name="username"
                                        type="name"
                                        label="EMAIL"
                                        placeholder="Email"
                                        variant="outlined"
                                        className={classes.textMargin}
                                        autoFocus={true}
                                        onChange={handleChange("email")}
                                        value={values.email}
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MailOutlineIcon color="primary" />
                                                </InputAdornment>
                                            ),
                                            className: classes.textSize
                                        }}
                                        InputLabelProps={{
                                            className: classes.labelStyle
                                        }}
                                    />
                                </Grid>
                                <Grid container>
                                    <TextField
                                        label='Password'
                                        placeholder='Enter password'
                                        name="password"
                                        variant="outlined"
                                        onChange={handleChange("password")}
                                        value={values.password}
                                        type={values.showPassword ? 'text' : 'password'}
                                        className={classes.textMargin}
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockOutlinedIcon color="primary" />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            className: classes.textSize
                                        }}
                                        InputLabelProps={{
                                            className: classes.labelStyle
                                        }}
                                    />
                                </Grid>
                                <Grid container justify="flex-end" style={{ marginTop: 10 }}>
                                    <Typography>Forgot Password?</Typography>
                                </Grid>
                                <Grid container justify="center" spacing={3}>
                                    <Grid item xs={6}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.btnStyle}
                                            fullWidth
                                            onClick={login}
                                        >Login Now</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.btnStyle}
                                            fullWidth
                                            onClick={() => history.push('/signup')}
                                        >Sign up</Button>
                                    </Grid>
                                </Grid>
                                <Button
                                    variant="contained"
                                    size="large"
                                    className={classes.googleBtn}
                                    startIcon={<FcGoogle />}
                                    fullWidth
                                >
                                    Sign up with google
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
