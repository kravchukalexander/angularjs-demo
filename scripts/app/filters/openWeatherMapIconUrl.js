app.filter('openWeatherMapIconUrl', function() {
    return function(input) {
        return 'http://openweathermap.org/img/w/' + input + '.png';
    };
});