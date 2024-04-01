import React from 'react';
import Image from 'next/image';
import { isDefined } from '../utils/isDefined';

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
  } = song.fields;
  const songUrl = `/songs/${songSlug}`;
  console.log(songTags);
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

          {(songTags?.includes('Last Place') || songTags?.includes('Semi Last Place')) && (
            <p>
              <span className="songTag tagRed">{songTags}</span>
            </p>
          )}

          {songTags?.includes('Semi Winner') && (
            <p>
              <span className="songTag tagGreen">{songTags}</span>
            </p>
          )}

          {songTags?.includes('Host Entry') && (
            <p>
              <span className="songTag tagGold">{songTags}</span>
            </p>
          )}
        </div>
        <div className="songEntryDetailsRight">
          {isDefined(grandFinalPlace) && (
            <div className="songEntryFinalPlace">
              <p>
                <span className="mediumStats">{grandFinalPlace}</span>
              </p>
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
