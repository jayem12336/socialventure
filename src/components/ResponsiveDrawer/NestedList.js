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
  }
}));

export default function NestedList() {

  const classes = useStyles();

  return (

    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button>
        <Grid container>
          <Grid item>
            <Grid container>
              <Avatar />
              <Typography style={{ paddingLeft: 10 }}>Nico C Bronoso</Typography>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Typography>Nicobronoso@yopmail.com</Typography>
          </Grid>
        </Grid>
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PersonAddIcon />
        </ListItemIcon>
        <ListItemText primary="Friend Request" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PhotoSizeSelectActualIcon />
        </ListItemIcon>
        <ListItemText primary="Photos" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LibraryBooksIcon />
        </ListItemIcon>
        <ListItemText primary="News Feed" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ChromeReaderModeIcon />
        </ListItemIcon>
        <ListItemText primary="Pages" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    </List>

  );
}
