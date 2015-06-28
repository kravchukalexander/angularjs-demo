app.directive('ngWeatherWidgetItem', function () {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            unit: '='
        },
        templateUrl: 'scripts/app/directives/templates/ngWeatherWidgetItem.html'
    }
})