import {
  Grid,
  InputBase
} from "@material-ui/core";

import SearchIcon from './SearchIcon';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  bar: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: 5,
    backgroundColor: '#E9EEF9',
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(0),
      padding: theme.spacing(0)
    }
  },
  searchIcon: {
    height: '100%',
    justifyContent: "center",
    alignItems: "center"
  },
  inputRoot: {
    color: '#ADC0DE',
  },
  inputInput: {
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}))

export default function SearchBar ({ findConversation }) {
  const classes = useStyles();

  return (
    <Grid container
      className={classes.bar}
      spacing={1}
      >
      <Grid item container xs={2} sm={2}

        className={classes.searchIcon}>
        <SearchIcon />
      </Grid>
      <Grid item xs={10} sm={10}>
        <InputBase
          placeholder="Search"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={findConversation}
          />
      </Grid>
    </Grid>
  )
}
