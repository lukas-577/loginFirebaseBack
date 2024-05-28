import admin from 'firebase-admin';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';



import { initializeApp } from 'firebase-admin/app';

dotenv.config();

const app = express();

app.use(cors());

const port = process.env.PORT || 3000;

const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY 
  );

initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const auth = admin.auth();

app.use(express.json());

export { port, app, db, auth };