const Livro = require("../models/livro.model");

// Create and Save a new Aluno
exports.create = (req, res) => {
    // Validate request
    if (!req.body || !req.body.nomelivro) {
        return res.status(400).send({ message: "Content can not be empty!" });
    }

    // Create a Livro
    const livro = new Livro({ nomelivro: req.body.nomelivro });

    // Save Livro in the database
    Livro.create(livro, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the Livro."
            });
        }
        res.send(data);
    });
};

// Retrieve all Livros from the database (with condition).
exports.findAll = (req, res) => {
    const nome = req.query.nome;

    Livro.getAll(nome, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving Livros."
            });
        }
        res.send(data);
    });
};

// Find a single Livro by Id
exports.findOne = (req, res) => {
    Livro.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({ message: `Livro não encontrado com id ${req.params.id}.` });
            } else {
                return res.status(500).send({ message: `Erro ao buscar Livro com id ${req.params.id}.` });
            }
        }
        res.send(data);
    });
};

// Update a Livro identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body || !req.body.nomelivro) {
        return res.status(400).send({ message: "Content can not be empty!" });
    }

    console.log(req.body);

    Livro.updateById(req.params.id, new Livro(req.body), (err, data) => {
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
    Livro.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({ message: `Not found Livro with id ${req.params.id}.` });
            } else {
                return res.status(500).send({ message: `Could not delete Livro with id ${req.params.id}.` });
            }
        }
        res.send({ message: "Livro was deleted successfully!" });
    });
};

// Delete all Livros from the database.
exports.deleteAll = (req, res) => {
    Livro.removeAll((err, data) => {
        if (err) {
            return res.status(500).send({ message: err.message || "Some error occurred while removing all Livros." });
        }
        res.send({ message: "All Livros were deleted successfully!" });
    });
};