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
        Event.
  find({
  }).
  sort({ dateAndTime: -1 }).
  exec((err,foundEvents) => {
     res.render('./app/pghindex.ejs',{
       events:foundEvents
     });
  });
} else{res.redirect('/sessions/new')}
})

//create

router.post('/new',(req,res) => {
if(req.session.currentUser){
  Event.create(req.body,(err,createdEvent) => {
    console.log(createdEvent);
    res.redirect('/pghfree')
  })
} else{res.redirect('/sessions/new')}
})

//show
router.get('/:id', (req, res)=>{
  if(req.session.currentUser){
    Event.findById(req.params.id, (err, foundEvent)=>{
        res.render('./app/pghshow.ejs',{
          event:foundEvent
        });
    });
  } else {res.redirect('/sessions/new')}
});



//seed data from eventbrite
router.get('/seed',(req,res) => {
  // login needed
  Event.create(data,(err,data) => {
    console.log(data);
  })
})


//delete
router.delete('/:id',(req,res) => {
  if(req.session.currentUser){
  Event.findByIdAndRemove(req.params.id,(err,data) => {
      res.redirect('/pghfree')
  })
} else {res.redirect('/sessions/new')}
})

// edit

router.get('/:id/edit', (req, res)=>{
  if(req.session.currentUser){
    Event.findById(req.params.id, (err, foundEvent)=>{
        res.render(
    		'./app/pghedit.ejs',
    		{
    			event: foundEvent
    		}
    	);
    });
  } else {res.redirect('/sessions/new')}
});

//put


router.put('/:id', (req, res)=>{
  if(req.session.currentUser){
    Event.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
        res.redirect('/pghfree');
    });
  } else {res.redirect('/sessions/new')}
});



module.exports = router
