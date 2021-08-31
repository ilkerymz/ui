import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  jogJoint,
  jogMessage,
  JointStatesListener
} from '../services/RosService';
import { Button, Divider, Grid, IconButton, Slider } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

export const JointStates = (props) => {
  const float_precision = 3;

  const [jointStatesListenerState, setJointStatesListenerState] =
    useState(null);
  const [jointStates, setJointStates] = useState(null);

  const jointStatesCallback = (message) => {
    setJointStates({
      name: message.name,
      position: message.position,
      effort: message.effort,
      velocity: message.velocity,
      frame_id: message.header.frame_id
    });
  };

  useEffect(() => {
    setJointStatesListenerState(JointStatesListener(props.topic));
  }, []);

  useEffect(() => {
    if (jointStatesListenerState)
      jointStatesListenerState.subscribe(jointStatesCallback);
    return () => jointStatesListenerState?.unsubscribe();
  }, [jointStatesListenerState]);

  const classes = {
    table: {
      minWidth: 350
    }
  };

  const rows = [];

  const hide = [
    'polar_finger_joint1',
    'polar_finger_joint2',
    'polar_hand_joint2'
  ];

  if (jointStates) {
    for (let i = 0; i < jointStates.name.length; ++i) {
      if (hide.includes(jointStates.name[i])) continue;
      rows.push({
        name: jointStates.name[i],
        position: jointStates.position[i],
        delta: 0,
        decrease: () => jogJoint.publish(jogMessage(jointStates.name[i], -0.1)),
        increase: () => jogJoint.publish(jogMessage(jointStates.name[i], 0.1))
      });
    }
  }

  useEffect(() => {
    // Add event listener on keypress
    document.addEventListener(
      'keypress',
      (event) => {
        var name = event.key;
        var code = event.code;

        if (name === 'q') {
          jogJoint.publish(jogMessage('polar_joint1', 0.01));
        }
        if (name === 'a') {
          jogJoint.publish(jogMessage('polar_joint1', -0.01));
        }
        // Alert the key name and key code on keydown
        console.log(`Key pressed ${name} \r\n Key code value: ${code}`);
      },
      false
    );
  }, []);

  return (
    <div>
      {jointStates ? (
        <>
          <Grid container spacing={3}>
            {rows.map((value, index) => {
              return (
                <>
                  <Grid xs={4}>{value.name}</Grid>
                  <Grid xs={2}>{value.position.toFixed(float_precision)}</Grid>
                  <Grid xs={4}>
                    <Slider
                      value={value.position.toFixed(float_precision)}
                      valueLabelDisplay="auto"
                      step={0.1}
                      marks
                      min={-2}
                      max={2}
                    />
                  </Grid>
                  <Grid xs={2}>
                    <IconButton color="secondary" size="small">
                      <RemoveCircleIcon onClick={value.decrease} />
                    </IconButton>
                    <IconButton color="primary" size="small">
                      <AddCircleIcon onClick={value.increase} />
                    </IconButton>
                  </Grid>
                  <Divider />
                </>
              );
            })}
          </Grid>
        </>
      ) : null}
    </div>
  );
};

JointStates.propTypes = {
  topic: PropTypes.string.isRequired
};
