var socket = io();

socket.on('connect',function(){
    console.log('Usuario conectado.');
});

socket.on('estadoActual',function(data){
    $("#lblNuevoTicket").text(data.ticketActual);
});

socket.on('disconnect',function(){
    console.log('Usuario desconectado.');
});

$("button").click(function(){
    socket.emit('sigTicket',null,function(data) {
        console.log('servidor: ',data);
        $("#lblNuevoTicket").text(data.newTicket);
    });
});


