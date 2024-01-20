import React from 'react';
import Image from 'next/image';
import { formatDate } from '../helpers/date';

export default function FeautedBlogs({ blog }) {
  const { blogTitle, blogSlug, blogDate, blogImage } = blog.fields;
  const blogUrl = `/blog/${blogSlug}`;
  return (
    <div className="entryCard">
      <div className="cardImage">
        <a href={blogUrl}>
          <Image
            src={'https:' + blogImage.fields.file.url}
            width={0}
            height={0}
            size="100vw"
            style={{ width: '100%', height: '100%' }}
          />
        </a>
      </div>

      <div className="cardTitle">
        <p>
          <a href={blogUrl}>{blogTitle}</a>
        </p>
      </div>
      <div className="cardDetails">
        <div className="cardDetailsLeft">
          <p>{formatDate(blogDate)}</p>
        </div>
        <div className="cardDetailsRight">
          <p>
            <a href={blogUrl}>Read more</a>
          </p>
        </div>
      </div>
    </div>
  );
}
