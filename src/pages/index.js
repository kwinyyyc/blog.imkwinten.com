import { graphql } from 'gatsby'
import _ from 'lodash'
import React, { useMemo, useCallback, useEffect } from 'react'
import { Bio } from '../components/bio'
import { Tag } from '../components/tag'
import { Tags } from '../components/tags'
import { Contents } from '../components/contents'
import { Head } from '../components/head'
import { HOME_TITLE } from '../constants'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useRenderedCount } from '../hooks/useRenderedCount'
import { useScrollEvent } from '../hooks/useScrollEvent'
import { Layout } from '../layout'
import * as Dom from '../utils/dom'
import * as EventManager from '../utils/event-manager'
import { TAG_TYPE } from '../constants'
import qs from 'query-string'

const BASE_LINE = 80

function getDistance(currentPos) {
  return Dom.getDocumentHeight() - currentPos
}

export default ({ data, location }) => {
  const { siteMetadata } = data.site
  const { countOfInitialPost } = siteMetadata.configs
  const posts = data.allMarkdownRemark.edges
  const tags = useMemo(() => {
    const tags = posts.map(({ node }) => {
      return node.frontmatter.tags
    })
    const flattenTags = tags.flat()
    const uniqueTag = flattenTags.reduce((result, current) => {
      const count = result[current] || 0
      result[current] = count + 1
      return result
    }, {})
    const uniqueTagWithCount = Object.entries(uniqueTag).sort(
      ([key, value], [nextKey, nextValue]) => {
        return nextValue - value
      }
    )
    return uniqueTagWithCount
  }, [])
  const [count, countRef, increaseCount] = useRenderedCount()

  const [selectedTag, setSelectedTag] = React.useState([TAG_TYPE.ALL, null])
  const changeTag = useCallback(() => {
    const { tag } = qs.parse(location.search)
    const target = tag == null ? [TAG_TYPE.ALL, null] : [tag, null]

    setSelectedTag(target)
  }, [])

  useEffect(() => {
    window.addEventListener('popstate', changeTag)

    return () => {
      window.removeEventListener('popstate', changeTag)
    }
  }, [])

  useEffect(() => {
    changeTag(false)
  }, [])

  useIntersectionObserver()
  useScrollEvent(() => {
    const currentPos = window.scrollY + window.innerHeight
    const isTriggerPos = () => getDistance(currentPos) < BASE_LINE
    const doesNeedMore = () =>
      posts.length > countRef.current * countOfInitialPost

    return EventManager.toFit(increaseCount, {
      dismissCondition: () => !isTriggerPos(),
      triggerCondition: () => isTriggerPos() && doesNeedMore(),
    })()
  })

  return (
    <Layout location={location} title={siteMetadata.title}>
      <Head title={HOME_TITLE} keywords={siteMetadata.keywords} />
      <Bio />
      <Tags
        tags={tags}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
      <Contents
        posts={posts}
        countOfInitialPost={countOfInitialPost}
        count={count}
        selectedTag={selectedTag}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        configs {
          countOfInitialPost
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { ne: null }, draft: { eq: false } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 200, truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            draft
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 1024) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
