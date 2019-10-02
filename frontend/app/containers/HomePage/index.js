/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, useState } from 'react';

import Container from '@material-ui/core/Container';
import io from 'socket.io-client';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core';
import NodeCard from '../../components/NodeCard';
import NodeAdder from '../../components/NodeAdder';

const useStyles = makeStyles({
  progress: {
    marginTop: 100,
  },
});

export default function HomePage() {
  const classes = useStyles();

  const socket = io('wss://www.peersterlist.abate.io', {
    //transports: ['websocket'],
    path: '/peerster-list',
  });

  const [state, setState] = useState({
    nodesList: [],
    disableAdd: false,
    nodeNumber: -1,
    loading: true,
  });

  useEffect(() => {
    socket.on('connect', function() {
      setState({ ...state, loading: false });
    });
    socket.on('list', list => {
      setState(prev => ({ ...prev, nodesList: list }));
    });
    socket.on('node-number', n => {
      setState(prev => ({ ...prev, nodeNumber: n }));
    });
    socket.emit('get-list');
  }, []);

  const addNode = (ipAndPort, version) => {
    const re = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]):[0-9]+$/;
    if (re.test(ipAndPort)) {
      setState(prev => ({ ...prev, disableAdd: true }));
      socket.emit('add', [{ ipAndPort, version }, state.nodeNumber]);
    }
  };

  const deleteNode = () => {
    socket.emit('delete', state.nodeNumber);
    setState(prev => ({ ...prev, disableAdd: false }));
  };

  const reportNode = id => {
    socket.emit('report', id);
  };

  return (
    <Container>
      <NodeAdder
        disabled={state.disableAdd}
        onSubmit={addNode}
        onDelete={deleteNode}
      />
      {state.loading ? (
        <LinearProgress className={classes.progress} />
      ) : (
        <div>
          {state.nodesList.map(n => (
            <NodeCard
              key={n.id}
              id={n.id}
              ipAndPort={n.ipAndPort}
              version={n.version}
              reports={n.reports}
              onReport={reportNode}
            />
          ))}
        </div>
      )}
    </Container>
  );
}
