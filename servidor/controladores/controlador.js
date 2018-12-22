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
  return sql;
}
function peliculaId(id, res) {
  // agregar la busqueda del genero al query
  var sql =
    "SELECT * FROM pelicula LEFT JOIN actor_pelicula ON pelicula.id = actor_pelicula.pelicula_id JOIN actor ON actor_pelicula.actor_id = actor.id where pelicula.id=" +
    id +
    ";";
  conDb.query(sql, function(error, resultado) {
    var generoSql =
      "SELECT * FROM genero where id=" + resultado[0].genero_id + ";";
    conDb.query(generoSql, function(error, resultadoGenero) {
      var actores = [];
      console.log(resultadoGenero);
      var pelicula = {
        titulo: resultado[0].titulo,
        duracion: resultado[0].duracion,
        director: resultado[0].director,
        poster: resultado[0].poster,
        anio: resultado[0].anio,
        fecha_lanzamiento: resultado[0].fecha_lanzamiento,
        trama: resultado[0].trama,
        puntuacion: resultado[0].puntuacion,
        nombre: resultadoGenero[0].nombre
      };
      resultado.forEach(element => {
        actores.push(element);
      });
      var respuesta = {
        pelicula: pelicula,
        actores: actores
      };
      res.send(respuesta);
    });
  });
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
  todosGeneros: todosGeneros,
  peliculaId: peliculaId
};
