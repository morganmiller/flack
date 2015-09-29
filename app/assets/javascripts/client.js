var socket = io.connect("localhost:8080");

socket.on("connect", function() {
  socket.emit("subscribe", "flack:1");
});

$(document).ready(function(){
  $("#1").click(function() {
    socket.emit("unsubscribe", "flack:2");
    socket.emit("subscribe", "flack:1");
  });

  $("#2").click(function() {
    socket.emit("unsubscribe", "flack:1");
    socket.emit("subscribe", "flack:2");
  });
});

