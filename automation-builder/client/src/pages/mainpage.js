import React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import ProjectsTable from '../components/projectstable';
import Behavior_Logo from '../images/schematic.jpg';

const gridstyle = {
  minWidth: 400,
  paddingLeft: 25,
  paddingTop: 25,
  paddingRight: 25,
  paddingBottom: 25,
};

const styles = {
  card: {
    minWidth: '95%',
  },
  media: {
    flex: 1,
    resizeMode: 'contain',
    minWidth: '0%',
  },
  content: {
    paddingTop: 0,
  },
};

function MainPage(props) {
  console.log(props);
  return (
    <div>
      <Grid container spacing={24} justify="flex-start" style={gridstyle}>
        <Grid item xs={12}>
          <Card style={styles.card}>
            <CardMedia image={Behavior_Logo} style={styles.media} title={props.title}>
                <img src={Behavior_Logo} alt="..." />
            </CardMedia>
            <CardContent style={styles.content}>
              <Typography gutterBottom variant="headline" component="h2">
                {props.title}
              </Typography>
              <ProjectsTable tableTitle="Projects" onAuthFail={props.onAuthFail } />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ div>
  );
}

export default MainPage;