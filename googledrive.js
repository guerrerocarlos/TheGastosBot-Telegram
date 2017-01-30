var Spreadsheet = require('edit-google-spreadsheet');
var drive = module.exports = {}

var drivelizar = function(valor) {
  return String(valor).replace('.', ',')
}

drive.agregar = function(spreadsheet, info) {

  var info_a_agregar = [info.fecha, drivelizar(info.valor_usd), drivelizar(info.valor), info.moneda, info.descripcion, drivelizar(info.tasa_usd), info.por]

  console.log('info_a_agregar', JSON.stringify(info_a_agregar))
  var info_enviada = {}
  info_enviada[drive.nueva_fila] = {
    1: [
      // Fecha	Monto USD	Monto	Descripción	Tasa USD
      info_a_agregar
    ]
  }

  console.log('info_enviada', JSON.stringify(info_enviada))

  spreadsheet.add(info_enviada);
  drive.nueva_fila = drive.nueva_fila + 1
}

drive.guardar = function(spreadsheet) {
  spreadsheet.send(function(err) {
    if (err) throw err;
    console.log("Updated Cells");
  });
}

drive.cargarSpreadsheet = function(callback) {
  Spreadsheet.load({
    debug: true,
    // spreadsheetName: 'Gastos Diarios',
    spreadsheetId: "1XfY2o2Aeh3tVmaJ6NtkqSwE2oooAzjLDZhIAnlC5_eo",
    // worksheetName: 'Hoja 1',
    worksheetId: "od6",
    oauth2: {
      "client_id": "789464792087-96a5vouujio18fuanndv2auddui5llk8.apps.googleusercontent.com",
      "client_secret": "daoVxxmVO-4DeHso7D9VyJiT",
      "refresh_token": "1/6yKssZyYIW9_aAZvdiQ9ukkoF_3Yd2Cuzhsuca5bJiw"
    }

  }, function sheetReady(err, spreadsheet) {
    spreadsheet.receive(function(err, rows, info) {
      if (err) throw err;
      // console.log("Found rows:", rows);
      var filas_ocupadas = Object.keys(rows)
      console.log('filas_ocupadas', filas_ocupadas)
      var ultima_fila_ocupada = filas_ocupadas[filas_ocupadas.length - 1]
      console.log('ultima_fila_ocupada', parseInt(ultima_fila_ocupada) + 1)
      drive.nueva_fila = parseInt(ultima_fila_ocupada) + 1
      callback(spreadsheet)
    })
  })
}