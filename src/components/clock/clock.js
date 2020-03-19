import React, { Component } from 'react'
import './clock.css'

export default class Clock extends Component {
    state = {
        date: new Date().toLocaleString()
    }

    // tick = () => this.setState({ date: new Date().toLocaleString() })

    componentDidMount() {
        console.log('componentDidMount Clock')
        this.intervalId = setInterval(() => this.setState({ date: new Date().toLocaleString() }), 1000)
    }

    componentWillUnmount() {
        console.log('componentWillUnmount Clock')
        clearInterval(this.intervalId)
    }


    render() {
        console.log('render clock')
        return (<span className='clock'>{this.state.date}</span>)
    }
}