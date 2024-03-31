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
    youTubeVideo,
  } = song.fields;
  return (
    <div className="entryPage">
      <Head>
        <title>
          {songTitle} | {songCountry2} {songYear} | Eurovote
        </title>
      </Head>

      <div className="pageTitle">
        <p>
          {songCountry2} {songYear}
        </p>
        <h1>{songTitle}</h1>
        <p>{songArtist.fields.artistName}</p>
      </div>

      <div className="songStats">
        <div className="songStatsTitle">
          <h3>Grand Final</h3>
          {grandFinalStatus && <div className="grandFinalStatus">{grandFinalStatus}</div>}
        </div>

        {isDefined(grandFinalPoints) && (
          <div className="songStatsBreakdownContainer">
            <div className="songStatsBreakdown">
              <div className="songStatsBreakdownThird">
                <p>
                  <span className="largeStats">{grandFinalPoints}</span> pts
                </p>
                <p className="statsAnnotation">Points</p>
              </div>
              <div className="songStatsBreakdownThird">
                <p className="largeStats">{grandFinalPlace}</p>
                <p className="statsAnnotation">Position</p>
              </div>
              <div className="songStatsBreakdownThird">
                <p>
                  <span className="largeStats">{grandFinalPercentage}</span> %
                </p>
                <p className="statsAnnotation">% of pts</p>
              </div>
            </div>
            <div className="songStatsJuryVsTelevote">
              <div className="songStatsJuryVsTelevoteBreakdown">
                <div className="songStatsJuryVsTelevoteBreakdownTitle">
                  <h4>
                    Jury <FontAwesomeIcon icon={faUser} />
                  </h4>
                </div>

                {isDefined(grandFinalJuryPoints) && (
                  <div className="songStatsJuryVsTelevoteBreakdownDetails">
                    <div className="songStatsBreakdownThirdSmall">
                      <p>
                        <span className="largeStatsSmall">{grandFinalJuryPoints}</span> pts
                      </p>
                      <p className="statsAnnotationSmall">Points</p>
                    </div>
                    <div className="songStatsBreakdownThirdSmall">
                      <p>
                        <span className="largeStatsSmall">{grandFinalJuryPlace}</span>
                      </p>
                      <p className="statsAnnotationSmall">Position</p>
                    </div>
                    <div className="songStatsBreakdownThirdSmall">
                      <p>
                        <span className="largeStatsSmall">{grandFinalJuryPercentage}</span> %
                      </p>
                      <p className="statsAnnotationSmall">% of pts</p>
                    </div>
                  </div>
                )}
              </div>

              {isDefined(grandFinalTelevotePoints) && (
                <div className="songStatsJuryVsTelevoteBreakdown">
                  <div className="songStatsJuryVsTelevoteBreakdownTitle">
                    <h4>
                      Televote <FontAwesomeIcon icon={faPhoneFlip} />
                    </h4>
                  </div>
                  <div className="songStatsJuryVsTelevoteBreakdownDetails">
                    <div className="songStatsBreakdownThirdSmall">
                      <p>
                        <span className="largeStatsSmall">{grandFinalTelevotePoints}</span> pts
                      </p>
                      <p className="statsAnnotationSmall">Points</p>
                    </div>
                    <div className="songStatsBreakdownThirdSmall">
                      <p>
                        <span className="largeStatsSmall">{grandFinalTelevotePlace}</span>
                      </p>
                      <p className="statsAnnotationSmall">Position</p>
                    </div>
                    <div className="songStatsBreakdownThirdSmall">
                      <p>
                        <span className="largeStatsSmall">{grandFinalTelevotePercentage}</span> %
                      </p>
                      <p className="statsAnnotationSmall">% of pts</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {isDefined(youTubeVideo) && (
        <div className="songVideo">
          <div className="songVideoEmbed">
            <iframe src={youTubeVideo} frameBorder="0" allowfullscreen />
          </div>
        </div>
      )}

      {isDefined(semiFinalsPoints) && (
        <div className="songStats">
          <div className="songStatsTitle">
            <h3>Semi Final</h3>
          </div>

          <div className="songStatsBreakdownContainer">
            <div className="songStatsBreakdown">
              <div className="songStatsBreakdownThird">
                <p>
                  <span className="largeStats">{semiFinalsPoints}</span> pts
                </p>
                <p className="statsAnnotation">Points</p>
              </div>
              <div className="songStatsBreakdownThird">
                <p className="largeStats">{semiFinalsPlace}</p>
                <p className="statsAnnotation">Position</p>
              </div>
              <div className="songStatsBreakdownThird">
                <p>
                  <span className="largeStats">{semiFinalsPercentage}</span> %
                </p>
                <p className="statsAnnotation">% of pts</p>
              </div>
            </div>
            <div className="songStatsJuryVsTelevote">
              {isDefined(semiFinalsJuryPoints) && (
                <div className="songStatsJuryVsTelevoteBreakdown">
                  <div className="songStatsJuryVsTelevoteBreakdownTitle">
                    <h4>
                      Jury <FontAwesomeIcon icon={faUser} />
                    </h4>
                  </div>

                  <div className="songStatsJuryVsTelevoteBreakdownDetails">
                    <div className="songStatsBreakdownThirdSmall">
                      <p>
                        <span className="largeStatsSmall">{semiFinalsJuryPoints}</span> pts
                      </p>
                      <p className="statsAnnotationSmall">Points</p>
                    </div>
                    <div className="songStatsBreakdownThirdSmall">
                      <p>
                        <span className="largeStatsSmall">{semiFinalsJuryPlace}</span>
                      </p>
                      <p className="statsAnnotationSmall">Position</p>
                    </div>
                    <div className="songStatsBreakdownThirdSmall">
                      <p>
                        <span className="largeStatsSmall">{semiFinalsJuryPercentage}</span> %
                      </p>
                      <p className="statsAnnotationSmall">% of pts</p>
                    </div>
                  </div>
                </div>
              )}

              {isDefined(semiFinalsTelevotePoints) && (
                <div className="songStatsJuryVsTelevoteBreakdown">
                  <div className="songStatsJuryVsTelevoteBreakdownTitle">
                    <h4>
                      Televote <FontAwesomeIcon icon={faPhoneFlip} />
                    </h4>
                  </div>
                  <div className="songStatsJuryVsTelevoteBreakdownDetails">
                    <div className="songStatsBreakdownThirdSmall">
                      <p>
                        <span className="largeStatsSmall">{semiFinalsTelevotePoints}</span> pts
                      </p>
                      <p className="statsAnnotationSmall">Points</p>
                    </div>
                    <div className="songStatsBreakdownThirdSmall">
                      <p>
                        <span className="largeStatsSmall">{semiFinalsTelevotePlace}</span>
                      </p>
                      <p className="statsAnnotationSmall">Position</p>
                    </div>
                    <div className="songStatsBreakdownThirdSmall">
                      <p>
                        <span className="largeStatsSmall">{semiFinalsTelevotePercentage}</span> %
                      </p>
                      <p className="statsAnnotationSmall">% of pts</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="imageGallery">
        <div className="imageGalleryThird">
          <Image
            src={'https:' + songImage2.fields.file.url}
            width={0}
            height={0}
            size="100vw"
            style={{ width: '100%', height: '100%' }}
          />
          <p>{songImage2.fields.description}</p>
        </div>
        <div className="imageGalleryThird">
          <Image
            src={'https:' + songImage.fields.file.url}
            width={0}
            height={0}
            size="100vw"
            style={{ width: '100%', height: '100%' }}
          />
          <p>{songImage.fields.description}</p>
        </div>
        <div className="imageGalleryThird">
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
    </div>
  );
}
