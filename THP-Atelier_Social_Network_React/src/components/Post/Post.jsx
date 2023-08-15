import React from 'react'

export const Post = ({data}) => {
  console.log(data)
  return (
    <h1>{data.attributes.texte}</h1>
  )
}
