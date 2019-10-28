import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
}));

export default function ({meta: { touched, error }, input, ...props}) {
    const classes = useStyles();


    let validationError;
    if(touched){
        validationError =  error ? error : null;
    }

    return (
        <TextField
            {...input}
            {...props}
            error={!!validationError}
            helperText={validationError}
            className={classes.textField}
            margin="normal"
        />
    )
}
