module.exports = app => {
  const parrots = require("../controllers/parrot.controller.js");

  let router = require("express").Router();

  // Create a new Tutorial
  router.post("/", parrots.create);

  // Retrieve all Tutorials
  router.get("/", parrots.findAll);

  // Retrieve all published Tutorials
  router.get("/published", parrots.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", parrots.findOne);

  // Update a Tutorial with id
  router.put("/:id", parrots.update);

  // Delete a Tutorial with id
  router.delete("/:id", parrots.delete);

  // Delete all Tutorials
  router.delete("/", parrots.deleteAll);

  app.use("/api/parrots", router);
};
