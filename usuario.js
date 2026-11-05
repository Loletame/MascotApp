export default class Usuario {
    #id;
    #nombreUsuario;
    #contraseña;
    #dueñoCuenta;

    constructor(id, nombreUsuario, contraseña) {
        this.#id = id;
        this.#nombreUsuario = nombreUsuario;
        this.#contraseña = contraseña;
        this.#dueñoCuenta = dueñoCuenta;
    }

    get id() {
        return this.#id;
    }

    get nombreUsuario() {
        return this.#nombreUsuario;
    }

    get dueñoCuenta() {
        return this.#dueñoCuenta;
    }

    iniciarSesion(user, pass) {
    
        return this.#nombreUsuario === user && this.#contraseña === pass;
    }
}