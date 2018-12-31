import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import Seo from '../components/Seo';

import { Blog } from '../components/Blog';
import { PortfolioList } from '../components/Portfolio';

import theme from '../components/styles/theme';

injectGlobal`
    html {
        box-sizing: border-box;
        /* font-size: 10px; */

    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        padding: 0;
        margin: 0;
        /* font-size: 1rem; */
    }
     a {
        text-decoration: none;
        color: ${theme.black};
    }

    pre[class*="language-"] {
    padding: 1em;
    margin: .5em 0;
    overflow: auto;
    border-radius: 0.3em;
    background-color: rgb(40, 44, 52);
  }
`;

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  top: 25px;
  position: relative;
`;

const Button = styled.div`
  border: solid 1px ${theme.orange};
  border-radius: 3px;

  padding: 15px;
  cursor: pointer;
  width: 150px;
  box-sizing: border-box;

  &:hover {
    background-color: ${theme.orange};
    transition: all 0.4s ease 0.1s;

    a {
      color: ${theme.white};
      transition: all 0.4s ease 0.1s;
    }
  }

  a {
    color: ${theme.black};
    text-decoration: none;
    text-transform: uppercase;
  }
`;

const Header = styled.h2`
  text-align: center;
`;

const LatestBlock = styled.div`
  margin-top: 200px;
`;
class Index extends React.Component {
  render() {
    const { data } = this.props;
    const { edges } = data.allMarkdownRemark;

    return (
      <ThemeProvider theme={theme}>
        <div>
          <Layout title="Malik Elgabroun - Front End Developer">
            <MainContent className="main-content">
              <h1>Hello My name is Malik</h1>
              <p> and I'm a London-based Front end Developer</p>
              <ButtonContainer>
                <Button>
                  <Link to="/about">About me</Link>
                </Button>
                <Button>
                  <Link to="/resume">Resume</Link>
                </Button>
              </ButtonContainer>
              <LatestBlock>
                <Header>Latest Posts</Header>

                <Blog edges={edges} />
              </LatestBlock>
              <LatestBlock>
                <Header>Latest Projects</Header>

                <PortfolioList edges={edges} />
              </LatestBlock>
            </MainContent>
          </Layout>
        </div>
      </ThemeProvider>
    );
  }
}

export default Index;
export const query = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          timeToRead
          frontmatter {
            title
            path
            date(formatString: "DD MMMM YYYY")
            summary
            images
            tags
            type
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
