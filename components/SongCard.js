import React from 'react';
import Image from 'next/image';

export default function SongCard({ song }) {
  const { songTitle, songSlug, songArtist, songCountry2, songYear, songImage, songFinalPosition } = song.fields;
  const songUrl = `/songs/${songSlug}`;
  return (
    <div className="entryCard">
      <div className="cardImage">
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

      <div className="cardTitle">
        <p>
          <a href={songUrl}>{songTitle}</a>
        </p>
      </div>
      <div className="cardDetails">
        <div className="cardDetailsLeft">
          <p>{songArtist.fields.artistName}</p>
          <p>{songFinalPosition}</p>
        </div>
        <div className="cardDetailsRight">
          <p>
            {songCountry2} {songYear}
          </p>
          <p>
            <a href={songUrl}>Read more</a>
          </p>
        </div>
      </div>
    </div>
  );
}
