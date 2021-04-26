//const { truncate } = require("fs");
const md = require("../src/index.js");

//FUNCION QUE UNE TODAS LAS FUNCIONES DEL INDEX.JS EN UNA SOLA  - EXTRAER Y VALIDAR LINKS DE ARCHIVOS md


const mdLinks = (paths, options = { validate : false}) =>
  new Promise ((resolve, reject) => {
    const pathIndex = md.validatePath(paths);
    const isDirectory = md.directory(paths);    //Pregunto al usuario si me está ingresando un directorio o un archivo
    const extensionMd = md.isMdFile(paths);
    if(isDirectory === false) {
      if (extensionMd === true) {
        if (options.validate === true) {
          const mdFile = (pathIndex);
          const newLinks = md.searchLinks([paths]);
          const linksValidate = md.validateLinks(newLinks);
          resolve(linksValidate);
        } else {
          const mdFile = (pathIndex);
          const newLinks = md.searchLinks([paths]);
          resolve(newLinks);
          console.log(mdLinks);
        }
     } else {
          { error = 'El archivo no se ha encontrado'; reject(error); } // ERROR
     }
    } else if (isDirectory === true) {
      if (options.validate === true) {
        const mdFile = md.recursiveDirectory(paths);
        //console.log(mdFile);  Me sale que FALSE, no es un archivo
        const newLink = md.searchLinks(mdFile);
        //console.log(newLink);
        const linksValidates = md.validateLinks(newLink);
        resolve(linksValidates);
      } else {
        { error = 'La ruta no se ha encontrado'; reject(error); }
      }
    }
});

/*mdLinks('C:\\Users\\user\\LIM014-mdlinks\\pruebas\\prueba1\\prueba3.md', {validate : true})
//mdLinks('C:\\Users\\user\\LIM014-mdlinks\\pruebas', {validate : true})
.then((data) => console.log(data))
.catch((error) => console.log(error))*/

//  Export module
module.exports =  {mdLinks};
