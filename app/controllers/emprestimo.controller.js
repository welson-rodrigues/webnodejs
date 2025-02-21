const Emprestimo = require("../models/emprestimo.model");

// Create and Save a new Emprestimo
exports.create = (req, res) => {
    if (!req.body.idaluno || !req.body.idlivro || !req.body.dataemprestimo) {
        return res.status(400).send({ message: "Dados incompletos!" });
    }

    // Create a Emprestimo
    const emprestimo = new Emprestimo({
        idaluno: req.body.idaluno,
        idlivro: req.body.idlivro,
        dataemprestimo: req.body.dataemprestimo,
        datadevolucao: req.body.datadevolucao || null,
    });

    // Save Emprestimo in the database
    Emprestimo.create(emprestimo, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the Livro."
            });
        }
        res.send(data);
    });
};

// Retrieve all Emprestimo from the database (with condition).
exports.findAll = (req, res) => {
    pool.query("SELECT * FROM emprestimos", (err, result) => {
        if (err) {
            res.status(500).send({ message: "Erro ao buscar empréstimos." });
            return;
        }
        res.send(result.rows);
    });
};

// Find a single Livro by Id
exports.findOne = (req, res) => {
    Emprestimo.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({ message: `Emprestimo não encontrado com id ${req.params.id}.` });
            } else {
                return res.status(500).send({ message: `Erro ao buscar Emprestimo com id ${req.params.id}.` });
            }
        }
        res.send(data);
    });
};

// Update a Livro identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({ message: "Content can not be empty!" });
    }

    console.log(req.body);

    Emprestimo.updateById(req.params.id, new Livro(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({ message: `Not found Livro with id ${req.params.id}.` });
            } else {
                return res.status(500).send({ message: `Error updating Livro with id ${req.params.id}.` });
            }
        }
        res.send(data);
    });
};

// Delete a Livro with the specified id in the request
exports.delete = (req, res) => {
    Emprestimo.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({ message: `Not found Emprestimo with id ${req.params.id}.` });
            } else {
                return res.status(500).send({ message: `Could not delete Emprestimo with id ${req.params.id}.` });
            }
        }
        res.send({ message: "Emprestimo was deleted successfully!" });
    });
};

// Delete all Emprestimos from the database.
exports.deleteAll = (req, res) => {
    Emprestimo.removeAll((err, data) => {
        if (err) {
            return res.status(500).send({ message: err.message || "Some error occurred while removing all Emprestimo." });
        }
        res.send({ message: "All Emprestimo were deleted successfully!" });
    });
};