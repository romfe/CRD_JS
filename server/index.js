const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'S3curePassw0rd123!!',
  database: 'romuloevangelista'
});

app.post('/create', (req, res) => {
  const nome = req.body.nome
  const rg = req.body.rg
  const cpf = req.body.cpf
  const nascimento = req.body.nascimento
  const admissao = req.body.admissao
  const funcao = req.body.funcao
  db.query('INSERT INTO pessoas (nome, rg, cpf, data_nascimento, data_admissao, funcao) VALUES (?,?,?,?,?,?)',
    [nome, rg, cpf, nascimento, admissao, funcao],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Inserção efetuada com sucesso");
      }
    });
});
app.listen(3001, () => {
  console.log("O servidor está ativo na porta 3001");
});

app.get('/pessoas', (req, res) => {
  db.query("SELECT * FROM pessoas", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id
  db.query("DELETE FROM pessoas WHERE id_pessoa = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })

})