app.filter('dtFilter', function() {
    return function (input) {
        var date = new Date(0);
        date.setUTCSeconds(input);
        return date;
    }
})