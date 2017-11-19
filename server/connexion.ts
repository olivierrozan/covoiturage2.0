var express = require("express");
const Sequelize = require('sequelize');

export function getAll(seq, req) {
	console.log("**REQREQ**", req);
	const User = seq.define('user', {
		email: {
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING
		}
	}, {
			freezeTableName: true,
			timestamps: false
		});

	// force: true will drop the table if it already exists
	// User.sync({ force: false }).then(() => {
	// 	// Table created
	// 	return User.create({
	// 		email: req.mail,
	// 		password: req.password
	// 	});
	// });

	// search for attributes
	// return User.find({
	// 	where: {
	// 		email: req.email
	// 	}
	// }).then(project => project);

	return User.findAll().then(project => {
		project.map(c => {
			if (c.email === req.email) {
				console.log(req.email, c.email + ": OK");
			} else {
				console.log(req.email, c.email + ": NG");
			}
	
		})
		return project;
	});
}