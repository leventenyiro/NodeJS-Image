class Database {
    constructor() {
        var mysql = require("mysql")
        this.conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "restapi"
        })
        this.hashedId = ""
    }

    generateNewHashedId(table) {
        this.hashedId = require("crypto").randomBytes(3).toString("hex")
        var sql = `SELECT COUNT(*) AS count FROM ${table} WHERE id = "${this.hashedId}"`
        this.conn.query(sql, (err, result) => {
            if (err) throw err
            else if (result[0].count == 1) this.generateNewHashedId(table);
        })
    }

    getImages(callback) {
        var sql = "SELECT * FROM image"
        this.conn.query(sql, (err, result) => {
            return callback(result)
        })
    }

    getImage(callback) {
        var sql = `SELECT * FROM image WHERE id = ${req.params.id}`
        this.conn.query(sql, (err, result) => {
            return callback(result[0])
        })
    }

    addImage(req, callback) {
        this.generateNewHashedId("image")
        var sql = `INSERT INTO image (id, file) VALUES (
            "${this.hashedId}",
            "${req.file.filename}"
        )`
        this.conn.query(sql, (err, result) => {
            if (err)
                callback("Error")
            else
                callback("Successful")
        })
    }

    end() {
        this.conn.end()
    }
}

module.exports = Database