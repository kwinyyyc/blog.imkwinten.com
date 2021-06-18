import React, { useCallback, useEffect, useRef } from 'react'
import qs from 'query-string'

export const Tag = ({ tag, scrollToCenter, selectedTag, setSelectedTag }) => {
  const [title, occurences] = tag;
  const tabRef = useRef(null)

  const handleClick = useCallback(() => {
    scrollToCenter(tabRef)
    setSelectedTag(tag)
    window.history.pushState(
      { tag },
      '',
      `${window.location.pathname}?${qs.stringify({ tag: title })}`
    )
  }, [tabRef])

  useEffect(() => {
    const [selectedTitle, selectedOccurences] = selectedTag;
    if (selectedTitle === title) {
      scrollToCenter(tabRef)
    }
  }, [selectedTag, tabRef])

  return (
    <li
      ref={tabRef}
      className="item"
      role="tab"
      // aria-selected={selectedTag === title ? 'true' : 'false'}
    >
      <div onClick={handleClick}>{`${title} ${occurences ? `(${occurences})` : ''}`}</div>
    </li>
  )
}
