//global
globals = require('./global.conf');

// lib
chai = require('chai');
chaiHttp = require('chai-http');
chai.use(chaiHttp);
should = chai.should();
