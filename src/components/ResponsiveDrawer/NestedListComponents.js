import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from "@material-ui/core/Grid"
import Avatar from '@material-ui/core/Avatar'
import Drawer from '@material-ui/core/Drawer'

//icon
import HomeIcon from '@material-ui/icons/Home';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PersonIcon from '@material-ui/icons/Person';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import SettingsIcon from '@material-ui/icons/Settings';

import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'


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
    iconButtonContainer: {
        height:30,
        width:30
    }
}));

export default function NestedListComponents() {

    const classes = useStyles();

    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <>
            <Drawer
                anchor='left'
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
            >
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
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container>
                                    <ListItemText primary="Nico C Bronoso" />
                                </Grid>
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
            </Drawer>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)} className={classes.iconButtonContainer}>
                <MenuIcon />
            </IconButton>


        </>
    );
}
