module.exports = app => {
    const livros = require("../controllers/livro.controller");
    var router = require("express").Router();
    // Create a new livros
    router.post("/", livros.create);
    // Retrieve all livros
    router.get("/", livros.findAll);
    // Retrieve a single livros with id
    router.get("/:id", livros.findOne);
    // Update a livros with id
    router.put("/:id", livros.update);
    // Delete a livros with id
    router.delete("/:id", livros.delete);
    // Delete all livros
    router.delete("/", livros.deleteAll);
    app.use('/api/livros', router);
   };