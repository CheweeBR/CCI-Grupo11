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

    static async find() {
        const client = new MongoClient(mongoURL);

        try {
            await client.connect();

            const database = client.db('CCI-Grupo11');
            const collection = database.collection('Meninas');

            const meninas = await collection.find().sort({ renda: 1 }).limit(20).toArray();

            return meninas;
        } catch (error) {
            console.error('Erro ao obter meninas:', error);
            throw error;
        } finally {
            await client.close();
        }
    }


}

module.exports = User;