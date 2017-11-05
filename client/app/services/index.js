import angular from 'angular';

//IMPORTS
import './color';
import './flagLayout';

const services = angular.module('app.services', [
  'app.services.flagLayout',
  'app.services.color',
]);

export default services;
