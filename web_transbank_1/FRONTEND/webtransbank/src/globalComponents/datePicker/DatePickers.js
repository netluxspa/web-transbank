import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers({label, sendDate, fecha}) {




  
  const classes = useStyles();

  return (
    <form  className={classes.container} noValidate>
      <TextField
        
        variant='outlined'
        size='small'
        onChange={e=>sendDate(e.target.value)}
        id="date"
        label={label}
        type="date"
        defaultValue={fecha}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
