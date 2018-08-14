// server.js

// first we import our dependencies…
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieparser from 'cookie-parser';
import session from 'express-session';
import logger from 'morgan';
import mongoose from 'mongoose';
import Project from './models/project';
import AutomationConfig from './models/automation_config';
import passport from './passport';

// and create our instances
const app = express();
const router = express.Router();
const MongoStore = require('connect-mongo')(session);

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3001;

// db config -- set your URI from mLab in secrets.js
mongoose.connect('mongodb://localhost/website');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', function(ref){
    console.log("Connected to db");
});

//configure server to serve our app
//app.use(express.static(path.join(__dirname, '../client/build')));

// now we should configure the API to use bodyParser and look for JSON data in the request body
var sessionOptions = {
  secret: "zippidydodaday",
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000*15 }, //12 hour max age
  store: new MongoStore({ mongooseConnection: mongoose.connection})
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieparser(sessionOptions.secret));
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));

// now we can set the route path & initialize the API
router.get('/', (req, res) => {
  res.json({ message: 'API test successful!' });
});

////////////////////////////// login to website //////////////////////////////
router.post('/login', passport.authenticate('local'), (req, res) => {  
  var userInfo = {
    username: req.user.username
  };
  res.send(userInfo);
});


////////////////////////////// verify authentication //////////////////////////////
router.get('/user', (req, res) => {
  console.log('user ' + req.user);
  if(req.user) res.json({ user: req.user });
  else res.json({ user: null });
});


////////////////////////////// get all projects or post a new project //////////////////////////////
router.get('/projects', (req,res) => {
    Project.find((err, projects) => {
        if(err) return res.json({ success: false, error: err});
        if(projects.length < 1) return res.json({ success: false, error: "no results" });
        return res.json({ 
            success: true, 
            data: projects 
        });
    });
});

router.post('/projects', (req, res) => {
  const project = new Project();
  const { name, description } = req.body;
  if (!name || !description) {
    return res.json({
      success: false,
      error: 'You must provide a name and description'
    });
  }
  project.name = name;
  project.description = description;
  project.save((err, entry) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, newID: entry.id });
  });
});

////////////////////////////// query info from a single project //////////////////////////////
router.post('/projectid', (req, res) => {
  const { id } = req.body;
  Project.findById(id, (err, project) => {
    if(err) return res.json({ success: false, error: err});
    return res.json({ 
        success: true, 
        data: project
    });
  });
});

////////////////////////////// query configs for a project //////////////////////////////
router.post('/get_automation_configs', (req, res) => {
  const { id } = req.body;
  AutomationConfig.find({'project': id}, (err, configs) => {
    if(err) return res.json({ success: false, error: err});
    return res.json({
      success: true,
      data: configs
    });
  });
});

////////////////////////////// post config for a project //////////////////////////////
router.post('/post_new_config', (req, res) => {
  const config = new AutomationConfig();
  const { name, machine, account, project, behaviors, json, xml } = req.body;
  if (!name || !machine || !account || !project || !xml) {
    return res.json({
      success: false,
      error: 'You must provide all the information'
    });
  }
  config.name = name;
  config.machine = machine;
  config.account = account;
  config.project = project;
  config.behaviors = behaviors;
  config.json = json;
  config.xml = xml;
  config.save((err, entry) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, newID: entry.id });
  });
});

////////////////////////////// query specific config //////////////////////////////
router.post('/query_config', (req, res) => {
  const { id } = req.body;
  AutomationConfig.findById(id, (err, config) => {
    if(err) return res.json({ success: false, error: err });
      return res.json({
        success: true,
        data: config
      });
  });
});

////////////////////////////// update specific config //////////////////////////////
router.post('/update_config', (req, res) => {
  const { id, name, machine, account, project, behaviors, json, xml } = req.body;
  AutomationConfig.findById(id, (err, config) => {
    if (err) return res.json({ success: false, error: err });
    if(config.xml != xml)
    {
      config.name = name;
      config.machine = machine;
      config.account = account;
      config.behaviors = behaviors;
      config.json = json
      config.xml = xml;
      config.save((err, entry) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, error: "update was successful"});
      });
    }
    else
    {
      return res.json({ success: false, error: "no update needed" });
    }
  });
});

////////////////////////////// query blocks for production //////////////////////////////
//project should be a vcenter folder, vm is the name of the vm template in vcenter
router.get('/config/:project/:vm', (req,res) => {
  Project.find({'name': req.params.project }, (err, projects) => {
      if(err) return res.json({ success: false, error: err});
      if(projects.length < 1) return res.json({ success: false, error: "no results" });
      AutomationConfig.find({project: projects[0]._id}, (err, configs) => {
        if(err) return res.json({ success: false, error: err});

        // here we process the xml into a usable format
        let configs_json = [];
        configs.forEach(config => {
          configs_json.push(config.json);
        });
        
        return res.json({ 
          success: true, 
          data: JSON.parse(configs_json)
      });
      })
  });
});




app.use('/api', router);
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));