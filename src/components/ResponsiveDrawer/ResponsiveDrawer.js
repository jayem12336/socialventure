import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NestedList from './NestedList';
import RightNestedList from './RightNestedList';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles'
import NestedListComponents from './NestedListComponents';
import RightNestedListComponents from './RightNestedListComponents';

const drawerWidth = 240;

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
  },

}));

function ResponsiveDrawer({ children }) {

  const classes = useStyles();

  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className={classes.root}>

      {isMatch ? <NestedListComponents /> : (
        <>
          <nav className={classes.drawer} aria-label="Button folders">
            <NestedList />
          </nav>
        </>
      )}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
      {isMatch ? <RightNestedListComponents /> : (
        <>
          <nav className={classes.drawer} aria-label="Button folders">
            <RightNestedList />
          </nav>
        </>
      )}
    </div>
  );
}
export default ResponsiveDrawer;
