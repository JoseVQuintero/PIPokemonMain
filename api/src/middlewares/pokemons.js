const { Router } = require("express");
const { Op, Pokemons, Types } = require("../db");
const axios = require("axios").default;
const router = Router();

const ModelPokemon = (json) => {
  return json.data ?{
          id: json.data.id,
          name: json.data.name,
          images: [
            json.data.sprites.back_default,
            json.data.sprites.back_shiny,
            json.data.sprites.front_default,
          ],
          height: json.data.height,
          weight: json.data.weight,
          types: json.data.types.map((t) => t.type.name),
          life: json.data.stats.filter((stat)=> stat.stat.name==="hp")[0].base_stat||null,
          attack: json.data.stats.filter((stat)=> stat.stat.name==="attack")[0].base_stat||null,
          defending: json.data.stats.filter((stat)=> stat.stat.name==="defense")[0].base_stat||null,
          speed: json.data.stats.filter((stat)=> stat.stat.name==="speed")[0].base_stat||null,
          data:json.data
        }:{};
};

const ModelBDPokemon  = (json) => json?.map((r) => {  
    r["images"] = [
      "https://st2.depositphotos.com/5675002/11678/i/600/depositphotos_116786710-stock-photo-volumetric-image-pokeball-on-a.jpg",
      "https://i.pinimg.com/originals/a7/73/64/a773645c4ef8e7c77eee0f70e3e9e5a4.jpg",
      "https://st2.depositphotos.com/5675002/11678/i/600/depositphotos_116786710-stock-photo-volumetric-image-pokeball-on-a.jpg",
    ];
    r.types = r.types?.map((d) => d.name);
    return r;
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  try {    
        axios.get("https://pokeapi.co/api/v2/pokemon/" + id)
        .then(function (json) {
            //return Types.bulkCreate([...response.data.results, ...[{ name: 'prueba' }]], {
            return res.status(200).json([ModelPokemon(json)]);
        }).catch((response) => {         
          
            Pokemons.findAll({
               include: [
                          { model: Types, attributes: ["name"], group: ["name"] },
                        ],
              where: {
                id: [id],
              },
            }).then((data) => {
              const result = ModelBDPokemon(data?.map((el) => el.get({ plain: true })));
              return res.status(200).json(result);
            }).catch((response) => {
              return res.status(404).send({ error: "Id undefined" });
            });

      });
  } catch (e) {
    return res.status(404).send({ error: e.message });
  }
});

router.get("/", (req, res, next) => {
  const name = req.query.name;
  if (typeof req.query.name !== 'undefined') {    
    try {    
      axios
        .get("https://pokeapi.co/api/v2/pokemon/" + name)
        .then(function (json) {
          //return Types.bulkCreate([...response.data.results, ...[{ name: 'prueba' }]], {
          return res.status(200).json([ModelPokemon(json)]);
        })
        .catch((response) => {

              Pokemons.findAll({
                  include: [
                    { model: Types, attributes: ["name"], group: ["name"] },
                  ],
                  where: {
                    name: [name],
                  },
              })
              .then((data) => {
                const result = ModelBDPokemon(
                  data?.map((el) => el.get({ plain: true }))
                );
                return res.status(200).json(result);
              })
              .catch((response) => {
                return res.status(404).send({ error: "Id undefined" });
              });
            
        });
    } catch (e) {
      res.status(404);
      res.json({ error: e.message });
    }
  } else {
    next();
  }
});

router.get("/", (req, res) => { 
  try {
    
          axios
          .get("https://pokeapi.co/api/v2/pokemon")
          .then(function (response) {
            let results = [];
            results = [...results, ...response.data.results];
            axios.get(response.data.next).then(function (response) {
              results = [...results, ...response.data.results];
              const promiAllList = results.map((data) => axios(data.url));
              Promise.all(promiAllList)
                .then((responses) => {

                    const pokemons = responses.map((json) => {
                      return ModelPokemon(json);
                    });

                    Pokemons.findAll({
                      include: [
                        { model: Types, attributes: ["name"], group: ["name"] },
                      ],
                    })
                    .then((data) => {
                      const result = ModelBDPokemon(
                        data?.map((el) => el.get({ plain: true }))
                      );
                      return res.status(200).json([...pokemons, ...result]);
                    })
                    .catch((response) => {
                      return res.status(404).json({ error: "BD Fail" });
                    });
                  
                })
                .catch(function (error) {
                  console.log(error);
                });
              
            });
          })
          .catch(function (error) {
            return res.status(200).json([]);
          }); ;  
    
  } catch (e) {

    return res.status(404).json({ error: e.message });

  }
});

router.post("/", (req, res) => {

  const { name } = req.body.state;
  if (!name) return res.status(404).send("Falta enviar datos obligatorios");
  try {   

        /*Pokemons.create(req.body.state, {
          include: [
            {
              model: Types,
              //upsertKeys: ["id"],
              //updateOnDuplicate: ["name"],
              //ignoreDuplicates: true,
            },
          ],
        })
        .then((data) => {
          return res.status(201).json(data);
        })
        .catch((response) => {
          return res
            .status(404)
            .json({ error: "Create Pokemon BD", details: response.name });
        });*/
    
        const data = req.body.state;
    
        Pokemons.create(
          {
              name: data.name,
              height: data.height,
              weight: data.weight,
              life: data.life,
              attack: data.attack,
              defending: data.defending,
              speed: data.speed
          }
        ).then((Pokemon) => {

          Types.findAll({
            attributes: ["id"], group: ["id"],
            where: {
              name: {
                [Op.in]: data.types.map((type) => type?.name),
              }
            }
          }).then((response) => {
            const types = response?.map((el) => el.get({ plain: true }).id);
            Pokemon.setTypes(types);            
            return res.status(201).json({ success: true, details: response?.name });
          }).catch((response) => {
            console.log(response)
            return res.status(404).json({ error: "Fail Find Pokemons BD", details: response?.name });
          });
          
        }).catch((response) => {
          console.log(response)
          return res.status(404).json({ error: "Fail Create Pokemons BD", details: response?.name });
        }); 
    
    
    
  } catch (err) {
    res.status(404).send("Error en alguno de los datos provistos");
  }

});

module.exports = router;