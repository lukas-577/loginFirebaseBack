import express from 'express';
import { initializeApp } from 'firebase-admin/app';

const app = express();

const appFirebase = initializeApp();

initializeApp({
    credential: applicationDefault(),
});



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});