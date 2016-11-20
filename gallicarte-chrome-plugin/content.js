console.log('Hello Gallicarte');
var mapButtonAdded = false;
var mapDisplayed = false;
var oldResults;
var markersToAdd = [];

function addDisplayEvent(){
    $('#button-type-affichage').click(function(){

        setTimeout(function(){
           getCurrentPageResults();
        }, 200);

        addMapButton();
    });
}

function addMapButton(){
  console.log("add button");
    if($('#topPaginationBarArea').find('.dropdown-menu').length >= 3){
        return;
    } else {
        mapButtonAdded = true;
    }
    setTimeout(function() {
        console.log('Add Map Button');
        $('#topPaginationBarArea').find('.dropdown-menu').append('<li> <a href="#" class="display-map"><span class="pictos current-mode-affichage icon-carte"></span><span class="desc-mode">carte</span></a></li>');
        displayMap();
    }, 50);

}

function getCurrentPageResults(map){
    console.log("get current page results");
    var urls = $('.main-infos > h2 > a');
    bnfLinks = [];
    urls.each(function(key, link){
        var parsedLink = $(link).attr('href').split('.');
        var parsedName = $(link).html();
        var bnfLink = parsedLink[0] +'.'+ parsedLink[1] +'.'+ parsedLink[2];
        bnfLinks.push([parsedName, bnfLink]);
    });
    createSparqlQuery(bnfLinks, function(name, coord){
      if(coord.length > 0){
        markersToAdd.push([coord, name]);
      }
    });
}


function displayMap(){
    $('.display-map').click(function(){
        oldResults = $('#searchResultsArea').html();
        $('#searchResultsArea').html('<div id="map" style="height: 450px; "></div>');

        var map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: '',
            accessToken: '',
        }).addTo(map);

        map.addLayer(markers);

        setTimeout(function(){
          markersToAdd.forEach(function(data){
            addMaker(data[0], data[1], map);
          });
        }, 100);

    });
}


$( document ).ready(function(){
    addDisplayEvent();
});
