'use strict';

var exportar = module.exports = {}
var fs = require('fs');
var app_id = "101ce61119404d0aa39f1bdee3a8e458"
var fx = require('money')
var RatesApi = require('openexchangerates-api');
var client = new RatesApi({
  appId: app_id
});

exportar.cuandoTerminaDeCargarMoney = function(hacerAlTerminar) {
  fs.readFile("rates.json", 'utf8', function(err, data) {
    fx.rates = JSON.parse(data)
    hacerAlTerminar()
  });
}

exportar.sacarRates = function() {
  return fx.rates
}


client.latest(function handleCurrencies(err, data) {
  if (err) {
    throw err;
  } else {

    fx.base = "USD";
    fx.rates = data.rates

    fs.writeFile("rates.json", JSON.stringify(data.rates), function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("Updated exchange rates have been saved!");
    });

  }
});

exportar.convertir = function(amount, from, to) {
  return fx.convert(amount, { from: from, to: to });
}