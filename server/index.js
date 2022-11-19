const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bcrypt = require('bcrypt')
const saltRounds = 10

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'userbase',
})

app.use(express.json())
app.use(cors())

app.post('/register', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    db.query("SELECT * FROM users WHERE email = ?", [email],
        (err, result) => {
            if (err) {
                res.send(err);
            }
            if (result.length == 0) {
                bcrypt.hash(password, saltRounds, (error, hash) => {
                    db.query("INSERT INTO users (email, password) VALUES (?, ?)",
                        [email, hash],
                        (err, response) => {
                            if (err) {
                                res.send(err)
                            }
                            res.send({ msg: "Cadastrado com sucesso" })
                        })
                })
            } else {
                res.send({ msg: "Usuário já cadastrado" })
            }
        })
})

app.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    db.query("SELECT * FROM users WHERE email = ?",
        [email],
        (err, result) => {
            if (err) {
                res.send(err)
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, result) => {
                    if(result) {
                        res.send("Usuário logado com sucesso")
                    } else {
                        res.send("Usuário não encontrado")
                    }
                })
            } else {
                res.send({ msg: "Usuário não encontrado" })
            }
        })
})

app.listen(3001, () => {
    console.log("Rodando na porta 3001");
})