const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')
const auth = require('./EmailConfig.json')

const email = (data) => {	
	var transporter = nodemailer.createTransport(mg(auth))

	var mailOptions = {
		from: `"${data.name}" <${data.email}>`,
		to: 'sparestoreparts@gmail.com',
		subject: data.subject,
		text: data.comments
	}

	transporter.sendMail(mailOptions, (err, info) => {
		if (err) return console.log(err)

		console.log('Email sent: ', info.response)
	})

}

module.exports = email