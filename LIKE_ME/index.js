const http = require("http")
const url = require("url")
const fs = require("fs")
const { insertar, insertarLike, consultar } = require("./consultas")


http.createServer(async (req, res) => {

    if (req.url == "/" && req.method == "GET") {
        res.setHeader("content-type", "text/html")
        res.end(fs.readFileSync("index.html", "utf8"))
    }

    if ((req.url == "/post" && req.method == "POST")) {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        })

        req.on("end", async () => {
            try {
                const datos = Object.values(JSON.parse(body))
                const respuesta = await insertar(datos)
                res.end(JSON.stringify(respuesta))
            } catch (error) {
                res.end(JSON.stringify({
                    code: error.code,
                    message: "Error inesperado",
                }));
            }
        })
    }

    if (req.url.startsWith("/post?") && req.method == "PUT") {
        try {
            const { id } = url.parse(req.url, true).query
            const respuesta = await insertarLike(id)
            res.end(JSON.stringify(respuesta))
        } catch (error) {
            res.end(JSON.stringify({
                code: error.code,
                message: "Error inesperado",
            }));
        }
    }

    if ((req.url == "/posts" && req.method == "GET")) {
        const respuesta = await consultar()
        res.end(JSON.stringify(respuesta))
    }


}).listen(3000, () => console.log("Server ON! http://localhost:3000"))