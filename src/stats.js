//FUNCIÓN PARA VALIDAR LOS STATS
const chalk = require('chalk');


const statsLinksPro = (links) => {
  const stats = {};
  const allStats = [];
  links.map((link) => {
    allStats.push(link);
  });
  if (links[0].status) {
  stats.Total = allStats.length;
  stats.Unique = unique(allStats);
  stats.Broken = broken(allStats).length;
  }
  return stats;
};

const statLinks = (links) => {
  const stats = {};
  const allStats = [];
  links.map((link) => {
    allStats.push(link);
  });
  if (links[0].status) {
  stats.Total = allStats.length;
  stats.Unique = unique(allStats);
  }
  return stats;
};


const unique = (linkstats) => {
  const mySet = new Set();           //Set permite almacenar valores únicos de cualquier tipo, incluso valores primitivos u objetos.
  linkstats.forEach((element) => mySet.add(element.href));
  return mySet.size;
};

const broken = (linkstats) => {
  return linkstats.filter((element) => element.status === 404);
};



//PRUEBA

/*console.log(validateAndStats([{
  href: 'https://www.geeksforgeeks.org/nodejs-web-crawling-using-cheerio/',
  text: '"GeeksforGeeks, using cheerio  - Articulo"',
  file: 'C:\\Users\\user\\LIM014-mdlinks\\pruebas\\prueba1\\prueba3.md',
  status: 200,
  message: 'OK'
}]));*/


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

//console.log(statsLinks(prueba1));
//console.log(validateAndStats(prueba1));
//console.log(broken(prueba1));
//console.log(statsLinks(prueba1));

module.exports = {
  statLinks,
  statsLinksPro,
}
