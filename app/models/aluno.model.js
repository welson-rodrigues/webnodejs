const pool = require("./db");

// Constructor
const Aluno = function (aluno) {
    this.idaluno = aluno.idaluno;
    this.nome = aluno.nome;
};

Aluno.create = (newAluno, result) => {
    pool.query("INSERT INTO aluno (nome) VALUES ($1)", [newAluno.nome], (err, res) => {
        if (err) {
            console.error("Error:", err);
            result(err, null);
            return;
        }
        console.log("Created aluno:", { id: res.insertId, ...newAluno });
        result(null, { id: res.insertId, ...newAluno });
    });
};

Aluno.findById = (id, result) => {
    console.log("findById id =", id);
    pool.query("SELECT * FROM aluno WHERE idaluno = $1", [id], (err, res) => {
        if (err) {
            console.error("Error:", err);
            result(err, null);
            return;
        }
        if (res.rows.length) {
            console.log("Aluno encontrado:", res.rows[0]);
            result(null, res.rows[0]);
            return;
        }
        console.log("Aluno não encontrado:", res);
        result({ kind: "not_found" }, null);
    });
};

Aluno.getAll = (nome, result) => {
    let query = "SELECT * FROM aluno";
    if (nome) {
        query += " WHERE nome LIKE $1";
    }
    pool.query(query, nome ? [`%${nome}%`] : [], (err, res) => {
        if (err) {
            console.error("Error:", err);
            result(null, err);
            return;
        }
        console.log("Alunos:", res.rows);
        result(null, res.rows);
    });
};

Aluno.updateById = (id, aluno, result) => {
    pool.query("UPDATE aluno SET nome = $1 WHERE idaluno = $2", [aluno.nome, id], (err, res) => {
        if (err) {
            console.error("Error:", err);
            result(null, err);
            return;
        }
        if (res.rowCount === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Updated aluno:", { id, ...aluno });
        result(null, { id, ...aluno });
    });
};

Aluno.remove = (id, result) => {
    pool.query("DELETE FROM aluno WHERE idaluno = $1", [id], (err, res) => {
        if (err) {
            console.error("Error:", err);
            result(null, err);
            return;
        }
        if (res.rowCount === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Deleted aluno with idaluno:", id);
        result(null, res);
    });
};

Aluno.removeAll = (result) => {
    pool.query("DELETE FROM aluno", (err, res) => {
        if (err) {
            console.error("Error:", err);
            result(null, err);
            return;
        }
        console.log(`Deleted ${res.rowCount} alunos`);
        result(null, res);
    });
};

module.exports = Aluno;