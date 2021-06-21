import React from 'react'

import { useHistory } from 'react-router-dom'
import firebase from '../../utils/firebase'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

export default function Home() {

    const history = useHistory();

    const logout = () => {
        firebase.auth().signOut().then(() => {
            history.push('/login')
          }).catch((error) => {
            // An error happened.
          });
    }

    return (
        <div>
            <Typography> Hello World </Typography>
            <Button 
            variant="contained" 
            color="primary"
            onClick={logout}
            >
                Logout
            </Button>
        </div>
    )
}
