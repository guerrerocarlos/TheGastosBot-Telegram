'use strict';
var dinero = require('./convertir_dinero.js')
var drive = require('./googledrive.js')
var moment = require('moment')

var cerebro = module.exports = {}

var sacar_moneda = function(oracion, todas_las_monedas) {
  // console.log('todas_las_monedas', )
  console.log('\n')
  console.log(oracion)
  var monedas = ['DOLARES', 'USD', 'GRIVNAS', 'UAH', 'EUR', 'CAD', 'DÓLARES']
  monedas = monedas.concat(Object.keys(todas_las_monedas))
    // console.log('MONEDAS', monedas)
  var cambiar = { 'DOLARES': 'USD', 'GRIVNAS': 'UAH', 'DÓLARES': 'USD', 'DOLLARS': 'USD', "BUCKS": "USD" }
  var moneda_resultante = 'USD'
  monedas.forEach(function(moneda) {
    // console.log('Revisando moneda', moneda)
    if (moneda.length > 0 && oracion.toUpperCase().indexOf(moneda) > -1) {
      // console.log('oracion.toLowerCase().indexOf(moneda)', moneda, oracion.toUpperCase().indexOf(moneda))
      moneda_resultante = moneda
    }
  })
  var moneda_original = moneda_resultante
  if (Object.keys(cambiar).indexOf(moneda_resultante) > -1) {
    moneda_resultante = cambiar[moneda_resultante]
  }
  // console.log('RESULTADO', { codigo: moneda_resultante, original: moneda_original })
  return { codigo: moneda_resultante, original: moneda_original }
}

cerebro.procesar_oracion = function(oracion, spreadsheet, msg, bandera) {
  var resultado = {}
  resultado.moneda = "USD"
  resultado.fecha = moment().format('YYYY-MM-DD')
  resultado.valor = oracion.match(/-?\d+\.?\d*/)[0]
  var info_moneda = sacar_moneda(oracion, dinero.sacarRates())
  resultado.moneda = info_moneda.codigo
  resultado.descripcion = oracion
  resultado.valor_usd = dinero.convertir(resultado.valor, resultado.moneda, 'USD')
  resultado.tasa_usd = 1 / dinero.convertir(1, resultado.moneda, 'USD')
  if (msg != undefined) {
    resultado.por = msg.from.first_name + ' ' + msg.from.last_name + ' (' + msg.from.username + ')'
  }
  console.log(resultado)
  if (bandera != false) {
    drive.agregar(spreadsheet, resultado)
  }
}

dinero.cuandoTerminaDeCargarMoney(function(callback) {
  console.log('Money Exchanges Loaded!')
  if (callback) callback()
})

cerebro.procesar = function(oracion, msg) {
  drive.cargarSpreadsheet(function(spreadsheet) {
    cerebro.procesar_oracion(oracion, spreadsheet, msg)
    drive.guardar(spreadsheet)
  })
}