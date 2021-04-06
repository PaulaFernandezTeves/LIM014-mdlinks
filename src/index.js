//MODULOS DE NODEJS
const path = require ('path');
const fs = require ('fs');

//LIBRERÍAS
const cheerio = require ('cheerio');
const marked = require ('marked');

//FUNCIÓN QUE ME DICE SI EL ARCHIVO EXISTE O ES UN DIRECTORIO
const validatePath = (file) => fs.existsSync(file);
//console.log(validatePath('../README.md'))

//RUTA ABSOLUTA
const pathAbsolute = (route) => path.isAbsolute(route);
//console.log(pathAbsolute('/pruebas/prueba.md'))   //me sale true

//RUTA RELATIVA A ABSOLUTA
const relativeToAbsolute = (route) => path.resolve(route);
//console.log(relativeToAbsolute('./prueba.md'))  //Me sale la ruta raiz

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
  stat = fs.statSync(file);
  if (stat.isFile() === true) {
    return 'La ruta es un archivo:' + ' ' + file;
  } else {
    return 'La ruta es un directorio:' + ' ' + file;  }
};
/*console.log(fileExist('../README.md'));*/


//Funcion recursiva : LEER LOS ARCHIVOS QUE ESTÉN DENTRO DEL DIRECTORIO
// Extract and save links from .md file in an array

const recursiveDirectory = (dirPath) => {
  //Verifica si si existe el path
  const newArray = [];
  const dir = fs.readdirSync(dirPath);
  dir.filter(isMdFile).forEach((newPath) => {
    const contentPath = path.join(dirPath, newPath);
    if (fs.statSync(contentPath).isDirectory()) {
      newArray.push(contentPath, recursiveDirectory(contentPath));
    } else {
      newArray.push(contentPath);
    }
  });
   //console.log(recursiveDirectory('No tienes un archivo .md'));
  return newArray.flat();
};

//console.log(recursiveDirectory('C:\\Users\\user\\LIM014-mdlinks\\pruebas\\prueba1'));
//console.log(recursiveDirectory('C:\\Users\\user\\LIM014-mdlinks\\pruebas\\prueba1\\prueba2'));
//console.log(recursiveDirectory('C:\\Users\\user\\LIM014-mdlinks\\pruebas\\prueba1\\prueba3'));


//CONVERTIR con el marked y obtener los links con el cheerio
//MARKED: convierte a HTML, los archivos md
//CHEERIO: te obtiene los links

//FUNCION PARA CAMBIAR UN ARCHIVO A HTML Y EXTRAER LOS LINKS
const transformToHtml = (fileMd) => {
  const htmlFile = marked(fs.readFileSync(fileMd, 'utf8'));
  const dom = cheerio.load(htmlFile);
  dom('a').map()
};

console.log(transformToHtml('../README.md'));



module.exports = {
  //validatePath,
  //pathAbsolute,
  //relativeToAbsolute,
  fileExist,
  //files,
  isMdFile,
  directory,
  recursiveDirectory,
  transformToHtml,
}
