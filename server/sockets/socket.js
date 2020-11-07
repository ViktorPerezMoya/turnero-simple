const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-control');

const tc = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('estadoActual',{
        ticketActual: tc.ultimoTicket(),
        ultimosAtendidos: tc.getUltimosAtendidos(),
    });

    client.on('sigTicket',(data,callback) => {
        let sigTicket = tc.siguiente();
        callback({
            newTicket: sigTicket
        });
    });


    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    client.on('atenderTicket',(data,callback) => {
        if(!data.escritorio){
            callback({
                error: true,
                message: 'El escritorio es requerido',
            });
        }
        let escritorio = data.escritorio;
        let ticketAtendido = tc.atenderTicket(escritorio);

        client.broadcast.emit('estadoActual',{
            ticketActual: tc.ultimoTicket(),
            ultimosAtendidos: tc.getUltimosAtendidos(),
            playAudio: true,
        });
        callback(ticketAtendido);

    });

});