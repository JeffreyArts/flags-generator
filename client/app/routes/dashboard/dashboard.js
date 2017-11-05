import angular from 'angular';
import _ from 'lodash';
import routeWrap from 'ng-component-routing';
import template from './dashboard.html';
import './dashboard.scss';

const controller = function(flagLayout, color) {
  'ngInject';

  this.name = 'dashboard';
  const canvas = document.getElementById('flag');
  const ctx = canvas.getContext('2d');

  const drawShape = arr => {
    ctx.beginPath();
    _.each(arr, (o, i) => {
      if (i === 0) {
        ctx.moveTo(o.x, o.y);
      } else {
        ctx.lineTo(o.x, o.y);
      }
    });
    ctx.closePath();
  };

  // Set flag to ratio 3:2
  canvas.width = 300;
  canvas.height = 200;


  this.updateDrawing = () => {
    _.each(this.sections.properties, section => {
      ctx.fillStyle = section.color;
      drawShape(section.dimensions);
      ctx.fill();
    });
  };

  this.new = () => {
    this.sections = flagLayout.getLayout(['red', 'white', 'blue']);
    this.updateDrawing();
  };

  this.new();
};

const dashboardComponent = {
  bindings: {},
  routeOpts: {
    name: 'dashboard',
    url: '/',
    pageTitle: 'dashboard',
  },
  template,
  controller,
  controllerAs: 'vm'
};

routeWrap(angular).module('app.routes.dashboard', []).route('dashboard', dashboardComponent);
export default dashboardComponent;
