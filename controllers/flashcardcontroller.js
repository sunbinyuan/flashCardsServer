var app = require('../server.js');

exports.index = function(req, res) {
	var subjectId = req.params.subjectId;
	app.db.Subject.findOne({where: 
		{
			id: subjectId
		}})
		.then(function(subject) {
			subject.getFlashcards()
				.then(function(flashcards) {
					res.render('subject/flashcard', {
						flashcards: flashcards,
						subject: subject,
					});
				})

		})

		.catch(function(error) {
			res.send('an error occured');
		});
}

exports.all = function(req, res) {
	app.db.FlashCard.findAll()
		.then(function(flashcards) {
			res.render('flashcard/index', {
				flashcards: flashcards
			});
		});
}

exports.new = function(req, res) {

	var subjectId = req.params.subjectId;
	app.db.Subject.findOne({where: 
		{
			id: subjectId
		}})
		.then(function(subject) {
			res.render('flashcard/new', {subject: subject});

		})

		.catch(function(error) {
			res.send('an error occured');
		});

	
}

exports.create = function(req, res) {
	var subjectId = req.params.subjectId;

	var getUser = app.db.User.findById(req.user.id);
	var getSubject = app.db.Subject.findById(req.params.subjectId);
	Promise.all([getUser, getSubject])
		.then(function(values) {
			[user, subject] = values;

			app.db.FlashCard.create({
				question: req.body.question,
				answer: req.body.answer,
				dovalidate: (req.body.dovalidate == "on"? 1 : 0 ),
			}).then(function (flashcard) {
				user.addFlashcard(flashcard);
				subject.addFlashcard(flashcard);
				res.redirect('/subject/' + subject.id);
			})

		})
		.catch(function(errors) {
			res.send('an error occured');
		})

}

exports.destroy = function(req, res) {
	var flashcardId = req.params.flashcardId;
	var subjectId = req.params.subjectId;
	app.db.FlashCard.findById(flashcardId)
		.then(function(flashcard) {
			flashcard.getUser().then(function (user ){
				if (user.id = req.user.id) {
					flashcard.destroy({force: true})
					res.redirect('/subject/' + subjectId);
				} else {
					res.send('wrong user');

				}
			})
		})
		.catch(function(error) {
			res.send('an error occured');
		});
}

exports.all_json = function(req, res) {
	var subject = req.query.subject;
	app.db.Subject.findOne({where:{subject: subject}})
		.then(function(subject) {
			if (!subject) {
				return res.json('no such subject');
			}
			subject.getFlashcards()
				.then(function (flashcards) {
					var data = [];
					flashcards.forEach(function (flashcard) {
						data.push(
						{
							Question: flashcard.question,
							Answer: flashcard.answer,
						}
						);
					})
					res.json(data);
				})
		})

}