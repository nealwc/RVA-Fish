$(document).ready(function () {
    var APIKey = "75900bea1841f363eb7e4ff8ed89560d";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=richmond&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var cityName = response.name // open weather API's city name
            var iconUrl = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"; // current weather icon
            var icon = $("<img>").attr("src", iconUrl);
            var fahrTemp = ((response.main.temp - 271.15) * 1.8 + 32).toFixed(1); // converts open weather API 
            var temp = $("<h3>").html("Teperature: " + fahrTemp + " &deg;F");
            var humidity = $("<h3>").text("Humidity: " + response.main.humidity + "%");
            var windSpeed = $("<h3>").text("Wind Speed: " + response.wind.speed + " MPH");
            var date = new Date(response.dt * 1000).toLocaleDateString("en-US"); // convert dt to date

            $("#city").append($("<h1>").text(cityName + " (" + date + ")"));
            $("#icon").append(icon);
            $("#temperature").append(temp);
            $("#humid").append(humidity);
            $("#wind").append(windSpeed);

            var lat = response.coord.lat; // grab lattitude from current weather API for UV Index API
            var lon = response.coord.lon; // grab longitude from current weather API for UV Index API
            var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;

            $.ajax({
                url: uvUrl,
                method: "GET"
            })
                .then(function (response) {
                    var UV = response.value;
                    var UVel = $("<h3>").text("UV Index: " + UV);
                    $("#uv-index").append(UVel);
                })
        });
});