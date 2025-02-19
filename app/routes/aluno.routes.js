module.exports = app => {
    const alunos = require("../controllers/aluno.controller");
    var router = require("express").Router();
    // Create a new Aluno
    router.post("/", alunos.create);
    // Retrieve all Alunos
    router.get("/", alunos.findAll);
    // Retrieve a single Aluno with id
    router.get("/:id", alunos.findOne);
    // Update a Aluno with id
    router.put("/:id", alunos.update);
    // Delete a Aluno with id
    router.delete("/:id", alunos.delete);
    // Delete all Alunos
    router.delete("/", alunos.deleteAll);
    app.use('/api/alunos', router);
   };