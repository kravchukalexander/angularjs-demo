app.directive('ngWeatherWidget', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            unit: '='
        },
        templateUrl: 'scripts/app/directives/templates/ngWeatherWidget.html'
    }
})