'use strict';

angular.module('ui.dashboard.widgets', ['ngGrid']);

angular.module('ui.dashboard', ['ui.bootstrap', 'ui.sortable', 'ui.dashboard.widgets']);

angular.module('ui.dashboard')
  .controller('DashboardController', function ($scope) {
    //TODO store active widgets in local storage on add/remove/reorder
    $scope.sortableOptions = {
      stop: function () {
        var titles = _.map($scope.widgets, function (widget) {
          return widget.title;
        });
        console.log(titles);
      }
    };
  })
  .directive('dashboard', function () {
    return {
      restrict: 'A',
      templateUrl: 'scripts/widgets/dashboard.html',
      scope: true,
      controller: 'DashboardController',
      link: function (scope, element, attrs) {
        scope.options = scope.$eval(attrs.dashboard);

        var count = 1;

        scope.addWidget = function (directive, attrs, style) {
          scope.widgets.push({
            title: 'Widget ' + count++,
            directive: directive,
            attrs: attrs,
            style: style
          });
        };

        scope.removeWidget = function (widget) {
          scope.widgets.splice(_.indexOf(scope.widgets, widget), 1);
        };

        scope.clear = function () {
          scope.widgets = [];
        };

        scope.widgets = [];
        _.each(scope.options.defaultWidgets, function (widgetDefinition) {
          scope.addWidget(widgetDefinition.directive, widgetDefinition.attrs, widgetDefinition.style);
        });

        scope.addWidgetInternal = function (event, widget) {
          event.preventDefault();
          scope.addWidget(widget.directive, widget.attrs);
        };

        // allow adding widgets externally
        scope.options.addWidget = scope.addWidget;
      }
    };
  });