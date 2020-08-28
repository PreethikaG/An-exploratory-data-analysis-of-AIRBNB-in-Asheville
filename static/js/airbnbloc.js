// INITIALIZE THE BOOTSTRAP.JS SLIDERS
var slider = new Slider("#ex8", {
	tooltip: 'always'
});

var slider = new Slider("#ex9", {
	tooltip: 'always'
});

// GET HTML COMPONENT FOR AREA DROPDOWN
var areaComponent = d3.select("#area");

// GET HTML COMPONENT FOR MINIMUM RATING
var ratingComponent = d3.select("#ex8");

// GET HTML COMPONENT FOR MAXIMUM PRICE
var priceComponent = d3.select("#ex9");

// GET HTML COMPONENT FOR PROPERTY TYPE
var propertyComponent = d3.select("#ptype");

//GET HTML COMPONENT FOR 'SUBMIT' BUTTON AND ADD EVENT LISTENER
var searchButtonComponent = d3.select("#search_button");
searchButtonComponent.on('click',searchClicked);

//GET HTML COMPONENT FOR THE FORM AND ADD EVENT LISTENER
var formComponent = d3.select("#form");
formComponent.on('submit',searchClicked);

// DECLARE GLOBAL VARIABLES FOR EVENT VALUES
var areaValue = '';
var ratingValue = '';
var ratingValue = '';
var priceValue = '' ;
var propertyValue = '';
var filteredData = [];

//CALL BACK FOR THE 'SUBMIT' BUTTON EVENT LISTENER AND FORM SUBMIT EVENT LISTENER
function searchClicked(){
    console.log("Search button was clicked");

    var areaValue = areaComponent.property("value");
    console.log(areaValue);

    var ratingValue = ratingComponent.property("value");
    console.log(ratingValue);

    var priceValue = priceComponent.property("value");
    console.log(priceValue);

    var propertyValue = propertyComponent.property("value");
    console.log(propertyValue);

}

var myMap = L.map("airbnb_locate", {
    center: [35.5951, -82.5515],
    zoom: 11
  
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    
  tileSize: 512,
  maxZoom: 20,
  zoomOffset: -1,
  id: "mapbox/streets-v10",
  accessToken: api_key
}).addTo(myMap);

function createMap(feature)
{
  L.geoJson(feature,{
    style:{
      color:'black'
    }
  }).addTo(myMap);
}

d3.json('static/data/neighbourhoods.geojson').then((data) =>{
    console.log(data);
    createMap(data.features);
});

d3.csv('static/data/listing_detail_df_new.csv').then((data)=>{
  console.log(data);

  var lat = data.map(row => row.latitude);
  var lng = data.map(row => row.longitude);
  var name = data.map(row => row.name);
  filteredData = filteredData.filter(data => data.property_type === propertyValue );
  
  // createListing(lat,lng,name);
  var markers = L.markerClusterGroup()
  
  for (var i = 0; i < lat.length; i++) 
  {
    markers.addLayer(L.marker([lat[i],lng[i]]).bindPopup("Description:" + name[i]));
    
    
  }
  myMap.addLayer(markers);



});


