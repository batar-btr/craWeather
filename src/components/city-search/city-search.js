import React, { Component } from 'react'
import './city-search.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'




export default class CitySearch extends Component {

    state = {
        label: '',
        entries: []
    }


    onSubmit = e => {
        e.preventDefault();
    }

    onLabelChange = e => {
        const value = e.target.value;
        let entries = [];
        if (value.length > 0) {
            entries = this.findEntries(value, this.props.cityNames)
        }
        this.setState({ label: value, entries: entries })
        this.changeEntries(entries)
    }

    findEntries = (str, arr) => arr.filter(({ name }) => {
        const regExp = new RegExp(`^${str}`, 'gi');
        return name.match(regExp);
    }).sort((a, b) => {
        return a.name > b.name ? 1 : -1;
    }).splice(0, 10)

    changeEntries = (arr) => {
        const { toggleBlur } = this.props
        arr.length > 0 ? toggleBlur(true) : toggleBlur(false)
        return arr; 
    }

    renderEntries() {
        const { entries } = this.state
        if (entries.length === 0) {
            return null
        } else {
            return (
                <div>
                    <ul>
                        {entries.map(({ id, name }) => (<li
                            key={id}
                            onClick={() => this.liSelect(name)}
                        >{name}</li>))}
                    </ul>
                </div>
            );
        }
    }
    liSelect = name => {
        this.setState(() => ({ label: name, entries: this.changeEntries([]) }))
    }

    render() {
        const { label } = this.state;
        return (
            <div className='city-search'>
                <form onSubmit={this.onSubmit} >
                    <input
                        placeholder="enter city name..."
                        type="text"
                        value={label}
                        onChange={this.onLabelChange}
                    />
                    <button><FontAwesomeIcon icon={faSearch} /></button>
                    {this.renderEntries()}
                </form>
            </div>
        )
    }
}