var socket = io();

const lbls_ticket = [
    $("#lblTicket1"),
    $("#lblTicket2"),
    $("#lblTicket3"),
    $("#lblTicket4"),
];

const lbls_escritorios = [
    $("#lblEscritorio1"),
    $("#lblEscritorio2"),
    $("#lblEscritorio3"),
    $("#lblEscritorio4"),
];

socket.on('connect',function(){
    console.log('Usuario escritorio conectado.');
});

socket.on('disconnect',function(){
    console.log('Usuario escritorio desconectado.');
});

socket.on('estadoActual',function(data){
    if(data.playAudio){
        var audio = new Audio('audio/new-ticket.mp3');
        audio.play();
    }
    loadHtml(data.ultimosAtendidos);
});

function loadHtml(ultimos4){
    for(let i = 0; i < ultimos4.length; i++){
        lbls_ticket[i].text("Ticket "+ultimos4[i].numero);
        lbls_escritorios[i].text("Ticket "+ultimos4[i].puesto);
    }
}
