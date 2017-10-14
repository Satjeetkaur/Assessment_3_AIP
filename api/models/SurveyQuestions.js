/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  //schema: true,
  autoCreatedAt:false,
  autoUpdatedAt:false,

  attributes: {
 	
    SurveyId: {
      type: 'integer',
      required: true
    },

  	QuestionText: {
  		type: 'string',
  		required: true
  	},

    QuestionType: {
      type: 'string',
      required: true
    }

  }
};
