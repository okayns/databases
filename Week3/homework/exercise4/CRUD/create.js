const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb://localhost:27017/';
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    await createNewCity(client, {
      Name: 'Burdur',
      CountryCode: 'TUR',
      District: 11,
      Population: 258868,
    });
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function createNewCity(client, newCity) {
  const result = await client.db('world').collection('city').insertOne(newCity);
  console.log(result.ops[0].Name + ' is added with ID ' + result.insertedId);
}
