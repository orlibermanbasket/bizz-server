const express = require("express");
const joi = require("joi");
const auth = require("../middlewares/auth");
const Card = require("../models/card");
const router = express.Router();
const cardSchema = joi.object({
  userId: joi.string(),
  buisnessName: joi.string().required().min(2),
  buisnessDescription: joi.string().required().min(3),
  buisnessAdress: joi.string().required().min(3),
  buisnessPhone: joi.string().required().min(9).max(10),
  buisnessImage: joi.string().required(),
  _id: joi.string(),
});

router.post("/", auth, async (req, res) => {
  console.log(req.payload);
  try {
    req.body.buisnessPhone = req.body.buisnessPhone.toString()
    if (!req.payload.isBuisness)
      return res.status(400).send("Access denied. No buisness-man permission");
    const { error } = cardSchema.validate(req.body);
    
    
    if (error) return res.status(400).json({ error: error.message });
    let card = new Card({ ...req.body, userId: req.payload._id });
    console.log(card);
    await card.save();
    res.status(201).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/", auth, async (req, res) => {
  try {
    let cards = await Card.find();
    res.status(200).send(cards);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/:userId", auth, async (req, res) => {
  try {
    let card = await Card.find({ userId: req.payload._id });
    if (!card) return res.status(404).send("No such card");
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.put("/:cardId", auth, async (req, res) => {
  try {
   
    req.body.buisnessPhone = req.body.buisnessPhone.toString()
    // check if user bizz
    if (!req.payload.isBuisness)
      return res.status(400).send("Access denied. No bizz permission");
    // joi validation
    const { error } = cardSchema.validate(req.body);
    
    console.log(error);
    if (error) return res.status(400).send("Wrong body");
   
    // find the card and update it
    let card = await Card.findOneAndUpdate(
      { _id: req.params.cardId },
      req.body,
      { new: true });
    if (!card) return res.status(404).send("No such card");
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.delete("/:cardId", auth, async (req, res) => {
  try {
    console.log(req.payload.isBuisness);
    if (!req.payload.isBuisness)
  
      return res.status(400).send("Access denied. No admin permission");
    let card = await Card.findOneAndRemove({ _id: req.params.cardId });
    // let card = await Card.findById(req.params.cardId);
    if (!card) return res.status(404).send("No such card");
    res.status(200).send(card);
  } catch (error) {
    
    res.status(400).send(error);
  }
});
module.exports = router;