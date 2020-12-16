const version = require('../version.js');
const sh = require('shelljs');

const imageName = 'SurveyMatrix';

sh.exec(`docker build -t ${imageName}:latest -t ${imageName}:${version} .`);

