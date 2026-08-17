window.addEventListener('load', function() {
    const form = document.querySelector('form');
    const nombre = document.querySelector('#nombre');
    const apellido = document.querySelector('#apellido');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const avatar = document.querySelector('#avatar');

    form.addEventListener('submit', function(e) {
        let errores = [];

        if (nombre.value.trim().length < 2) {
            errores.push('El nombre debe tener al menos 2 caracteres.');
        }

        if (apellido.value.trim().length < 2) {
            errores.push('El apellido debe tener al menos 2 caracteres.');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            errores.push('Debe ser un correo electrónico válido.');
        }

        if (password.value.trim().length < 8) {
            errores.push('La contraseña debe tener al menos 8 caracteres.');
        }

        if (avatar.value) {
            const extensionesPermitidas = /(.jpg|.jpeg|.png|.gif)$/i;
            if (!extensionesPermitidas.test(avatar.value)) {
                errores.push('El formato de la imagen debe ser JPG, JPEG, PNG o GIF.');
            }
        }

        if (errores.length > 0) {
            e.preventDefault();
            alert('Errores en el formulario:\n\n' + errores.join('\n'));
        }
    });
});