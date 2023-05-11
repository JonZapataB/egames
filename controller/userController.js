import User from '../models/users.js';
import UserInfo from '../models/user_info.js';
/* import bcrypt from 'bcrypt'; */
const getAll = async (req, res) => {
    try{
        let users = await User.findAll({
            attributes: ["iduser", "email", "password"],
            include: [
                {
                model: UserInfo,
                /* attributes: ["name", "lastname", "address", "phone"], */
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
                /* attributes: ["name", "lastname", "address", "phone"], */
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

/* const login = async (req, res) => {
    const email = req.body.email;
    let user = await User.findOne({email:email});
    if(!user) {
        res.status(404).send("El usuario no existe");
        return;
    }
    let password= req.body.password;
    if (await bcrypt.compare(password,user.password)) {
        res.send("Usuario y contraseña correctos");
    }
    else {
        res.status(401).send("Contraseña incorrecta");
    }
} */

const logout = (req,res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/");
        });
}
                
/* 
const create = async (req, res) => {
    try{
        const user = await User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        });
        const userInfo = await UserInfo.create({
            name: req.body.name,
            surname: req.body.surname,
            iduser: user.iduser,
        });
        res.redirect("/user/login");
    } catch(error) {
        res.redirect("/user/register?error=El usuario ya existe");
    }
} */

const registerForm = (req, res) => {
    const error = req.query.error;
    res.render ("user/register", {error:error});
}


export default {
    /* create,
    login, */
    getById,
    registerForm,
    getAll,
    logout
}