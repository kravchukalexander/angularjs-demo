app.factory('forecast', [
    '$http', function($http) {
        return {
            getFiveDays: function(location, unit) {
                var url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + location + '&units=' + unit.name;
                return $http.get(url)
                    .success(function(data) {
                        return data;
                    })
                    .error(function(error) {
                        return Error;
                    });
            }
        }
    }
]);