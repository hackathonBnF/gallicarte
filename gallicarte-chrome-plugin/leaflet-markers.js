// var firstMarker = L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.0.1/dist/images/marker-icon.png' });

var markers = L.markerClusterGroup({
  iconCreateFunction: function(cluster) {
    var markersTmp = cluster.getAllChildMarkers();
    n = 0;
    //console.log(markersTmp);
    if(markersTmp.length > 0){
      for (var i = 0; i < markersTmp.length; i++) {
        //console.log(markersTmp[i]._popup._content);
        n += (markersTmp[i]._popup._content.match(/<tr>/g) || []).length;
      }
    }
    //console.log(n);
    var c = ' marker-cluster-';
    if (n < 10) {
      c += 'small';
    } else if (n < 100) {
      c += 'medium';
    } else {
      c += 'large';
    }
    return new L.DivIcon({  html: '<div><span>' + n + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
  }
});

var controlSearch = new L.Control.Search({
  position:'topleft',
  layer: markers,
  initial: false,
  zoom: 16
});



function addMaker(coords, title, map){
  var LeafIcon = L.Icon.extend({
    options: {}
});

  var blueIcon = new LeafIcon({iconUrl: 'https://unpkg.com/leaflet@1.0.1/dist/images/marker-icon.png'});


  L.marker(coords, {icon: blueIcon }).addTo(map)
      .bindPopup(title)
      .openPopup();
}
