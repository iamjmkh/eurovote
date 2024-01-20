import React from 'react';
import Image from 'next/image';

export default function CountryCard({ country }) {
  const { countryName, numberOfWins, countryImage, countrySlug } = country.fields;
  const countryUrl = `/countries/${countrySlug}`;

  return (
    <div className="entryCard">
      <div className="cardImage">
        {countryImage && (
          <a href={countryUrl}>
            <Image
              src={'https:' + countryImage.fields.file.url}
              width={0}
              height={0}
              size="100vw"
              style={{ width: '100%', height: '100%' }}
            />
          </a>
        )}
      </div>
      <div className="cardTitle">
        <p>
          <a href={countryUrl}>{countryName}</a>
        </p>
      </div>
      <div className="cardDetails">
        <div className="cardDetailsLeft">
          <p>{numberOfWins} wins</p>
        </div>
        <div className="cardDetailsRight">
          <p>
            <a href={countryUrl}>Read more</a>
          </p>
        </div>
      </div>
    </div>
  );
}
