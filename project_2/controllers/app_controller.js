const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const Event = require('../models/events.js')
const data = require('../models/eventbritedata.js')
//logout button
router.delete('/', (req, res) => {
    req.session.destroy(()=>{
        res.redirect('/');
    });
  })
//new route for app
router.get('/new',(req,res) => {
  if(req.session.currentUser){
      res.render('./app/new.ejs');
  } else {
      res.redirect('/sessions/new');
  }
})

 //index route for app

  router.get('/', (req, res)=>{
      if(req.session.currentUser){
          res.render('./app/pghindex.ejs');
      } else {
          res.redirect('/sessions/new');
      }
});
//create

router.post('/new',(req,res) => {
  Event.create(req.body,(err,createdEvent) => {
    console.log(req.body);
    res.send(createdEvent)
  })
})

//seed data from eventbrite
router.get('/seed',(req,res) => {
  Event.create(data,(err,data) => {
    console.log(data);
  })
})











module.exports = router
