const express = require('express');
const router = express.Router();
const Die = require('../models/die');
const { db } = require('../lib/db');
const { isEnabled } = require('unleash-client');

router.get('/', async (req, res) => {
  let die = new Die(req.query.sides);
  let roll = die.roll();
  let message = `A die with ${die.sides} sides just rolled a ${roll}.`;
  await saveRoll(die.sides, roll);

  if (isEnabled('notdj-1')) {
    let die2 = new Die(req.query.sides);
    let roll2 = die2.roll();
    let die3 = new Die(req.query.sides);
    let roll3 = die3.roll();
    message = `Two dice each with ${die.sides} sides just rolled a ${roll} and ${roll2} and ${roll3}.`;
    await saveRoll(die2.sides, roll2);
  }

  res.send(message)
});


let saveRoll = async function (sides, rollResult) {
  try {
    await db.none(`INSERT INTO roll_history(die_sides, result) VALUES (${sides}, ${rollResult});`);
  } catch (e) {
    console.log('Failed to log roll history.');
    console.log(e);
  }
};

module.exports = router;
