console.log('Hello Gallicarte');
var oldResults;
var markersToAdd = [];

function addDisplayEvent(){

    $('#button-type-affichage').click(function(){
      setTimeout(function(){
        markersToAdd = [];
        getCurrentPageResults();
      }, 50);
      addMapButton();
    });

    // addDisplayEvent();
  console.log('add display event');

  requestGallicaApi();

}

function addMapButton(){
  console.log('Add Map Button');
    setTimeout(function() {
      // getCurrentPageResults();

      if($('#topPaginationBarArea').find('.dropdown-menu').first().children().length > 2){
        console.log('nope');
      } else {


        $('#topPaginationBarArea').find('.dropdown-menu').append('<li> <a href="#" class="display-map"><span class="pictos current-mode-affichage icon-carte"></span><span class="desc-mode">carte</span></a></li>');
        displayMap();
      }
    }, 50);
}

function requestGallicaApi(){
  var sruReq = document.location.href.split('?')[1];
  console.log(sruReq);
  $.get('http://gallica.bnf.fr/SRU?version=1.2&'+sruReq, function(result){
    xmlDoc = $.parseXML(result);
    $xml = $( xmlDoc );
    $('body').append('<div style="display:hidden;" class="xmldump">');
    $('.xmldump').html($xml.text());
    arks = $('.xmldump').find("dc:identifier");
    console.log(arks);
    console.log(arks.length);
    arks.each(function(key, ark){
      console.log(ark.text());
    });
  });
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
        console.log(bnfResult);
        bnfLinks.push(bnfResult);
    });
    createSparqlQuery(bnfLinks, function(result){
      markersToAdd = [];
      if(result.coord.length > 0){
        markersToAdd.push(result);
        $('.nb-carte-item').remove();
        $('.display-map').append('<span class="desc-mode nb-carte-item">('+markersToAdd.length+')</span>')
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
        var oldResults = $('#searchResultsArea').html();
        recoverResults(oldResults);

        $('#searchResultsArea').prepend('<div id="map" style="height: 450px; "></div>');
        // $('#searchResultsArea').html('<div id="map" style="height: 450px; "></div>');

        // Init map in Paris
        var map = L.map('map').setView([48.8335877,2.3735772], 13);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoicm9tYWluYm91IiwiYSI6ImNpbXhta3U5bTAwZG12emx5dmF2aW05dnIifQ.HcDxPxknP7xvs2Wb8rsEpw', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'romainbou.pljg503g',
            accessToken: 'pk.eyJ1Ijoicm9tYWluYm91IiwiYSI6ImNpbXhta3U5bTAwZG12emx5dmF2aW05dnIifQ.HcDxPxknP7xvs2Wb8rsEpw',
        }).addTo(map);

        map.addLayer(markers);

        setTimeout(function(){
          markersToAdd.forEach(function(data){
            addMaker(data.coord, data.name, data.url, map);
          });
          markersToAdd = [];
        }, 100);

    });
}


$( document ).ready(function(){
    addDisplayEvent();
});
