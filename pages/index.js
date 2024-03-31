import React from 'react';
import { createClient } from 'contentful';
import Image from 'next/image';
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

export default function Home({ songList, contests, songs }) {
  return (
    <div className="homeWrapper">
      <Head>
        <title>Eurovote | Eurovision Songs, Results, Votes & Rankings</title>
      </Head>
      <div className="homeBanner">
        <div className="homeBannerContent">
          <h2>The place for stats, results and analysis of the Eurovision Song Contest</h2>
        </div>
      </div>
      {/* <div className="featuredSongWrapper">
        {songs.map((song) => (
          <FeaturedSong key={song.sys.id} song={song} />
        ))}
      </div> */}
      <div className="homeCarousel">
        <h3>Featured Songs</h3>
        <div className="homeCardList">
          {' '}
          {songList.map((song) => (
            <SongCard key={song.sys.id} song={song} />
          ))}
        </div>
      </div>
      <div className="homeCarousel">
        <h3>Recent Contests</h3>
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
