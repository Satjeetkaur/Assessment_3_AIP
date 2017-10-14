/**
 * UsercomplaintController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling requests.
 */



module.exports = {

  'index': function(req, res) {
    res.view();
  },

  create: function(req, res, next) {

    Surveys.create(req.params.all(), function userCreated(err, user) {

     if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }

        // If error redirect back to sign-up page
        return res.redirect('/Surveys/index');
      }

      // Log user in
      req.session.authenticated = true;
      
      req.session.User = user;

      req.session.User.admin = 1;

      sails.log('Wow, there are %d users named Finn.  Check it out:', req.session.authenticated);
      //res.redirect('/User/Success/'+ req.session.User);
      //res.redirect('/SurveyQuestions/ViewSurvey/');
  
    });
  }

  // render the profile view (e.g. /views/show.ejs)
  
}