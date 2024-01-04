const mongoose = require('mongoose');
require('mongoose-type-email');

const paymentSchema = new mongoose.Schema({
 category: {
   type: String,
   required: true
 },
 mode: {
   type: String,
   required: true
 },
 amount: {
   type: Number,
   required: true
 },
 date: {
   type: Date,
   required:true,
 },
 time: {
   type: String,
   required: true
 },
 receiver: {
   type: mongoose.SchemaTypes.Email,
   required: true
 },
 payer: {
   type: mongoose.SchemaTypes.Email,
   required: true
 }
});
