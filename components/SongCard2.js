import React from 'react';
import Image from 'next/image';
import { isDefined } from '../utils/isDefined';

export default function SongCard2({ song, showYear = false, showCountry = false }) {
  const { songTitle, songSlug, songArtist, songImage, songFinalPosition, songCountry2, songYear, songTags } =
    song.fields;
  const songUrl = `/songs/${songSlug}`;
  return (
    <div className="altEntryCard">
      <div className="altCardImage">
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
      <div className="altCardDetails">
        <div className="altCardTitle">
          <p>
            {showCountry && songCountry2} {showYear && songYear}
          </p>
          <a href={songUrl}>{songTitle}</a>
        </div>
        <div className="altCardSubtitle">
          <p>{songArtist.fields.artistName}</p>
          <p>{songFinalPosition}</p>

          {isDefined(songTags) && (
            <div className="songDetailsTags">
              {songTags.map((tag) => (
                <span className="tagsSongCard" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
