import {
  GET_POKEMONS,
  GET_TYPES,
  SET_FILTER,
  ADD_POKEMON,
  GET_POKEMONDETAILS,
  PUT_LOADING,
  MESSAGE_POKEMON,
} from "../actions/index";

const initialState = {
  pokemon: {},
  pokemons: [],
  pokemonAll: [],
  types: [],
  order: "",
  type: "",
  pagep: 0,
  message: "",
  loading: false,
  add:0
};

function rootReducer(state = initialState, action) {  
  if (action.type === PUT_LOADING) {
    return {
      ...state,
      loading: action.payload,
      pokemon: {}
      //pokemons: [],
      //pokemonAll: [],
    };
  }
  if (action.type === GET_POKEMONS) {
    return {
      ...state,
      pokemons: filterPokemons(action.payload, state.order, state.type),
      pokemonAll: action.payload,
      loading: false,
      pagep:0
    };
  }
  if (action.type === GET_TYPES) {
    return {
      ...state,
      types: action.payload,
    };
  }
  if (action.type === SET_FILTER) {
    return {
      ...state,
      pokemons: filterPokemons(state.pokemonAll, action.payload.order, action.payload.type),
      pagep:-1
    };
  }
  if (action.type === MESSAGE_POKEMON) {
    return {
      ...state,
      add: action.payload,
      message: "",
    };
  }
  if (action.type === ADD_POKEMON) {
    return {
      ...state,
      message: action.payload.message,
      loading: false,
      add: action.payload.add,
    };
  }
  if (action.type === GET_POKEMONDETAILS) { 
    return {
      ...state,
      pokemon: action.payload[0],
      loading: false,
    };
  }
  return state;
}


function paginated(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

function filterPokemons(data, order, type) {
  let orderBut = order.split("-");

  if (orderBut[0] === "asc") {
    data.sort((a, b) => {
      let fa, fb;
      if (orderBut[1] === "title") {
        fa = a[orderBut[1]].toLowerCase();
        fb = b[orderBut[1]].toLowerCase();
      } else {
        fa = a[orderBut[1]];
        fb = b[orderBut[1]];
      }

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  } else if (orderBut[0] === "desc") {
    data.sort((b, a) => {
      let fa, fb;
      if (orderBut[1] === "title") {
        fa = a[orderBut[1]].toLowerCase();
        fb = b[orderBut[1]].toLowerCase();
      } else {
        fa = a[orderBut[1]];
        fb = b[orderBut[1]];
      }

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  }

  
  if (type !== "") {
      return paginated(data.filter((r) => r.types.includes(type)), 12)
  } else { 
      return paginated(data, 12)
  }


}

export default rootReducer;
