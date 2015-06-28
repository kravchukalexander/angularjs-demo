app.filter('noneFakeValueDate', function() {
    return function (input) {
        var date = null;
        for (var i = 0; i < input.length; i++) {
            if (input[i].dt) {
                date = input[i].dt;
                break;
            }
        }
        return date;
    }
})