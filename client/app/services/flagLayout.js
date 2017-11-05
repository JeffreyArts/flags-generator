import angular from 'angular';
import _ from 'lodash';

const flagLayoutService = function(color) {
  'ngInject';

  const flagWidth = 300;
  const flagHeight = 200;

  //////////////
  // BASE
  //////////////
  const createBase = () => [
    {
      x: 0, y: 0
    },
    {
      x: flagWidth, y: 0
    },
    {
      x: flagWidth, y: flagHeight
    },
    {
      x: 0, y: flagHeight
    }
  ];

  const createRight = perc => {
    if (!perc) {
      perc = 0.5;
    }

    return [
      {
        x: flagWidth * perc,
        y: 0
      },
      {
        x: flagWidth, y: 0
      },
      {
        x: flagWidth, y: flagHeight
      },
      {
        x: flagWidth * perc, y: flagHeight
      }
    ];
  };

  const createBottom = perc => {
    if (!perc) {
      perc = 0.5;
    }

    return [
      {
        x: 0,
        y: flagHeight * perc
      },
      {
        x: 0,
        y: flagHeight,
      },
      {
        x: flagWidth,
        y: flagHeight
      },
      {
        x: flagWidth,
        y: flagHeight * perc
      }
    ];
  };


  //////////////
  // PATTERNS
  //////////////

  // FESS
  const createFess = perc => {
    if (!perc) {
      perc = 1 / 3;
    }

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
  const createPale = perc => {
    if (!perc) {
      perc = 1 / 3;
    }

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
  const createBend = perc => {
    if (!perc) {
      perc = 0.1;
    }

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

  const layouts = [
    {
      name: 'Fess 1',
      properties: [
        {dimensions: createBase()},
        {dimensions: createFess(0.33)}
      ]
    },
    {
      name: 'Fess 2',
      properties: [
        {dimensions: createBase()},
        {dimensions: createBottom(0.5)},
        {dimensions: createFess(0.33)}
      ]
    },
    {
      name: 'Pale 1',
      properties: [
          {dimensions: createBase()},
          {dimensions: createPale()}
      ]
    },
    {
      name: 'Pale 2',
      properties: [
          {dimensions: createBase()},
          {dimensions: createRight(0.5)},
          {dimensions: createPale()}
      ]
    },
    {
      name: 'Bend 1',
      properties: [
          {dimensions: createBase()},
          {dimensions: createBend(0.25)}
      ]
    },
    {
      name: 'Bend 2',
      properties: [
          {dimensions: createBase()},
          {dimensions: createBend(0.25)},
          {dimensions: createBend(0.2)}
      ]
    },

  ];


  this.getLayout = arr => {

    if (!arr) {
      const arr = [color.get()];
    }
    // const int = _.random(layouts.length - 1);

    const styleProperties = {
      fess: {
        1: [
          [
            createBase()
          ],
        ],
        2: [
          [createBase()],
          [createFess(0.666), createFess(0.5), createFess(0.333), createFess(0.2)]
        ],
        3: [
          [createBase()],
          [createBottom(0.5), createBottom(0.5), createBottom(0.5), createBottom(0.5)],
          [createFess(0.666), createFess(0.5), createFess(0.333), createFess(0.2)]
        ],
      }
    };

    const style = 'fess';
    const props = [];

    if (arr.length >= 1) {
      const sp = styleProperties[style][arr.length];
      const randomIndex = _.random(sp[1], sp[1].length - 1);

      _.each(arr, (color, index) => {
        if (index === 0) {
          props.push({
            dimensions: sp[index][0],
            color: color
          });
        } else {

          props.push({
            dimensions: sp[index][randomIndex],
            color: color
          });
        }
      });
    }

    console.log(props);
    return {
      name: 'random',
      properties: props
    };

    // _.each(layouts[int].properties, v => {
    //   v.color = color.get();
    // });
    //
    // return layouts[int];

  };

};

angular.module('app.services.flagLayout', []).service('flagLayout', flagLayoutService);
export default flagLayoutService;
