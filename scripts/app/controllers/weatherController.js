app.controller('weatherController', [
    '$scope', 'forecast', function ($scope, forecast) {

        //private

        var buildMatrix = function (data) {
            var counter = 0,
                i = 0,
                firstDate = new Date(data[0].dt_txt).getDate(),
                lastDate = new Date(data[data.length - 1].dt_txt).getDate(),
                insertFakes = function(data, method, counter) {
                    if (counter > 0 && counter < 8) {
                        for (i = 0; i < 8 - counter; i++) {
                            data[method || 'push']({ fake: true });
                        }
                    }
                };

            // fix head
            for (i = 0; i < data.length; i++) {
                var currentDate = new Date(data[i].dt_txt).getDate();
                if (firstDate !== currentDate) {
                    break;
                }
                counter++;
            }
            insertFakes(data, 'unshift', counter);

            //fix tail
            counter = 0;
            for (i = data.length - 1; i > 0 ; i--) {
                var currentDate = new Date(data[i].dt_txt).getDate();
                if (lastDate !== currentDate) {
                    break;
                }
                counter++;
            }
            insertFakes(data, 'push', counter);

            //build matrix
            var matrix = [];
            for (i = 0; i < data.length / 8; i++) {
                matrix.push(data.slice(i * 8, i * 8 + 8));
            }
            return matrix;
        }

        //public

        $scope.unitsOfMeasure = [
        {
            name: 'Metric',
            temp_suffix: 'C',
            wind_suffix: 'm/s'
        },
        {
            name: 'Imperial',
            temp_suffix: 'F',
            wind_suffix: 'm/h'
        }];

        $scope.unitOfMeasure = $scope.unitsOfMeasure[0]; // set metric by default

        $scope.setUnitOfMeasure = function(unitOfMeasure) {
            if ($scope.unitOfMeasure !== unitOfMeasure) {
                $scope.unitOfMeasure = unitOfMeasure;
                $scope.search();
            }
        };

        $scope.location = 'Toronto, Canada'; // set default location

        $scope.search = function (location) {
            $scope.loadingForecast = true;
            forecast.getFiveDays(location || $scope.location, $scope.unitOfMeasure)
                .success(function (data) {
                    if (data.cod === '200') {
                        data.matrix = buildMatrix(data.list);
                        $scope.forecastData = data;
                    } else {
                        $scope.forecastData = null;
                    }
                    $scope.loadingForecast = false;
                })
                .error(function (error) {
                    console.dir(error);// for deuggin perposes
                    $scope.loadingForecast = null;
                    $scope.forecastData = null;
                });
        };

        $scope.search(); // show default location forecast
    }
]);