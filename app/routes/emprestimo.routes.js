module.exports = app => {
    const emprestimos = require("../controllers/emprestimo.controller");
    var router = require("express").Router();
    // Create a new emprestimo
    router.post("/", emprestimos.create);
    // Retrieve all emprestimo
    router.get("/", emprestimos.findAll);
    // Retrieve a single emprestimo with id
    router.get("/:id", emprestimos.findOne);
    // Update a emprestimo with id
    router.put("/:id", emprestimos.update);
    // Delete a emprestimo with id
    router.delete("/:id", emprestimos.delete);
    // Delete all emprestimo
    router.delete("/", emprestimos.deleteAll);
    app.use('/api/emprestimos', router);
   };