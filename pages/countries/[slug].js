import React from 'react';
import { createClient } from 'contentful';
import Image from 'next/image';
import SongCard2 from '../../components/SongCard2';
import Head from 'next/head';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'country',
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.countrySlug },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: 'country',
    'fields.countrySlug': params.slug,
  });

  const res = await client.getEntries({ content_type: 'song', 'fields.songCountry2': items[0].fields.countryName });
  const songs = res.items

    .sort((a, b) => a.fields.songTitle.localeCompare(b.fields.songTitle))
    .sort((b, a) => a.fields.songYear.localeCompare(b.fields.songYear));

  console.log(params, items);
  return {
    props: { country: items[0], songs },
  };
}

export default function CountryDetails({ country, songs }) {
  const {
    countryName,
    numberOfWins,
    numberOfParticipations,
    countryImage,

    countryImage2,

    countryImage3,

    countryDebutYear,
  } = country.fields;
  return (
    <div className="entryPage">
      <Head>
        <title>{countryName} in Eurovision | Eurovote</title>
      </Head>
      <div className="entryHeader">
        <p className="entryHeaderTop"> </p>
        <div className="entryHeaderTitle">
          <h1>{countryName}</h1>
        </div>
        <p className="entryHeaderBottom"> </p>
      </div>
      <div className="entryDetails">
        <div className="statsHeader">
          <h2>Key Stats</h2>
        </div>

        <div className="entryStatsBlock">
          <div className="entryStat">
            <span className="entryStatFigure">{numberOfParticipations}</span> times
            <p># OF PARTICIPATIONS</p>
          </div>
          <div className="entryStat">
            <span className="entryStatFigure">{numberOfWins}</span> wins
            <p># OF WINS</p>
          </div>
          <div className="entryStat">
            <span className="entryStatFigure">{countryDebutYear}</span>
            <p>DEBUT YEAR</p>
          </div>
        </div>

        <div className="entryImageBlock">
          <div className="entryImage">
            <Image
              src={'https:' + countryImage2.fields.file.url}
              width={0}
              height={0}
              size="100vw"
              style={{ width: '100%', height: '100%' }}
            />
            <p>{countryImage2.fields.description}</p>
          </div>
          <div className="entryImage">
            <Image
              src={'https:' + countryImage.fields.file.url}
              width={0}
              height={0}
              size="100vw"
              style={{ width: '100%', height: '100%' }}
            />
            <p>{countryImage.fields.description}</p>
          </div>
          <div className="entryImage">
            <Image
              src={'https:' + countryImage3.fields.file.url}
              width={0}
              height={0}
              size="100vw"
              style={{ width: '100%', height: '100%' }}
            />
            <p>{countryImage3.fields.description}</p>
          </div>
        </div>
        <div className="divider"></div>
        <div className="subHeader">
          <h3>Entries</h3>
        </div>
        <div className="altCardListWrapper">
          <div className="cardListHorizontal">
            {songs.map((song) => (
              <SongCard2 key={song.sys.id} song={song} showYear />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
