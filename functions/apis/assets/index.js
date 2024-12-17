const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

// Variáveis utilitárias
const db = admin.firestore();
const logger = functions.logger;
const app = express();

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
          categoryUid: doc.data().categoryUid,
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

  res.status(200).json(assets);
});

app.get('/:uid', (req, res) => {
  let uid = req.params.uid;

  logger.info(`Iniciando busca por ativo com uid ${uid}`);

  db.collection('assets')
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let msg = `Ativo encontrado com uid ${uid}`;
        logger.info(msg);
        let asset = {
          name: doc.data().name,
          description: doc.data().description,
          price: doc.data().price,
          categoryUid: doc.data().categoryUid,
          payday: doc.data().payday,
          assetHistory: doc.data().assetHistory,
          createdAt: doc.data().createdAt,
          updatedAt: doc.data().updatedAt,
          uid: doc.id,
          dividend: doc.data().dividend,
        };
        res.status(200).json(asset);
      } else {
        let msg = `Ativo não encontrado com uid ${uid}`;
        logger.info(msg);
        res.status(404).json({ message: msg });
      }
    })
    .catch((error) => {
      let msg = `Erro ao buscar ativo com uid ${uid}`;
      logger.error(msg);
      res.status(500).json({ message: msg });
    });
});

app.post('/', async (req, res) => {
  let asset = req.body;

  logger.info('Iniciando criação de ativo.');

  await db
    .collection('assets')
    .add(asset)
    .then((docRef) => {
      let msg = `Ativo criado com uid ${docRef.id}`;
      logger.info(msg);
      res.status(201).json({ message: msg });
    })
    .catch((error) => {
      let msg = `Erro ao criar ativo`;
      logger.error(msg);
      res.status(500).json({ message: msg });
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
      let msg = `Ativo atualizado com uid ${uid}`;
      logger.info(msg);
      res.status(200).json({ message: msg });
    })
    .catch((error) => {
      let msg = `Erro ao atualizar ativo com uid ${uid}`;
      logger.error(msg);
      res.status(500).json({ message: msg });
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
      let msg = `Ativo excluído com uid ${uid}`;
      logger.info(msg);
      res.status(200).json({ message: msg });
    })
    .catch((error) => {
      let msg = `Erro ao excluir ativo com uid ${uid}`;
      logger.error(msg);
      res.status(500).json({ message: msg });
    });
});

exports.assets = functions.https.onRequest(app);
