import React from 'react';
import { createClient } from 'contentful';
import Image from 'next/image';
import SongCard2 from '../../components/SongCard2';
// import dSongCard from '../../components/dSongCard';
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

      <div className="pageTitle">
        <h1>{countryName}</h1>
        <p>in the Eurovision Song Contest</p>
      </div>

      <div className="songStats">
        <div className="songStatsTitle">
          <h3>Key Stats</h3>
        </div>
        <div className="songStatsBreakdownContainer">
          <div className="songStatsBreakdown">
            <div className="songStatsBreakdownThird">
              <p>
                <span className="largeStats">{numberOfParticipations}</span> times
              </p>
              <p className="statsAnnotation"># of participations</p>
            </div>
            <div className="songStatsBreakdownThird">
              <p>
                <span className="largeStats">{numberOfWins}</span> wins
              </p>
              <p className="statsAnnotation">Position</p>
            </div>
            <div className="songStatsBreakdownThird">
              <p>
                <span className="largeStats">{countryDebutYear}</span>
              </p>
              <p className="statsAnnotation">Debut Year</p>
            </div>
          </div>
        </div>
      </div>

      <div className="imageGallery">
        <div className="imageGalleryThird">
          <Image
            src={'https:' + countryImage2.fields.file.url}
            width={0}
            height={0}
            size="100vw"
            style={{ width: '100%', height: '100%' }}
          />
          <p>{countryImage2.fields.description}</p>
        </div>
        <div className="imageGalleryThird">
          <Image
            src={'https:' + countryImage.fields.file.url}
            width={0}
            height={0}
            size="100vw"
            style={{ width: '100%', height: '100%' }}
          />
          <p>{countryImage.fields.description}</p>
        </div>
        <div className="imageGalleryThird">
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
