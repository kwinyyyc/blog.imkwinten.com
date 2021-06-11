import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'
import Img from "gatsby-image"

import './index.scss'

export const ThumbnailItem = ({ node }) => {
  let featuredImgFluid = node.frontmatter.featuredImage?.childImageSharp?.fluid
  return (
  <Link className={`thumbnail ${TARGET_CLASS}`} to={node.fields.slug}>
    <div key={node.fields.slug}>
    <Img className="thumbnail-banner" fluid={featuredImgFluid} />
      <h3 className="thumbnail-title">{node.frontmatter.title || node.fields.slug}</h3>
      <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
    </div>
  </Link>
)}
