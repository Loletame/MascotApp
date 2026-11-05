import Persona from './persona.js';

export default class Trabajador extends Persona {
    #nroLegajo;

    constructor(nombre, apellido, DNI, nroLegajo) {
        super(nombre, apellido, DNI);
        this.#nroLegajo = nroLegajo;
    }

    get numeroLegajo() {
        return this.#nroLegajo;
    }

    alimentarAnimal(animal) {
        console.log(`El [Trabajador] ${this.nombreCompleto} está alimentando al animal ${animal.nombre}.`);
    }

    cargarAdopcion(cliente, mascota, fecha) {
        if (!cliente || !mascota || !fecha) {
            throw new Error("Error: Campos vacios");
        }

        if (mascota.dueño !== null) {
            throw new Error("Error: La mascota ya posee un dueño asignado");
        }
        return cliente.adoptar(mascota, fecha);
    }
}