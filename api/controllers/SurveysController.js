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
      });
  },

  ViewSurvey: function(req, res, next) {
     Surveys.findOne({ID:1}).exec(function (err, surveys){
          if (err) {
              return res.serverError(err);
          }
          if (!surveys) {
              return res.notFound('Could not find any record, sorry.');
          }
          res.view({
             surveys: surveys
          });
     });
  },

  SaveSurvey: function(req, res, next) {
      SurveyQuestions.find(function foundSurveyQuestions(err, surveyQuestions) {
          if (err) return next(err);
          // pass the array down to the /views/index.ejs page
          res.view({
            surveyQuestions: surveyQuestions
          });
      });             
  },
    
}