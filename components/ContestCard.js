import React from 'react';
import Image from 'next/image';

export default function ContestCard({ contest }) {
  const { contestSlug, hostCountry, city, countriesNo, contestImage, contestYear, contestEdition } = contest.fields;
  const contestUrl = `/contests/${contestSlug}`;
  return (
    <div className="entryCard">
      <div className="cardImage">
        <a href={contestUrl}>
          <Image
            src={'https:' + contestImage.fields.file.url}
            width={0}
            height={0}
            size="100vw"
            style={{ width: '100%', height: '100%' }}
          />
        </a>
      </div>
      <div className="cardTitle">
        <p>
          <a href={contestUrl}>
            {city} {contestYear}
          </a>
        </p>
      </div>
      <div className="cardDetails">
        <div className="cardDetailsLeft">
          <p>{hostCountry}</p>
          <p>{countriesNo} countries</p>
        </div>
        <div className="cardDetailsRight">
          <p>Edition {contestEdition}</p>
          <p>
            <a href={contestUrl}>Read more</a>
          </p>
        </div>
      </div>
    </div>
  );
}
