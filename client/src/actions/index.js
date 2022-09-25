//import recurso from "../data.json";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const PUT_LOADING = "PUT_LOADING";
export const SET_FILTER = "SET_FILTER";
export const ADD_POKEMON = "ADD_RECIPE";
export const GET_POKEMONDETAILS = "GET_POKEMONDETAILS";
export const MESSAGE_POKEMON = "MESSAGE_POKEMON";

//const apiKey = "d6a233caafc94977b208b4730974f683";
const { REACT_APP_API_URL = "http://localhost:3001" } = process.env;

//pedir la peli api
/*export function getMyRecipe(query) {
  return function (dispatch) {
    return fetch(`${REACT_APP_API_URL}/recipe?name=${query}`)
      .then((response) => response.json()) //despues
      .then((json) => {
        const dataJson = json?.map((r) => {
            r["image"] = "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2019/10/avocado.jpeg";
            r["title"] = r.name;
            r["ins"] = null;
            r["my"] = null;
            r.diets = r.diets?.map((d) => d.name);
            return r;
        });
        
        dispatch({ type: GET_MY_RECIPE, payload: dataJson });
      });
  };
}*/

//pedir la peli api
/*export function getDiets(id) {
    return function(dispatch) {
        return fetch("http://www.omdbapi.com/?apikey=8c5e867f&i=" + id)
        .then(response => response.json())//despues
        .then(json => {
            console.log(json)
            dispatch({ type: GET_MOVIE_DETAIL, payload: json });
        });
    };
}*/

//pedir la peli api
export function getTypes() {
  return function (dispatch) {
    return fetch(`${REACT_APP_API_URL}/types`)
      .then((res) => res.json())
      .then((result) => {
        const types = result?.map((d) => d.name) || [];
        //setDiet((diet) => [...diet, ...dataDiets]);
        dispatch({ type: GET_TYPES, payload: types });
      });
  };
}

/* async function getPokemons(url) {
  const response = await fetch(url);
  return response.json();
} */

/*async function dispatchPokemon() {
  return await fetch(`https://pokeapi.co/api/v2/pokemon`)
    .then((response) => response.json())
    .then((json) => {
      let results = [];      
      results = [...results, ...json.results];      
      return fetch(json.next)
        .then((response) => response.json())
        .then((json) => {
          results = [...results, ...json.results];
          let promiAllList = []; 
          results.forEach((data) => promiAllList.push(fetch(data.url)));
          return Promise.all(promiAllList)
            .then((responses) => {
              return responses;              
            })
            .catch(function (error) {
              console.log(error);
            });
        });
    }); 
}*/

/*export function getSpoonacular(query) {
  return function (dispatch) {
    return dispatchPokemon()
      .then((result) => {
        result.forEach((response) => {          
          response.json().then((json) => {
            if(json.name.includes(query))
            dispatch({
              type: GET_POKEMONS, payload: [{
                id: json.id,
                name: json.name,
                images: [
                  json.sprites.back_default,
                  json.sprites.back_shiny,
                  json.sprites.front_default,
                ],
                height: json.height,
                weight: json.weight,
                types: json.types.map((t) => t.type.name),
                life: null,
                attack: null,
                defending: null,
                speed: null,
              }]
            });            
          });
        });
      }
      );
  };
}*/

export function getPokemons(query) {  
  return function (dispatch) {
    dispatch({ type: PUT_LOADING, payload: true });
    return fetch(`${REACT_APP_API_URL}/pokemons${query.trim()!==''?'?name='+query:''}`)
      .then((res) => res.json())
      .then((result) => {
        dispatch({ type: GET_POKEMONS, payload: result });
      });
  };
}

//pedir la peli api
/*export function getSpoonacular(query) {
  return function (dispatch) {     
    let data = [];
    await dispatchPokemon().then((result) => data=result);
    return dispatch({ type: GET_POKEMONS, payload: data });
    //const temp = getPokemons("https://pokeapi.co/api/v2/pokemon");
    //const temp2 = temp.then((response)=>getPokemons(temp.next))
    //console.log(temp.results.next);
    //console.log(temp2);
        //return dispatch({ type: GET_POKEMONS, payload: temp });                     
    };
}*/

//pedir la peli api
/*export function getSpoonacular(query) {
  return function (dispatch) {
    return dispatch({
      type: GET_POKEMONS,
      payload: recurso?.filter((r) => r.name.includes(query)),
    });
  };
}*/

export function setFilter(state) {
  return function (dispatch) {
    return dispatch({
      type: SET_FILTER,
      payload:state
    });
  };
}

/*export function getReset() {
  return function (dispatch) {
    return dispatch({
      type: GET_POKEMONS_RESET
    });
  };
}*/

export function addPokemon(state) {
  return function (dispatch) {
   dispatch({ type: PUT_LOADING, payload: true });
    return fetch(`${REACT_APP_API_URL}/pokemons`, {
      method: "POST",
      body: JSON.stringify({ state }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => { return { message: res.json(), add: parseInt(res.status) <= 201 ? 1 : 2 }; })
      .then((res) => {
        res.message.then((response) => {
           dispatch({
             type: ADD_POKEMON,
             payload: { message: response?.details, add: res.add },
           });
        });
      });
 };
}


export function getPokemonsDetail(query) {
  return function (dispatch) {
    dispatch({ type: PUT_LOADING, payload: true });
    return fetch(`${REACT_APP_API_URL}/pokemons/${query}`)
      .then((res) => res.json())
      .then((result) => {
        dispatch({ type: GET_POKEMONDETAILS, payload: result });
      });
  };
  
}


export function messagePokemon(status) {
  return function (dispatch) {
    dispatch({ type: MESSAGE_POKEMON, payload: status });
  };
};


