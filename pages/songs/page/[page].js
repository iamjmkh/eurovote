import React from 'react';
import { createClient } from 'contentful';
import { SongsPerPage } from '../../../utils/Config';
import SongCard from '../../../components/SongCard';
import Pagination from '../../../components/Pagination';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'song',
    limit: 1,
  });

  const totalPages = Math.ceil(res.total / SongsPerPage);

  const paths = [];
  for (let page = 2; page <= totalPages; page += 1) {
    paths.push({
      params: { page: String(page) },
    });
  }

  return {
    paths: paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({
    content_type: 'song',
    order: 'fields.songTitle',
    limit: SongsPerPage,
    skip: SongsPerPage * (Number(params.page) - 1),
  });

  const songs = res.items;
  const totalPages = Math.ceil(res.total / SongsPerPage);

  return {
    props: { page: params.page, totalPages, songs },
  };
}

export default function SongPageIndex({ page, songs, totalPages }) {
  return (
    <div className="cardListWrapper">
      <div className="pageTitle">
        <h1>Songs </h1>
        <p>
          Page {page} / {totalPages}
        </p>
      </div>
      <div className="cardList">
        {songs.map((song) => (
          <SongCard key={song.sys.id} song={song} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
