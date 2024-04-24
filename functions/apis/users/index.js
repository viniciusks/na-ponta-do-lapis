const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

// Variáveis utilitárias
const db = admin.firestore();
const logger = functions.logger;
const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.get('/', async (req, res) => {
  logger.info('Iniciando função de usuários.');

  let users = [];

  await db
    .collection('users')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        users.push(doc.data());
      });
    });

  res.status(200).json({
    message: 'Usuários selecionados com sucesso!',
    data: users,
  });
});

app.get('/:uid', (req, res) => {
  let uid = req.params.uid;

  logger.info(`Iniciando busca por usuário com uid ${uid}`);

  db.collection('users')
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let msg = `User founded with uid ${uid}`;
        logger.info(msg);
        res.status(200).json({
          message: msg,
          data: doc.data(),
        });
      } else {
        let msg = `User NOT founded with uid ${uid}`;
        logger.error(msg);
        res.status(404).json({
          message: msg,
          data: [],
        });
      }
    });
});

// TODO: Ajustar rota de CRIAÇÃO
app.post('/', async (req, res) => {
  logger.info('Iniciando criação de usuário');

  const {
    uid,
    name,
    birthday,
    email,
    country,
    state,
    city,
    roles,
    action,
    artisticFormation,
    professionalArt,
    englishLevel,
    spanishLevel,
    spiritCenter,
    otherLanguages,
    whatsapp,
    isWorker,
    isPlayer,
    isTheater,
    isLiterature,
    isDancer,
    isEFASCoordinator,
    isCONCAFRASCoordinator,
    isVisualArt,
    isActive,
    instruments,
    image,
  } = req.body;

  logger.info('Inserindo usuário no firestore');

  await db
    .collection('users')
    .doc(uid)
    .set({
      name,
      birthday,
      email,
      country,
      state,
      city,
      roles,
      action,
      artisticFormation,
      professionalArt,
      englishLevel,
      spanishLevel,
      spiritCenter,
      otherLanguages,
      whatsapp,
      isWorker,
      isPlayer,
      isTheater,
      isLiterature,
      isDancer,
      isEFASCoordinator,
      isCONCAFRASCoordinator,
      isVisualArt,
      isActive,
      instruments,
      image,
    })
    .then(() => {
      logger.info(`Usuário inserido com id ${uid}`);
      res
        .status(201)
        .json({ message: `Usuário inserido com id ${uid}`, data: [] });
    });
});

// TODO: Ajustar rota de UPDATE
app.put('/:id', async (req, res) => {
  logger.info('Iniciando atualização de usuário');
  let id = req.params.id;
  const {
    name,
    birthday,
    email,
    country,
    state,
    city,
    roles,
    action,
    artisticFormation,
    professionalArt,
    englishLevel,
    spanishLevel,
    spiritCenter,
    otherLanguages,
    whatsapp,
    isWorker,
    isPlayer,
    isTheater,
    isLiterature,
    isDancer,
    isEFASCoordinator,
    isCONCAFRASCoordinator,
    isVisualArt,
    isActive,
    instruments,
    image,
  } = req.body;

  await db
    .collection('users')
    .doc(id)
    .set({
      name,
      birthday,
      email,
      country,
      state,
      city,
      roles,
      action,
      artisticFormation,
      professionalArt,
      englishLevel,
      spanishLevel,
      spiritCenter,
      otherLanguages,
      whatsapp,
      isWorker,
      isPlayer,
      isTheater,
      isLiterature,
      isDancer,
      isEFASCoordinator,
      isCONCAFRASCoordinator,
      isVisualArt,
      isActive,
      instruments,
      image,
    })
    .then(() => {
      let msg = `Usuário de id ${id} atualizado com sucesso!`;
      logger.info(msg);
      res.status(200).json({
        message: msg,
        data: [],
      });
    })
    .catch((error) => {
      logger.error(error);
      res.status(400).json({
        message: error,
        data: [],
      });
    });
});

app.delete('/:id', async (req, res) => {
  let id = req.params.id;

  await db
    .collection('users')
    .doc(id)
    .delete()
    .then(() => {
      let msg = `Usuário de id ${id} deletado com sucesso!`;
      logger.info(msg);
      res.status(200).json({
        message: msg,
        data: [],
      });
    })
    .catch((error) => {
      logger.error(error);
      res.status(400).json({
        message: error,
        data: [],
      });
    });
});

exports.users = functions.https.onRequest(app);
