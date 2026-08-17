window.addEventListener('load', function() {
    const form = document.querySelector('form');
    const name = document.querySelector('#name');
    const description = document.querySelector('#description');
    const image = document.querySelector('#image');

    form.addEventListener('submit', function(e) {
        let errores = [];

        if (name.value.trim().length < 5) {
            errores.push('El nombre del producto debe tener al menos 5 caracteres.');
        }

        if (description.value.trim().length < 20) {
            errores.push('La descripción debe tener al menos 20 caracteres.');
        }

        // La imagen es opcional en la edición, por eso verificamos si se subió algo
        if (image && image.value) {
            const extensionesPermitidas = /(.jpg|.jpeg|.png|.gif)$/i;
            if (!extensionesPermitidas.test(image.value)) {
                errores.push('El formato de la imagen debe ser JPG, JPEG, PNG o GIF.');
            }
        }

        if (errores.length > 0) {
            e.preventDefault();
            alert('Errores en el producto:\n\n' + errores.join('\n'));
        }
    });
});