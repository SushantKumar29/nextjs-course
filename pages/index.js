import React from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';
// const MEETUPS = [
//   {
//     id: 1,
//     title: 'First Meetup',
//     image: 'https://picsum.photos/400',
//     address: 'First location, First city',
//     description: 'First Meetup',
//   },
//   {
//     id: 2,
//     title: 'Second Meetup',
//     image: 'https://picsum.photos/400',
//     address: 'Second location, Second city',
//     description: 'Second Meetup',
//   },
// ];

function HomePage(props) {
  return (
    <React.Fragment>
      <Head>
        <title>React Meetups</title>
      </Head>
      <MeetupList meetups={props.meetups} />;
    </React.Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const request = context.req;
//   const response = context.res;
//   // fetch data from API
//   return {
//     props: {
//       meetups: MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // fetch data from API

  const client = await MongoClient.connect(
    'mongodb+srv://,username>:<password>@cluster0.jc8ib.mongodb.net/meetups?retryWrites=true&w=majority'
  );

  const db = client.db();
  const meetupCollection = await db.collection('meetups');

  const meetups = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup.id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
