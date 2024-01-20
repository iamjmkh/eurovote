import React from 'react';
import { createClient } from 'contentful';
import FeaturedSong from '../components/FeaturedSong';
import ContestCard from '../components/ContestCard';
import SongCard from '../components/SongCard';
import FeaturedBlogs from '../components/FeaturedBlogs';
import Head from 'next/head';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const featuredSongRes = await client.getEntries({ content_type: 'song', limit: 1, order: '-sys.createdAt' });
  const contestRes = await client.getEntries({ content_type: 'contest', limit: 3, order: '-fields.contestYear' });
  const songRes = await client.getEntries({ content_type: 'song', limit: 3, order: '-sys.updatedAt' });
  const blogRes = await client.getEntries({ content_type: 'blog', limit: 3, order: 'sys.createdAt' });

  const songs = featuredSongRes.items;
  const contests = contestRes.items;
  const songList = songRes.items;
  const blogList = blogRes.items;

  return {
    props: {
      songs,
      contests,
      songList,
      blogList,
    },
  };
}

export default function Home({ songs, contests, songList, blogList }) {
  return (
    <div className="homeWrapper">
      <Head>
        <title>Eurovote | Eurovision Songs, Results, Votes & Rankings</title>
      </Head>
      <div className="featuredSongWrapper">
        {songs.map((song) => (
          <FeaturedSong key={song.sys.id} song={song} />
        ))}
      </div>

      <div className="cardListWrapper">
        <div className="sectionHeader">
          <h3>Featured Songs</h3>
        </div>
        <div className="homeCardList">
          {' '}
          {songList.map((song) => (
            <SongCard key={song.sys.id} song={song} />
          ))}
        </div>
      </div>

      <div className="cardListWrapper">
        <div className="sectionHeader">
          <h3>Latest Blog Posts</h3>
        </div>
        <div className="homeCardList">
          {' '}
          {blogList.map((blog) => (
            <FeaturedBlogs key={blog.sys.id} blog={blog} />
          ))}
        </div>
      </div>

      <div className="cardListWrapper">
        <div className="sectionHeader">
          <h3>Recent Years</h3>
        </div>
        <div className="homeCardList">
          {' '}
          {contests.map((contest) => (
            <ContestCard key={contest.sys.id} contest={contest} />
          ))}
        </div>
      </div>
    </div>
  );
}
