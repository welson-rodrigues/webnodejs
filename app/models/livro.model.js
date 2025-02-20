const pool = require("./db");

// Constructor
const Livro = function (livro) {
    this.idalivro = livro.idlivro;
    this.nomelivro = livro.nomelivro;
};

Livro.create = (newLivro, result) => {
    pool.query("INSERT INTO livro (nomelivro) VALUES ($1) RETURNING idlivro", [newLivro.nomelivro], (err, res) => {
        if (err) {
            console.error("Error:", err);
            result(err, null);
            return;
        }
        console.log("Created livro:", { id: res.insertId, ...newLivro });
        result(null, { id: res.insertId, ...newLivro });
    });
};

Livro.findById = (id, result) => {
    console.log("findById id =", id);
    pool.query("SELECT * FROM livro WHERE idlivro = $1", [id], (err, res) => {
        if (err) {
            console.error("Error:", err);
            result(err, null);
            return;
        }
        if (res.rows.length) {
            console.log("Livro encontrado:", res.rows[0]);
            result(null, res.rows[0]);
            return;
        }
        console.log("Livro não encontrado:", res);
        result({ kind: "not_found" }, null);
    });
};

Livro.getAll = (nomelivro, result) => {
    let query = "SELECT * FROM livro";
    if (nomelivro) {
        query += " WHERE nomelivro LIKE $1";
    }
    pool.query(query, nomelivro ? [`%${nomelivro}%`] : [], (err, res) => {
        if (err) {
            console.error("Error:", err);
            result(null, err);
            return;
        }
        console.log("Livros:", res.rows);
        result(null, res.rows);
    });
};

Livro.updateById = (id, livro, result) => {
    pool.query("UPDATE livro SET nomelivro = $1 WHERE idlivro = $2", [livro.nomelivro, id], (err, res) => {
        if (err) {
            console.error("Error:", err);
            result(null, err);
            return;
        }
        if (res.rowCount === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Updated livro:", { id, ...livro });
        result(null, { id, ...livro });
    });
};

Livro.remove = (id, result) => {
    pool.query("DELETE FROM livro WHERE idlivro = $1", [id], (err, res) => {
        if (err) {
            console.error("Error:", err);
            result(null, err);
            return;
        }
        if (res.rowCount === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Deleted livro with idlivro:", id);
        result(null, res);
    });
};

Livro.removeAll = (result) => {
    pool.query("DELETE FROM livro", (err, res) => {
        if (err) {
            console.error("Error:", err);
            result(null, err);
            return;
        }
        console.log(`Deleted ${res.rowCount} livros`);
        result(null, res);
    });
};

module.exports = Livro;