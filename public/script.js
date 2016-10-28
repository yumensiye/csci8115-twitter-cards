var socket = io.connect();

function setUsername() {
    if ($("#usernameInput").val() != "")
    {
        socket.emit('setUsername', $("#username").val());
        $('#chatControls').show();
        $('#username').hide();
        $('#userSet').hide();
    }
}

function addMessage(msg, username) {
    $("#chatEntries").append('<div class="message"><p>' + username + ' : ' + msg + '</p></div>');
}

function sendMessage() {
    if ($('#messageInput').val() != "")
    {
        var val = $('#messageInput').val();

        if (val.startsWith('/ban'))
        {
          socket.emit('ban', val.split(" ")[1]);
        }
        else {
          socket.emit('message', $('#messageInput').val());
          addMessage($('#messageInput').val(), "Me");
        }
        $('#messageInput').val('')
    }
}

// Tell the socket that every time is gets a `message` type message it should
// call addMessage
socket.on('message', function(data) {
    addMessage(data['message'], data['username']);
})

socket.on('ban', function(data) {
    $("#ban").append('<div class="entry"><p>' + data.ban + ' : ' + data.username + '</p></div>');
})

// Wait until jquery is loaded because we going to need it
$(function() {
    // Hide the chat controls, we don't want the user sending messages until
    // they have given us a username
    $("#chatControls").hide();

    // If the user clicks the button to set their username we call setUsername
    $("#userSet").click(function() {setUsername()});

    // If the user clicks the button to send a message we call sendMessage
    $("#submit").click(function() {sendMessage();});
})
