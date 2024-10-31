const express = require("express");
const router = express.Router();
const { Items } = require("../models");
const { body, validationResult } = require('express-validator');

const validateItem = [
  body('color').optional().isAlpha().withMessage('Color must be a string'),
  body('year').optional().isInt().withMessage('Year must be an integer'),
  body('mileage').optional().isInt().withMessage('Mileage must be an integer'),
  body('make').optional().isString().withMessage('Make must be a string'),
  body('model').optional().isString().withMessage('Model must be a string'),
  body('bhp').optional().isInt().withMessage('BHP must be an integer'),
  body('raaminess').optional().isInt().withMessage('Raaminess must be an integer'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('image').optional().isString().withMessage('Image must be a string'),
  body('price').optional().isInt().withMessage('Price must be an integer'),
];

//GET All Router
router.get("/", async (req, res, next) => {
    try {
      const items = await Items.findAll();
      res.send(items);
    } catch (error) {
      next(error);
    }
  });


  //GET One Router
  router.get("/:id", async (req, res, next) => {
    try {
      const item = await Items.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ message: "Item not found" }); // Return 404 if item is not found
    }
      res.status(200).send(item);
    } catch (error) {
      next(error);
    }
  });


  //POST Car Router
  router.post("/", validateItem, async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { color, year, mileage, make, model, bhp, raaminess, description, image, price } = req.body;
      const newItem = await Items.create({ color, year, mileage, make, model, bhp, raaminess, description, image, price });
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  });


  //DELETE Car Router
  router.delete("/:id", async (req,res, next) => {
    try{
      const deletedCar = await Items.findByPk(req.params.id);
      await Items.destroy({where: {id: req.params.id}});
      res.json(deletedCar)

    }catch(error){
      next(error)
    }
  })


  //UPDATE Car Router
  router.put("/:id", validateItem, async (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      await Items.update(req.body, { where: { id: req.params.id } });
      const item = await Items.findByPk(req.params.id);
      res.json(item);
    } catch (error) {
      next(error);
    }
  });
  
  module.exports = router;