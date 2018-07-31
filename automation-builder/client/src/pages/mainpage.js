import React from 'react';

import Grid from '@material-ui/core/Grid';

import ProjectTableCard from '../components/projecttablecard';
import Behavior_Logo from '../images/schematic.jpg';

const gridstyle = {
  minWidth: 400,
  paddingLeft: 25,
  paddingTop: 25,
  paddingRight: 25,
  paddingBottom: 25,
};

function MainPage() {
  return (
    <div>
      <Grid container spacing={24} justify="flex-start" style={gridstyle}>
        <Grid item xs={12}>
          <ProjectTableCard logo={Behavior_Logo} page="/behaviors" />
        </Grid>
      </Grid>
    </ div>
  );
}

export default MainPage;