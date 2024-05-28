import { app, db, port, auth } from './config.js';
import Usuario from './models/usuario.js';

app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await auth.createUser({
            email,
            password,
        });
        await auth.setCustomUserClaims(user.uid, { role: 'admin' });

        const usuario = new Usuario({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
        });

        await usuario.save();

        res.status(201).json('User created successfully.');        
    } catch (error) {
        console.error("Error creating user: ", error);
        res.status(500).send('Error creating user.');
    }
});

app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.getAll();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Error getting users: ", error);
        res.status(500).send('Error getting users.');
    }
});


app.get('/usuarios/:id', async (req, res) => {
    try {
        const usuario = await Usuario.get(req.params.id);
        if (!usuario) {
            return res.status(404).send('User not found.');
        }
        res.status(200).json(usuario);
    } catch (error) {
        console.error("Error getting user: ", error);
        res.status(500).send('Error getting user.');
    }
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});