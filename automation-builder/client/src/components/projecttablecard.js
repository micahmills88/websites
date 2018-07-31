import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import ProjectsTable from '../components/projectstable';

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

function ProjectTableCard(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia image={props.logo} className={classes.media} title={props.title}>
            <img src={props.logo} alt="..." />
        </CardMedia>
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="headline" component="h2">
            {props.title}
          </Typography>
          <ProjectsTable tableTitle="Projects"/>
        </CardContent>
      </Card>
    </div>
  );
}

ProjectTableCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectTableCard);
