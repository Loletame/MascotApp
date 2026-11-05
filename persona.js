export default class Persona {
    #nombre;
    #apellido;
    #DNI;

    constructor(nombre, apellido, DNI) {
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#DNI = DNI;
    }
    get nombre() {
        return this.#nombre;
    }
    get apellido() {
        return this.#apellido;
    }
    get DNI() {
        return this.#DNI;
    }
    get nombreCompleto() {
        return `${this.#nombre} ${this.#apellido}`;
    }

    set nombre(nuevoNombre) {
        this.#nombre = nuevoNombre;
    }
    set apellido(nuevoApellido) {
        this.#apellido = nuevoApellido;
    }

}

