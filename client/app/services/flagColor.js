import angular from 'angular';
import _ from 'lodash';
const shuffleSeed = require('shuffle-seed');

const flagColorService = function() {
  'ngInject';

  // Most used color combinations
  // const schemes = [
  //     ["white", "red"],
  //     ["red", "white"],
  //     //
  //     ["white", "red", "blue"],
  //     ["red", "blue", "white"],
  //     ["blue", "white", "red"],
  //     //
  //     ["white", "red", "green"],
  //     ["red", "green", "white"],
  //     ["green", "white", "red"],
  //     //
  //     ["yellow", "red", "green"],
  //     ["red", "green", "yellow"],
  //     ["green", "yellow", "red"],
  //     //
  //     ["white", "red", "green", "black"],
  //     ["red", "green", "black", "white"],
  //     ["green", "black", "white", "red"],
  //     ["black", "white", "red", "green"],
  // ]

  this.colors = [
    'white',
    'black',
    '#f22f2f', // red
    '#00b26e', // green
    '#21468B', // Netherlands blue
    '#AE1C28', // Netherlands red
    '#387e22', // Rotterdam green
    '#f6e033', // yellow
    '#0066b2'
  ];

  this.getColors = (seed, amount = 1) => {
    const colors = [];
    const tempColors = _.clone(shuffleSeed.shuffle(this.colors, seed));

    for (let i = 0; i < amount; i++) {
      const m = tempColors.length * i + seed;
      colors.push(tempColors[m % tempColors.length]);
      tempColors.splice(m % tempColors.length, 1);
    }
    console.log('Get colors:', colors);

    return colors;
  };

  // this.get = () => colors[_.random(colors.length-1)];
  // this.getScheme = () => schemes[_.random(schemes.length-1)];
};

angular.module('app.services.flagColor', []).service('flagColor', flagColorService);
export default flagColorService;
