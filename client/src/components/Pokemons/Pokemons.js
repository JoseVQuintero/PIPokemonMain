import React, { Component } from "react";
import { connect } from "react-redux";
import './Pokemons.css';
import nodata from '../../img/nodata.png';
import loadingsensor from "../../img/loading.gif";
import Pokemon from "../Pokemon/Pokemon";
import { setFilter, getPokemons, getTypes} from "../../actions";

export class Pokemons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "",
      type: "",
      page: this.props.pagep,
      imgIndex: 0,
      intervalWill:null
    };
  }

  componentDidMount() {
    this.props.getPokemons("");
    this.props.getTypes();  
    this.setState({
      page:0,
      intervalWill: setInterval(() => {
        const state = this.state;
        this.setState({
          imgIndex: state.imgIndex <= 1 ? state.imgIndex + 1 : 0,
        });
      }, 1500),
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalWill);
  }

  OrderhandleChange(event) {
    this.setState({ order: event.target.value, page: 0 });
    this.props.setFilter({ order: event.target.value, type: this.state.type });
  }
  TypehandleChange(event) {
    this.setState({ type: event.target.value, page: 0 });
    this.props.setFilter({ order: this.state.order, type: event.target.value });
  }
  PagehandleChange(event) {
    this.setState({ page: event.target.value });
    this.props.setFilter(this.state);
  }
  handleClick(param) {
    this.setState({ page: param.page, type: param.type, order: param.order });
    this.props.setFilter(this.state);
  }
  render() {
    const { pokemons, types, loading, pagep } = this.props;
    let { page, type, order, imgIndex } = this.state;
    return (
      <div className="container">
        <div>
          <div className="container-content">
            <div className="listFind">
              {pokemons?.length > 0 && !loading ? (
                <ul>
                  {pokemons[pagep===-1?page:pagep]?.map((r, i) => (
                    <li key={r.id}>
                      <Pokemon pokemon={r} type={type} imgIndex={imgIndex} />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="loading">
                  <img
                    src={loading ? loadingsensor : nodata}
                    width="160"
                    height="160"
                    alt=""
                  />
                </div>
              )}
            </div>
            <ul className="Pag">
              <li className="Pag-data">
                <button
                  onClick={this.handleClick.bind(this, {
                    page: 0,
                    type: type,
                    order: order,
                  })}
                >
                  First
                </button>
              </li>
              <li className="Pag-data">
                <button
                  disabled={page < pokemons?.length - 1 ? false : true}
                  onClick={this.handleClick.bind(this, {
                    page: page + 1,
                    type: type,
                    order: order,
                  })}
                >
                  Next
                </button>
              </li>
              <li>
                <ul className="PagScroll">
                  {pokemons?.map(
                    (r, i) =>
                      parseInt(page) - 2 < i &&
                      i < parseInt(page) + 2 && (
                        <li className="Pag-data" key={i} value={i}>
                          <button
                            style={{
                              color: parseInt(page) === i ? "#04AA6D" : "white",
                              background:
                                parseInt(page) === i ? "white" : "#04AA6D",
                            }}
                            onClick={this.handleClick.bind(this, {
                              page: i,
                              type: type,
                              order: order,
                            })}
                          >
                            {i + 1}
                          </button>
                        </li>
                      )
                  )}
                </ul>
              </li>
              <li className="Pag-data">
                <button
                  disabled={page >= 1 ? false : true}
                  onClick={this.handleClick.bind(this, {
                    page: page - 1,
                    type: type,
                    order: order,
                  })}
                >
                  Prev
                </button>
              </li>
              <li className="Pag-data">
                <button
                  onClick={this.handleClick.bind(this, {
                    page: pokemons?.length - 1,
                    type: type,
                    order: order,
                  })}
                >
                  Last ({pokemons?.length})
                </button>
              </li>
              <li>
                <ul>
                  <li>
                    <select
                      className="caja"
                      onChange={(e) => this.TypehandleChange(e)}
                    >
                      <option key={-1} value="">
                        Types ({types?.length})
                      </option>
                      {types?.map((r, i) => (
                        <option key={i} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </li>
                  <li>
                    <select
                      className="caja"
                      onChange={(e) => this.OrderhandleChange(e)}
                    >
                      <option key={0} value="">
                        Orders (10)
                      </option>
                      <option key={1} value="asc-name">
                        Name Asc
                      </option>
                      <option key={2} value="desc-name">
                        Name Desc
                      </option>
                      <option key={3} value="asc-life">
                        Life Asc
                      </option>
                      <option key={4} value="desc-life">
                        Life Desc
                      </option>
                      <option key={5} value="asc-attack">
                        Attack Asc
                      </option>
                      <option key={6} value="desc-attack">
                        Attack Desc
                      </option>
                      <option key={7} value="asc-defending">
                        Defending Asc
                      </option>
                      <option key={8} value="desc-defending">
                        Defending Desc
                      </option>
                      <option key={9} value="asc-speed">
                        Speed Asc
                      </option>
                      <option key={10} value="desc-speed">
                        Speed Desc
                      </option>
                    </select>
                  </li>
                  <li>
                    <select
                      className="caja"
                      value={parseInt(page)}
                      onChange={(e) => this.PagehandleChange(e)}
                    >
                      <option key={-1} value="0">
                        Pages ({pokemons?.length})
                      </option>
                      {pokemons?.map((r, i) => (
                        <option key={i} value={i}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pokemons: state.pokemons,
    types: state.types,
    loading: state.loading,
    pagep: parseInt(state.pagep),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPokemons: (title) => dispatch(getPokemons(title)),
    getTypes: () => dispatch(getTypes()),
    setFilter: (state) => dispatch(setFilter(state)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);