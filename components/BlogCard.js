import React from 'react';
import Image from 'next/image';
import { formatDate } from '../helpers/date';

export default function BlogCard({ blog }) {
  const { blogTitle, blogSlug, blogSnippet, blogImage, blogDate, blogTags } = blog.fields;
  const blogUrl = `/blog/${blogSlug}`;
  return (
    <div className="blogCard">
      <div className="blogCardImage">
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
      <div className="blogCardDetails">
        <p className="date">{formatDate(blogDate)}</p>
        <h2>
          <a href={blogUrl}>{blogTitle}</a>
        </h2>
        <p>
          {blogTags.map((tag) => (
            <span className="tags" key={tag}>
              {tag}
            </span>
          ))}
        </p>

        <p className="small">{blogSnippet}</p>
        <p>
          {' '}
          <a href={blogUrl} className="blueButton">
            Read more
          </a>
        </p>
      </div>
    </div>
  );
}
