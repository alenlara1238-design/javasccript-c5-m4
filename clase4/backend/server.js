const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRET_KEY = "ClaveSuperSecreta123!*";

//base de datos simulada
const usuarios = [
    {id: 1, username: "juan", password: "1234", role: "admin"},
    {id: 2, username: "maria", password: "abcd", role: "user"},
    {id: 3, username: "pedro", password: "qwert", role: "editor"},
    {id: 4, username: "jose", password: "zxcvb", role: "user"}
]

app.post("/login", (req, res)=>{
    const {username, password} = req.body;

    const user = usuarios.find(
        (u) => u.username === username && u.password === password
    );

    if(!user){
        return res.status(401).json({message: "credenciales no válidas"});
    }

    const payload = {
        id: user.id,
        username: user.username,
        role: user.role
    }

    const token = jwt.sign(payload, SECRET_KEY,{expiresIn: "30m"});
    res.json({message: "Login exitoso", token});
});

function verificarToken(req, res, next){
    const authHeader =req.headers["authorization"];
    if(!authHeader) return res.status(403).json({message: "token requerido"});

    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, user) =>{
        if(err) return res.status(403).json({mesage: "token inválido"});

        req.user = user; //propagación de contexto
        next();
    });
}

app.get("/perfil", verificarToken, (req, res)=>{
    res.json({
        message: "Bienvenido a su perfil",
        user: req.user
    });
});

app.listen(3000, ()=>{
    console.log("Servidor corriendo en http://localhost:3000");
});


