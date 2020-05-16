const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb://localhost:27017/';
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    await updateCity(client, 'world', 'city', 'Burdur', {
      Population: 1200,
    });
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function updateCity(client, db, collection, cityToUpdate, fieldToUpdate) {
  const city = await client
    .db(db)
    .collection(collection)
    .findOne({ Name: cityToUpdate });
  if (city) {
    await client
      .db(db)
      .collection(collection)
      .updateOne({ Name: cityToUpdate }, { $set: fieldToUpdate });
    console.log(
      `${cityToUpdate}'s population is updated to ${fieldToUpdate.Population}`,
    );
  } else {
    console.log(`${cityToUpdate} could not found in database`);
  }
}
