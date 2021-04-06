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
    backgroundColor: '#E9EEF9'
  },
  searchIcon: {
    padding: theme.spacing(1, 2),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: '#ADC0DE',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}))

export default function SearchBar () {
  const classes = useStyles();

  return (
    <Grid item container xs={12} className={classes.bar}>
      <Grid item className={classes.searchIcon}>
        <SearchIcon />
      </Grid>
      <InputBase
        placeholder="Search"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Grid>
  )
}
