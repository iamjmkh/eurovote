import React from 'react';
import { createClient } from 'contentful';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { formatDate } from '../../helpers/date';
import Head from 'next/head';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

// Create a bespoke renderOptions object to target BLOCKS.EMBEDDED_ENTRY (linked block entries e.g. code blocks)
// INLINES.EMBEDDED_ENTRY (linked inline entries e.g. a reference to another blog post)
// and BLOCKS.EMBEDDED_ASSET (linked assets e.g. images)

const renderOptions = {
  renderNode: {
    [INLINES.EMBEDDED_ENTRY]: (node) => {
      // target the contentType of the EMBEDDED_ENTRY to display as you need
      if (node.data.target.sys.contentType.sys.id === 'blogPost') {
        return <a href={`/blog/${node.data.target.fields.slug}`}> {node.data.target.fields.title}</a>;
      }
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      // target the contentType of the EMBEDDED_ENTRY to display as you need
      if (node.data.target.sys.contentType.sys.id === 'codeBlock') {
        return (
          <pre>
            <code>{node.data.target.fields.code}</code>
          </pre>
        );
      }

      if (node.data.target.sys.contentType.sys.id === 'videoEmbed') {
        return (
          <iframe
            src={node.data.target.fields.embedUrl}
            height="100%"
            width="100%"
            frameBorder="0"
            scrolling="no"
            title={node.data.target.fields.title}
            allowFullScreen={true}
          />
        );
      }
    },

    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      // render the EMBEDDED_ASSET as you need
      return (
        <img
          src={`https://${node.data.target.fields.file.url}`}
          height={node.data.target.fields.file.details.image.height}
          width={node.data.target.fields.file.details.image.width}
          alt={node.data.target.fields.description}
        />
      );
    },
  },
};

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'blog',
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.blogSlug },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: 'blog',
    'fields.blogSlug': params.slug,
  });

  return {
    props: { blog: items[0] },
  };
}

export default function BlogDetails({ blog }) {
  const { blogTitle, blogDate, blogTags, blogImage, blogEntry } = blog.fields;

  return (
    <div className="entryPage">
      <Head>
        <title>{blogTitle} | Eurovote</title>
      </Head>
      <div className="blogHeader">
        <div className="blogDetails">
          <div className="blogDetailsDate">{formatDate(blogDate)}</div>
          <div className="blogDetailsTitle">
            <h1>{blogTitle}</h1>
          </div>
          <div className="blogDetailsTags">
            {blogTags.map((tag) => (
              <span className="tagsBlogpage" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="blogImage">
          {' '}
          <Image
            src={'https:' + blogImage.fields.file.url}
            width={0}
            height={0}
            size="100vw"
            style={{ width: '100%', height: '100%' }}
          />
          <p>Image: {blogImage.fields.description}</p>
        </div>
      </div>
      <div className="blogEntry"> {documentToReactComponents(blogEntry, renderOptions)}</div>
    </div>
  );
}
