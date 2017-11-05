import angular from 'angular';

const flagPatternService = function() {
  'ngInject';

  const flagWidth = 300;
  const flagHeight = 200;

  this.list = [
      "fess",
      "pale",
      "bend"
  ]

  // FESS
  this.fess = (perc = 1 / 3) => {

    const int = perc * flagHeight;

    return [
      {
        x: 0,
        y: flagHeight / 2 - int / 2
      },
      {
        x: flagWidth,
        y: flagHeight / 2 - int / 2
      },
      {
        x: flagWidth,
        y: flagHeight / 2 + int / 2
      },
      {
        x: 0,
        y: flagHeight / 2 + int / 2
      },
    ];
  };

  // PALE
  this.pale = (perc = 1 / 3) => {

    const int = perc * flagWidth;


    return [
      {
        x: flagWidth / 2 - int / 2,
        y: 0
      },
      {
        x: flagWidth / 2 - int / 2,
        y: flagHeight
      },
      {
        x: flagWidth / 2 + int / 2,
        y: flagHeight
      },
      {
        x: flagWidth / 2 + int / 2,
        y: 0
      },
    ];
  };

  // BEND
  this.bend = (perc = 0.1) => {

    const intHor = perc * (flagWidth / 3 * 2);
    const intVert = perc * (flagHeight / 3 * 2);


    return [
      {x: flagWidth - intHor, y: 0},
      {x: flagWidth, y: 0},
      {x: flagWidth, y: intVert},
      {x: intHor, y: flagHeight},
      {x: 0, y: flagHeight},
      {x: 0, y: flagHeight - intVert}
    ];
  };
};

angular.module('app.services.flagPattern', []).service('flagPattern', flagPatternService);
export default flagPatternService;
