var conDb = require("../lib/conexionbd.js");

function armarQuery(req) {
  var sql = " from pelicula";

  var cantidadReq = false;
  if (req.query.titulo || req.query.genero || req.query.anio) {
    sql = sql.concat(" where ");
    if (req.query.titulo) {
      sql = sql.concat('titulo like "%' + req.query.titulo + '%"');
      cantidadReq = true;
    }
    if (req.query.genero) {
      if (cantidadReq) {
        sql = sql.concat(" and ");
      }
      sql = sql.concat(" genero_id = " + req.query.genero);
      cantidadReq = true;
    }
    if (req.query.anio) {
      if (cantidadReq) {
        sql = sql.concat(" and ");
      }
      sql = sql.concat(" anio = " + req.query.anio);
    }
  }
  if (req.query.tipo_orden) {
    sql = sql.concat(
      " order by " + req.query.columna_orden + " " + req.query.tipo_orden
    );
  }
  if (req.query.cantidad) {
    sql = sql.concat(" limit 0," + req.query.cantidad);
  }
  sql = sql.concat(";");
  console.log(sql);
  return sql;
}

function todasPeliculas(req, res) {
  var query = armarQuery(req);
  var sql = "select *".concat(query);
  var count = "select count(id) as total".concat(query);
  conDb.query(sql, function(error, resultado) {
    conDb.query(count, function(errorCount, resultadoCount) {
      var respuesta = {
        peliculas: resultado,
        total: resultadoCount[0].total
      };
      console.log(respuesta);
      res.send(respuesta);
    });
  });
}
function todosGeneros(req, res) {
  var sql = "select * from genero;";
  conDb.query(sql, function(error, resultado) {
    var respuesta = {
      generos: resultado
    };
    res.send(respuesta);
  });
}
module.exports = {
  todasPeliculas: todasPeliculas,
  todosGeneros: todosGeneros
};
