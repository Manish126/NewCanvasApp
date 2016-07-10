/*global angular*/

(function(){

  function myStage($log, $rootScope){//, StageEvent, StageHelperService
    function linkFn(scope, element, attrs) {
      var stage,id = attrs.id,
      //default width & height
          width = 800,
          height = 600;
      if (id === undefined) {
        //No container id is provided. A random id will be used as container id.
        id = Math.random().toString(36).substring(8);//random id
        element.attr('id', id);
      }
      scope.stageWidth = scope.stageWidth || width;
      scope.stageHeight = scope.stageHeight || height;
      //stage with id and dimensions.
      stage = new Konva.Stage({
        container: id,
        width: scope.stageWidth,
        height: scope.stageHeight,
        dragDistance: 3
      });
      scope.iObj = stage;
      console.log(scope.iObj);
    //$rootScope.stagObject = scope.iObj;
      //All set so let's emit the event with stage.
      scope.$emit('STAGE_READY', scope.iObj);//StageEvent.STAGE_READY
      $log.info('stage is ready and publish');

    }
    return {
      restrict: 'E',// We'll treat our stage as an element.
      transclude: true,
      scope: {},
      link: linkFn

    };

  }
  var app = angular.module("myApp",[]),
      requires=[
          '$log',
          '$rootScope',
          //'costant.StageEvent',
          //'services.StageHelperService',
        myStage
      ];

  app.directive("myStage",requires);
})();





















/*function stage($log, $rootScope){
 function linkFn(scope, element, attrs) {
 var stage,id = attrs.id,
 //default width & height
 width = 1024,
 height = 678;
 if (id === undefined) {
 //No container id is provided. A random id will be used as container id.
 id = Math.random().toString(36).substring(8);//random id
 element.attr('id', id);
 }
 scope.stageWidth = scope.stageWidth || width;
 scope.stageHeight = scope.stageHeight || height;
 //stage with id and dimensions.
 stage = new Konva.Stage({
 container: id,
 width: scope.stageWidth,
 height: scope.stageHeight,
 dragDistance: 3
 });
 $rootScope.stageObject = stage;
 var layer = new Konva.Layer();
 stage.add(layer);
 $log.info("Layaer is added on stage");
 // then we are going to draw into special canvas element
 var canvas = document.createElement('canvas');
 canvas.width = 700;
 canvas.height = 400;
 $rootScope.canvasObject = canvas;
 // creted canvas we can add to layer as "Konva.Image" element
 var image = new Konva.Image({
 image: canvas,
 x : stage.width() / 6,
 y : stage.height() / 4,
 stroke: 'green',
 shadowBlur: 15
 });
 $rootScope.convaImage = image;
 layer.add(image);
 stage.draw();
 }
 return {
 restrict: 'E',// We'll treat our stage as an element.
 link: linkFn
 };
 }*/