const usersController = {
    register: (req, res) => {
        res.render('users/register');
    },
    
    processRegister: (req, res) => {
        // Aquí se procesan los datos del formulario y req.file tiene la info de la foto
        res.send('¡Usuario registrado con éxito y foto guardada!');
    },

    login: (req, res) => {
        res.render('users/login');
    }
};

module.exports = usersController;
