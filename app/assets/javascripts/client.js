var socket = io("localhost:8080");

socket.on('connect', function () {
  console.log('You have connected!');

  socket.on('message', function (message) {
    console.log('Something came along on the "message" channel:', message);
  });
});

socket.on('disconnect', function() {
  console.log("Disconnected");
});




