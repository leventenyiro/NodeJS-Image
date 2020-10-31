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

    end() {
        this.conn.end()
    }
}

module.exports = Database