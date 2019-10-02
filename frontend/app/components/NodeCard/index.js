/**
 *
 * NodeCard
 *
 */

import React, { memo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    marginTop: 10,
    marginBottom: 10,
  },
});

function NodeCard(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    disableReport: false,
  });

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.ipAndPort}
        </Typography>
        <Typography color="textSecondary">{props.version}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            setState({ disableReport: true });
            props.onReport(props.id);
          }}
          disabled={state.disableReport}
        >
          Report as down
        </Button>
        <Typography>({props.reports})</Typography>
      </CardActions>
    </Card>
  );
}

NodeCard.propTypes = {
  id: PropTypes.number,
  reports: PropTypes.number,
  version: PropTypes.string,
  ipAndPort: PropTypes.string,
  onReport: PropTypes.func,
};

export default memo(NodeCard);
