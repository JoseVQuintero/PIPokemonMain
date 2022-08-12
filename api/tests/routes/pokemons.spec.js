/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemons, conn } = require('../../src/db.js');

const agent = session(app);

const pokemonCreated = {
  name: "New Pokemon126",
  height: 11,
  weight: 11,
  life: 11,
  attack: 11,
  defending: 11,
  speed: 11,
  types: [{ name: "normal" }, { name: "fighting" }],
};

describe('Pokemons routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  

  beforeEach(() => Pokemons.sync({ force: true }).then(() => {    

  }));

  describe("POST created /pokemons", async () => {
    it("should post created pokemons 200", async () =>
      await agent.post("/pokemons").send({ state: pokemonCreated }).expect(201));
  });

  describe('GET /pokemons', async () => {
    it("should get pokemons 200", async () =>       
      await agent.get("/pokemons").expect(200)
  );
  });

  describe("GET /pokemons/:id", () => {
    it("should get pokemons/:id 200", async () =>
      await agent.get("/pokemons/2").expect(200));
  });

  describe("GET /pokemons?name=", () => {
    it("should get pokemons?name= 200", async () =>
      await agent.get("/pokemons?name=blastoise").expect(200));
  });

  describe("GET /types", () => {
    it("should get types 200", async () =>
      await agent.get("/types").expect(200));
  });

});
