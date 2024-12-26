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
  logger.info('Iniciando função de ativos.');

  let assets = [];

  await db
    .collection('assets')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        let asset = {
          name: doc.data().name,
          description: doc.data().description,
          price: doc.data().price,
          category: doc.data().category,
          payday: doc.data().payday,
          assetHistory: doc.data().assetHistory,
          createdAt: doc.data().createdAt,
          updatedAt: doc.data().updatedAt,
          uid: doc.id,
          dividend: doc.data().dividend,
        };
        assets.push(asset);
      });
    });

  res
    .status(200)
    .json({ message: 'Ativos encontrados com sucesso', data: assets });
});

app.get('/:uid', (req, res) => {
  let uid = req.params.uid;

  logger.info(`Iniciando busca por ativo com uid ${uid}`);

  db.collection('assets')
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let message = `Ativo encontrado com uid ${uid}`;
        logger.info(message);
        let asset = {
          name: doc.data().name,
          description: doc.data().description,
          price: doc.data().price,
          category: doc.data().category,
          payday: doc.data().payday,
          assetHistory: doc.data().assetHistory,
          createdAt: doc.data().createdAt,
          updatedAt: doc.data().updatedAt,
          uid: doc.id,
          dividend: doc.data().dividend,
        };
        res.status(200).json({ message: message, data: asset });
      } else {
        let message = `Ativo não encontrado com uid ${uid}`;
        logger.info(message);
        res.status(404).json({ message: message, data: [] });
      }
    })
    .catch((error) => {
      let message = `Erro ao buscar ativo com uid ${uid}`;
      logger.error(message);
      res.status(500).json({ message: message, data: [] });
    });
});

app.post('/', async (req, res) => {
  let uid = uuidv4();
  let {
    name,
    description,
    price,
    category,
    payday,
    assetHistory,
    createdAt,
    updatedAt,
    dividend,
  } = req.body;

  logger.info('Iniciando criação de ativo.');

  await db
    .collection('assets')
    .doc(uid)
    .set({
      name: name,
      description: description,
      price: price,
      category: category,
      payday: payday,
      assetHistory: assetHistory,
      createdAt: createdAt,
      updatedAt: updatedAt,
      dividend: dividend,
    })
    .then((docRef) => {
      let message = `Ativo criado com uid ${uid}`;
      logger.info(message);
      res.status(201).json({ message, data: [] });
    })
    .catch((error) => {
      let message = `Erro ao criar ativo`;
      logger.error(message);
      res.status(500).json({ message, data: [] });
    });
});

app.put('/:uid', async (req, res) => {
  let uid = req.params.uid;
  let asset = req.body;

  logger.info(`Iniciando atualização de ativo com uid ${uid}`);

  await db
    .collection('assets')
    .doc(uid)
    .update(asset)
    .then(() => {
      let message = `Ativo atualizado com uid ${uid}`;
      logger.info(message);
      res.status(200).json({ message: message, data: asset });
    })
    .catch((error) => {
      let message = `Erro ao atualizar ativo com uid ${uid}`;
      logger.error(message);
      res.status(500).json({ message: message, data: [] });
    });
});

app.delete('/:uid', async (req, res) => {
  let uid = req.params.uid;

  logger.info(`Iniciando exclusão de ativo com uid ${uid}`);

  await db
    .collection('assets')
    .doc(uid)
    .delete()
    .then(() => {
      let message = `Ativo excluído com uid ${uid}`;
      logger.info(message);
      res.status(200).json({ message: message, data: [] });
    })
    .catch((error) => {
      let message = `Erro ao excluir ativo com uid ${uid}`;
      logger.error(message);
      res.status(500).json({ message: message, data: [] });
    });
});

exports.assets = functions.https.onRequest(app);
