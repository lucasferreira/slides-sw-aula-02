const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

const DB = __dirname + "/../../data/usuarios.json";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.listen(9090, function() {
  console.log("Servidor Web rodando na porta 9090");
});

// obtem um usuário específico por seu ID na url ?id=XXXXX
// OU lista todos caso nenhum id seja informado
app.get("/api", function(req, res) {
  fs.readFile(DB, "utf8", function(err, data) {
    if (err) {
      const response = { status: "error", results: err };
      return res.json(response);
    }

    const { usuarios } = JSON.parse(data);

    if (!!req.query.id) {
      const usuario = usuarios.find(usuario => !!usuario && +usuario.id === +req.query.id);
      const response = { status: "success", results: !!usuario ? usuario : "Nenhum usuário foi encontrado" };
      return res.json(response);
    }

    const response = { status: "success", results: usuarios };
    res.json(response);
  });
});

// cadastra um novo usuário na base
app.post("/api", function(req, res) {
  fs.readFile(DB, "utf8", function(err, data) {
    if (err) {
      const response = { status: "error", results: err };
      return res.json(response);
    }

    const { usuarios } = JSON.parse(data);
    const nextId = usuarios.reduce((acc, usuario) => Math.max(+usuario.id, acc), 0) + 1;

    const novoUsuario = { ...req.body, id: nextId };
    usuarios.push(novoUsuario);

    fs.writeFile(DB, JSON.stringify({ usuarios }), function(err) {
      if (err) {
        const response = { status: "error", results: err };
        return res.json(response);
      }

      const response = { status: "success", results: novoUsuario };
      res.json(response);
    });
  });
});

// edita um usuário com base em seu ID
app.put("/api", function(req, res) {
  fs.readFile(DB, "utf8", function(err, data) {
    if (err) {
      const response = { status: "error", results: err };
      return res.json(response);
    }

    if (!req.body.id) {
      const response = { status: "error", results: "Por favor informe um ID válido para edição" };
      return res.json(response);
    }

    const { usuarios } = JSON.parse(data);

    const usuario = usuarios.find(usuario => !!usuario && +usuario.id === +req.body.id);
    if (!usuario) {
      const response = { status: "error", results: `Usuário #${req.body.id} não encontrado` };
      return res.json(response);
    }

    const usuarioAtualizado = { ...usuario, nome: req.body.nome, email: req.body.email };

    fs.writeFile(
      DB,
      JSON.stringify({
        usuarios: usuarios.map(usuario => {
          if (!!usuario && +usuario.id === +req.body.id) {
            return usuarioAtualizado;
          }

          return usuario;
        }),
      }),
      function(err) {
        if (err) {
          const response = { status: "error", results: err };
          return res.json(response);
        }

        const response = { status: "success", results: usuarioAtualizado };
        res.json(response);
      }
    );
  });
});

// deleta um usuário com base em seu ID
app.delete("/api", function(req, res) {
  fs.readFile(DB, "utf8", function(err, data) {
    if (err) {
      const response = { status: "error", results: err };
      return res.json(response);
    }

    if (!req.query.id) {
      const response = { status: "error", results: "Por favor informe um ID válido para edição" };
      return res.json(response);
    }

    const { usuarios } = JSON.parse(data);

    const usuario = usuarios.find(usuario => !!usuario && +usuario.id === +req.query.id);
    if (!usuario) {
      const response = { status: "error", results: `Usuário #${req.query.id} não encontrado` };
      return res.json(response);
    }

    const usuariosQueNaoSejam = usuarios.filter(usuario => !!usuario && +usuario.id !== +req.query.id);

    fs.writeFile(DB, JSON.stringify({ usuarios: usuariosQueNaoSejam }), function(err) {
      if (err) {
        const response = { status: "error", results: err };
        return res.json(response);
      }

      const response = { status: "success", results: { deleted: usuario } };
      res.json(response);
    });
  });
});
