---
path: '/gatsby-create-pages'
date: '2018-12-26'
title: 'How to create pages dynamically in Gatsby'
tags: ['js, gatsby']
summary: 'In this post, we will be looking into how to create pages using createPages'
images: 'images/thumbnails/gatsby.jpeg'
---

In this post we will be looking into how gatsby create pages programmatically from data (markdown files).

With GraphQL being out of the box in gatsby, we can query the specific data we need from markdown files and map them to pages at build time.

In order to create the pages dynamically from markdown we will be looking into Gatsby's Node.js 'createPages' API.

However, before that we need to add couple of plugins that will source and transform markdown file in order for gatsby to understand the markdown files path and its content, and be able to create those pages.

So to create pages you would need to do the following to make it happen dynamically

1. Reading markdown files and transform them
   By installing these two plugins

```text
npm install --save gatsby-source-filesystem gatsby-transformer-remark
```

we can tell gatsby the path with gatsby-source-filesystem from the filesystem and transform those markdown files content to HTML and frontmatter metadata to frontmatter with gatsby-transformer-remark which will transform those files to into edges that contain node type of MarkdownRemark and each frontmatter field into GraphQL fields

To do so we need to add the following config to gatsby-config.js after installing the two plugins.

```javascript
//gatsby-config.js
 `gatsby-transformer-remark`,
{
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`, //for the path you can change it based on your
        // preferred folder structure
      },
},
```

2. create page component (template) for the markdown files
   we need to create page template component that will be mapped with data (available GraphQL fields that were transformed with gatsby-transformer-remark) using graphql at build time to create these pages dynamically.

In the following example, you can see a simplified example of the post template I am using for the blog posts. Note (you can create as many templates as you want)

```javascript
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/index';

const Post = ({ data }) => {
  const { markdownRemark } = data;
  const { title, date } = markdownRemark.frontmatter;
  const { html, timeToRead } = markdownRemark;

  return (
    <div>
      <Layout>
        <div className="post-wrapper">
          <Title>{title}</Title>
          <div>
            <p>{date}.</p>
            <p>{timeToRead} min read.</p>
          </div>
          <div
            className="blogpost"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </Layout>
    </div>
  );
};
```

Below we can see the specific data (GraphQL fields) needed being pulled through so that it gets mapped with the template component using out of the box graphql query.

```graphql
export const query = graphql`
  query($pathSlug: String!, $image: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
        date
      }
      timeToRead
    }
  }
`;
```

3. programmatically create pages using gatsby's node.js createPages API
   To create a new page, we need to follow these steps
   a. Generate the slug (path) for the page using createPages AP
   b. create the page by mapping content to the page component template

In gatsby-node.js we export createPages API and pass it 2 arguments, graphql for finding the files and actions where createPage is a property of it.

The createPages function will return us a new promise due to the async nature of file creation (alternatively, you can use callback as per the example in gatsby docs).

In order to create these page we will need access to the page template using 'path.resolve'.

To change the status of promise to fulfilled, we will need to resolve it by calling graphql and pass it our query for allmarkdownremark with the path field included where we want our posts to live at. (this path is one set in markdown frontmatter metadata).

Additionally, we pass a function to '.then' that will be invoked once status changed to fulfilled where we pass our result value to this function. Result will contain a data object that will match our query.

In the function body, we will use foreach to iterate over each file node (edges are path to the file system node) to extract the path from those nodes frontmatter.

As per the screenshot, we can see what to expect from the node content.

![resolved-markdown-nodes](./gatsby-node.png)

With path value available to us, now we can call the 'createPage' action which takes in 3 parameters, path for the page url, component to render (page template component) and context object that will be available to page component as a prop.
As we passing context object to template component we want our template to know the path to file which will be called pathslug because path is a reserved keyword and the value of the pathSlug will be the field supplied from node frontmatter. After createPage invocation we will resolve the promise as you can see in the example below.

```javascript
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    //to create the page we need access to the blog post template
    const postTemplate = path.resolve('src/templates/postTemplate.js');

    resolve(
      graphql(
        `
          {
            allMarkdownRemark {
              edges {
                node {
                  frontmatter {
                    path
                    type
                    images
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          //you can see node value in the screenshot below
          const path = node.frontmatter.path;

          createPage({
            path,
            component: postTemplate,
            context: {
              // the value passed in the context will be available for you
              // to use in your page queries as a GraphQL variable,
              // as it can be see in the template snippet

              pathSlug: path,
            },
          });
          resolve();
        });
      })
    );
  });
};
```