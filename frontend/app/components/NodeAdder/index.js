/**
 *
 * NodeAdder
 *
 */

import React, { memo } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
// import styled from 'styled-components';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  menu: {
    width: 200,
  },
  versionSelect: {
    minWidth: 150,
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

function NodeAdder(props) {
  const classes = useStyles();

  const versions = [
    'hw 1 - part 1',
    'hw 1 - part 2',
    'Private rumors',
    'File sharing',
  ];

  const [values, setValues] = React.useState({
    ipAndPort: '',
    version: versions[0],
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const checkValidity = () => {
    const re = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]):[0-9]+$/;
    return values.ipAndPort === '' || re.test(values.ipAndPort);
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid item>
        <TextField
          id="ip-and-port"
          label="IP and port"
          value={values.ipAndPort}
          onChange={handleChange('ipAndPort')}
          margin="normal"
          variant="outlined"
          className={classes.textField}
          disabled={props.disabled}
          error={!checkValidity()}
        />
      </Grid>
      <Grid item>
        <TextField
          id="version-select"
          select
          label="Version"
          className={classes.versionSelect}
          value={values.version}
          onChange={handleChange('version')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
          variant="outlined"
          disabled={props.disabled}
        >
          {versions.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item>
        {!props.disabled ? (
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => props.onSubmit(values.ipAndPort, values.version)}
          >
            Submit node
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => props.onDelete()}
          >
            Delete node
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

NodeAdder.propTypes = {
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default memo(NodeAdder);
