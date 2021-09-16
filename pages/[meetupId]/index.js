import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
  const { meetupData } = props;
  return (
    <MeetupDetail
      image={meetupData.image}
      title={meetupData.title}
      address={meetupData.address}
      description={meetupData.description}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://<username>:<password>@cluster0.jc8ib.mongodb.net/meetups?retryWrites=true&w=majority'
  );

  const db = client.db();
  const meetupCollection = await db.collection('meetups');

  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for single meetup

  const { meetupId } = context.params;

  const client = await MongoClient.connect(
    'mongodb+srv://<username>:<password>@cluster0.jc8ib.mongodb.net/meetups?retryWrites=true&w=majority'
  );

  const db = client.db();
  const meetupCollection = await db.collection('meetups');

  const meetup = await meetupCollection.findOne({ _id: ObjectId(meetupId) });

  client.close();

  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        image: meetup.image,
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
}

export default MeetupDetails;
