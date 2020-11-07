var socket = io();

socket.on('connect',function(){
    console.log('Usuario escritorio conectado.');
});

socket.on('disconnect',function(){
    console.log('Usuario escritorio desconectado.');
});

let params = new URLSearchParams(location.search);
var escritorio = params.get('escritorio');

$("h1").text("Escritorio "+escritorio);

$("button").click(function(){
    socket.emit('atenderTicket',{escritorio}, function(data) {
        if(data.error)
            alert(data.message);
        
        console.log(data);
        $("small").text(data.numero);
    });
});


