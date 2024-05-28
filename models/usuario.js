// path: models/usuario.js

// user es una instancia de la coleccion USUARIOS
// un user es un objeto que tiene
// uid, displayName, email, photoURL

import { db } from '../config.js';

class Usuario {
    constructor(user) {
        this.uid = user.uid;
        this.displayName = user.displayName || '';
        this.email = user.email;
        this.photoURL = user.photoURL || '';
    }

    // M'etodo para obtener la informacion de un usuario por uid
    static async get(uid) {
        console.log('uid', uid);
        try {
            const doc = await db.collection('USUARIOS').doc(uid).get();
            if (!doc.exists) {
                return null;
            }
            return new Usuario(doc.data());
        } catch (error) {
            console.error("Error getting document: ", error);
            throw error;
        }
    }

    // M'etodo para obtener todos los usuarios
    static async getAll() {
        try {
            const usuariosRef = db.collection('USUARIOS');
            const snapshot = await usuariosRef.get();

            if (snapshot.empty) {
                return [];
            }

            const usuarios = [];
            snapshot.forEach(doc => {
                usuarios.push(new Usuario({
                    uid: doc.id,
                    ...doc.data(),
                }));
            });

            return usuarios;
        } catch (error) {
            console.error("Error listing documents: ", error);
            throw error;
        }
    }

    // M'etodo para guardar un usuario
    async save() {
        try {
            await db.collection('USUARIOS').doc(this.uid).set({
                displayName: this.displayName,
                email: this.email,
                photoURL: this.photoURL,
            });
        } catch (error) {
            console.error("Error saving document: ", error);
            throw error;
        }
    }

    // M'etodo para actualizar un usuario
    async update() {
        try {
            await db.collection('USUARIOS').doc(this.uid).update({
                displayName: this.displayName,
                email: this.email,
                photoURL: this.photoURL,
            });
        } catch (error) {
            console.error("Error updating document: ", error);
            throw error;
        }
    }

    // M'etodo para eliminar un usuario
    async delete() {
        try {
            await db.collection('USUARIOS').doc(this.uid).delete();
        } catch (error) {
            console.error("Error deleting document: ", error);
            throw error;
        }
    }
}

export default Usuario;