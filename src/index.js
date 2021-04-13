//MODULOS DE NODEJS
const path = require ('path');
const fs = require ('fs');

//LIBRERÍAS
const cheerio = require ('cheerio');
const marked = require ('marked');
const fetch = require ('node-fetch');

//FUNCIÓN QUE ME DICE SI EL ARCHIVO EXISTE O ES UN DIRECTORIO
const validatePath = (file) => fs.existsSync(file);
//console.log(validatePath('../README.md'))

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

//LEER EL DIRECTORIO
const files = (route) => fs.readdirSync(route);
//console.log(files('../pruebas'))  //Me sale los archivos que están dentro de pruebas.

//SISTEMA DE ARCHIVOS Nodejs, obtener información del archivo
const stats = (route) => fs.statSync(route);
//console.log(stats('../pruebas'))

//Si es directorio o no   -- dirpath: es la ruta al espacio de trabajo.
const directory = (dirPath) => stats(dirPath).isDirectory();
//console.log(directory('../README.md'))

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
//console.log(fileExist('../pruebas'));


//FUNCION RECURSIVA : LEER LOS ARCHIVOS QUE ESTÉN DENTRO DEL DIRECTORIO
// Extract and save links from .md file in an array

/*const recursiveDirectory = (dirPath) => {
  //Verifica si si existe el path
  const newArray = [];
  const dir = fs.readdirSync(dirPath);
  /*dir.filter(isMdFile).forEach((newPath) => {*/
    //dir.forEach((contentPath) => {
    /*const contentPath = path.join(dirPath, newPath);*/
    //if (fs.statSync(contentPath) && fs.statSync(contentPath).isDirectory()) {
      /*newArray.push(contentPath, recursiveDirectory(contentPath));*/
     /* newArray = newArray.concat(recursiveDirectory(contentPath))
    } else {
      newArray.push(contentPath);
    }
  });*/
  // console.log(newArray,'64');
  /*return newArray.flat();
};*/

//console.log(recursiveDirectory('C:\\Users\\user\\LIM014-mdlinks\\pruebas\\prueba1'));
//console.log(recursiveDirectory('C:\\Users\\user\\LIM014-mdlinks\\pruebas\\prueba1\\prueba2'));
//console.log(recursiveDirectory('C:\\Users\\user\\LIM014-mdlinks\\pruebas\\prueba1\\prueba3'));


//CONVERTIR con el marked y obtener los links con el cheerio
//MARKED: convierte a HTML, los archivos md
//CHEERIO: te obtiene los links

//FUNCION PARA CAMBIAR UN ARCHIVO A HTML Y EXTRAER LOS LINKS
/*const searchLinks = (fileMd) => {
  const markedFile = marked(fs.readFileSync(fileMd, 'utf8'));
  const cheerioFile = cheerio.load(markedFile);
  const allLinks =[];
  cheerioFile('a').map(
    (elemento, i) =>
    (allLinks[elemento] = {
      href: dom(i).attr('href'),
      text: dom(i).text(),
      file: fileMd,
    })
  );
  return allLinks;
};*/

//FUNCION PARA TRABAJAR EN HTML Y EXTRAER LINKS
  const searchLinks = (fileMd) => {
  const markedFile =  marked(fs.readFileSync(fileMd, 'utf8'));
  const cheerioFile = cheerio.load(markedFile);
  const allLinks = [];
  cheerioFile('a').map(
   ((element, i) => {
      allLinks.push({
        href: cheerioFile(i).attr('href'),
        text: cheerioFile(i).text(),
        file: fileMd,
      })
    })
  )
  return allLinks;
};

//let totalLinks = searchLinks('../pruebas/prueba1/prueba3.md');
//console.log(totalLinks,'110');


// FUNCION PARA VALIDAR LOS LINKS
/*const validateLinks = (links) => {
  return
}*/
const validateLinks = (arrLinks) => {
 const arr = arrLinks.map((obj) => fetch(obj.href)
    .then((url) => ({ status: url.status, message: url.statusText, ...obj }))
    .catch(() => ({ status: 500, message: 'Internal Server Error', ...obj })));
  return Promise.all(arr);
  /*console.log(arrLinks,'121');*/
}

//console.log(validateLinks(totalLinks));
//validateLinks(totalLinks)
 // .then((data) =>console.log(data))
  //.catch((error) => console.log(error));




module.exports = {
  directory,
  relativeToAbsolute,
  fileExist,
  searchLinks,
  //validatePath,
  //pathAbsolute,
  //isMdFile,
  /*recursiveDirectory,*/
  //validateLinks,
}
