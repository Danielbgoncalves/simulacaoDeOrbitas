import {Corpo} from './corpos.js'

export default class Ajustes extends Phaser.Scene{
    constructor(){
        super({key: 'CenaAjustes'});
        
    }

    init(data){
        this.quantidadePlanetas = data.quantosPlanetas;
    }

    preload(){
        this.load.image('vermelho', './Imagens/corpoVermelho.png');
        this.load.image('verde', './Imagens/corpoVerde.png');
        this.load.image('tabelaVelocidade', './Imagens/tabelaVelocidade.png');
        this.load.image('tabelaMassa', './Imagens/tabelaMassa.png');
        this.load.image('botaoInicio', './Imagens/botaoInicio.png');
    }

    create(){

        this.corpo1 = this.add.image(500, 400, 'vermelho');
        this.corpo2 = this.add.image(450, 400, 'verde');

        this.corpo1.setInteractive();
        this.corpo2.setInteractive();

        this.input.setDraggable(this.corpo1);
        this.input.setDraggable(this.corpo2);

        this.corpo1.setdata = { posicao: [], velocidade: [], massa: 0};
        this.corpo2.setdata = { posicao: [], velocidade: [], massa: 0};

        if(this.quantidadePlanetas === 3){
            this.corpo3 = this.add.image(550, 400, 'verde');
            this.corpo3.setInteractive();
            this.input.setDraggable(this.corpo3);
            this.corpo3.setdata = { posicao: [], velocidade: [] };
        }

        this.contador = 1;
        this.iniciar = this.add.image(800, 700, 'botaoInicio');
        this.iniciar.setVisible(false);


        this.input.on('drag', (pointer,gameObject,dragX,dragY)=>{
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragend', (pointer, gameObject)=> {
            //if(gameObject === this.medidorMassa1)console.log('oi')
            gameObject.setdata.posicao = [gameObject.x , gameObject.y];
            this.defineAtributos(gameObject);
        });        
        
    }

    defineAtributos(){
        let cena = this;

        document.getElementById('tituloM1').style.display = 'block';
        document.getElementById('entradaM1').style.display = 'block';
        document.getElementById('tituloV1').style.display = 'block';
        document.getElementById('entradaV1').style.display = 'block';

        let entradaM1 = document.getElementById('tituloM1');
        let entradaV1 = document.getElementById('entradaV1');

        // Cropo 2
        document.getElementById('tituloM2').style.display = 'block';
        document.getElementById('entradaM2').style.display = 'block';
        document.getElementById('tituloV2').style.display = 'block';
        document.getElementById('entradaV2').style.display = 'block';

        let entradaM2 = document.getElementById('entradaM2');
        let entradaV2 = document.getElementById('entradaV2');

        if(this.quantidadePlanetas === 3){
            document.getElementById('tituloM3').style.display = 'block';
            document.getElementById('entradaM3').style.display = 'block';
            document.getElementById('tituloV3').style.display = 'block';
            document.getElementById('entradaV3').style.display = 'block';

            let entradaM3 = document.getElementById('tituloM3');
            let entradaV3 = document.getElementById('entradaV3');

            entradaM3.addEventListener('change', function(){
                let massa = this.value;
                cena.corpo3.setdata.massa = massa;
                cena.contador++;
            });
    
            entradaV3.addEventListener('change', function(){ // 10,20
                let velocidade = this.value;
                let partes = velocidade.split(',');
                cena.corpo3.setdata.velocidade = partes.map(Number);
                cena.contador++;
            });
        }

        entradaM1.addEventListener('change', function(){
            let massa = this.value;
            cena.corpo1.setdata.massa = massa;
            cena.contador++;
        });

        entradaV1.addEventListener('change', function(){ // 10,20
            let velocidade = this.value;
            let partes = velocidade.split(',');
            cena.corpo1.setdata.velocidade = partes.map(Number);
            cena.contador++;
        });

        entradaM2.addEventListener('change', function(){
            let massa = this.value;
            cena.corpo2.setdata.massa = massa;
            cena.contador++;
        });

        entradaV2.addEventListener('change', function(){
            let velocidade = this.value;
            let partes = velocidade.split(',');
            cena.corpo2.setdata.velocidade = partes.map(Number);
            cena.contador++;
        });

        document.getElementById('botaoIniciar').style.display = 'block';
        let botaoIniciar = document.getElementById('botaoIniciar');

        botaoIniciar.addEventListener('click', () =>{
            if(this.quantidadePlanetas === 3)
                this.scene.start('CenaSimulação', {corpo1: this.corpo1, corpo2: this.corpo2, corpo3: this.corpo3, qtd: 3 });
            else 
                this.scene.start('CenaSimulação', {corpo1: this.corpo1, corpo2: this.corpo2, corpo3: null, qtd: 2 });
        });

    }

    shutdown() {
        this.corpo1.destroy();
        this.corpo2.destroy();
        if(this.quantidadePlanetas === 3)
            this.corpo3.destroy();
    }

    update(){
        
    }
}