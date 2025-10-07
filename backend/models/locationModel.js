const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  Videograaf: String,
  Nummer: String,
  Filmnummer: String,
  Provincie: String,
  Gemeente: String,
  Plaats: String,
  Routenaam: String,
  Code1: String,
  Seizoen: String,
  Code2: String,
  Dieren: String,
  'Bijzonderheden | Opmerkingen': String,
  'Datum opname': String,
});

module.exports = mongoose.model('Location', locationSchema);