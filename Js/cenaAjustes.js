import {Corpo} from './corpos.js'

export default class Ajustes extends Phaser.Scene{
    constructor(){
        super({key: 'CenaAjustes'});

        this.formValues = {
            entradaM1: '',
            entradaV1: '',
            entradaM2: '',
            entradaV2: '',
            entradaM3: '',
            entradaV3: '',
        }
        
    }

    init(data){
        this.quantidadePlanetas = data.quantosPlanetas;
    }

    preload(){
        this.load.image('vermelho', './Imagens/vermelho.png');
        this.load.image('verde', './Imagens/verde.png');
        this.load.image('azul', './Imagens/azul.png');
    }

    create(){

        this.corpo1 = this.add.image(500, 400, 'vermelho');
        this.corpo2 = this.add.image(450, 400, 'verde');

        this.corpo1.setInteractive();
        this.corpo2.setInteractive();

        this.input.setDraggable(this.corpo1);
        this.input.setDraggable(this.corpo2);

        this.corpo1.setdata = { posicao: [500, 400], velocidade: [0,0], massa: 1};
        this.corpo2.setdata = { posicao: [100, 800], velocidade: [0,1], massa: 1};

        if(this.quantidadePlanetas === 3){
            this.corpo3 = this.add.image(550, 400, 'azul');
            this.corpo3.setInteractive();
            this.input.setDraggable(this.corpo3);
            this.corpo3.setdata = { posicao: [200, 100], velocidade: [1,0], massa: 1};
        }        

        // recebe a lentidao do processo
        this.lentidao = 1;

        this.input.on('drag', (pointer,gameObject,dragX,dragY)=>{
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragend', (pointer, gameObject)=> {
            //if(gameObject === this.medidorMassa1)console.log('oi')
            gameObject.setdata.posicao = [gameObject.x , gameObject.y];
            /*console.log("1 massa: ",this.corpo1.setdata.massa);
            console.log("1 posicao: ",this.corpo1.setdata.posicao);
            console.log("1 velocidade: ",this.corpo1.setdata.velocidade);*/

            
        });        

        this.defineAtributos();
        this.preencheHTML();
        
    }

    defineAtributos(){
        let cena = this;

        //esconde o botao de reiniciar
        document.getElementById('botaoReiniciar').style.display = 'none';

        document.getElementById('tituloM1').style.display = 'block';
        document.getElementById('entradaM1').style.display = 'block';
        document.getElementById('tituloV1').style.display = 'block';
        document.getElementById('entradaV1').style.display = 'block';

        let entradaM1 = document.getElementById('entradaM1');
        let entradaV1 = document.getElementById('entradaV1');

        // Cropo 2
        document.getElementById('tituloM2').style.display = 'block';
        document.getElementById('entradaM2').style.display = 'block';
        document.getElementById('tituloV2').style.display = 'block';
        document.getElementById('entradaV2').style.display = 'block';

        let entradaM2 = document.getElementById('entradaM2');
        let entradaV2 = document.getElementById('entradaV2');

        if(this.quantidadePlanetas === 3){
            document.getElementById('instrucoes').style.display = "none";
            document.getElementById('tituloM3').style.display = 'block';
            document.getElementById('tituloV3').style.display = 'block';
            document.getElementById('entradaM3').style.display = 'block';
            document.getElementById('entradaV3').style.display = 'block';

            let entradaM3 = document.getElementById('entradaM3');
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

        entradaM1.addEventListener('change', () =>{
            console.log('leu a massa de 1');
            let massa = entradaM1.value;
            this.corpo1.setdata.massa = massa;
            this.contador++;
        });

        entradaV1.addEventListener('change', function(){ // 10,20
            console.log('leu a velocidade de 1');
            let velocidade = this.value;
            let partes = velocidade.split(',');
            cena.corpo1.setdata.velocidade = partes.map(Number);
            cena.contador++;
        });

        entradaM2.addEventListener('change', function(){
            console.log('leu a massa de 2');
            let massa = this.value;
            cena.corpo2.setdata.massa = massa;
            cena.contador++;
        });

        entradaV2.addEventListener('change', function(){
            console.log('leu a velocidade de 2');
            let velocidade = this.value;
            let partes = velocidade.split(',');
            cena.corpo2.setdata.velocidade = partes.map(Number);
            cena.contador++;
        });

        // Entrada da Câmera lenta
        document.getElementById('tituloCL').style.display = 'block';
        let entradaCL = document.getElementById('entradaCL');
        entradaCL.style.display = 'block';
        entradaCL.addEventListener('change', function(){
            cena.lentidao =  this.value;
        });

        // Botão Iniciar
        document.getElementById('botaoIniciar').style.display = 'block';
        let botaoIniciar = document.getElementById('botaoIniciar');

        botaoIniciar.addEventListener('click', () =>{
            this.preencheForm();
            if(this.quantidadePlanetas === 3)
                this.scene.start('CenaSimulação', {corpo1: this.corpo1, corpo2: this.corpo2, corpo3: this.corpo3, qtd: 3, lentidao: this.lentidao });
            else 
                this.scene.start('CenaSimulação', {corpo1: this.corpo1, corpo2: this.corpo2, corpo3: null, qtd: 2, lentidao: this.lentidao });
        });

        // Botão Menu
        document.getElementById('botaoMenu').style.display = 'block';
        let botaoMenu = document.getElementById('botaoMenu');

        botaoMenu.addEventListener('click', () =>{
            location.reload();
        });

    }

    preencheForm(){
        this.formValues.entradaM1 = document.getElementById('tituloM1').value;
        this.formValues.entradaV1 = document.getElementById('entradaV1').value;
        this.formValues.entradaM2 = document.getElementById('entradaM2').value;
        this.formValues.entradaV2 = document.getElementById('entradaV2').value;
        this.formValues.entradaM3 = document.getElementById('entradaM3').value;
        this.formValues.entradaV3 = document.getElementById('entradaV3').value;
        this.formValues.entradaCL = document.getElementById('entradaCL').value;
    }

    preencheHTML(){
        if(!this.formValues.entradaM1) return;

        document.getElementById('tituloM1').value = this.formValues.entradaM1;
        document.getElementById('tituloV1').value = this.formValues.entradaV1;
        document.getElementById('tituloM2').value = this.formValues.entradaM2;
        document.getElementById('tituloV2').value = this.formValues.entradaV2;
        document.getElementById('tituloM3').value = this.formValues.entradaM3;
        document.getElementById('tituloV3').value = this.formValues.entradaV3;
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