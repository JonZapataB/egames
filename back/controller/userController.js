import User from '../models/users.js';
import UserInfo from '../models/user_info.js';
import bcrypt from 'bcrypt';
const getAll = async (req, res) => {
    try{
        let users = await User.findAll({
            attributes: ["iduser", "email", "password"],
            include: [
                {
                model: UserInfo,
                },
            ],
        });
        res.send(users);
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error ocurred while retrieving users."
        });
    }
}

const getById = async (req, res) => {
    try{
        let user = await User.findByPk(req.params.id, {
            attributes: ["iduser", "email", "password"],
            include: [
                {
                model: UserInfo,
                },
            ],
        });
        res.send(user);
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error ocurred while retrieving users."
        });
    }
}

const login = async (req, res) => {
    const email = req.body.email;
    let user = await User.findOne({email:email});
    if(!user) {
        res.status(404).send("El usuario no existe");
        return;
    }
    let password= req.body.password;
   /*  if (await bcrypt.compare(password,user.password)) { */// esta linea es para cuando encriptemos las contraseñas
   if (password == user.password) {
        res.send("Usuario y contraseña correctos");
    }
    else {
        res.status(401).send("Contraseña incorrecta");
    }
}



const logout = (req,res) => {
    req.logout((err) => {   
        if (err) {
            console.log(err);
        }
        res.redirect("/");
        });
}
                

const create = async (req, res) => {
    try{
        const oldUser = await User.findOne({where: {email: req.body.email}});
        if (oldUser) {
            res.status(400).send("El usuario ya existe");
            return;
        }
        const password = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            email: req.body.email,
            password: password,
        });
        res.send(user);
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error ocurred while retrieving users."
        });
    }
}

const createUserInfo = async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).send("El usuario no existe");
            return;
        }
        const userInfo = await UserInfo.create({
            name: req.body.name,
            lastname: req.body.lastname,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            iduser: req.params.id,
        });
        res.send(userInfo);
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error ocurred while retrieving users."
        });
    }
}

const updateUser = async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).send("El usuario no existe");
            return;
        }
        const userInfo = await UserInfo.update({
            name: req.body.name,
            lastname: req.body.lastname,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            iduser: req.params.id,
        });
        res.send(userInfo);
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error ocurred while retrieving users."
        });
    }
}

export default {
    create,
    createUserInfo,
    updateUser,
    login,
    getById,
    getAll,
    logout
}