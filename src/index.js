//MODULOS DE NODEJS
const path = require ('path');
const fs = require ('fs');

//LIBRERÍAS
const cheerio = require ('cheerio');
const marked = require ('marked');
const fetch = require ('node-fetch');

//FUNCIÓN QUE ME VALIDA LA RUTA, SI ES FALSE O TRUE
const validatePath = (file) => fs.existsSync(file);
//console.log(validatePath('../index.txt'))
//console.log(validatePath('C:\\Users\\user\\LIM014-mdlinks'));


//RUTA ABSOLUTA
const pathAbsolute = (route) => path.isAbsolute(route);
//console.log(pathAbsolute('/pruebas/prueba.md'))   //me sale true

//RUTA RELATIVA A ABSOLUTA
const relativeToAbsolute = (route) => {
  if(fs.existsSync(route)) {
    return path.normalize(path.resolve(route));
  } else {
    return 'La ruta no existe';
  }
};
//console.log(relativeToAbsolute('../README.md'))  //Me sale la extension de la ruta
//console.log(relativeToAbsolute('../app.txt'))  //Me sale la ruta NO existe

//LEER EL DIRECTORIO
const readDirectory = (route) => fs.readdirSync(route);
//console.log(readDirectory('../pruebas'))  //Me sale los archivos que están dentro de pruebas.

//SISTEMA DE ARCHIVOS Nodejs, obtener información del archivo
const stats = (route) => fs.statSync(route);
//console.log(stats('../pruebas'))

//Si es directorio o no   -- dirpath: es la ruta al espacio de trabajo.
const directory = (dirPath) => stats(dirPath).isDirectory();
//console.log(directory('C:\\Users\\user\\LIM014-mdlinks')) //Me sale TRUE
//console.log(directory('C:\\Users\\user\\LIM014-mdlinks\\src\\md-links.js')); //FALSE

// Revisa si la extensión es .md
const isMdFile = (route) => (path.extname(route) === '.md');
//console.log(isMdFile('../README.md'))

/*SABER SI ES UN ARCHIVO O UN DIRECTORIO*/
const fileExist = (file) => {
  const stat = fs.statSync(file);
  if (stat.isFile() === true) {
    return 'La ruta es un archivo:' + ' ' + file;
  } else {
    return 'La ruta es un directorio:' + ' ' + file;  }
};
//console.log(fileExist('../README.md'));
//console.log(fileExist('C:\\Users\\user\\LIM014-mdlinks'));

const isDir = (route) => {
  const exist = fs.existsSync(route);
  let isDirectory;
  if (exist === true) {
    const stats = fs.statSync(route);
    isDirectory = stats.isDirectory(route);
  } else {
    isDirectory = undefined;
  }
  return isDirectory;
};

//console.log(isDir('C:\\Users\\user\\LIM014-mdlinks\\src\\md-links.js')); /// false
//console.log(isDir('C:\\Users\\user\\LIM014-mdlinks')); //true



//FUNCION RECURSIVA : LEER LOS ARCHIVOS QUE ESTÉN DENTRO DEL DIRECTORIO
// Extract and save links from .md file in an array

const recursiveDirectory = (dirPath) => {
  //Verifica si si existe el path
  let newArray = [];
  const dir = fs.readdirSync(dirPath);

    dir.forEach((newPath) => {
    const contentPath = path.join(dirPath, newPath);
    if (isMdFile(contentPath) === true) {
      newArray.push(contentPath);
    } else if (directory(contentPath) === true) {
      newArray = newArray.concat(recursiveDirectory(contentPath))
    }
  });
  return newArray;
};

/*console.log(recursiveDirectory('C:\\Users\\user\\LIM014-mdlinks\\pruebas'));*/

//CONVERTIR con el marked y obtener los links con el cheerio
//MARKED: convierte a HTML, los archivos md
//CHEERIO: te obtiene los links

//FUNCION PARA TRABAJAR EN HTML Y EXTRAER LINKS
  const searchLinks = (fileMd) => {
    let allLinks = [];
    fileMd.forEach((file) => {
      const markedFile =  marked(fs.readFileSync(file, 'utf8'));
      const cheerioFile = cheerio.load(markedFile);
      cheerioFile('a').map(
        ((element, i) => {
           allLinks.push({
             href: cheerioFile(i).attr('href'),
             text: cheerioFile(i).text(),
             file: file,
           })
         })
       )
    })
  return allLinks;
};

/*let totalLinks = searchLinks(['C:\\Users\\user\\LIM014-mdlinks\\README.md']);
console.log(totalLinks);*/


// FUNCION PARA VALIDAR LOS LINKS
const validateLinks = (arrLinks) => {
 const arr = arrLinks.map((obj) => fetch(obj.href)
    .then((url) => ({ status: url.status, message: url.statusText, ...obj }))
    .catch(() => ({ status: 500, message: 'Internal Server Error', ...obj })));
  return Promise.all(arr);
  //console.log(arrLinks);
}

/*console.log(validateLinks(totalLinks));
//validateLinks(totalLinks)
 .then((data) =>console.log(data))
 .catch((error) => console.log(error));*/




module.exports = {
  validatePath,
  directory,
  readDirectory,
  stats,
  isMdFile,
  relativeToAbsolute,
  fileExist,
  searchLinks,
  validateLinks,
  recursiveDirectory,
}
