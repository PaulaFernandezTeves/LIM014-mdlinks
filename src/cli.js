#!/usr/bin/env node

const [,,  ...args] = process.argv

//console.log(`Hello World ${args}`)
const validate = require("../src/index.js");
const {mdlinks} = require ('../src/md-links.js')
const {chalk} = require ('chalk')
/*const { program } = require('commander');*/


//FUNCIÓN PARA VALIDAR LOS STATS

const statsLinks = (links) => {
  const stats = {};
  const allStats = [];
  links.map((link) => {
    allStats.push(link);
  });
  if (links[0].status) {
  stats.Total = allStats.length;
  stats.Unique = unique(allStats);
} else {
  stats.Broken = broken(allStats).length;
}
  return stats;
};

const unique = (linkstats) => {
  const mySet = new Set();
  linkstats.forEach((element) => mySet.add(element.href));
  return mySet.size;
};

/*const broken = (linkstats) => {
  return linkstats.filter((element) => element.status === 404);
};*/

const validateAndStats = (objects) => {
  const totalValidate = objects.length;
  const uniqueValidate = objects.map((link) => link.href).length;
  let broken = (linkstats) => {
    if (linkstats.filter((element) => element.status === 404));
  };
  return { Total: totalValidate, Unique: uniqueValidate, Broken: broken };
};

//PRUEBA

const prueba1 = [
  {
    href: 'https://www.geeksforgeeks.org/nodejs-web-crawling-using-cheerio/',
    text: '"GeeksforGeeks, using cheerio  - Articulo"',
    file: 'C:\\Users\\user\\LIM014-mdlinks\\pruebas\\prueba1\\prueba3.md',
    status: 200,
    message: 'OK'
  },
  {
    href: 'http://www.abab.com.pe/aldo-bruno',
    text: '"AB & BA -Página NO encontrada"',
    file: 'C:\\Users\\user\\LIM014-mdlinks\\pruebas\\prueba1\\prueba3.md',
    status: 404,
    message: 'FAIL'
  }
]

console.log(statsLinks(prueba1));
//console.log(validateAndStats(prueba1));
//console.log(broken(prueba1));


module.exports = {
  statsLinks,
  validateAndStats,
}
