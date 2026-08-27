const {model} = require('mongoose');

const {ServicesSchema} = require('../schemas/ServicesSchema');

const ServicesModel = new model("service",ServicesSchema);

module.exports = {ServicesModel};