const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
/* CORS (Cross-Origin Resource Sharing) = mecanismo que permite ou
restringe recursos
em um servidor web a serem solicitados de outro domínio fora do
domínio do
qual o recurso se originou. Isso é essencial para fins de segurança,
garantindo que apenas domínios autorizados possam acessar certos
recursos.
*/
const cors = require("cors");
const app = express();
var corsOptions = {
 origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /*
bodyParser.urlencoded() is deprecated */
// simple route
app.get("/", (req, res) => {
 res.json({ message: "Bem-vindo ao Tutorial de Webservices em Node.Js." });
});
require("./app/routes/aluno.routes.js")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
 console.log(`Server rodando na porta ${PORT}.`);
});