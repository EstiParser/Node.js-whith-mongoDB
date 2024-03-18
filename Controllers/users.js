const fsPromises = require('fs').promises;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let Users = require('../Data/User.json');
const TOKEN_SECRET = '*****';
const login = async (req, res) => {
    const { name, password } = req.body;

    for (const user of Users) {
        if (user.name === name && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userName: user.name }, TOKEN_SECRET); 
            res.header("auth-token", token).send({ "token": token });
            return;
        }
    }

    res.status(400).send('Invalid credentials');
}

const register = async (req, res) => {
    const { name, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = {
        name: name,
        password: hasPassword,
    };

    Users.push(newUser);
    await fsPromises.writeFile("./Data/User.json", JSON.stringify(Users, null, 2));

    res.send('User registered successfully');
};

module.exports = {
    register,
    login
};
