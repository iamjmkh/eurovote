import React from 'react';
import Image from 'next/image';

export default function SongCard({ song }) {
  const { songTitle, songSlug, songCountry2, songYear, songImage } = song.fields;
  const songUrl = `/songs/${songSlug}`;
  return (
    <div className="featuredSong">
      <div className="featuredSongLabel">
        <p>Recently Added</p>
      </div>
      <div className="featuredSongImage">
        <a href={songUrl}>
          <Image
            src={'https:' + songImage.fields.file.url}
            width={0}
            height={0}
            size="100vw"
            style={{ width: '100%', height: '100%' }}
          />
        </a>
      </div>
      <div className="featuredSongInfo">
        <h3>
          <a href={songUrl}>{songTitle}</a>
        </h3>
        <p>
          {songCountry2} {songYear}
        </p>
      </div>
    </div>
  );
}
