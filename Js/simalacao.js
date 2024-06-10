import {Corpo} from './corpos.js'

export default class Simulacao extends Phaser.Scene{
    constructor(){
        super({key: 'CenaSimulação'});
        
    }

    init(data){
        this.corpoVindo1 = data.corpo1;
        this.corpoVindo2 = data.corpo2;
        this.corpoVindo3 = data.corpo3;
        this.quantosPlanetas = data.qtd;
    }

    preload(){}

    create(){

        this.corpo1 = new Corpo(this, this.corpoVindo1.setdata.massa, this.corpoVindo1.setdata.posicao, this.corpoVindo1.setdata.velocidade, 'verde');
this.corpo2 = new Corpo(this, this.corpoVindo2.setdata.massa, this.corpoVindo2.setdata.posicao, this.corpoVindo2.setdata.velocidade, 'vermelho');
if(this.quantosPlanetas === 3)
    this.corpo3 = new Corpo(this, this.corpoVindo3.setdata.massa, this.corpoVindo3.setdata.posicao, this.corpoVindo3.setdata.velocidade, 'verde');

        if(this.quantosPlanetas === 3)
            this.corpos = [this.corpo1, this.corpo2, this.corpo3];
        else 
            this.corpos = [this.corpo1, this.corpo2];
    
        this.controlador = 1;

    }

    forcaResultanteDaInteracao(corpo1, corpo2){
        let dx = corpo1.posicao[0] - corpo2.posicao[0];
        let dy = corpo1.posicao[1] - corpo2.posicao[1];

        let G = 6.67428 * (10^-11); 

        let distancia = Math.sqrt(dx*dx - dy*dy);
        let forca = G * (corpo1.massa * corpo2.massa) / (distancia^2);

        this.fx = forca * dx;
        this.fy = forca * dy;
    }

    atualizaCorpo(corpo1, corpo2){
        let fx = this.fx;
        let fy = this.fy;
        let dt = 1/60;

        corpo1.velocidade[0] += fx * dt / corpo1.massa;
        corpo1.velocidade[1] += fy * dt / corpo1.massa;
        corpo2.velocidade[0] -= fx * dt / corpo2.massa;
        corpo2.velocidade[1] -= fy * dt / corpo2.massa;

        corpo1.posicao[0] += corpo1.velocidade[0] * dt;
        corpo1.posicao[1] += corpo1.velocidade[1] * dt;
        corpo2.posicao[0] += corpo2.velocidade[0] * dt;
        corpo2.posicao[1] += corpo2.velocidade[1] * dt;

        corpo1.atualizar();
        corpo2.atualizar();
    }

    update(){


        this.controlador++;
        if(this.controlador === 2){
            for(let i = 0; i < this.corpos.length; i++){
                for( let j = i + 1; j < this.corpos.length; j++){
                    this.forcaResultanteDaInteracao(this.corpos[i], this.corpos[j]);
                    this.atualizaCorpo(this.corpos[i], this.corpos[j]);
                    
                }
            }
            this.controlador = 0;
        }            

    }
}