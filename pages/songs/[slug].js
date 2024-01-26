import React from 'react';
import { createClient } from 'contentful';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneFlip, faUser } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'song',
    limit: 500,
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.songSlug },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: 'song',
    'fields.songSlug': params.slug,
  });

  return {
    props: { song: items[0] },
  };
}

const isDefined = (value) => value !== undefined && value !== null;

export default function SongDetails({ song }) {
  const {
    songTitle,
    songArtist,
    songCountry2,
    songYear,
    grandFinalStatus,
    grandFinalPlace,
    grandFinalPoints,
    grandFinalPercentage,
    grandFinalJuryPlace,
    grandFinalJuryPoints,
    grandFinalJuryPercentage,
    grandFinalTelevotePlace,
    grandFinalTelevotePoints,
    grandFinalTelevotePercentage,
    semiFinalsPoints,
    semiFinalsPercentage,
    semiFinalsPlace,
    semiFinalsJuryPlace,
    semiFinalsJuryPoints,
    semiFinalsJuryPercentage,
    semiFinalsTelevotePlace,
    semiFinalsTelevotePoints,
    semiFinalsTelevotePercentage,
    songImage,
    songImage2,
    songImage3,
    selectionType,
  } = song.fields;
  return (
    <div className="entryPage">
      <Head>
        <title>
          {songTitle} | {songCountry2} {songYear} | Eurovote
        </title>
      </Head>
      <div className="entryHeader">
        <p className="entryHeaderTop">
          {songCountry2} {songYear}
        </p>
        <div className="entryHeaderTitle">
          <h1>{songTitle}</h1>
        </div>
        <p className="entryHeaderBottom">{songArtist.fields.artistName}</p>
        {isDefined(selectionType) && (
          <p>
            <span className="songEntryTag">{selectionType}</span>
          </p>
        )}
      </div>
      {/* GRAND FINAL */}
      <div className="entryDetails">
        <div className="grandFinal">
          <div className="statsHeader">
            <h2>Grand Final</h2>
            {grandFinalStatus && <div className="grandFinalStatus">{grandFinalStatus}</div>}
          </div>

          {isDefined(grandFinalPoints) && (
            <div className="entryStatsBlock">
              <div className="entryStat">
                <span className="entryStatFigure">{grandFinalPoints}</span> pts
                <p>POINTS</p>
              </div>
              <div className="entryStat">
                <span className="entryStatFigure">{grandFinalPlace}</span>
                <p>POSITION</p>
              </div>
              <div className="entryStat">
                <span className="entryStatFigure">{grandFinalPercentage}</span> %<p>PERCENTAGE OF PTS</p>
              </div>
            </div>
          )}

          <div className="juryVsTelevoteBlock">
            {isDefined(grandFinalPoints) && (
              <div className="juryBlock">
                <h3>
                  Jury <FontAwesomeIcon icon={faUser} />
                </h3>
                <div className="entryStatsBlock">
                  <div className="entryStat">
                    <span className="entryStatFigureSmall">{grandFinalJuryPoints}</span> pts
                    <p>Points</p>
                  </div>
                  <div className="entryStat">
                    <span className="entryStatFigureSmall">{grandFinalJuryPlace}</span>
                    <p>Position</p>
                  </div>
                  <div className="entryStat">
                    <span className="entryStatFigureSmall">{grandFinalJuryPercentage}</span>%<p>Percentage of Pts</p>
                  </div>
                </div>
              </div>
            )}

            {isDefined(grandFinalPoints) && (
              <div className="televoteBlock">
                <h3>
                  Televote <FontAwesomeIcon icon={faPhoneFlip} />
                </h3>
                <div className="entryStatsBlock">
                  <div className="entryStat">
                    <span className="entryStatFigureSmall">{grandFinalTelevotePoints}</span> pts
                    <p>Points</p>
                  </div>
                  <div className="entryStat">
                    <span className="entryStatFigureSmall">{grandFinalTelevotePlace}</span>
                    <p>Position</p>
                  </div>
                  <div className="entryStat">
                    <span className="entryStatFigureSmall">{grandFinalTelevotePercentage}</span>%
                    <p>Percentage of Points</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* IMAGE DIVIDER */}
        <div className="entryImageBlock">
          <div className="entryImage">
            <Image
              src={'https:' + songImage2.fields.file.url}
              width={0}
              height={0}
              size="100vw"
              style={{ width: '100%', height: '100%' }}
            />
            <p>{songImage2.fields.description}</p>
          </div>
          <div className="entryImage">
            <Image
              src={'https:' + songImage.fields.file.url}
              width={0}
              height={0}
              size="100vw"
              style={{ width: '100%', height: '100%' }}
            />
            <p>{songImage.fields.description}</p>
          </div>
          <div className="entryImage">
            <Image
              src={'https:' + songImage3.fields.file.url}
              width={0}
              height={0}
              size="100vw"
              style={{ width: '100%', height: '100%' }}
            />
            <p>{songImage3.fields.description}</p>
          </div>
        </div>

        {/* SEMI FINAL */}
        <div className="divider"></div>
        {isDefined(semiFinalsPoints) && (
          <div className="semiBlock">
            <div className="statsHeader">
              <h2>Semi Final</h2>
            </div>

            <div className="entryStatsBlock">
              <div className="entryStat">
                <span className="entryStatFigure">{semiFinalsPoints}</span> pts
                <p>POINTS</p>
              </div>
              <div className="entryStat">
                <span className="entryStatFigure">{semiFinalsPlace}</span>
                <p>POSITION</p>
              </div>
              <div className="entryStat">
                <span className="entryStatFigure">{semiFinalsPercentage}</span> %<p>PERCENTAGE OF PTS</p>
              </div>
            </div>

            <div className="centralAlign">
              <div className="juryVsTelevoteBlock">
                {isDefined(semiFinalsJuryPoints) && (
                  <div className="juryBlock">
                    <h3>
                      Jury <FontAwesomeIcon icon={faUser} />
                    </h3>
                    <div className="entryStatsBlock">
                      <div className="entryStat">
                        <span className="entryStatFigureSmall">{semiFinalsJuryPoints}</span> pts
                        <p>Points</p>
                      </div>
                      <div className="entryStat">
                        <span className="entryStatFigureSmall">{semiFinalsJuryPlace}</span>
                        <p>Position</p>
                      </div>
                      <div className="entryStat">
                        <span className="entryStatFigureSmall">{semiFinalsJuryPercentage}</span>%
                        <p>Percentage of Pts</p>
                      </div>
                    </div>
                  </div>
                )}
                {isDefined(semiFinalsTelevotePoints) && (
                  <div className="televoteBlock">
                    <h3>
                      Televote <FontAwesomeIcon icon={faPhoneFlip} />
                    </h3>
                    <div className="entryStatsBlock">
                      <div className="entryStat">
                        <span className="entryStatFigureSmall">{semiFinalsTelevotePoints}</span> pts
                        <p>Points</p>
                      </div>
                      <div className="entryStat">
                        <span className="entryStatFigureSmall">{semiFinalsTelevotePlace}</span>
                        <p>Position</p>
                      </div>
                      <div className="entryStat">
                        <span className="entryStatFigureSmall">{semiFinalsTelevotePercentage}</span>%
                        <p>Percentage of Points</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
