document.getElementById("form-login").addEventListener("submit", async (e) => {
    e.preventDefault();
    const userVal = document.getElementById("username").value.trim();
    const passVal = document.getElementById("password").value.trim();

    if (!userVal || !passVal) {
        alert("Usuario y/o contraseña incorrectos");
        return
    }
    try {
        const respuesta = await fetch("./datos.json");
        if (!respuesta.ok) {
            throw new Error(`No se pudo cargar datos.json: ${respuesta.status}`);
        }
        const datos = await respuesta.json();

        const usuarioEncontrado = datos.usuarios.find(u => u.username === userVal && u.pass === passVal);
        if (usuarioEncontrado) {
            sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
            window.location.href = "dashboard.html";
        } else {
            alert("Usuario y/o contraseña incorrectos");
        }
    } catch (error) {
        console.error("Error al iniciar sesion:", error);
        alert("Error al iniciar sesion. Por favor, intentalo de nuevo.");
    }
});