import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';

import ButtonAppBar from './components/buttonappbar';
import MainPage from './pages/mainpage';
import ProjectPage from './pages/projectpage';

const buttonStyles = {
  button: {
    minWidth: 150,
  },
};

class App extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    return (
      <div>
      <ButtonAppBar variant="contained" color="primary" 
        text="Automation Manager" onMenuClick={this.toggleDrawer('left', true)}/>
      <main>
          <Switch>
              <Route exact path='/' component={MainPage}/>
              <Route path='/projectpage/:project_id?' component={ProjectPage} />}/>
              {/*In the future pass only the ID and have node query all the name info*/}
              {/*<Route path='/personas' component={PersonaPage}/>
              <Route path='/machines' component={MachinePage}/>*/}
          </Switch>
      </main>
      <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={this.toggleDrawer('left', false)}
          onKeyDown={this.toggleDrawer('left', false)}
        >
        <List>
          <div>
            <Button component={Link} to="/" variant="outlined" style={buttonStyles.button}>
              Main Page
            </Button>
          </div> 
        </List>
        </div>
    </Drawer>
    </div>
    );
  }
}

export default App