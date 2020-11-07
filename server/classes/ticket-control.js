const fs = require('fs');

class Ticket {
    constructor(numero, puesto){
        this.numero = numero;
        this.puesto = puesto;
    }
}

class TicketControl{

    constructor(){
        this.hoy = new Date();
        this.tickets = [];
        this.ticketsAtendidos = [];

        const data = require('../data/data.json');
        if(data.hoy != this.hoy.getDate()){
            this.actualizarDatosDeSistema();
        }else{
            this.ultimo =  data.ultimo;
            this.tickets = data.tickets;
            this.ticketsAtendidos = data.ticketsAtendidos;
        }
    }

    ultimoTicket(){
        return `Ticket ${this.ultimo}.`;        
    }

    getUltimosAtendidos(){
        return this.ticketsAtendidos;
    }

    siguiente(){
        this.ultimo++;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarDatos();
        return `Ticket ${this.ultimo}.`;        
    }

    actualizarDatosDeSistema(){
        this.ultimo = 0;
        this.grabarDatos();
        this.tickets = [];
        this.ticketsAtendidos = [];
        console.log('Es sistema ha inicializado sus parametros.');
    }

    grabarDatos(){
        let parametos = {
            ultimo: this.ultimo,
            hoy: this.hoy.getDate(),
            tickets: this.tickets,
            ticketsAtendidos: this.ticketsAtendidos,
        }

        let parametrosJson = JSON.stringify(parametos);

        fs.writeFileSync("./server/data/data.json",parametrosJson);
    }

    atenderTicket(escritorio){
        if(this.tickets.length === 0)
            return {error: true,message: 'No hay mas tickets'};
        //obterner nro del primer ticket no atendido
        let numero = this.tickets[0].numero;

        //eliminar el tiket de la lista y guardar en la nueva lista
        this.tickets.shift();
        let ticketAtender = new Ticket(numero,escritorio);
        this.ticketsAtendidos.unshift(ticketAtender);
        if(this.ticketsAtendidos.length > 4)
            this.ticketsAtendidos.pop();
        console.log(this.ticketsAtendidos);
        //guardar en el fichero y devolver el ticket atendido
        this.grabarDatos();

        return ticketAtender;
    }
}

module.exports = {TicketControl};