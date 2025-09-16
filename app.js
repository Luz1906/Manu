document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('registroForm');
    const loginForm = document.getElementById('loginForm');
    const mensajeRegistro = document.getElementById('mensajeRegistro');
    const mensajeLogin = document.getElementById('mensajeLogin');

  // Registro
    registroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = registroForm.nombre.value.trim();
    const email = registroForm.email.value.trim();
    const password = registroForm.password.value;

    // Validaciones
    if (!nombre) {
        mostrarMensaje(mensajeRegistro, 'Ingresa tu nombre completo.', 'error');
        return;
    }
    if (!email.endsWith('@gmail.com')) {
        mostrarMensaje(mensajeRegistro, 'El correo debe ser de Gmail (ejemplo@gmail.com).', 'error');
        return;
    }
    if (password.length < 6) {
    mostrarMensaje(mensajeRegistro, 'La contraseña debe tener al menos 6 caracteres.', 'error');
    return;
    }

    const usuario = { nombre, email, password };
    localStorage.setItem(email, JSON.stringify(usuario));

    mostrarMensaje(mensajeRegistro, `Usuario ${nombre} registrado correctamente.`, 'success');
    registroForm.reset();
    });

  // Login
    loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.loginEmail.value.trim();
    const password = loginForm.loginPassword.value;

    if (!email || !password) {
    mostrarMensaje(mensajeLogin, 'Ingresa correo y contraseña.', 'error');
    return;
    }

    const datos = localStorage.getItem(email);
    if (!datos) {
    mostrarMensaje(mensajeLogin, 'Usuario no encontrado.', 'error');
    return;
    }

    const usuario = JSON.parse(datos);
    if (usuario.password === password) {
      // Guardar usuario logueado
    localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
      // Redirigir a pantalla de bienvenida
    window.location.href = 'bienvenido.html';
    } else {
    mostrarMensaje(mensajeLogin, 'Contraseña incorrecta.', 'error');
    }
    });

    function mostrarMensaje(elemento, texto, tipo) {
    elemento.className = 'mensaje ' + tipo;
    elemento.textContent = (tipo === 'success' ? '✅ ' : '⚠️ ') + texto;
    elemento.classList.remove('hidden');
    }
});