import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NestedList from './NestedList';
import RightNestedList from './RightNestedList';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles'


const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    margin: 200
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: -50
  },
}));

function SideBarDrawer({ children, userProfile }) {

  const classes = useStyles();

  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.root}>

      {isMatch ? "" : (
        <>
          <nav className={classes.drawer} aria-label="Button folders">
            <NestedList userProfile={userProfile}/>
          </nav>
        </>
      )}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
      {isMatch ? "" : (
        <>
          <nav className={classes.drawer} aria-label="Button folders">
            <RightNestedList userProfile={userProfile}/>
          </nav>
        </>
      )}
    </div>
  );
}
export default SideBarDrawer;
