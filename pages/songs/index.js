import React from 'react';
import { createClient } from 'contentful';
import SongCard from '../../components/SongCard';
import Pagination from '../../components/Pagination';
import { SongsPerPage } from '../../utils/Config';
import Head from 'next/head';

export default function Songs({ songs, totalPages }) {
  return (
    <div className="cardListWrapper">
      <Head>
        <title>Songs | Eurovote</title>
      </Head>
      <div className="cardList">
        {songs.map((song) => (
          <SongCard key={song.sys.id} song={song} />
        ))}
      </div>
      <Pagination currentPage={1} totalPages={totalPages} />
    </div>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: 'song', order: 'fields.songTitle', limit: SongsPerPage });
  const songs = res.items;
  // .sort((a, b) => a.fields.songTitle.localeCompare(b.fields.songTitle))
  // .sort((b, a) => a.fields.songYear.localeCompare(b.fields.songYear));
  const totalPages = Math.ceil(res.total / SongsPerPage);

  return {
    props: {
      songs,
      totalPages,
    },
  };
}
