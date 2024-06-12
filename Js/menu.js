export default class menu extends Phaser.Scene{
    constructor(){
        super({key: 'menu'});
    }

    preload(){}

    create(){
        this.add.text(150, 200, 'Bem vindo(a)(e)', { font: 40 + "px " + 'Arial', fill: '#ffffff' });
        this.typeWriterText(this, 'Quantos Planetas serão simulados ? ', 150, 250, 100, 'Arial', 28, '#ffffff' );

        this.add.text(150, 400, '2                  ou                   3', { font: 40 + "px " + 'Arial', fill: '#ffffff' });

        this.input.on('pointerdown', () =>{
            let mouseX = this.input.activePointer.x;
            let mouseY = this.input.activePointer.y;

            console.log(mouseX, mouseY);
            this.verificaOndeClicou(mouseX, mouseY);
        });

    }

    typeWriterText(jogo, text, x, y, speed, font, size, color) {
        let str = '';
        let i = 0;
        let textObject = null;
        jogo.time.addEvent({
            delay: speed,
            repeat: text.length - 1,
            callback: function() {
                str += text[i];
                if (textObject) {
                    textObject.destroy();
                }
                textObject = jogo.add.text(x, y, str, { font: size + "px " + font, fill: color });
                i++;
            }
        });
    }

    verificaOndeClicou(mouseX, mouseY){
        if(mouseX > 125 && mouseX < 209 && mouseY > 380 && mouseY < 460){
            this.scene.start('CenaAjustes', {quantosPlanetas: 2});
        } else if(mouseX > 600 && mouseX < 674 && mouseY > 373 && mouseY < 454){
            this.scene.start('CenaAjustes', {quantosPlanetas: 3});
        }
    }

    update(){}

}