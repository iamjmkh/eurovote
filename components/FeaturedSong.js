import React from 'react';

export default function SongCard({ song }) {
  const { songTitle, songSlug, songCountry2, songYear, youTubeVideo } = song.fields;
  const songUrl = `/songs/${songSlug}`;
  return (
    <div className="featuredSong">
      <div className="featuredSongImage">
        <iframe src={youTubeVideo} frameBorder="0" allowfullscreen />
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
