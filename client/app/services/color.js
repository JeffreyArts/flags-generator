import angular from 'angular';
import _ from 'lodash';

const colorService = function() {
  'ngInject';

  const colors = [
    'black',
    'white',
    'blue',
    'red',
    'green',
    'yellow',
    'lightblue',
    'gold'
  ];

  this.get = () => colors[_.random(colors.length-1)];
};

angular.module('app.services.color', []).service('color', colorService);
export default colorService;
