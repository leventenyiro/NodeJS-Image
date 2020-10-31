const parameter = require("../parameter.json")

class Database {
    constructor() {
        var mysql = require("mysql")
        this.conn = mysql.createConnection({
            host: parameter.db.host,
            user: parameter.db.user,
            password: parameter.db.password,
            database: parameter.db.database
        })
        this.hashedId = ""
    }

    generateNewHashedId(table) {
        this.hashedId = require("crypto").randomBytes(parameter.db.cryptSize).toString("hex")
        var sql = `SELECT COUNT(*) AS count FROM ${table} WHERE id = "${this.hashedId}"`
        this.conn.query(sql, (err, result) => {
            if (err) throw err
            else if (result[0].count == 1) this.generateNewHashedId(table);
        })
    }

    getImages(callback) {
        var sql = "SELECT * FROM image"
        this.conn.query(sql, (err, result) => {
            if (err)
                return callback("Error")
            return callback(result)
        })
    }

    getImage(req, callback) {
        var sql = `SELECT * FROM image WHERE id = "${req.params.id}"`
        this.conn.query(sql, (err, result) => {
            if (err) 
                return callback("Error")
            return callback(result[0])
        })
    }

    addImage(req, callback) {
        this.generateNewHashedId("image")
        var sql = `INSERT INTO image (id, name, file) VALUES (
            "${this.hashedId}",
            "${req.body.name}",
            "${req.file.filename}"
        )`
        this.conn.query(sql, (err) => {
            if (err)
                return callback("Error")
            return callback("Successful")
        })
    }

    deleteImage(req, callback) {
        var sql = `DELETE FROM image WHERE id = "${req.params.id}"`
        this.conn.query(sql, (err) => {
            if (err)
                return callback("Error")
            return callback("Successful")
        })
    }

    end() {
        this.conn.end()
    }
}

module.exports = Database