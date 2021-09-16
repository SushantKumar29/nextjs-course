// /api/new-meetup

import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://<username>:<password>@cluster0.jc8ib.mongodb.net/meetups?retryWrites=true&w=majority'
    );

    const db = client.db();
    const meetupCollection = await db.collection('meetups');

    const result = await meetupCollection.insertOne(data);
    console.log(result);

    client.close();

    res.status(200).json({ message: 'Meetup Added' });
  }
}

export default handler;
