import React from 'react'

const UpdateTime = ({ time }) => {
    const output = time< 60 ? 'Updated now' : `Updated ${(time/60).toFixed(0)} min ago`
    return (<p>{output}</p>);
}
export default UpdateTime;