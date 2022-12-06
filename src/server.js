const express = require("express")
const server = express()


//pegar o banco de dados
const db = require("./database/db")

const nunjucks = require("nunjucks")

nunjucks.configure("src/views", {
    express: server,
    noCache: true
})



//configurar pasta public
server.use(express.static("public"))

// //configurar caminhos
// //pagina inicial
// //req: request
// //res: resposta
server.get("/",(req, res) => {
    res.render("index.html")
})

server.get("/create-point",(req, res) => {
    res.render("create-point.html")
})

server.get("/search",(req, res) => {
    //pegar dados do banco de dados
    db.all(`SELECT * FROM places`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        console.log("Aqui estão seus registros:")
        console.log(rows)
        //mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", {places: rows})
    })
})

// //ligar o servidor
server.listen(3000)
console.log('after db!');