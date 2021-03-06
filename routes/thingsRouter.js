var express = require("express");
var authorize = require("../middleware/middleware").authorize;
var Thing = require("../models/models").Thing;

var thingsRouter = express.Router();

thingsRouter.get("/", function(req, res){
  Thing.find({}, function(err, people){
    res.send(people);
  }); 
});

thingsRouter.get("/:id", function(req, res){
  Thing.findById(req.params.id).exec(function(err, person){
    res.send(person);
  }); 
});

thingsRouter.post("/:token", function(req, res){
  Thing.create(req.body, function(err, result){
    if(err){
      res.status(500).send(err); 
    }
    else{
      res.send(result); 
    }
  });
});

module.exports = thingsRouter;