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
      <div className="entryHeader">
        <p className="entryHeaderTop">{hostCountry}</p>
        <div className="entryHeaderTitle">
          <h1>{contestName}</h1>
        </div>
        <p className="entryHeaderBottom">{city}</p>
      </div>
      <div className="statsHeader">
        <h2>Key Stats</h2>
      </div>
      <div className="entryStatsBlock">
        <div className="entryStat">
          <span className="entryStatFigure">{contestEdition}</span>
          <p>Edition / Year</p>
        </div>
        <div className="entryStat">
          <span className="entryStatFigure">{countriesNo}</span>
          <p>Countries</p>
        </div>
        <div className="entryStat">
          <span className="entryStatFigure">{returningCountries}</span>
          <p>Returning Countries</p>
        </div>
      </div>
      <div className="divider"></div>
      <div className="subHeader">
        <h3>Entries</h3>
      </div>
      <div className="altCardListWrapper">
        <div className="cardListHorizontal">
          {songs.map((song) => (
            <SongCard2 key={song.sys.id} song={song} showCountry />
          ))}
        </div>
      </div>
    </div>
  );
}
