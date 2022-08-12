import React, { Component } from "react";
import { connect } from "react-redux";
import './PokemonsCreate.css';
import { addPokemon, messagePokemon } from "../../actions";
import ok from "../../img/ok.png";
import fail from "../../img/error.png";
import loadingsensor from "../../img/loading.gif";

export class PokemonsCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors:{},
      name: '',
      types:this.props.types,
      intervalWill : null
    };
    this.state.types = this.props.types;

    //this.state["errors"] = {};
  }

  /*componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({ recipe: nextProps.recipe });
  }*/

  /*componentWillMount() {
    const recipeId = this.props.recipeId;
    if (recipeId) {
      this.props.getRecipeDetail(recipeId);
    }
  }*/


  validate() {
    let input = this.state;
    let errors = {};
    if (input.name === "" || !input?.name) {
      errors.name = "Name is required";
    }

    if (input.height <= 10 || !input?.height) {
      errors.height = "Height is required";
    }

    if (input.weight <= 10 || !input?.weight) {
      errors.weight = "Weight isn't >=10";
    }

    if (input.life <= 10 || !input?.life) {
      errors.life = "Life is required";
    }

    if (input.attack <= 10 || !input?.attack) {
      errors.attack = "Attack isn't >=10";
    }

    if (input.defending <= 10 || !input?.defending) {
      errors.defending = "Defending isn't >=10";
    }

    if (input.speed <= 10 || !input?.speed) {
      errors.speed = "Speed isn't >=10";
    }

    if (input.types?.length <= 0) {
      errors.types = "Types is Empty";
    }

    return errors;
  }

  async handleInputChange(event) {
    await this.setState({
      [event.target.name]: event.target.value,
      errors: await this.validate(),
    });
  }

  async handleInputMultipleChange(event) {
    await this.setState({
      [event.target.name]: Array.from(
        event.target.selectedOptions,
        (option) => option.value
      ),
      errors: await this.validate(),
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.setState({ errors: await this.validate() });

    if (Object.getOwnPropertyNames(this.state.errors).length === 0) {
      const addPokemon = {
        name: this.state.name,
        height: this.state.height,
        weight: this.state.weight,
        life: this.state.life,
        attack: this.state.attack,
        defending: this.state.defending,
        speed: this.state.speed,
        types: Array.from(this.state.types, (item) => {
          return { name: item };
        }),
      };

      await this.props.addPokemon(addPokemon);
      await this.setState({ intervalWill:setInterval(() => {
        this.props.messagePokemon(0);
        clearInterval(this.state.intervalWill)
        }, 3000)
      })
    }
  }

  render() {
    const { types, loading, add, message } = this.props;
    const { errors, name } = this.state;

    return (
      <div>
        <div
          style={{ zIndex: "9999", display: "flex", flexDirection: "column" }}
          className="container"
        >
          {loading || add > 0 ? (
            <img
              src={add === 0 ? loadingsensor : add === 1 ? ok : fail}
              width="180"
              height="180"
              alt=""
            />
          ) : null}
          <p>
            <label style={{ backgroundColor: "red", color: "white" }}>
              {message}
            </label>
          </p>
        </div>
        <div className="container createForm">
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <label style={{ backgroundColor: "#04AA6D", color: "white" }}>
              New Pokemon
            </label>

            <label>Pokemon Name:</label>
            <input
              className="pokemonName notsearch"
              type="text"
              name="name"
              value={name}
              onChange={(e) => this.handleInputChange(e)}
            />
            {errors.name && <p className="danger">{errors.name}</p>}

            <label>Height:</label>
            <input
              type="number"
              name="height"
              onChange={(e) => this.handleInputChange(e)}
              //value={healthScore}
            />
            {errors.height && <p className="danger">{errors.height}</p>}
            <label>Weight:</label>
            <input
              type="number"
              name="weight"
              onChange={(e) => this.handleInputChange(e)}
              //value={weightWatcherSmartPoints}
            />
            {errors.weight && <p className="danger">{errors.weight}</p>}

            <label>Life:</label>
            <input
              type="number"
              name="life"
              onChange={(e) => this.handleInputChange(e)}
              //value={healthScore}
            />
            {errors.life && <p className="danger">{errors.life}</p>}
            <label>Attack:</label>
            <input
              type="number"
              name="attack"
              onChange={(e) => this.handleInputChange(e)}
              //value={weightWatcherSmartPoints}
            />
            {errors.attack && <p className="danger">{errors.attack}</p>}
            <label>Defending:</label>
            <input
              type="number"
              name="defending"
              onChange={(e) => this.handleInputChange(e)}
              //value={weightWatcherSmartPoints}
            />
            {errors.defending && <p className="danger">{errors.defending}</p>}
            <label>Speed:</label>
            <input
              type="number"
              name="speed"
              onChange={(e) => this.handleInputChange(e)}
              //value={weightWatcherSmartPoints}
            />
            {errors.speed && <p className="danger">{errors.speed}</p>}
            <label>Types:</label>
            <select
              multiple={true}
              name="types"
              style={{ height: "100px" }}
              defaultValue={this.state.types}
              onChange={(e) => this.handleInputMultipleChange(e)}
            >
              {types?.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
            {errors.types && <p className="danger">{errors.types}</p>}
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pokemon: state.pokemon||[],
    types: state.types,
    loading: state.loading,
    add: state.add,
    message: state.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPokemon: (state) => dispatch(addPokemon(state)),
    messagePokemon: (state) => dispatch(messagePokemon(state)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonsCreate);


