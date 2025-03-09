import React from 'react'

export default function AdminLayout(props) {
    const { children } = props
    return (
        <div>
            <h2>Usando AdminLayout</h2>
            {children}
        </div>
    )
}
