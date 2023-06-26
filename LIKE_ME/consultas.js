const { Pool } = require("pg")

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "Lar1ss0n",
    database: "likeme",
    port: "5432",
    max: 20,
    idleTimeoutMillis: 4000,
    connectionTimeoutMillis: 0
})


const insertar = async (datos) => {
    const consulta = {
        text: "insert into posts (usuario, url, descripcion, likes) values ($1, $2, $3, 0) returning *;",
        values: datos
    }
    try {
        const resultado = await pool.query(consulta)
        return resultado
    } catch (error) {
        console.log(error.code);
        return error
    }
}

const insertarLike = async (id) => {
    try {
        const resultado = await pool.query(`update posts set likes = likes + 1 where id = ${id} returning *`)
        return resultado
    } catch (e) {
        console.log(e.code);
        return e
    }
}

const consultar = async () => {
    try {
        const resultado = await pool.query("select * from posts;")
        return resultado
    } catch (e) {
        console.log(e.code);
        return e
    }
}

module.exports = { insertar, insertarLike, consultar }