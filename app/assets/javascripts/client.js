var socket = io("localhost:8080");

socket.on('connect', function () {
  console.log('You have connected!');
  socket.send('message', {
    username: 'aasdfasdfasdfasdf',
    text: 'I did the thing.'
  });
});

socket.on('disconnect', function() {
  console.log("Disconnected");
});

socket.on('message', function (message) {
  console.log('Something came along on the "message" channel:', message);
});


