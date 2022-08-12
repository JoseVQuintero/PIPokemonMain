import React, { Component } from "react";
import { connect } from 'react-redux';
import './Pokemon.css';
import { Link } from "react-router-dom";


class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
 
  render() {
    const { pokemon, imgIndex } = this.props;
    return (
      <div className="pokemonFlex">
        <div className="wrapper">
          <div className="pokemon-cart">
            <div className="pokemon-cart-image">
              <Link
                style={{ color: "black", background: "none" }}
                to={`/detailsPokemon/${pokemon.id}`}
              >
                <img
                  src={pokemon?.images[imgIndex]}
                  width="120"
                  height="120"
                  alt=""
                />
              </Link>
            </div>
            <div className="box-cart">
              <p style={{scrollbarWidth: 'thin',height:'25px',overflowY: 'scroll'}}>{pokemon.types.join(" , ")}</p>
              <p><b>{pokemon.name.trim()}</b></p>
            </div>
            <div className="box-cart">
              <table style={{ borderSpacing: "5px 2px" }}>
                <thead>
                  <tr style={{fontSize:'8pt'}}>
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
      </div>
    );
  }
}
  
export default connect(null, null)(Pokemon);