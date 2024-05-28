import {app, port} from './config.js';


app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await auth.createUser({
            email,
            password,
        });
        await auth.setCustomUserClaims(user.uid, { role: 'admin' });

        res.status(200).send('User created successfully.');
    } catch (error) {
        console.error("Error creating user: ", error);
        res.status(500).send('Error creating user.');
    }
});

app.get('/usuarios', async (req, res) => {
        try {
            const usuariosRef = db.collection('USUARIOS');
            const snapshot = await usuariosRef.get();
    
            if (snapshot.empty) {
                res.status(404).send('No documents found.');
                return;
            }
    
            const usuarios = [];
            snapshot.forEach(doc => {
                usuarios.push({ id: doc.id, ...doc.data() });
            });
    
            res.status(200).json(usuarios);
        } catch (error) {
            console.error("Error listing documents: ", error);
            res.status(500).send('Error listing documents.');
        }
    }
);

app.get('/usuarios/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const doc = await db.collection('USUARIOS').doc(id).get();

        if (!doc.exists) {
            res.status(404).send('No document found.');
            return;
        }

        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        console.error("Error getting document: ", error);
        res.status(500).send('Error getting document.');
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});