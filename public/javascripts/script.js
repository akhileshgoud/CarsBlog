// nav dropdown click toggle

$(".navbar-nav button").click(function(event) {
    $(".navbar-collapse").collapse('hide');
});


//reset database
function resetCars() {
    $.getJSON( "/resetAllCars", function( data ){});
    $("#cars-data").html('<h2>Data reset successful!</h2><a href="/cars"><button class="btn btn-lg btn-primary" id="init-btn">View</button></a>');   
}
