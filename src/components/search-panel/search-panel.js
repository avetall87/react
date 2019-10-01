import React, {Component} from 'react'

import './search-panel.css';

export default class SearchPanel extends Component {

    state = {
        term: ''
    };

    onSearchChange = (event) => {

      const term = event.target.value;
      this.setState({ term });
      this.props.onSearchChange(term);

    };

    render() {
        return (
            <input type="text"
                   className="form-control search-input"
                   placeholder="введите для поиска"
                   onChange={this.onSearchChange}
                   value={this.state.term}/>
        );
    }

};