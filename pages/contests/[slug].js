import React from 'react';
import { createClient } from 'contentful';
import SongCard2 from '../../components/SongCard2';
import Head from 'next/head';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'contest',
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.contestSlug },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: 'contest',
    'fields.contestSlug': params.slug,
  });

  const res = await client.getEntries({ content_type: 'song', 'fields.songYear': items[0].fields.contestYear });
  const songs = res.items.sort((a, b) => a.fields.songOrder - b.fields.songOrder);

  return {
    props: { contest: items[0], songs },
  };
}

export default function ContestDetails({ contest, songs }) {
  const { contestName, city, hostCountry, countriesNo, returningCountries, contestEdition } = contest.fields;
  return (
    <div className="entryPage">
      <Head>
        <title>{contestName} | Eurovote</title>
      </Head>

      <div className="pageTitle">
        <h1>{contestName}</h1>
      </div>

      <div className="songStats">
        <div className="songStatsTitle">
          <h3>Key Stats</h3>
        </div>
        <div className="songStatsBreakdownContainer">
          <div className="songStatsBreakdown">
            <div className="songStatsBreakdownThird">
              <p>
                <span className="largeStats">{countriesNo}</span>
              </p>
              <p className="statsAnnotation"># of Countries</p>
            </div>
            <div className="songStatsBreakdownThird">
              <p>
                <span className="largeStats">{contestEdition}</span>
              </p>
              <p className="statsAnnotation">Edition / Year</p>
            </div>
            <div className="songStatsBreakdownThird">
              <p>
                <span className="largeStats">{returningCountries}</span>
              </p>
              <p className="statsAnnotation">Returning Countries</p>
            </div>
          </div>
        </div>
      </div>

      <div className="entryList">
        <div className="entryListTitle">
          <h4>List of Entries</h4>
        </div>
        {songs.map((song) => (
          <SongCard2 key={song.sys.id} song={song} showYear />
        ))}
      </div>
    </div>
  );
}
