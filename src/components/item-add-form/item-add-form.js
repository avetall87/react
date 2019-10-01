import React, { Component } from 'react'
import './item-add-form.css'

export default class ItemAddForm extends Component {

    state = {
        label:''
    };

    onLabelChange = (event) => {
        this.setState({
            label: event.target.value
        });
    };

    onSubmit = (event) => {
        event.preventDefault(); // не обрабатывать это событие
        this.props.onItemAdded(this.state.label);
        this.setState({
            label:''
        })
    };

    render() {
        return (
          <form className="item-add-form d-flex"
                onSubmit={this.onSubmit}>
              {/*{this.state.label}*/}
              <input type="text"
                     className="form-control"
                     onChange={this.onLabelChange}
                     placeholder="что должно быть сделано !"
                     value={this.state.label} // контролируемый элемент из react ! Значение устанавливаем из state
              />
              <button className="btn btn-outline-secondary">
                  Add text element
              </button>
          </form>
        );
    }
}