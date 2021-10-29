var express = require('express');
var router = express.Router();

//DB MYSQL
const pool = require('./db_connection');


router.get('/', (req, res) => {
    res.json({ mensaje: 'Hola Mundo, server-back' });
});

//Listar usuarios
router.post('/listUsuario', async function(req,res){

  console.log(req.body);
  try {
    var sql = `SELECT id,nombre,apellido,nickname,correo,contrasenia,telefono from usuario;`

     pool.query(sql,function(err,result, fields){
        if (err) {
          res.status(200).json({msj:"error"});
        }
        res.status(200).json(result);
      });
      
  } catch (error) {
    res.status(200).json({msj:"error"});
  }
});
//detalle
router.post('/infoUsuario', async function(req,res){

    const correo = req.body.correo;
    console.log(req.body);
    try {
      var sql = `SELECT id,nombre,apellido,nickname,correo,contrasenia,telefono from usuario
        where correo='${correo}';`
  
       pool.query(sql,function(err,result, fields){
          if (err) {
            res.status(200).json({msj:"error"});
          }
          res.status(200).json(result[0]);
        });
        
    } catch (error) {
      res.status(200).json({msj:"error"});
    }
  });

  //iniciarsesion
router.post('/sesion', async function(req,res){

    const correo = req.body.correo;
    const contrasenia = req.body.contrasenia;
    console.log(req.body);
    try {
      var sql = `SELECT id,nombre,apellido,nickname,correo,contrasenia,telefono from usuario
        where correo='${correo}' and contrasenia=md5('${contrasenia}');`
  
       pool.query(sql,function(err,result, fields){
          if (err) {
            res.status(200).json({msj:"error"});
          }
          res.status(200).json(result);
        });
        
    } catch (error) {
      res.status(200).json({msj:"error"});
    }
  });

  //eliminar
router.post('/deleteUsuario', async function(req,res){

    const id = req.body.id;
    console.log(req.body);
    try {
      var sql = `delete from usuario
        where id=${id};`
  
       pool.query(sql,function(err,result, fields){
          if (err) {
            res.status(200).json({msj:"error"});
          }
          res.status(200).json({msj:"eliminado"});
        });
        
    } catch (error) {
      res.status(200).json({msj:"error"});
    }
  });
//Agregar suario
router.post('/addUsuario', async function(req,res){

      const nombre = req.body.nombre;
      const apellido = req.body.apellido;
      const nickname = req.body.nickname;
      const correo = req.body.correo;
      const contrasenia = req.body.contrasenia;
      const telefono = req.body.telefono;
      console.log(req.body);
      try {
        var sql = `SELECT * from Usuario where correo = '${contrasenia}';`    
          pool.query(sql,function(err,result, fields){
            if (err) {
              res.status(404).json(err);
            }
            console.log(result);
            const lista = [];
            if(result.length !== 0){
              res.status(200).json({msj:"El usuario existe"});
            }else{
              pool.query(`insert into usuario (nombre,apellido,nickname,correo,contrasenia,telefono)
              values ( '${nombre}','${apellido}','${nickname}', '${correo}', md5('${contrasenia}'), '${telefono}');`,  function(err,result){
             
                if(err){
                  res.status(200).json({msj:"error:"+err.message});
                }else{
                  res.status(200).json({msj:"se creo usuario"});
                }
              });
            }            
          });
      } catch (error) {
        res.status(404).json(error)
      }
});
// editear
router.post('/editUsuario', async function(req,res){

    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const nickname = req.body.nickname;
    const correo = req.body.correo;
    const contrasenia = req.body.contrasenia;
    const telefono = req.body.telefono;
    const id = req.body.id;
    console.log(req.body);
    try {
      var sql = `SELECT * from Usuario where id = ${id};`    
        pool.query(sql,function(err,result, fields){
          if (err) {
            res.status(404).json(err);
          }
          console.log(result);
          const lista = [];
          if(result.length == 0){
            res.status(200).json({msj:"El usuario no existe"});
          }else{
            pool.query(`update usuario set nombre='${nombre}',apellido='${apellido}',
             correo='${correo}', contrasenia=md5('${contrasenia}'), telefono='${telefono}';`,  function(err,result){
           
              if(err){
                res.status(200).json({msj:"error:"+err.message});
              }else{
                res.status(200).json({msj:"se actualizo usuario"});
              }
            });
          }            
        });
    } catch (error) {
      res.status(404).json(error)
    }
});

module.exports = router;
  