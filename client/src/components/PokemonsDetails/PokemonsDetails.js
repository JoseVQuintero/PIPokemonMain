import React, { Component } from "react";
import { connect } from "react-redux";
import nodata from "../../img/nodata.png";
import loadingsensor from "../../img/loading.gif";
import './PokemonsDetails.css';
import { getPokemonsDetail } from "../../actions";

export class PokemonsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: {},
      imgIndex: 0,
      intervatWill: null
    };
  }

  
  componentDidMount() {
    const pokemonId = this.props.pokemonId;
    this.props.getPokemonsDetail(pokemonId);
    this.setState({ intervatWill:
        setInterval(() => {
        const state = this.state;
        this.setState({ imgIndex: state.imgIndex <= 1 ? state.imgIndex + 1 : 0 });
      }, 1000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervatWill);
  }

  render() {
    const { pokemon, loading } = this.props;
    const { imgIndex } = this.state;

    return pokemon?.name ? (
      <div>
        <div className="container">
          <div className="card">
            <div className="card-header">
              <div className="card-title-group">
                <b>
                  <h5 className="card-title">{pokemon.name?.trim()}</h5>
                </b>
              </div>
            </div>
            <div className="card-like-bar">
              <div className="like-text">{pokemon.types?.join(", ")}</div>
            </div>
            <img
              className="card-image"
              src={pokemon.images[imgIndex]}
              width="180"
              height="180"
              alt="Logo"
            />
            <div className="box-cart">
              <table style={{ borderSpacing: "5px 2px" }}>
                <thead>
                  <tr style={{ fontSize: "8pt" }}>
                    <th>Life</th>
                    <th>Attack</th>
                    <th>Defending</th>
                    <th>Speed</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{pokemon.life}</td>
                    <td>{pokemon.attack}</td>
                    <td>{pokemon.defending}</td>
                    <td>{pokemon.speed}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <pre className="container-details">
          {JSON.stringify(pokemon.data, null, 2)}
        </pre>
      </div>
    ) : (
      <div className="loading">
        <img
          src={loading ? loadingsensor : nodata}
          width="160"
          height="160"
          alt=""
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pokemon: state.pokemon,
    loading: state.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPokemonsDetail: (id) => dispatch(getPokemonsDetail(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonsDetails);


