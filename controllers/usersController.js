const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

const getUsers = () => {
    return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
};

const usersController = {
    register: (req, res) => {
        res.render('users/register');
    },
    
    processRegister: (req, res) => {
        const users = getUsers();
        
        const newUser = {
            id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
            ...req.body,
            avatar: req.file ? req.file.filename : 'default.png'
        };

        users.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

        res.redirect('/users/login');
    },

    login: (req, res) => {
        res.render('users/login');
    },

    processLogin: (req, res) => {
        res.send('Procesando login...');
    }
};

module.exports = usersController;
