(()=>{
'use strict'

        let deck=[];
        const tipos=['C','D','H','S'],
              especiales=['A','J','Q','K'];

        let puntosJugadores=[];
        //Referencia 
        const btnPedir = document.querySelector('#btnPedir'),
              btnDetener=document.querySelector('#btnDetener'),
              btnNuevo= document.querySelector('#btnNuevo');

        const puntosHtml=document.querySelectorAll('small'),
              divCartasJugadores = document.querySelectorAll('.divCartas');
        // let j1 = document.getElementById('j1');
        // let suma=0;

        //Esta funcion inicializa el juego    
        const inicializarJuego=(numJugadores=2)=>{
            deck=crearDeck();
            puntosJugadores=[];
            for(let i=0; i<numJugadores;i++){
            puntosJugadores.push(0);    

            }
puntosHtml.forEach(elem=>elem.innerText=0);
divCartasJugadores.forEach(elem=>elem.innerHTML='');

            btnPedir.disabled=false;
            btnDetener.disabled=false;


            
        }
        //Esta funcion crea una nueva baraja
        const crearDeck=()=>{

        deck=[];    
        for(let i =2;i<11;i++)
        {
        for(let tipo of tipos)
        {
        deck.push(i+tipo)

        }
        }

        for(let esp of especiales){
        for(let tipo of tipos)
        {
        deck.push(esp+tipo)
        }
        }
        
        
        return _.shuffle(deck);
        }
        
    

        //Esta funcion me permite tomar una carta
        const pedirCarta=()=>
        {
            if (deck.length>0) {
                
                return deck.shift();
                
            }
            else{throw 'No hay cartas'}

        
            
            
        }
        // pedirCarta();
        const valorCarta=(carta)=>
        {


        const valor= carta.substring(0, carta.length-1);
        return (isNaN(valor))?
        (valor === 'A')?11:10
        :valor*1;

        }
        //Turno: 0= primer jugador y el ultimo sera la computadora
        const acumularPuntos=(carta, turno)=>{
        puntosJugadores[turno]=puntosJugadores[turno] + valorCarta(carta);
        puntosHtml[turno].innerText=puntosJugadores[turno];
        return puntosJugadores[turno];

        }

        const crearCarta=(carta, turno)=>{
            const imgCarta=document.createElement('img');
            imgCarta.src=`assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasJugadores[turno].append(imgCarta);
            
        }
      
      const determinarGanadro=()=>{

        const [puntosMinimos, puntosComputadora]=puntosJugadores;
        setTimeout(() => {

            if (puntosComputadora===puntosMinimos) {
                alert('Nadie gane');
            }else if (puntosMinimos>21) {
                alert('Gana la maquina');   
            }else if (puntosComputadora>21) {
                alert('Jugador gana');
            }
            else{
                alert('Computadora gana');}
    
            }, 100);
    
      }
      
        //turno de la computadora
        const turnoComputadora=(puntosMinimos)=>
        {
        let puntosComputadora=0;
        do{
        const carta=pedirCarta();
        puntosComputadora=acumularPuntos(carta, puntosJugadores.length-1);
        crearCarta(carta, puntosJugadores.length-1);
      



        }while((puntosComputadora<puntosMinimos)&&(puntosMinimos<=21));

      determinarGanadro();
        }




        //eventos //Es un callback: una funcoion que se esta mandando como argumento
        btnPedir.addEventListener('click',()=>{
        const carta=pedirCarta();
        const puntosJugador = acumularPuntos(carta,0);
         crearCarta(carta, 0);

       
        if (puntosJugador>21) {

            console.warn('Perdiste, sobrepsaste 21');
            btnPedir.disabled=true;
            btnDetener.disabled=true;
            turnoComputadora(puntosJugador);
            
        }else if(puntosJugador===21)
        {console.log('Felicidades llegaste a 21')
        btnPedir.disabled=true;
        btnDetener.disabled=true;
        turnoComputadora(puntosJugador);

        }

        })


        /////////Este es el evento detener
        btnDetener.addEventListener('click',()=>{
            btnDetener.disabled=true;
            btnPedir.disabled=true;
         

    turnoComputadora(puntosJugadores[0]);


        });
        // document.querySelector('small').innerHTML=valor;

        ////////Este es el evento de Reset
        btnNuevo.addEventListener('click',()=>{
        
       
            inicializarJuego();
       



        })

})();




        

 

    