const express = require("express");
const router = express.Router();
const { Items } = require("../models");

router.get("/", async (req, res, next) => {
    try {
      const items = await Items.findAll();
      res.send(items);
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      // Destructure car details from the request body
      const {color, year, mileage, make, model, bhp, raaminess, description,image, price} = req.body;
  
      // Create a new item entry
      const newItem = await Items.create({color,year,mileage,make,model,bhp,raaminess,description,image,price});
  
      // Respond with the newly created item
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  });

  
  module.exports = router;