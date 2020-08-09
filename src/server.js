// Server

const express = require('express')
const server = express()
const { 
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses 
} = require('./pages')


// Configurar o nunjucks (template engine)

const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

// Ínicio e confguração do servidor
server
// Receber os dados do rec.body
.use(express.urlencoded({ extended: true }))
// Configurar arquivos estáticos (css, scripts, imgs)
.use(express.static("public"))
// Rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post('/save-classes', saveClasses)
// Start do servidor
.listen(5500)
