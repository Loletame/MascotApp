export default class Animal {
    #idAnimal;
    #nombre;
    #peso;
    #tamaño;
    #dueño;

    constructor(idAnimal, nombre, peso, tamaño) {
        this.#idAnimal = idAnimal;
        this.#nombre = nombre;
        this.#peso = peso;
        this.#tamaño = tamaño;
        this.#dueño = null;
    }

    get idAnimal() {
        return this.#idAnimal;
    }
    get nombre() {
        return this.#nombre;
    }
    get peso() {
        return this.#peso;
    }
    get tamaño() {
        return this.#tamaño;
    }
    get dueño() {
        return this.#dueño;
    }
    set dueño(nuevoDueño) {
        this.#dueño = nuevoDueño;
    }

    hacerSonido() {
        return `El animal ${this.#nombre} está haciendo un sonido.`;
    }
}