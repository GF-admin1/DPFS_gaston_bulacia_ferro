window.addEventListener('load', function() {
    const form = document.querySelector('form');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    form.addEventListener('submit', function(e) {
        let errores = [];

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            errores.push('El correo electrónico es obligatorio.');
        } else if (!emailRegex.test(email.value.trim())) {
            errores.push('Debe ser un correo electrónico válido.');
        }

        if (!password.value.trim()) {
            errores.push('La contraseña es obligatoria.');
        }

        if (errores.length > 0) {
            e.preventDefault();
            alert('Errores en el inicio de sesión:\n\n' + errores.join('\n'));
        }
    });
});