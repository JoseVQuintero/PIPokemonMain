const { Pokemons, conn } = require("../../src/db.js");
const { expect } = require("chai");

const pokemonCreated = {
  name: "New Pokemon126",
  height: 11,
  weight: 11,
  life: 11,
  attack: 11,
  defending: 11,
  speed: 11
};

describe("Pokemon model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Pokemons.sync({ force: true }));
    describe("Created valid pokemon", () => {
      it("should throw an error if pokemon is empty", (done) => {
          Pokemons.create({})
          .then(() => { done(new Error("It requires a valid pokemon")) })
            .catch((error) => {
              expect(error.message).to.include("cannot be null");
              done();
            }
            );
      });
      it("should work when its a valid pokemon", () => {
          Pokemons.create(pokemonCreated)
          .then((pokemon) => {
            expect(pokemon.toJSON()).to.include(pokemonCreated);
          })
          .catch((error) => {
            console.log(error);
          });        
      });
      it("should workn't when its a name duplicate", () => {

          Pokemons.create(pokemonCreated)
          .then((pokemon) => {
            Pokemons.create(pokemonCreated)
            .then((pokemon) => {
              expect(pokemon.toJSON()).to.include(pokemonCreated);
            })
            .catch((error) => {
              expect(error.name).to.include("SequelizeUniqueConstraintError");
              done();
            });
          })
          .catch((error) => {
            console.log(error);
          });
        
      });
    });
  });
});