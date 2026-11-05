import Persona from './persona.js';

export default class Cliente extends Persona {
    #nroDeSocio;
    #mascotas;

    constructor(nombre, apellido, DNI, nroDeSocio) {
        super(nombre, apellido, DNI);
        this.#nroDeSocio = nroDeSocio;
        this.#mascotas = [];
    }

    get nroDeSocio() {
        return this.#nroDeSocio;
    }

    get mascotas() {
        return this.#mascotas;
    }

    adoptar(mascota, fechaDeAdopcion) {
        if (mascota && !mascota.dueño) {
            mascota.dueño = this;
            this.#mascotas.push({ mascota: mascota, fecha: fechaDeAdopcion });
            return true;
        }
        return false;

    }
}