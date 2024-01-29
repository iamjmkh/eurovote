import React from 'react';
import Image from 'next/image';

export default function dSongCard({ song, showYear = false, showCountry = false }) {
  const { songTitle, songSlug, songArtist, songImage, songFinalPosition, songYear, selectionType, songCountry2 } =
    song.fields;
  const songUrl = `/songs/${songSlug}`;
  return (
    <div className="detailedSongCard">
      <div className="dSongCardImage">
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
      <div className="dSongCardDetails">
        <div className="dSongCardTitle">
          <p>
            {showCountry && songCountry2} {showYear && songYear}
          </p>
          <h3>{songTitle}</h3>
          <p>{songArtist}</p>
          <p>{selectionType}</p>
        </div>
        <div className="dSongCardInfo">
          <div className="dSongCardStats">
            <p className="largeStat">{songFinalPosition}</p>
            <p className="annotation">position</p>
          </div>
        </div>
      </div>
    </div>
  );
}
