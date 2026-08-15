const usersController = {
    register: (req, res) => {
        res.render('users/register');
    },
    
    processRegister: (req, res) => {
        res.send('¡Usuario registrado con éxito y foto guardada!');
    },

    login: (req, res) => {
        res.render('users/login');
    },

    processLogin: (req, res) => {
        res.send('Procesando login...');
    }
};

module.exports = usersController;
