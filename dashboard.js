import Perro from './Perro.js';
import Gato from './gato.js';
import Cliente from './cliente.js';
import Trabajador from './trabajador.js';

let clientesApp = [];
let mascotasApp = [];
let trabajadorLogueado = null;

window.addEventListener("load", async () => {
    const sesionData = sessionStorage.getItem("usuarioActivo");
    if (!sesionData) {
        window.location.href = "index.html";
        return;
    }

    const usuarioJSON = JSON.parse(sesionData);
    const p = usuarioJSON.persona;

    document.getElementById("btn-logout").addEventListener("click", () => {
        sessionStorage.clear();
        window.location.href = "index.html";

    });
    try {
        const res = await fetch("./datos.json");
        const datos = await res.json();

        clientesApp = datos.clientes.map(c => new Cliente(c.nombre, c.apellido, c.DNI, c.nroDeSocio));

        mascotasApp = datos.mascotas.map(m => {
            const instancia = m.tipo === "Perro" ? new Perro(m.idAnimal, m.nombre, m.peso, m.tamaño) : new Gato(m.idAnimal, m.nombre, m.peso, m.tamaño);

            if (m.dueñoNroSocio) {
                const dueño = clientesApp.find(c => c.nroDeSocio === m.dueñoNroSocio);
                if (dueño) {
                    dueño.adoptar(instancia, m.fechaAdopcion);
                }
            }
            return instancia;
        });

        if (usuarioJSON.rol === "Trabajador") {
            trabajadorLogueado = new Trabajador(p.nombre, p.apellido, p.DNI, p.numeroLegajo);
            document.getElementById("user-welcome").textContent = `Trabajador: ${trabajadorLogueado.nombreCompleto}`;
            configurarVistaTrabajador();
        } else {
            const clienteActual = clientesApp.find(c => c.nroDeSocio === p.nroDeSocio) || new Cliente(p.nombre, p.apellido, p.DNI, p.nroDeSocio);

            document.getElementById("user-welcome").textContent = `Cliente: ${clienteActual.nombreCompleto}`;
            configurarVistaCliente(clienteActual);
        }

    } catch (err) {
        console.error("Error al cargar los datos:", err);
    }
});

function configurarVistaCliente(cliente) {
    document.getElementById("seccion-cliente").classList.remove("oculto");
    const contenedor = document.getElementById("contenedor-tarjetas");
    const miFragmento = new DocumentFragment();

    cliente.mascotas.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("tarjeta");

        div.innerHTML = `
            <h3>${item.mascota.nombre}</h3>
            <p><strong>Sonido:</strong> ${item.mascota.hacerSonido()}</p>
            <p><strong>Peso:</strong> ${item.mascota.peso} kg</p>
            <p><strong>Tamaño:</strong> ${item.mascota.tamaño}</p>
            <p class="fecha"><strong>Fecha de adopción:</strong> ${item.fecha}</p>
        `;
        miFragmento.appendChild(div);
    });
    contenedor.appendChild(miFragmento);
} 

function configurarVistaTrabajador() {
    document.getElementById("seccion-trabajador").classList.remove("oculto");
    const modal = document.getElementById("modal-adopcion");
    const btnAbrir = document.getElementById("btn-abrir-modal");
    const btnCerrar = document.getElementById("btn-cerrar-modal");
    const form = document.getElementById("form-adopcion");

    btnAbrir.addEventListener("click", () => {
        poblarSelectsModal();
        modal.classList.remove("oculto");
    });

    btnCerrar.addEventListener("click", () => {
        modal.classList.add("oculto");
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nroSocio = document.getElementById("select-cliente").value;
        const idMascota = document.getElementById("select-mascota").value;
        const fecha = document.getElementById("fecha-adopcion").value;

        if (!idMascota || !nroSocio || !fecha) {
            alert("Campos vacios.");
            return;
        }

        const mascota = mascotasApp.find(m => String(m.idAnimal) === idMascota);
        const cliente = clientesApp.find(c => c.nroDeSocio === nroSocio);

        if (!mascota || mascota.dueño !== null) {
            alert("Error: La mascota ya posee un dueño asignado o no existe.");
            return;
        }

        try {
            trabajadorLogueado.cargarAdopcion(cliente, mascota, fecha);
            alert(`Adopción registrada: ${cliente.nombreCompleto} adoptó a ${mascota.nombre} el ${fecha}.`);
            modal.classList.add("oculto");
            form.reset()
        } catch (error) {
            alert(error.message);
        }
    });
}
function poblarSelectsModal() {
    const selectCliente = document.getElementById("select-cliente");
    const selectMascota = document.getElementById("select-mascota");

    selectCliente.innerHTML = '<option value="">Seleccione un cliente</option>';
    selectMascota.innerHTML = '<option value="">Seleccione una mascota</option>';

    mascotasApp.filter(m => m.dueño === null).forEach(m => {
        const opt = document.createElement("option");
        opt.value = m.idAnimal;
        opt.textContent = `${m.nombre} (${m.tamaño})`;
        selectMascota.appendChild(opt);
    });
    clientesApp.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.nroDeSocio;
        opt.textContent = c.nombreCompleto;
        selectCliente.appendChild(opt);
    });
}