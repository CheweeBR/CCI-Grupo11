const MongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb+srv://admin:LQNitHuUPDva2PC8@cci-grupo11.syvxc1a.mongodb.net/?retryWrites=true&w=majority';

class User {
    constructor(data) {
        this.username = data.username;
        this.password = data.password;
    }

    async save() {
        const client = new MongoClient(mongoURL);

        try {
            await client.connect();

            const database = client.db('CCI-Grupo11');
            const collection = database.collection('Usuarios');

            await collection.insertOne(this);

        } finally {
            await client.close();
        }
    }

    static async find(username) {
        const client = new MongoClient(mongoURL);

        try {
            await client.connect();

            const database = client.db('CCI-Grupo11');
            const collection = database.collection('Usuarios');

            const users = await collection.findOne({ username: username });

            return users;
        } catch (error) {
            console.error('Erro ao obter usuários:', error);
            throw error;
        } finally {
            await client.close();
        }
    }


}

module.exports = User;