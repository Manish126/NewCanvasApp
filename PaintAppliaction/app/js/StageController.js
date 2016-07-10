/*global angular*/

(function(){

    function stageController($scope, $rootScope , StageHelperService) {

     function paintFunctionality(stage,layer,image){

       // then we are going to draw into special canvas element
       var canvas = document.createElement('canvas');
       canvas.width = stage.width() / 2;
       canvas.height = stage.height() / 2;

       // Good. Now we need to get access to context element
      var context = canvas.getContext('2d');
      context.strokeStyle = "#df4b26";
      context.lineJoin = "round";
      context.lineWidth = 5;


      var isPaint = false;
      var lastPointerPosition;
      var mode = 'brush';


      // now we need to bind some events
      // we need to start drawing on mousedown
      // and stop drawing on mouseup
      stage.on('contentMousedown.proto', function () {
        isPaint = true;
        lastPointerPosition = stage.getPointerPosition();

      });

      stage.on('contentMouseup.proto', function () {
        isPaint = false;
      });

      // and core function - drawing
      stage.on('contentMousemove.proto', function () {

        if (!isPaint) {
          return;
        }

        if (mode === 'brush') {
          context.globalCompositeOperation = 'source-over';
        }
        if (mode === 'eraser') {
          context.globalCompositeOperation = 'destination-out';
        }
        context.beginPath();

        var localPos = {
          x: lastPointerPosition.x - image.x(),
          y: lastPointerPosition.y - image.y()
        };
        context.moveTo(localPos.x, localPos.y);
        var pos = stage.getPointerPosition();
        localPos = {
          x: pos.x - image.x(),
          y: pos.y - image.y()
        };
        context.lineTo(localPos.x, localPos.y);
        context.closePath();
        context.stroke();


        lastPointerPosition = pos;
        layer.draw();
      });


      var select = document.getElementById('tool');
      select.addEventListener('change', function () {
        mode = select.value;
      });
    }
      function onStageReady(event, preparedStage) {
        $scope.stage = preparedStage;
        StageHelper.setStage($scope.stage);
        StageHelper.initialiseLayers();
        baseLayer = StageHelper.getBaseLayer();
        $scope.stage.add(baseLayer);
        var layer = new Konva.Layer();
        $scope.stage.add(layer)

        var image = StageHelperService.createStageImage();
        layer.add(image);
        $scope.stage.draw($scope.stage,layer,image);

        console.log('yes stage is created successfully', $scope.stage);
        paintFunctionality();
      }
      //settings listeners
      $scope.$on('STAGE_READY',onStageReady)
    }


    var app = angular.module('myApp',[]),
        requires=[
            '$scope',
            '$rootScope',
            'services.StageController',
            stageController
        ];
    app.controller('stageController',requires);
})();


























 /* var isPaint = false;
  var lastPointerPosition;
  var mode = 'brush';


  // now we need to bind some events
  // we need to start drawing on mousedown
  // and stop drawing on mouseup
  stage.on('contentMousedown.proto', function() {
    isPaint = true;
    lastPointerPosition = stage.getPointerPosition();

  });

  stage.on('contentMouseup.proto', function() {
    isPaint = false;
  });

  // and core function - drawing
  stage.on('contentMousemove.proto', function() {

    if (!isPaint) {
      return;
    }

    if (mode === 'brush') {
      context.globalCompositeOperation = 'source-over';
    }
    if (mode === 'eraser') {
      context.globalCompositeOperation = 'destination-out';
    }
    context.beginPath();

    var localPos = {
      x: lastPointerPosition.x - image.x(),
      y: lastPointerPosition.y - image.y()
    };
    context.moveTo(localPos.x, localPos.y);
    var pos = stage.getPointerPosition();
    localPos = {
      x: pos.x - image.x(),
      y: pos.y - image.y()
    };
    context.lineTo(localPos.x, localPos.y);
    context.closePath();
    context.stroke();


    lastPointerPosition = pos;
    layer.draw();
  });



  var select = document.getElementById('tool');
  select.addEventListener('change', function() {
    mode = select.value;
  });
*/
