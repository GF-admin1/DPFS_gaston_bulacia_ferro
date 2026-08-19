const db = require('../../database/models');

const usersApiController = {
    list: async (req, res) => {
        try {
            const users = await db.User.findAll();

            const usersWithDetail = users.map(user => ({
                id: user.id,
                name: `${user.first_name || user.name || ''} ${user.last_name || ''}`.trim(),
                email: user.email,
                detail: `/api/users/${user.id}`
            }));

            return res.status(200).json({
                count: users.length,
                users: usersWithDetail
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    detail: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id, {
                attributes: { exclude: ['password', 'category', 'role'] }
            });

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const userData = user.toJSON();
            userData.avatarUrl = `/images/users/${user.profile_image || user.avatar || 'default.png'}`;

            return res.status(200).json(userData);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};

module.exports = usersApiController;