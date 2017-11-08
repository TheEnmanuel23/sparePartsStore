const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')
const auth = require('./EmailConfig.json')

const email = (data) => {	
	var transporter = nodemailer.createTransport(mg(auth))

	var mailOptions = {
		from: `"${data.name}" <${data.email}>`,
		to: 'sparestoreparts@gmail.com',
		subject: data.subject,
		html: `<table rules="all" style="border-color: #666;" cellpadding="10">
			  <tr style='background: #eee;'>
			    <td><strong>Nombre:</strong></td>
			    <td>${data.name}</td>
			  </tr>
			  <tr>
			    <td><strong>Email:</strong></td>
			    <td>${data.email}</td>
			  </tr>
			  <tr>
			    <td><strong>Asunto:</strong> </td>
			     <td>${data.subject}</td>
			  </tr>
			  <tr>
			    <td> <strong>Artículo:</strong></td>
			     <td>${data.articulo}</td>
			  </tr>
			    <tr>
			    <td> <strong>Comentario:</strong></td>
			     <td>${data.comments}</td>
			  </tr>
			  </table>`
	}

	transporter.sendMail(mailOptions, (err, info) => {
		if (err) return console.log(err)

		console.log('Email sent: ', info.response)
	})

}

module.exports = email