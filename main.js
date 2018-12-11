$('#btn').click(function() {
  if(navigator.geolocation) {
    $('body').addClass('loading');
    navigator.geolocation.getCurrentPosition(function(position){
      var lat = position.coords.latitude;
      var long = position.coords.longitude;

      $.ajax({
        method: "GET",
        url: "https://api.nasa.gov/planetary/earth/imagery?lon="+ long.toString() + "&lat=" + lat.toString() +  "&date=2014-02-01&cloud_score=True&api_key=gwejQSNX8W9S6y5EOvl2QZYXQO1uEdhraku3R3NN",
        dataType: "Json",
        cache: true
      })
      .done(function(data){
        $('#satellite').addClass('loaded');
        $('img').attr('src',data.url).on('load', function(){
          $('body').removeClass('loading');

        });
        $('#cloudScore').text("Percentage of clouds above you: " + data.cloud_score.toFixed(2) + "%");
        var cloud_score = data.cloud_score.toFixed(2);
        if(cloud_score > 0 && cloud_score < 10) {
          $('#cloudScoreDescription').text("It's not that cloudy where you are right now.");
        } else if (cloud_score >= 10 && cloud_score < 50) {
          $('#cloudScoreDescription').text("It's kind of cloudy where you are right now.");
        } else if (cloud_score >= 50 && cloud_score < 80) {
          $('#cloudScoreDescription').text("It's very cloudy where you are right now.");
        } else if (cloud_score >= 80 && cloud_score <= 100) {
          $('#cloudScoreDescription').text("It is hella cloudy where you are right now.");
        }
      })
      .fail(function(){
        alert("ERROR!");
      });

    });
  }
});
