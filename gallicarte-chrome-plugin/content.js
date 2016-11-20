console.log('Hello Gallicarte');
var oldResults;
var markersToAdd = [];

function addDisplayEvent(){

    // setTimeout(function(){
    //    getCurrentPageResults();
    // }, 200);
    $('#button-type-affichage').click(function(){
      addMapButton();
    });

    // addDisplayEvent();
  console.log('add display event');

}

function addMapButton(){
  console.log('Add Map Button');
    setTimeout(function() {
      if($('#topPaginationBarArea').find('.dropdown-menu').first().children().length > 2){
        console.log('nope');
      } else {
        $('#topPaginationBarArea').find('.dropdown-menu').append('<li> <a href="#" class="display-map"><span class="pictos current-mode-affichage icon-carte"></span><span class="desc-mode">carte</span></a></li>');
        displayMap();
      }
    }, 30);
}

function getCurrentPageResults(){
    console.log("get current page results");
    var urls = $('.main-infos > h2 > a');
    bnfLinks = [];
    urls.each(function(key, link){
        var parsedLink = $(link).attr('href').split('.');
        var parsedName = $(link).html();
        var bnfLink = parsedLink[0] +'.'+ parsedLink[1] +'.'+ parsedLink[2];
        var bnfResult = {
          url: bnfLink,
          name: parsedName
        };
        bnfLinks.push(bnfResult);
    });
    createSparqlQuery(bnfLinks, function(result){
      if(result.coord.length > 0){
        markersToAdd.push(result);
      }
    });
}

function recoverResults(oldResults){
  $('.dropdown-menu').first().find('a').click(function(e){
    if(!$(e.target).hasClass('display-map')){
        $('#searchResultsArea').html(oldResults);
        setTimeout(function(){
          addDisplayEvent();
        }, 100);
    }
  });
}


function displayMap(){
    $('.display-map').click(function(){
        addDisplayEvent();
        getCurrentPageResults();
        var oldResults = $('#searchResultsArea').html();
        recoverResults(oldResults);

        $('#topPaginationBarArea').find('a');

        $('#searchResultsArea').html('<div id="map" style="height: 450px; "></div>');

        var map = L.map('map').setView([48.8335877,2.3735772], 13);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: '',
            accessToken: '',
        }).addTo(map);
        
        map.addLayer(markers);

        setTimeout(function(){
          markersToAdd.forEach(function(data){
            console.log(data);
            addMaker(data.coord, data.name, data.url, map);
          });
        }, 100);

    });
}


$( document ).ready(function(){
    addDisplayEvent();
});
