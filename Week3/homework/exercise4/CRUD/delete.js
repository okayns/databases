const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb://localhost:27017/';
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  try {
    await client.connect();
    await deleteCity(client, 'world', 'city', 'Burdur');
  } catch (err) { 
    console.error(err);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function deleteCity(client, db, collection, cityToDelete) {
  const city = await client
    .db(db)
    .collection(collection)
    .findOne({ Name: cityToDelete });
  if (city) {
    await client.db(db).collection(collection).drop({ Name: cityToDelete });
    console.log(`${cityToDelete} is deleted from ${collection} collection `);
  } else {
    console.log(`${cityToDeleteF} could not found in database`);
  }
}
