import angular from 'angular';
import _ from 'lodash';

const flagService = function(flagLayout, flagPattern, flagColor) {
  'ngInject';

  this.maxColors = 3;


  this.generate = (seed = 1) => {
    const colors = flagColor.getColors(seed, this.maxColors );
    
    return flagLayout.getLayout(seed, colors)
    // {
    //   name: 'Fess 1',
    //   properties: [
    //     {dimensions: createBase()},
    //     {dimensions: flagPattern.fess(0.33)}
    //   ]
    // },


    //   flagLayout.getLayout(flagColor.getScheme()
  };
};

angular.module('app.services.flag', []).service('flag', flagService);
export default flagService;
