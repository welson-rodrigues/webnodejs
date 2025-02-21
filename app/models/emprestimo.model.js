const pool = require("./db");

// Constructor
const Emprestimo = function (emprestimo) {
    this.idaluno = emprestimo.idaluno;
    this.idlivro = emprestimo.idlivro;
    this.dataemprestimo = emprestimo.dataemprestimo;
    this.datadevolucao = emprestimo.datadevolucao;
};

Emprestimo.create = (newEmprestimo, result) => {
    pool.query("INSERT INTO emprestimo (idaluno, idlivro, dataemprestimo, datadevolucao) VALUES ($1, $2, $3, $4) RETURNING *", 
        [newEmprestimo.idaluno, newEmprestimo.idlivro, newEmprestimo.dataemprestimo, newEmprestimo.datadevolucao], (err, res) => {
        if (err) {
            console.error("Error:", err);
            result(err, null);
            return;
        }
        console.log("Created emprestimo:", { id: res.insertId, ...newLivro });
        result(null, { id: res.insertId, ...newLivro });
    });
};

Emprestimo.findById = (id, result) => {
    console.log("findById id =", id);
    pool.query("SELECT * FROM emprestimo WHERE id = $1", [id], (err, res) => {
        if (err) {
            console.error("Error:", err);
            result(err, null);
            return;
        }
        if (res.rows.length) {
            console.log("Emprestimo encontrado:", res.rows[0]);
            result(null, res.rows[0]);
            return;
        }
        console.log("Emprestimo não encontrado:", res);
        result({ kind: "not_found" }, null);
    });
};

Emprestimo.getAll = (result) => {
    pool.query("SELECT * FROM emprestimo", (err, res) => {
        if (err) {
            console.error("Error:", err);
            result(null, err);
            return;
        }
        console.log("Empréstimos:", res.rows);
        result(null, res.rows);
    });
};

Emprestimo.updateById = (id, livro, result) => {
    pool.query("UPDATE emprestimo SET idaluno = $1, idlivro = $2, dataemprestimo = $3, datadevolucao = $4 WHERE id = $5 RETURNING *", 
        [emprestimo.idaluno, emprestimo.idlivro, emprestimo.dataemprestimo, emprestimo.datadevolucao, id], (err, res) => {
        if (err) {
            console.error("Error:", err);
            result(null, err);
            return;
        }
        if (res.rowCount === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Updated emprestimo:", { id, ...livro });
        result(null, { id, ...livro });
    });
};

Emprestimo.remove = (id, result) => {
    pool.query("DELETE FROM emprestimo WHERE id = $1", [id], (err, res) => {
        if (err) {
            console.error("Error:", err);
            result(null, err);
            return;
        }
        if (res.rowCount === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Deleted emprestimo with id:", id);
        result(null, res);
    });
};

Emprestimo.removeAll = (result) => {
    pool.query("DELETE FROM emprestimo", (err, res) => {
        if (err) {
            console.error("Error:", err);
            result(null, err);
            return;
        }
        console.log(`Deleted ${res.rowCount} emprestimo`);
        result(null, res);
    });
};

module.exports = Emprestimo;