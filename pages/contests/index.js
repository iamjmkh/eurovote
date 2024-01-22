import React from 'react';
import { createClient } from 'contentful';
import ContestCard from '../../components/ContestCard';
import Head from 'next/head';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: 'contest' });
  const contests = res.items.sort((b, a) => a.fields.contestName.localeCompare(b.fields.contestName));
  return {
    props: {
      contests,
    },
  };
}
export default function Contests({ contests }) {
  return (
    <div className="cardListWrapper">
      <Head>
        <title>Contests | Eurovote</title>
      </Head>
      <div className="cardList">
        {' '}
        {contests.map((contest) => (
          <ContestCard key={contest.sys.id} contest={contest} />
        ))}
      </div>
    </div>
  );
}
