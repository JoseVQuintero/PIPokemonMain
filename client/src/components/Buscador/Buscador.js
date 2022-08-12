import React, { Component } from "react";
import { connect } from "react-redux";
import './Buscador.css';
import { getPokemons, getTypes } from "../../actions";
export class Buscador extends Component {
  constructor(props) {
      super(props);
      this.state = {
        title: ""
      };
  }

  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  async handleSubmit (event) {
    event.preventDefault();
    await this.props.getPokemons(this.state.title);
    await this.props.getTypes();
  }

  render() {
    const { title } = this.state;
    return (
      <ul  style={{ margin: "2px" }}>
        <form className="searchbarForm" onSubmit={(e) => this.handleSubmit(e)}>
          <input
            className="searchbar"
            style={{ width: "300px" }}
            type="text"
            placeholder="Pokemon name..."
            value={title}
            onChange={(e) => this.handleChange(e)}
          />
          <input type="submit" value="Find" />
        </form>
      </ul>
    );
  }  
}

function mapDispatchToProps(dispatch) {
  return {
    getPokemons: (title) => dispatch(getPokemons(title)),
    getTypes: () => dispatch(getTypes())
  };
}

export default connect(null, mapDispatchToProps)(Buscador);