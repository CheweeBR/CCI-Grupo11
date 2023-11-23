const MongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb+srv://admin:LQNitHuUPDva2PC8@cci-grupo11.syvxc1a.mongodb.net/?retryWrites=true&w=majority';

class Menina {
  constructor(data) {
    this.nome = data.nome;
    this.idade = data.idade;
    this.logradouro = data.logradouro;
    this.numero = data.numero;
    this.bairro = data.bairro;
    this.cidade = data.cidade;
    this.estado = data.estado;
    this.renda = data.renda;
  }

  async save() {
    const client = new MongoClient(mongoURL);

    try {
      await client.connect();

      const database = client.db('CCI-Grupo11');
      const collection = database.collection('Meninas');

      await collection.insertOne(this);

    } finally {
      await client.close();
    }
  }
}

module.exports = Menina;