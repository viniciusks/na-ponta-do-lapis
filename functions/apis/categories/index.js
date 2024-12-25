const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

// Variáveis utilitárias
const db = admin.firestore();
const logger = functions.logger;
const app = express();
const { v4: uuidv4 } = require('uuid');

// Permitir automaticamente solicitações de cross-origin
app.use(cors({ origin: true }));

app.get('/', async (req, res) => {
  logger.info('Iniciando função de categorias.');

  let categories = [];

  await db
    .collection('categories')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        let category = {
          name: doc.data().name,
          description: doc.data().description,
          uid: doc.id,
        };
        categories.push(category);
      });
    });

  res
    .status(200)
    .json({ message: 'Categorias encontradas com sucesso', data: categories });
});

app.get('/:uid', (req, res) => {
  let uid = req.params.uid;

  logger.info(`Iniciando busca por categoria com uid ${uid}`);

  db.collection('categories')
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let message = `Categoria encontrada com uid ${uid}`;
        logger.info(message);
        let category = {
          name: doc.data().name,
          description: doc.data().description,
          uid: doc.id,
        };
        res.status(200).json({ message, data: category });
      } else {
        let message = `Categoria não encontrada com uid ${uid}`;
        logger.error(message);
        res.status(404).json({ message });
      }
    })
    .catch((err) => {
      let message = `Erro ao buscar categoria com uid ${uid}`;
      logger.error(message);
      res.status(500).json({ message });
    });
});

app.post('/', async (req, res) => {
  let uid = uuidv4();
  let category = {
    name: req.body.name,
    description: req.body.description,
  };

  logger.info('Iniciando criação de categoria');

  await db
    .collection('categories')
    .doc(uid)
    .set(category)
    .then(() => {
      let message = `Categoria criada com uid ${uid}`;
      logger.info(message);
      res.status(201).json({ message });
    })
    .catch((err) => {
      let message = 'Erro ao criar categoria';
      logger.error(message);
      res.status(500).json({ message });
    });
});

app.put('/:uid', async (req, res) => {
  let uid = req.params.uid;
  let category = {
    name: req.body.name,
    description: req.body.description,
  };

  logger.info(`Iniciando atualização de categoria com uid ${uid}`);

  await db
    .collection('categories')
    .doc(uid)
    .update(category)
    .then(() => {
      let message = `Categoria atualizada com uid ${uid}`;
      logger.info(message);
      res.status(200).json({ message });
    })
    .catch((err) => {
      let message = `Erro ao atualizar categoria com uid ${uid}`;
      logger.error(message);
      res.status(500).json({ message });
    });
});

app.delete('/:uid', async (req, res) => {
  let uid = req.params.uid;

  logger.info(`Iniciando exclusão de categoria com uid ${uid}`);

  await db
    .collection('categories')
    .doc(uid)
    .delete()
    .then(() => {
      let message = `Categoria excluída com uid ${uid}`;
      logger.info(message);
      res.status(200).json({ message });
    })
    .catch((err) => {
      let message = `Erro ao excluir categoria com uid ${uid}`;
      logger.error(message);
      res.status(500).json({ message });
    });
});

exports.categories = functions.https.onRequest(app);
