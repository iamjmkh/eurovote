import React from 'react';
import Image from 'next/image';
import { isDefined } from '../utils/isDefined';
import { SongTagColourMap } from '../utils/Config';

export default function SongCard2({ song }) {
  const {
    songTitle,
    songSlug,
    songCountry2,
    songArtist,
    songImage,
    songYear,
    grandFinalPlace,
    grandFinalStatus,
    songTags,
    grandFinalPoints,
  } = song.fields;
  const songUrl = `/songs/${songSlug}`;

  return (
    <div className="countrySongEntry">
      <div className="songEntryImage">
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
      <div className="songEntryDetails">
        <div className="songEntryDetailsLeft">
          <p>
            {songCountry2} {songYear}
          </p>

          <a href={songUrl}>{songTitle}</a>

          <p>{songArtist.fields.artistName}</p>

          {songTags?.map((tag) => (
            <span key={tag} className={`songTag ${SongTagColourMap[tag]}`}>
              {tag}
            </span>
          ))}
        </div>
        <div className="songEntryDetailsRight">
          {isDefined(grandFinalPlace) && (
            <div className="songEntryFinalPlace">
              <p>
                <span className="mediumStats">{grandFinalPlace}</span>
              </p>
              <span className="smallStats">{grandFinalPoints} pts</span>
              <p>Grand Final Pos.</p>
            </div>
          )}
          {grandFinalStatus === 'Did Not Qualify' && (
            <div className="songEntryFinalPlace">
              <p>
                <span className="smallMediumStats">NQ</span>
              </p>
              <p>Did Not Qualify</p>
            </div>
          )}
          {grandFinalStatus === 'TBC' && (
            <div className="songEntryFinalPlace">
              <p>
                <span className="smallMediumStats">TBC</span>
              </p>
            </div>
          )}
          {grandFinalStatus === 'Cancelled' && (
            <div className="songEntryFinalPlace">
              <p>Contest Cancelled</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
