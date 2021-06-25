import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from "@material-ui/core/Grid"
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography';

//icon
import HomeIcon from '@material-ui/icons/Home';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PersonIcon from '@material-ui/icons/Person';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  gridContainer: {
    border: 50
  },
  userDetailsContainer: {
    border: '1px solid black',
    width: 300,
    paddingBottom: 10,
    borderRadius: 10
  },
  listStyle: {
    border: '1px solid black',
    width: 300,
    marginLeft: 10,
    borderBottom: 'none',
    borderRadius: 5
  },
  lastListStyle: {
    border: '1px solid black',
    width: 300,
    marginLeft: 10,
    borderRadius: 5
  },
  listtextStyle: {
    fontSize: '1rem'
  },
  iconStyle: {
    fontSize: 40,
    marginLeft: 10
  },
  textStyle: {
    fontSize: 20,
    marginLeft: 40
  }
}));

export default function NestedList( {userProfile} ) {

  const classes = useStyles();

  return (

    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem style={{marginBottom: 30, marginTop: 20}}>
        <Grid container spacing={2} className={classes.userDetailsContainer}>
          <Grid item>
            <Avatar style={{width: 50 , height: 50, marginTop: 10}}/>
          </Grid>
          <Grid item>
            <Typography variant="h6" style={{textAlign: 'center', marginTop: 10}}>{userProfile && userProfile.firstname} {userProfile && userProfile.lastname}</Typography>
            <Typography>{userProfile && userProfile.email}</Typography>
          </Grid>
        </Grid>
      </ListItem>
      <ListItem button className={classes.listStyle}>
        <ListItemIcon>
          <HomeIcon className={classes.iconStyle}/>
        </ListItemIcon>
        <ListItemText primary="Home" classes={{ primary: classes.textStyle }}/>
      </ListItem>
      <ListItem button className={classes.listStyle}>
        <ListItemIcon>
          <PersonAddIcon className={classes.iconStyle}/>
        </ListItemIcon>
        <ListItemText primary="Friend Request" classes={{ primary: classes.textStyle }}/>
      </ListItem>
      <ListItem button className={classes.listStyle}>
        <ListItemIcon>
          <PhotoSizeSelectActualIcon className={classes.iconStyle}/>
        </ListItemIcon>
        <ListItemText primary="Photos" classes={{ primary: classes.textStyle }}/>
      </ListItem>
      <ListItem button className={classes.listStyle}>
        <ListItemIcon>
          <LibraryBooksIcon className={classes.iconStyle}/>
        </ListItemIcon>
        <ListItemText primary="News Feed" classes={{ primary: classes.textStyle }}/>
      </ListItem>
      <ListItem button className={classes.listStyle}>
        <ListItemIcon>
          <PersonIcon className={classes.iconStyle}/>
        </ListItemIcon>
        <ListItemText primary="Profile" classes={{ primary: classes.textStyle }}/>
      </ListItem>
      <ListItem button className={classes.listStyle}>
        <ListItemIcon>
          <ChromeReaderModeIcon className={classes.iconStyle}/>
        </ListItemIcon>
        <ListItemText primary="Pages" classes={{ primary: classes.textStyle }}/>
      </ListItem>
      <ListItem button className={classes.lastListStyle}>
        <ListItemIcon>
          <SettingsIcon className={classes.iconStyle}/>
        </ListItemIcon>
        <ListItemText primary="Settings" classes={{ primary: classes.textStyle }}/>
      </ListItem>
    </List>

  );
}
