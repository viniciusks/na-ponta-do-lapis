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
  logger.info('Iniciando função de usuários.');

  let users = [];

  await db
    .collection('users')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        let user = {
          uid: doc.id,
          name: doc.data().name,
          cpf: doc.data().cpf,
          email: doc.data().email,
          birthdate: doc.data().birthdate,
          city: doc.data().city,
          state: doc.data().state,
          country: doc.data().country,
          role: doc.data().role,
          isEnable: doc.data().isEnable,
          createdAt: doc.data().createdAt,
          updatedAt: doc.data().updatedAt,
        };
        users.push(user);
      });
    });

  res.status(200).json(users);
});

app.get('/:uid', (req, res) => {
  let uid = req.params.uid;

  logger.info(`Iniciando busca por usuário com uid ${uid}`);

  db.collection('users')
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let msg = `Usuário encontrado com uid ${uid}`;
        logger.info(msg);
        let user = {
          uid: doc.id,
          name: doc.data().name,
          cpf: doc.data().cpf,
          email: doc.data().email,
          birthdate: doc.data().birthdate,
          city: doc.data().city,
          state: doc.data().state,
          country: doc.data().country,
          role: doc.data().role,
          isEnable: doc.data().isEnable,
          createdAt: doc.data().createdAt,
          updatedAt: doc.data().updatedAt,
        };
        res.status(200).json({
          message: msg,
          data: user,
        });
      } else {
        let msg = `Usuário não encontrado com uid ${uid}`;
        logger.error(msg);
        res.status(404).json({
          message: msg,
          data: [],
        });
      }
    });
});

app.post('/', async (req, res) => {
  logger.info('Iniciando criação de usuário');

  const {
    uid,
    name,
    cpf,
    email,
    birthdate,
    city,
    state,
    country,
    role,
    isEnable,
    createdAt,
    updatedAt,
  } = req.body;

  logger.info('Inserindo usuário no firestore');

  await db
    .collection('users')
    .doc(uid)
    .set({
      name,
      cpf,
      email,
      birthdate,
      city,
      state,
      country,
      role,
      isEnable,
      createdAt,
      updatedAt,
    })
    .then(() => {
      logger.info(`Usuário inserido com id ${uid}`);
      res
        .status(201)
        .json({ message: `Usuário inserido com id ${uid}`, data: [] });
    });
});

app.put('/:uid', async (req, res) => {
  logger.info('Iniciando atualização de usuário');
  let uid = req.params.uid;
  let user = req.body;

  await db
    .collection('users')
    .doc(uid)
    .update(user)
    .then(() => {
      let msg = `Usuário de id ${uid} atualizado com sucesso!`;
      logger.info(msg);
      res.status(200).json({
        message: msg,
        data: user,
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

app.delete('/:uid', async (req, res) => {
  let uid = req.params.uid;

  await db
    .collection('users')
    .doc(uid)
    .delete()
    .then(() => {
      let msg = `Usuário de id ${uid} deletado com sucesso!`;
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
