const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb://localhost:27017/';
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    await findUpdatedCityByName(client, 'world', 'city', 'Burdur');
    await findUpdatedCityByCountryCode(client, 'world', 'city', 'TUR');
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function findUpdatedCityByName(client, db, collection, updatedCity) {
  const cityFound = await client
    .db(db)
    .collection(collection)
    .findOne({ Name: updatedCity });
  if (cityFound) {
    console.log(`${updatedCity} is found`);
    console.log(cityFound);
  } else {
    console.error(`No record with named ${updatedCity} in database`);
  }
}

async function findUpdatedCityByCountryCode(
  client,
  db,
  collection,
  countryCode,
) {
  const result = await client
    .db(db)
    .collection(collection)
    .findOne({ CountryCode: countryCode });
  if (result) {
    console.log(result);
  } else {
    console.error(`No countryCode record with ${countryCode} in database`);
  }
}
