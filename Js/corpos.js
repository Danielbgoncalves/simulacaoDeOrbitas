export class Corpo{
    constructor(cena, massa, posicao, velocidade, nome, escala){
        this.cena = cena;
        this.massa = massa;
        this.posicao = posicao;
        this.velocidade = velocidade;
        this.imagem = cena.add.image(this.posicao[0], this.posicao[1], nome);
        this.imagem.setScale(escala);
    }

    atualizar(){
        this.imagem.x = this.posicao[0];
        this.imagem.y = this.posicao[1];
    }
}