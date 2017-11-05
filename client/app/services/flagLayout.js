import angular from 'angular';
import _ from 'lodash';
const shuffleSeed = require('shuffle-seed');

const flagLayoutService = function(flagPattern) {
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
  /////////////

  this.layouts = {
    1: [],
    2: [
        [{name: 'fess', value: 0.5}],
        [{name: 'fess', value: 0.33}],
        [{name: 'fess', value: 0.2}],
        [{name: 'pale', value: 0.5}],
        [{name: 'pale', value: 0.33}],
        [{name: 'pale', value: 0.2}],
        [{name: 'bend', value: 0.5}],
        [{name: 'bend', value: 0.33}],
        [{name: 'bend', value: 0.2}],
        [{name: 'bottom', value: 0.5}],
        [{name: 'bottom', value: 0.25}],
        [{name: 'bottom', value: 0.75}],
        [{name: 'right', value: 0.5}],
        [{name: 'right', value: 0.25}],
        [{name: 'right', value: 0.75}],
    ],
    3: [
        [{name: 'bottom', value: 0.5}, {name: 'fess', value: 0.5}],
        [{name: 'bottom', value: 0.5}, {name: 'fess', value: 0.333}],
        [{name: 'bottom', value: 0.5}, {name: 'fess', value: 0.2}],
        [{name: 'fess', value: 0.5}, {name: 'fess', value: 0.45}],
        [{name: 'fess', value: 0.333}, {name: 'fess', value: 0.275}],
        [{name: 'fess', value: 0.2}, {name: 'fess', value: 0.15}],
        [{name: 'right', value: 0.5}, {name: 'pale', value: 0.5}],
        [{name: 'right', value: 0.5}, {name: 'pale', value: 0.333}],
        [{name: 'right', value: 0.5}, {name: 'pale', value: 0.2}],
        [{name: 'pale', value: 0.5}, {name: 'pale', value: 0.45}],
        [{name: 'pale', value: 0.333}, {name: 'pale', value: 0.275}],
        [{name: 'pale', value: 0.2}, {name: 'pale', value: 0.15}],
        [{name: 'bend', value: 0.5}, {name: 'bend', value: 0.45}],
        [{name: 'bend', value: 0.33}, {name: 'bend', value: 0.275}],
        [{name: 'bend', value: 0.2}, {name: 'bend', value: 0.15}],
    ]
  };

  /*
    {
      name: 'Fess 1',
      properties: [
        {dimensions: createBase()},
        {dimensions: flagPattern.fess(0.33)}
      ]
    },
    {
      name: 'Fess 2',
      properties: [
        {dimensions: createBase()},
        {dimensions: createBottom(0.5)},
        {dimensions: flagPattern.fess(0.33)}
      ]
    },
    {
      name: 'Pale 1',
      properties: [
          {dimensions: createBase()},
          {dimensions: flagPattern.pale()}
      ]
    },
    {
      name: 'Pale 2',
      properties: [
          {dimensions: createBase()},
          {dimensions: createRight(0.5)},
          {dimensions: flagPattern.pale()}
      ]
    },
    {
      name: 'Bend 1',
      properties: [
          {dimensions: createBase()},
          {dimensions: flagPattern.bend(0.25)}
      ]
    },
    {
      name: 'Bend 2',
      properties: [
          {dimensions: createBase()},
          {dimensions: flagPattern.bend(0.25)},
          {dimensions: flagPattern.bend(0.2)}
      ]
    },

  ];
  */


  this.getLayout = (seed, colors) => {

    if (!colors) {
      const colors = [color.get()];
    }

    let layouts = _.clone(this.layouts[colors.length]);
    if (colors.length === 3) {
      _.each(this.layouts[2], v => {
        layouts.push(v);
      });
    }
    layouts = shuffleSeed.shuffle(layouts, seed);

    const layout = layouts[0];
    const props = [];

    // const int = _.random(layouts.length - 1);
    /*
    const styleProperties = {
      fess: {
        1: [
          [
            createBase()
          ],
        ],
        2: [
          [createBase()],
          [ flagPattern.fess(0.5), flagPattern.fess(0.333), flagPattern.fess(0.2)]
        ],
        3: [
          [createBase()],
          [ createBottom(0.5), createBottom(0.5), createBottom(0.5)],
          [ flagPattern.fess(0.5), flagPattern.fess(0.333), flagPattern.fess(0.2)]
        ],
        4: [
          [createBase()],
          [createBottom(0.5), createBottom(0.5), createBottom(0.5), createBottom(0.5), createBottom(0.5), createBottom(0.5), createBottom(0.5), createBottom(0.5)],
          [createRight(0.5), createRight(0.5), createRight(0.5), createRight(0.5),  flagPattern.fess(0.5), flagPattern.fess(0.333), flagPattern.fess(0.2)],
          [flagPattern.fess(0.666), flagPattern.fess(0.5), flagPattern.fess(0.333), flagPattern.fess(0.2),  flagPattern.fess(0.45), flagPattern.fess(0.28), flagPattern.fess(0.15)]
        ],
      }
    };

    const style = 'fess';
    const props = [];

    if (colors.length >= 1) {
      const sp = styleProperties[style][colors.length];
      const randomIndex = _.random(sp[colors.length - 1], sp[colors.length - 1].length - 1);

      _.each(colors, (color, index) => {
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
    */
    //
    // _.each(colors, (color, index) => {
    //   if (index === 0) {
    //     props.push({
    //       dimensions: createBase(),
    //       color: color
    //     });
    //   } else {
    //
    //   }
    // });

    props.push({
      dimensions: createBase(),
      color: colors[0]
    });
    console.log("Amount of colors:", colors);
    for (let i = 1; i < colors.length; i++) {
        console.log("Chosen Layout",layout)
        console.log("2.",layout[i - 1], colors[i]);
      if (!layout || !layout[i - 1]) {
        break;
      }
      switch (layout[i - 1].name) {
        case 'fess':
          props.push({
            dimensions: flagPattern.fess(layout[i - 1].value),
            color: colors[i]
          });
          break;
        case 'bend':
          props.push({
            dimensions: flagPattern.bend(layout[i - 1].value),
            color: colors[i]
          });
          break;
        case 'pale':
          props.push({
            dimensions: flagPattern.pale(layout[i - 1].value),
            color: colors[i]
          });
          break;
        case 'bottom':
          props.push({
            dimensions: createBottom(layout[i - 1].value),
            color: colors[i]
          });
          break;
        case 'right':
          props.push({
            dimensions: createRight(layout[i - 1].value),
            color: colors[i]
          });
          break;

      }

    }
    console.log("props",props);

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
