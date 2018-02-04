// Keeps track of the amount of cards created
var i = 1;

// Remove old card and create new one when card is added to collection (increments class of flashcard
$(".add-icon").click(function(){

        $.post('/subject/' + $('.flashcard'+i + ' #subjectId').val() + '/flashcard', {
            question: $('.flashcard'+i + ' #question').val(),
            answer: $('.flashcard'+i + ' #answer').val()
        }, function(data) {
                
            $('.cards-container').append($('.flashcard' +i).clone().attr('class', 'flashcard'+(i+1)));
            $('.card-textarea').val('');
            $('.flashcard'+i).slideUp();
            Materialize.toast('Card added!', 2000);
            i++;
        })

});

$('body').keydown(function( event ) {
    if ( event.which == 13 ) {
        event.preventDefault();
        $('.cards-container').append($('.flashcard' +i).clone().attr('class', 'flashcard'+(i+1)));
        $('.card-textarea').val('');
        $('.flashcard'+i).slideUp();
        Materialize.toast('Card added!', 2000);
        i++;
    }
});