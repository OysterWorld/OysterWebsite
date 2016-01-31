var sendgrid_username = 'azure_0a61c773ac40bacbb1652da124c319c3@azure.com',
    sendgrid_password = 'OysterWorld1',
	sendgrid = require('sendgrid')(sendgrid_username, sendgrid_password);

module.exports = {
	getEmailPayload: function (firstName, lastName, email, comment) {
		var textTemplate = firstName + ' ' + lastName + ' (Email: ' + email + ') left a comment for Oyster World: ' + comment;
		
		return emailPayload = {
			to: 'beth_panx@hotmail.com',
			from: 'noreply@OysterWorld.com',
			subject: 'Oyster World Is Getting Noticed!',
			text: textTemplate
		};
	},
	sendEmail: function (emailPayload, callback) {
		var email = new sendgrid.Email(emailPayload);

	    sendgrid.send(email, callback);
	}
};