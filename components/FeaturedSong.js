import React from 'react';
import Image from 'next/image';

export default function SongCard({ song }) {
  const { songTitle, songSlug, songCountry2, songYear, songImage, youTubeVideo } = song.fields;
  const songUrl = `/songs/${songSlug}`;
  return (
    <div className="featuredSong">
      <div className="featuredSongImage">
        <iframe src={youTubeVideo} frameborder="0" allowfullscreen />
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
