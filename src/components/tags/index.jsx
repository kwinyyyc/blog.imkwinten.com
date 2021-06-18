import React, { useCallback, useRef } from 'react'
import { rhythm } from '../../utils/typography'
import { Tag } from '../tag'
import { TAG_TYPE } from '../../constants'
import './index.scss'

export const Tags = ({ tags, selectedTag, setSelectedTag }) => {
    const containerRef = useRef(null)

    const scrollToCenter = useCallback(tabRef => {
      const { offsetWidth: tabWidth } = tabRef.current
      const { scrollLeft, offsetWidth: containerWidth } = containerRef.current
      const tabLeft = tabRef.current.getBoundingClientRect().left
      const containerLeft = containerRef.current.getBoundingClientRect().left
      const refineLeft = tabLeft - containerLeft
      const targetScollX = scrollLeft + refineLeft - (containerWidth / 2) + (tabWidth / 2)
  
      containerRef.current.scroll({ left: targetScollX, top: 0, behavior: 'smooth' })
    }, [containerRef])

  return (
    <ul
      ref={containerRef}
      className="tag-container"
      role="tablist"
      id="tag"
      style={{
        margin: `0 -${rhythm(3 / 4)}`,
      }}
    >
        <Tag tag={[TAG_TYPE.ALL, null]} selectedTag={selectedTag} scrollToCenter={scrollToCenter} setSelectedTag={setSelectedTag}/>
      {tags.map((tag, idx) => (
        <Tag key={idx} tag={tag} selectedTag={selectedTag} scrollToCenter={scrollToCenter} setSelectedTag={setSelectedTag}/>
      ))}
    </ul>
  )
}
