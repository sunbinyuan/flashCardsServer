var app = require('../server.js');


exports.index = function(req, res) {
	app.db.Subject.findAll()
		.then(function(subjects) {
			res.render('subject/index', {subjects: subjects});
		});
}

exports.new = function(req, res) {
	res.render('subject/new')
}

exports.create = function(req, res) {

	app.db.User.findById(req.user.id)
		.then(function(user) {

			var subject = user.createSubject({
				subject: req.body.subject,
			})

			if(!subject) {
				res.send('an error occured');
			}

			res.redirect('subject');

		})

		.catch(function(error) {
			res.send('an error occured');
		});

}

exports.destroy = function(req, res) {
	var subjectId = req.params.subjectId;
	app.db.Subject.findById(subjectId)
		.then(function(subject) {
			subject.getUser().then(function (user ){
				if (user.id == req.user.id) {
					Promise.all(subject.flashcards.map(flashcard => flashcard.destroy()));

					subject.destroy({force: true})
					res.redirect('/subject');
				} else {
					res.send('wrong user');

				}
			})
		})
		.catch(function(error) {
			res.send('an error occured');
		});
}