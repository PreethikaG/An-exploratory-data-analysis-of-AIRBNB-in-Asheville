
var myMap = L.map("choro_map", {
    center: [35.5951, -82.5515],
    zoom: 11
  
});
  
  // Adding a tile layer (the background map image) to our map
    
 L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      
    tileSize: 512,
    maxZoom: 20,
    zoomOffset: -1,
    id: "mapbox/streets-v10",
    accessToken: api_key
  }).addTo(myMap);
  
//  Load the geojson file

  d3.json('static/data/neighbourhoods.geojson').then((data) =>{
    console.log(data);
    
    L.geoJson(data.features,{style: style}).addTo(myMap);

    function style(features) {
        return {
            fillColor: getColor(features.properties.median),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    function getColor(d) {
        return d > 140 ? '#08519c' :
                d > 120  ? '#3182bd' :
                d > 100 ? '#6baed6' :
                d > 80  ? '#bdd7e7' :
                            '#eff3ff';
    }

    function highlightFeature(e) {
        var layer = e.target;
    
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
    
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
        info.update(layer.feature.properties);
    }

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
    }

    var geojson;

    function zoomToFeature(e) {
        myMap.fitBounds(e.target.getBounds());
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }
    
    geojson = L.geoJson(data, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(myMap);

    var info = L.control();

    info.onAdd = function (myMap) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
        this._div.innerHTML = '<h4>Hover over a state to get the mean and median price</h4>' +  (props ?
         '<b> Average Price:' + props.mean + '$' + '</b><br />' + '<b> Median Price:' + props.median + '$' + '</b><br />'  
         : '');
    };

    info.addTo(myMap);

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 80, 100, 120, 140],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
    };

    legend.addTo(myMap);



  });
      



  
    
    

  
  
  
