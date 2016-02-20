var sendgrid_username = 'azure_e7928b90e973f940213df4cdf6b56175@azure.com',
    sendgrid_password = 'Oyster10',
	sendgrid = require('sendgrid')(sendgrid_username, sendgrid_password);

module.exports = {
	getEmailPayload: function (firstName, lastName, email, comment) {
		var textTemplate = firstName + ' ' + lastName + ' (Email: ' + email + ') left a comment for Oyster World: ' + comment;
		
		return emailPayload = {
			to: 'info@OysterYourWorld.com',
			from: 'noreply@OysterYourWorld.com',
			subject: 'Thanks for hitting us up at Oyster World!',
			text: textTemplate
		};
	},
	sendEmail: function (emailPayload, callback) {
		var email = new sendgrid.Email(emailPayload);

	    sendgrid.send(email, callback);
	}
};
