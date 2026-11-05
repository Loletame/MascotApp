import Animal from './Animal.js';

export default class Perro extends Animal {
    constructor(idAnimal, nombre, peso, tamaño) {
        super(idAnimal, nombre, peso, tamaño);
    }

    hacerSonido() {
        return "Guau guau!";
    }
    morder() {
        return `${this.nombre} está jugando a morder la pelota.`;
    }
}
