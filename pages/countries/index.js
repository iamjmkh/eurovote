import React from 'react';
import { createClient } from 'contentful';
import CountryCard from '../../components/CountryCard';
import Head from 'next/head';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: 'country' });
  const countries = res.items
    .sort((a, b) => a.fields.countryName.localeCompare(b.fields.countryName))
    .sort((b, a) => a.fields.numberOfWins.localeCompare(b.fields.numberOfWins));
  return {
    props: {
      countries,
    },
  };
}

export default function Countries({ countries }) {
  console.log(countries);
  return (
    <div className="cardListWrapper">
      <Head>
        <title>Countries | Eurovote</title>
      </Head>
      <div className="cardList">
        {countries.map((country) => (
          <CountryCard key={country.sys.id} country={country} />
        ))}
      </div>
    </div>
  );
}
