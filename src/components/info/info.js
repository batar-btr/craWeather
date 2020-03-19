import React from 'react'
import './info.css'
const Info = ({ data, blur }) => {
    const { name, dt, description, feelsLike } = data
    const className = `info${blur ? ' blur': ''}`
    return (
        <div className={className}>
            <p>{name}</p>
            <p>{description}</p>
            <p>Ощущается как: {feelsLike}</p>
            <p>Информация получена:{new Date(dt * 1000).toLocaleString()}</p>
        </div>
    );
}

export default Info