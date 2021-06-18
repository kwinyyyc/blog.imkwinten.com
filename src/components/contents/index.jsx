import React, { useMemo } from 'react'

import { ThumbnailContainer } from '../thumbnail-container'
import { ThumbnailItem } from '../thumbnail-item'
import { TAG_TYPE } from '../../constants'

export const Contents = ({ posts, countOfInitialPost, count, selectedTag }) => {
  const [title, occurences] = selectedTag;
  const refinedPosts = useMemo(() =>
    posts
      .filter(
        ({ node }) =>
        title === TAG_TYPE.ALL ||
          node.frontmatter.tags.includes(title)
      )
      .slice(0, count * countOfInitialPost)
  )

  return (
    <ThumbnailContainer>
      {refinedPosts.map(({ node }, index) => (
        <ThumbnailItem node={node} key={`item_${index}`} />
      ))}
    </ThumbnailContainer>
  )
}
