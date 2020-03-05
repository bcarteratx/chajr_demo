const Volunteer = require("../models/volunteer.js");

module.exports = {
  index,
  create,
  new: newVolunteer,
  delete: deleteOne,
  addToVolunteers,

};

function index(req, res, next) {
  console.log(req.query)
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  let sortKey = req.query.sort || 'name';
  Volunteer.find(modelQuery)
  .sort(sortKey).exec(function(err, volunteers) {
    if (err) return next(err);
    res.render('volunteers/index', { 
        user: req.user,
        volunteers,
    });
  });
}

function create(req, res) {
  console.log(req.body)
  const volunteer = new Volunteer(req.body);
  volunteer.save(function(err) {
    if (err) return res.render('volunteers/new', {user: req.user, volunteer});
    console.log(volunteer);
    res.redirect('/volunteers');
  });
}

function newVolunteer(req, res) {
  res.render('volunteers/new', { user: req.user, volunteer});
}

function addToVolunteers(req, res) {
  Event.findById(req.params.id, function(err, event) {
    event.volunteers.push(req.body.volunteerId);
    event.save(function(err) {
      res.redirect(`/event/${event._id, event}`);
    });
  });
}

function deleteOne(req, res) {
  Volunteer.findByIdAndDelete(req.params.id, function(err, volunteer) {
    if (err) {
      console.log(err);
    } else {
      console.log('deleting volunteer');
    }
      res.redirect('/volunteers');
  });
}