import angular from 'angular';

//IMPORTS
import './flag';
import './flagPattern';
import './flagColor';
import './flagLayout';

const services = angular.module('app.services', [
  'app.services.flagLayout',
  'app.services.flagColor',
  'app.services.flagPattern',
  'app.services.flag',
]);

export default services;
