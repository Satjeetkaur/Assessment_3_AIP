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
      res.redirect('/Surveys/EditSurvey/');
  
    });
  },

 UpdateSurvey: function(req, res, next) {
  // Get an array of all users in the User collection(e.g. table)
     Surveys.findOne(req.param('Id'), function foundsurveys(err,surveys) {
      if (err) return next(err);
      if (!surveys) return next('User doesn\'t exist.');

<<<<<<< HEAD
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
    
=======
      res.view({
        surveys: surveys
      });
    });
  
  }, 

  EditSurvey: function(req, res, next) {

    // Get an array of all users in the User collection(e.g. table)
    Surveys.find(function foundSurveys(err, surveys) {
      if (err) return next(err);
      // pass the array down to the /views/index.ejs page
      res.view({
        surveys: surveys
      });
    });
  },

  destroy: function(req, res, next) {

    Surveys.destroy(req.param('Id'), function surveysUpdated(err) {
      if (err) {}

     res.redirect('/surveys/EditSurvey/' + req.param('Id'));
    });

  },

  // process the info from edit view
  update: function(req, res, next) {
    
      var userObj = {
        SurveyId :req.param('SurveyId'),
        Title: req.param('Title'),
        Description: req.param('Description'),
        CreatedDate: req.param('CreatedDate'),
        ExpiresOn: req.param('ExpiresOn'),
        CreatedBy: req.param('CreatedBy'),
      }
   

    Surveys.update(req.param('Id'), userObj, function userUpdated(err) {
      if (err) return next(err);

       res.redirect('/surveys/EditSurvey/' + req.param('Id'));
  
    });
  },


 ViewSurvey: function(req, res, next) {
    req.session.User.admin = 0;
     Surveys.find(function foundsurveys(err, surveys) {
      if (err) return next(err);
      // pass the array down to the /views/index.ejs page
      res.view({
        surveys: surveys
      });
    });
  //sails.log('Found "%s"', finn.Title);
  //return res.json(finn);
              
  }
>>>>>>> 9b8a5af1c9750c0222298303977f8417bf82f560
}