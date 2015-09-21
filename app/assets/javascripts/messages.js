$(document).ready(function(){

});

function getMessages() {
  $.get('/messages/', {idea: ideaParams}).then(function(idea) {
    prependIdea(idea);
  });
}
