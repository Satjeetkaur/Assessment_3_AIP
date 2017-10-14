/**
 * UserController
 *
 * @description :: Server-side logic for managing Categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'index':function(req, res)
  {
    res.view();
  },


  create :function(req, res, next)
  {
    User.create(req.params.all(), function userCreated(err, user){
      
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }

        // If error redirect back to sign-up page
        return res.redirect('/User/index');
      }

      // Log user in
      req.session.authenticated = true;
      req.session.User = user;

      // Change status to online
      User.online = true;
       res.redirect('/User/ViewRecord/' + user.id);
      
    });

  },

  'ViewRecord': function(req, res, next){
    User.find(function foundUser(err, users){
      if (err) return next(err);
      if (!users) return next();

      res.json(user);

      res.view({ 
        users: users
      });
      
       //sails.log('Wow, there are %d users named Finn.  Check it out:', users.length, users);
 
    });
  },

  'ViewRecord': function(req, res, next){
    User.findOne(req.param('id'), function foundUser(err, user){
      if (err) return next(err);
      if (!user) return next();

      //res.json(user);

      res.view({ 
        user: user
      });
      
      // sails.log('Wow, there are %d users named Finn.  Check it out:', user.length, user);
 
    });
   /* User.find()
        .exec(function(err,users){
          if(err){
            return res.json(err);
          }
          return res.json(users);
          
        })*/
  },

  'DeleteRecord': function(req, res, next){

    User.destroy(req.param('id')).exec(function (err){
          if (err) {
            return res.negotiate(err);
            }
              sails.log('record have now been deleted, succesfully');
            return res.ok();
    });
  }
};

