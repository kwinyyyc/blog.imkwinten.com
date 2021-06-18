import React from 'react'
import { graphql } from 'gatsby'

import { rhythm } from '../utils/typography'
import * as PageTitle from '../constants'
import { SponsorButton } from '../components/sponsor-button'
import { Layout } from '../layout'

export default ({ data, location }) => {
  const resumes = data.allMarkdownRemark.edges

  const resume = resumes
    .filter(({ node }) => {
      return node.frontmatter.title === PageTitle.ABOUT
    })
    .map(({ node }) => node)[0]

  const metaData = data.site.siteMetadata
  const { title, comment, siteUrl, author, sponsor } = metaData

  return (
    <Layout location={location} title={title}>
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(0.5)} ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(
            3 / 4
          )}`,
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: resume.html }} />
        {!!sponsor.buyMeACoffeeId && (
          <SponsorButton sponsorId={sponsor.buyMeACoffeeId} />
        )}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author
        siteUrl
        comment {
          disqusShortName
          utterances
        }
        sponsor {
          buyMeACoffeeId
        }
      }
    }
    allMarkdownRemark {
      edges {
        node {
          id
          excerpt(pruneLength: 160)
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
