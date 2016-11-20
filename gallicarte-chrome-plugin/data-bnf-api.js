function createSparqlQuery(bnfResults, done){
    bnfResults.forEach(function(bnfResults){
        var arkLink = bnfResults.url;
        var name = bnfResults.name;
        // arkLink = "http://gallica.bnf.fr/ark:/12148/bpt6k5657596m";
        var req= 'http://data.bnf.fr/sparql?default-graph-uri=&query=' + encodeURIComponent('PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>\
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\
        PREFIX dcterms: <http://purl.org/dc/terms/>\
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
        PREFIX rdarelationships: <http://rdvocab.info/RDARelationshipsWEMI/>\
        PREFIX dc: <http://purl.org/dc/elements/1.1/>\
        PREFIX marcrel: <http://id.loc.gov/vocabulary/relators/>\
        PREFIX bnfroles: <http://data.bnf.fr/vocabulary/roles/>\
        SELECT ?docnum ?lieu ?lat ?long ?label \
        WHERE\
        {\
          ?conceptLieu foaf:focus ?lieu ;\
            skos:prefLabel ?label .\
        ?lieu a geo:SpatialThing;\
            geo:lat ?lat ;\
            geo:long ?long.\
        \
            \
        ?conceptLieu  skos:closeMatch ?sujet.\
        ?edition dcterms:subject ?sujet ;\
        rdarelationships:expressionManifested ?exp.\
        ?exp ?s ?p .\
        ?edition rdarelationships:electronicReproduction ?docnum .\
          FILTER regex(?docnum, "'+ arkLink +'") \
        }\
        LIMIT 1') + '&format=application%2Fsparql-results%2Bjson&timeout=0&should-sponge=&debug=on';

        $.get(req, function(data) {
            var coord = extractCoordinates(data);
            done({name: name, url:arkLink, coord:coord});
        });

    });
}

function extractCoordinates(data){
    console.log(data);
    if(data.results != undefined && data.results.bindings != undefined && data.results.bindings.length > 0){
        coordinates = [];
        if(data.results.length > 0){
            data.results.forEach(function(binding){
                binding.forEach(function(coord){
                    coordinates.push([coord.lat.value, coord.long.value]);
                });
            });
        } else {
            data.results.bindings.forEach(function(coord){
                coordinates.push([coord.lat.value, coord.long.value]);
            });
        }
        return coordinates;
        // return [parseFloat(lat), parseFloat(long)];
    } else {
        return [];
    }
}
