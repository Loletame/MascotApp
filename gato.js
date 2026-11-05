import Animal from './Animal.js';

export default class Gato extends Animal {
    constructor(idAnimal, nombre, peso, tamaño) {
        super(idAnimal, nombre, peso, tamaño);
    }

    hacerSonido() {
        return "Miau miau!";
    }

    arañar() {
        return `El gato ${this.nombre} está arañando el rascador.`;
    }
}