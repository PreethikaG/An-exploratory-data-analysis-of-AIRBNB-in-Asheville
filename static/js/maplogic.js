
var myMap = L.map("all_listing_map", {
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

  
function createMap(feature)
{
  L.geoJson(feature,{
    style:{
      color:'black'
    }
  }).addTo(myMap);
}


// function createListing(lat,lng,name){
//   // console.log("Printing function");
//   // console.log(lat);
//   // console.log(lng);
//   var markers = L.markerClusterGroup();
  
//   for (var i = 0; i < lat.length; i++) 
//   {
//     markers.addLayer(L.marker([lat[i],lng[i]]).bindPopup("Description:" + name[i]));
//     // .addTo(myMap));
//     // console.log("infor loop");
//     // console.log(lat[i]);
//     // console.log(lng[i]);
    
    
//   }
//   myMap.addLayer(markers);
  

// }


d3.json('static/data/neighbourhoods.geojson').then((data) =>{
  console.log(data);
  createMap(data.features);
});
    
d3.csv('static/data/listings_details.csv').then((data)=>{
  console.log(data);

  var lat = data.map(row => row.latitude);
  var lng = data.map(row => row.longitude);
  var name = data.map(row => row.name);
  
  // createListing(lat,lng,name);
  var markers = L.markerClusterGroup()
    // zoomToBoundsOnClick: false,
    // iconCreateFunction: function (cluster) 
    // {
    //   var childCount = cluster.getChildCount();
    //   var c = ' marker-cluster-';
    //   if (childCount < 100) {
    //     c += 'small';
    //   } 
    //   else if (childCount > 100 || childCount < 300 ) {
    //     c += 'medium';
    //   } 
    //   else {
    //     c += 'large';
    //   }
     
    //   return new L.divIcon({ html: '<div><span>' + childCount + '</span></div>', 
    //    className: 'marker-cluster' + c, iconSize: new L.Icon(40, 40) });
    // }
  // });

  // markers.refreshClusters();
    

  
  
  for (var i = 0; i < lat.length; i++) 
  {
    markers.addLayer(L.marker([lat[i],lng[i]]).bindPopup("Description:" + name[i]));
    
    
  }
  myMap.addLayer(markers);



});




