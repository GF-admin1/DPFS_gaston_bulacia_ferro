const bcrypt = require('bcryptjs');
const db = require('../database/models');

const usersController = {
    register: (req, res) => {
        return res.render('users/register');
    },
    
    processRegister: async (req, res) => {
        try {
            await db.User.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                profile_image: req.file ? req.file.filename : 'default.png'
            });

            return res.redirect('/users/login');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error al registrar usuario');
        }
    },

    login: (req, res) => {
        return res.render('users/login');
    },

    processLogin: async (req, res) => {
        try {
            const userToLogin = await db.User.findOne({
                where: { email: req.body.email }
            });

            if (userToLogin) {
                const isPasswordValid = bcrypt.compareSync(req.body.password, userToLogin.password);

                if (isPasswordValid) {
                    req.session.userLogged = userToLogin;
                    return res.redirect('/users/profile');
                }

                return res.render('users/login', {
                    errors: {
                        password: {
                            msg: 'Las credenciales son inválidas'
                        }
                    }
                });
            }

            return res.render('users/login', {
                errors: {
                    email: {
                        msg: 'No se encuentra este email en nuestra base de datos'
                    }
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error en el proceso de login');
        }
    },

    profile: (req, res) => {
        return res.render('users/profile', {
            user: req.session.userLogged
        });
    },
edit: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id || req.session.userLogged.id);
            return res.render('users/userEdit', { user });
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error al cargar edición');
        }
    },

    processEdit: async (req, res) => {
        try {
            const userId = req.params.id || req.session.userLogged.id;
            await db.User.update({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                profile_image: req.file ? req.file.filename : req.body.oldImage
            }, {
                where: { id: userId }
            });

            // Actualizar los datos de la sesión
            req.session.userLogged = await db.User.findByPk(userId);

            return res.redirect('/users/profile');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error al actualizar usuario');
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/');
    }
};

module.exports = usersController;
