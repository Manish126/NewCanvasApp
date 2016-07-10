/*global angular, Konva*/
/*jslint nomen:true*/
(function () {
  'use strict';
  /**
   * StageHelper lets us share stage and layers between controllers, services. It also contains
   * many useful method with will be directly used in controllers. The sole purpose of these
   * services is free up controllers who deal with canvas.
   * @param $log
   * @returns Service Object.
   * @constructor
   */
  function StageHelper($log, $q,StageElement) {
    var stage, baseLayer;
    /**
     * Getter of base layer.
     * @returns layer. Instance of Konva.Layer
     */
    function getBaseLayer() {
      return baseLayer;
    }

    function initialiseLayers() {
      //Everything on stage will be added to base layer. It should be kept free as much as possible
      //It should have very less event listeners.
      baseLayer = new Konva.Layer({
        id: 'baseLayer'
      });
    }

    /**
     * Getter of Stage.
     * @returns stage. Instance of Konva.Stage
     */
    function getStage() {
      return stage;
    }

    /**
     * Setter of stage.
     * @param preparedStage instance of Konva.Stage
     */
    function setStage(preparedStage) {
      stage = preparedStage;
    }
    /**
     * Draw an image to the s
     * @param url
     * @param config
     */
    function createStageImage() {
      var deferred = $q.defer(),
       image = new Konva.Image({
        image: canvas,
        x : stage.width() / 4,
        y : stage.height() / 4,
        stroke: 'green',
        shadowBlur: 5
      });
      return deferred.resolve(image);
    }

    /**
     * Getter of canvas.
     * @returns {object of canvas}
     */
    function getCanvas() {
      return baseLayer.getCanvas()._canvas;
    }



    return {
      createStageImage: createStageImage,
      getBaseLayer: getBaseLayer,
      getStage: getStage,
      setStage: setStage,
      initialiseLayers: initialiseLayers,
      getCanvas: getCanvas
    };
  }

  var app = angular.module('myApp'),
    requires = [
        '$log',
        '$q',
        /*'ngCartosUtils.services.SourceLoaderService',
        'ngCartosCanvas.constants.StageElement',*/
        StageHelper
      ];
  app.factory('services.StageHelperService', requires);
}());