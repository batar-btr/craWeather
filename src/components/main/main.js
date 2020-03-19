import React from 'react'
import './main.css'

const Main = ({ blur, temp }) => {
    const className = `main${blur ? ' blur' : ''}`
    return (
        <div className={className}>
            <p>{temp}</p>
        </div>
    );
}

export default Main;