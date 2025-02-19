const Aluno = require("../models/aluno.model");

// Create and Save a new Aluno
exports.create = (req, res) => {
    // Validate request
    if (!req.body || !req.body.nome) {
        return res.status(400).send({ message: "Content can not be empty!" });
    }

    // Create a Aluno
    const aluno = new Aluno({ nome: req.body.nome });

    // Save Aluno in the database
    Aluno.create(aluno, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the Aluno."
            });
        }
        res.send(data);
    });
};

// Retrieve all Alunos from the database (with condition).
exports.findAll = (req, res) => {
    const nome = req.query.nome;

    Aluno.getAll(nome, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving alunos."
            });
        }
        res.send(data);
    });
};

// Find a single Aluno by Id
exports.findOne = (req, res) => {
    Aluno.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({ message: `Aluno não encontrado com id ${req.params.id}.` });
            } else {
                return res.status(500).send({ message: `Erro ao buscar Aluno com id ${req.params.id}.` });
            }
        }
        res.send(data);
    });
};

// Update a Aluno identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body || !req.body.nome) {
        return res.status(400).send({ message: "Content can not be empty!" });
    }

    console.log(req.body);

    Aluno.updateById(req.params.id, new Aluno(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({ message: `Not found Aluno with id ${req.params.id}.` });
            } else {
                return res.status(500).send({ message: `Error updating Aluno with id ${req.params.id}.` });
            }
        }
        res.send(data);
    });
};

// Delete a Aluno with the specified id in the request
exports.delete = (req, res) => {
    Aluno.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({ message: `Not found Aluno with id ${req.params.id}.` });
            } else {
                return res.status(500).send({ message: `Could not delete Aluno with id ${req.params.id}.` });
            }
        }
        res.send({ message: "Aluno was deleted successfully!" });
    });
};

// Delete all Alunos from the database.
exports.deleteAll = (req, res) => {
    Aluno.removeAll((err, data) => {
        if (err) {
            return res.status(500).send({ message: err.message || "Some error occurred while removing all alunos." });
        }
        res.send({ message: "All Alunos were deleted successfully!" });
    });
};