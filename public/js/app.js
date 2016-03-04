var socket = io();

socket.on("connect", function () {
	console.log("Connected to socket.io server!");
});

socket.on("message", function (message) {
	var momentTimestamp = moment.utc(message.timestamp);
	console.log("New message: ");
	console.log(message.text);

	$('.messages').append('<p><strong>' + momentTimestamp.local().format('h:mm a') + ':  ' + '</strong>' + message.text + '</p>');
});

// Handles submitting of new message

var $form = $('#message-form');

$form.on("submit", function (e) {
	e.preventDefault();
	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val()
	});

	$message.val("");
});