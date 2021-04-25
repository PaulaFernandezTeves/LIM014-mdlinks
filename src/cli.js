#!/usr/bin/env node

const [,,  ...args] = process.argv

//console.log(`Hello World ${args}`)
const validate = require("../src/index.js");
const {mdLinks} = require ('../src/md-links.js')
const {chalk} = require ('chalk')
const { program } = require('commander');

const {
  statLinks,
  statsLinksPro,
  //validateAndStats
} = require ('../src/stats.js')


program.version('0.0.1');

program

  .arguments('<path>')
  .option('--validate')
  .option('--stats')
  .parse(process.argv);

  const myARGS = args;
  //console.log(myARGS);
  const path = myARGS[0];
  const validates = myARGS.includes('--validate');
  const stats = myARGS.includes('--stats');

if(myARGS.length === 3) {
  if ( validates && stats) {
    mdLinks(path, { validate: true })
      .then((links) => {
        console.log(statsLinksPro(links));
      // [{Total,Unique, broken}]
      });
    }
  } else if (myARGS.length === 2) {
   if (myARGS[1] === '--stats') {
    mdLinks(path, { validate: true })
      .then((links) => {
        console.log(statLinks(links));
      })
      //.catch(console.log('error'));
    //  [{Total,Unique}]
  } else if (myARGS[1] === '--validate') {
    mdLinks(path, { validate: true })
      .then((links) => {
        console.log(links);
      })
      //.catch(console.log('error'));
  }
};


