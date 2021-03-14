import Img from 'gatsby-image';
import Layout from '../components/Layout';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import Seo from '../components/Seo';
import Signup from '@components/Signup';
import formatDate from '../utils/formatDate';
import { graphql } from 'gatsby';
import styled from 'styled-components';

const Title = styled.h2`
  font-family: 'Rambla';
`;

const PostTemplate = styled.div`
  a {
    color: #f47c48;
    text-decoration: underline;
  }
`;

const PostWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  .gatsby-highlight {
    position: relative;
  }
  pre[class*='language-'] {
    &::before {
      color: #232129;
      font-size: 0.75rem;
      letter-spacing: 0.075em;
      position: absolute;
      right: 1.5rem;
      text-transform: uppercase;
      top: 0px;
      border-radius: 0px 0px 4px 4px;
      padding: 0.25rem 0.5rem;
    }
  }

  pre[class$='language-shell'] {
    &::before {
      content: 'shell';
      background-color: #d9d7e0;
    }
  }
  pre[class$='language-jsx'] {
    &::before {
      content: 'jsx';
      background-color: #61dafb;
    }
  }

  pre[class$='language-vue'] {
    &::before {
      content: 'vue';
      background-color: #42b883;
    }
  }

  pre[class$='language-graphql'] {
    &::before {
      content: 'GraphQL';
      color: #ffffff;
      background: rgb(225, 0, 152);
    }
  }

  pre[class$='language-js'],
  pre[class$='language-javascript'] {
    &::before {
      content: 'js';
      background-color: #f7df1e;
    }
  }

  pre[class$='language-mdx'] {
    &::before {
      content: 'mdx';
      background-color: #f9ac00;
    }
  }

  p,
  ul {
    a:not(.img-credit):not(.gatsby-resp-image-link) {
      box-shadow: inset 0 -0.5rem 0 0 #f47c48;
      transition: box-shadow 0.2s, color 0.2s;
      &:hover {
        box-shadow: inset 0 -2.5rem 0 0 #f47c48;
        color: white;
      }
    }
    > code {
      border-radius: 0.3em;
      background: #ffe56433;
      color: #1a1a1a;
      padding: 0.15em 0.2em 0.05em;
      white-space: normal;
    }
  }

  hr {
    margin-top: calc(1.5rem - 1px);
  }

  blockquote {
    padding-left: 1rem;
    padding-right: 1.5rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    background-color: #f47c4821;
    border-left: 8px solid #f47c48;
    margin-left: 0;
  }
`;

const ImgCredit = styled.p`
  margin-bottom: 0;
  position: relative;
  top: -45px;
  text-align: center;
  a {
    color: #f47c48;
  }
`;

export const query = graphql`
  query($pathSlug: String!, $image: String!) {
    mdx(frontmatter: { path: { eq: $pathSlug } }) {
      frontmatter {
        title
        path
        date
        summary
        images
        imageAuthor
        imageAuthorID
        keywords
      }
      timeToRead
      body
    }
    file(relativePath: { eq: $image }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`;

const Post = ({ data: { mdx: post, file: imgFile } }) => {
  const {
    title,
    date,
    path,
    summary,
    imageAuthor,
    imageAuthorID,
    keywords,
  } = post.frontmatter;
  const { timeToRead } = post;
  return (
    <div>
      <Layout title={title}>
        <Seo
          title={title}
          pathSlug={path}
          description={summary}
          image={imgFile.childImageSharp.fluid}
          keywords={keywords}
        />
        <PostWrapper
          className="post-wrapper"
          style={{ maxWidth: '960px', margin: '0 auto' }}
        >
          <Title>{title}</Title>
          <div style={{ display: 'flex', font: 'bold', margin: '15px 0' }}>
            <p style={{ display: 'flex', alignItems: 'baseline' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginRight: '5px' }}
              >
                <path
                  d="M16.5 9.75C16.5 9.55109 16.579 9.36032 16.7197 9.21967C16.8603 9.07902 17.0511 9 17.25 9H18.75C18.9489 9 19.1397 9.07902 19.2803 9.21967C19.421 9.36032 19.5 9.55109 19.5 9.75V11.25C19.5 11.4489 19.421 11.6397 19.2803 11.7803C19.1397 11.921 18.9489 12 18.75 12H17.25C17.0511 12 16.8603 11.921 16.7197 11.7803C16.579 11.6397 16.5 11.4489 16.5 11.25V9.75ZM12 9.75C12 9.55109 12.079 9.36032 12.2197 9.21967C12.3603 9.07902 12.5511 9 12.75 9H14.25C14.4489 9 14.6397 9.07902 14.7803 9.21967C14.921 9.36032 15 9.55109 15 9.75V11.25C15 11.4489 14.921 11.6397 14.7803 11.7803C14.6397 11.921 14.4489 12 14.25 12H12.75C12.5511 12 12.3603 11.921 12.2197 11.7803C12.079 11.6397 12 11.4489 12 11.25V9.75ZM4.5 14.25C4.5 14.0511 4.57902 13.8603 4.71967 13.7197C4.86032 13.579 5.05109 13.5 5.25 13.5H6.75C6.94891 13.5 7.13968 13.579 7.28033 13.7197C7.42098 13.8603 7.5 14.0511 7.5 14.25V15.75C7.5 15.9489 7.42098 16.1397 7.28033 16.2803C7.13968 16.421 6.94891 16.5 6.75 16.5H5.25C5.05109 16.5 4.86032 16.421 4.71967 16.2803C4.57902 16.1397 4.5 15.9489 4.5 15.75V14.25ZM9 14.25C9 14.0511 9.07902 13.8603 9.21967 13.7197C9.36032 13.579 9.55109 13.5 9.75 13.5H11.25C11.4489 13.5 11.6397 13.579 11.7803 13.7197C11.921 13.8603 12 14.0511 12 14.25V15.75C12 15.9489 11.921 16.1397 11.7803 16.2803C11.6397 16.421 11.4489 16.5 11.25 16.5H9.75C9.55109 16.5 9.36032 16.421 9.21967 16.2803C9.07902 16.1397 9 15.9489 9 15.75V14.25Z"
                  fill="black"
                />
                <path
                  d="M5.25 0C5.44891 0 5.63968 0.0790176 5.78033 0.21967C5.92098 0.360322 6 0.551088 6 0.75V1.5H18V0.75C18 0.551088 18.079 0.360322 18.2197 0.21967C18.3603 0.0790176 18.5511 0 18.75 0C18.9489 0 19.1397 0.0790176 19.2803 0.21967C19.421 0.360322 19.5 0.551088 19.5 0.75V1.5H21C21.7956 1.5 22.5587 1.81607 23.1213 2.37868C23.6839 2.94129 24 3.70435 24 4.5V21C24 21.7956 23.6839 22.5587 23.1213 23.1213C22.5587 23.6839 21.7956 24 21 24H3C2.20435 24 1.44129 23.6839 0.87868 23.1213C0.316071 22.5587 0 21.7956 0 21V4.5C0 3.70435 0.316071 2.94129 0.87868 2.37868C1.44129 1.81607 2.20435 1.5 3 1.5H4.5V0.75C4.5 0.551088 4.57902 0.360322 4.71967 0.21967C4.86032 0.0790176 5.05109 0 5.25 0V0ZM1.5 6V21C1.5 21.3978 1.65804 21.7794 1.93934 22.0607C2.22064 22.342 2.60218 22.5 3 22.5H21C21.3978 22.5 21.7794 22.342 22.0607 22.0607C22.342 21.7794 22.5 21.3978 22.5 21V6H1.5Z"
                  fill="black"
                />
              </svg>{' '}
              {formatDate(date)}.
            </p>
            <p
              style={{
                marginLeft: '10px',
                display: 'flex',
                alignItems: 'baseline',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginRight: '5px' }}
              >
                <path
                  d="M3 2.25C3 2.05109 3.07902 1.86032 3.21967 1.71967C3.36032 1.57902 3.55109 1.5 3.75 1.5H20.25C20.4489 1.5 20.6397 1.57902 20.7803 1.71967C20.921 1.86032 21 2.05109 21 2.25C21 2.44891 20.921 2.63968 20.7803 2.78033C20.6397 2.92098 20.4489 3 20.25 3H18.75V4.5C18.7503 5.77355 18.3903 7.0212 17.7116 8.09883C17.0329 9.17647 16.0632 10.0401 14.9145 10.59C14.4795 10.7985 14.25 11.1555 14.25 11.475V12.525C14.25 12.8445 14.481 13.2015 14.9145 13.41C16.0632 13.9599 17.0329 14.8235 17.7116 15.9012C18.3903 16.9788 18.7503 18.2265 18.75 19.5V21H20.25C20.4489 21 20.6397 21.079 20.7803 21.2197C20.921 21.3603 21 21.5511 21 21.75C21 21.9489 20.921 22.1397 20.7803 22.2803C20.6397 22.421 20.4489 22.5 20.25 22.5H3.75C3.55109 22.5 3.36032 22.421 3.21967 22.2803C3.07902 22.1397 3 21.9489 3 21.75C3 21.5511 3.07902 21.3603 3.21967 21.2197C3.36032 21.079 3.55109 21 3.75 21H5.25V19.5C5.24969 18.2265 5.60968 16.9788 6.28837 15.9012C6.96707 14.8235 7.93679 13.9599 9.0855 13.41C9.5205 13.2015 9.75 12.8445 9.75 12.525V11.475C9.75 11.1555 9.519 10.7985 9.0855 10.59C7.93679 10.0401 6.96707 9.17647 6.28837 8.09883C5.60968 7.0212 5.24969 5.77355 5.25 4.5V3H3.75C3.55109 3 3.36032 2.92098 3.21967 2.78033C3.07902 2.63968 3 2.44891 3 2.25ZM6.75 3V4.5C6.74973 5.49063 7.02974 6.46112 7.55768 7.29935C8.08562 8.13758 8.83994 8.80933 9.7335 9.237C10.533 9.621 11.25 10.4235 11.25 11.4735V12.5265C11.25 12.5265 11.52 12.75 12 12.75C12.48 12.75 12.75 12.525 12.75 12.525V11.475C12.75 10.4235 13.467 9.621 14.2665 9.237C15.1601 8.80933 15.9144 8.13758 16.4423 7.29935C16.9703 6.46112 17.2503 5.49063 17.25 4.5V3H6.75Z"
                  fill="black"
                />
              </svg>{' '}
              {timeToRead} min read.
            </p>
          </div>

          <Img
            fluid={imgFile.childImageSharp.fluid}
            style={{ maxHeight: '400px', marginBottom: '50px' }}
          />
          {imageAuthor && (
            <ImgCredit>
              Photo by
              <a
                href={`https://unsplash.com/${imageAuthorID}`}
                target="blank"
                className="img-credit"
              >
                {' '}
                {imageAuthor}
              </a>
            </ImgCredit>
          )}
          <MDXRenderer>{post.body}</MDXRenderer>
        </PostWrapper>
        <Signup />
      </Layout>
    </div>
  );
};

export default Post;
