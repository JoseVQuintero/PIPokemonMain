import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Nav from "./components/NavBar/NavBar";
import onSearch from "./components/Buscador/Buscador";
import Pokemons from "./components/Pokemons/Pokemons";
import CreatePokemon from "./components/PokemonsCreate/PokemonsCreate";
import DetailsPokemon from "./components/PokemonsDetails/PokemonsDetails";
import { getPokemonsDetail/*, getTypes, getPokemons*/ } from "./actions";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {   
    /*this.props.getPokemons("");
    this.props.getTypes();    */
  }

  render() {
    const { location } = this.props;
    return (
      <div className="App">
        <Route path="/" exact component={Landing} />
        {location.pathname !== "/" ? (
          <Route
            render={() => (
              <Nav onSearch={onSearch} active={location.state?.extraData} />
            )}
          />
        ) : <div style={{height:'500px',borderRadius: '2px',background: 'linear-gradient(to top, rgb(255,255,255,0.01)  , rgb(255,255,255,1)  )',textAlign:'left',textShadow: '1px 3px green', color:'white',fontSize:'70pt'}}>Pokemons</div>}
        <Route
          path="/detailsPokemon/:pokemon"
          exact
          render={({ match }) => (
            <DetailsPokemon pokemonId={match.params.pokemon} />
          )}
        />
        <Route
          path="/createPokemon"
          exact
          render={() => (
            <CreatePokemon/>
          )}
        />

        <Route path="/home" exact render={() => <Pokemons />} />
      </div>
    );
  }
}



function mapDispatchToProps(dispatch) {
  return {
    /*getPokemons: (title) => dispatch(getPokemons(title)),
    getTypes: () => dispatch(getTypes()),*/
    getPokemonsDetail: (state) => dispatch(getPokemonsDetail(state)),
  };
}

export default connect(null, mapDispatchToProps)(withRouter(App));
