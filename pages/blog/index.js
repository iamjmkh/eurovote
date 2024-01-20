import React from 'react';
import { createClient } from 'contentful';
import BlogCard from '../../components/BlogCard';
import Head from 'next/head';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: 'blog' });
  const blogs = res.items.sort((b, a) => a.fields.blogDate.localeCompare(b.fields.blogDate));
  return {
    props: {
      blogs,
    },
  };
}
export default function Blogs({ blogs }) {
  return (
    <div className="cardListWrapper">
      <Head>
        <title>Blog | Eurovote</title>
      </Head>
      <div className="sectionHeaderAlt">
        <h3>Blogs</h3>
      </div>
      <div className="blogList">
        {' '}
        {blogs.map((blog) => (
          <BlogCard key={blog.sys.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
