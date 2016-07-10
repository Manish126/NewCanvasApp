/*global angular*/
(function () {
  'use strict';

  /**
   * All the events regarding to stage.
   */

  var app = angular.module('myApp');
  app.constant('StageEvent', {

    STAGE_READY: 'STAGE:READY'
  });
}());