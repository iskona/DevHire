var socket = io.connect("http://localhost:8000");
var message = $("#message");
var handle = $("#handle");
var btn = $("#chat-send");
var output = $("#output");
btn.on("click", function () {
  socketEmit();
});
message.keypress(function () {
  if (event.keyCode === 13 || event.which === 13) {
 socketEmit();
  }
});

socket.on("chat", function (data) {
  output.append(`<p><strong> ${data.handle} :</strong>  ${data.message} </p>`);
});

function socketEmit() {
  var haldleValue = handle.val();
  var messageValue = message.val();
  if (haldleValue !== "" && messageValue !== "") {
    socket.emit("chat", {
      message: message.val(),
      handle: handle.val()
    });
  }
  else if( haldleValue === "" ){
    alert("Enter your name for Handle!! ");
  }
   else if( messageValue === "" ){
    alert("Enter your message !! ");
  }
}

