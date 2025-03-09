import React from 'react'

export default function ClientLayout(props) {
    const{children }= props
  return (
    <div>
      <h2>este es el ClientLayout
        {children}
      </h2>
    </div>
  )
}
