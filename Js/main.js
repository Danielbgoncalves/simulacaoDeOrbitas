import menu from './menu.js'
import Ajustes from './cenaAjustes.js'
import cenaSimulacao from './simalacao.js'

const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 800,
    parent: 'canvas',
    physics:{
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    },
    scene: [
        menu,
        Ajustes,
        cenaSimulacao
    ]
}

const jogo = new Phaser.Game(config);