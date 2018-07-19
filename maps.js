var ourLoc;
var view;
var map;


function init() {

	ourLoc = ol.proj.fromLonLat([41.043316, 28.862457]);

	view = new ol.View({
		center: ourLoc,
		zoom: 5
	});

	map = new ol.Map({
		target: 'map',
		layers: [
		  new ol.layer.Tile({
		    source: new ol.source.OSM()
		  })
		],
		loadTilesWhileAnimating: true,
		view: view
	});
}


function panHome(){
	var homeName = document.getElementById("home-name").value;
	var lon = 0.0
  var lat = 0.0

	var question = "https://restcountries.eu/rest/v2/name/"+homeName;
	question = question.replace(/ /g, "%20");

	var countryRequest = new XMLHttpRequest();
  countryRequest.open('GET', question, false);
  countryRequest.send();

  if(countryRequest.readyState != 4 || countryRequest.status != 200 || countryRequest.responseText === ""){
    window.console.error("Request had an error!");
    return;
  }

	var countryInformation = JSON.parse(countryRequest.responseText);

  lat = countryInformation[0].latlng[0];
  lon = countryInformation[0].latlng[1];

  var home = ol.proj.fromLonLat([lon, lat]);
  view.animate({
    center: home,
    duration: 2000
  });
}


function panToLocation(){
  var countryName = document.getElementById("country-name").value;
  var lon = 0.0
  var lat = 0.0

  var query = "https://restcountries.eu/rest/v2/name/"+countryName;
  query = query.replace(/ /g, "%20");
  // alert(query);

  var countryRequest = new XMLHttpRequest();
  countryRequest.open('GET', query, false);
  countryRequest.send();

  if(countryRequest.readyState != 4 || countryRequest.status != 200 || countryRequest.responseText === ""){
    window.console.error("Request had an error!");
    return;
  }

  // alert("Ready State " + countryRequest.readyState);
  // alert("Status " + countryRequest.status);
  // alert("Response " + countryRequest.responseText);

  var countryInformation = JSON.parse(countryRequest.responseText);

  lat = countryInformation[0].latlng[0];
  lon = countryInformation[0].latlng[1];

  // alert(countryName + ": lon " + lon + "& lat " + lat);

  var location = ol.proj.fromLonLat([lon, lat]);
    view.animate({
      center: location,
      duration: 2000
    });

}


function panToCapital(){
	var capitalName = document.getElementById("capital-name").value;
	var lon = 0.0
	var lat = 0.0

	var ask = "https://restcountries.eu/rest/v2/capital/"+capitalName;
	ask = ask.replace(/ /g, "%20");

	var capitalRequest = new XMLHttpRequest();
	capitalRequest.open('GET', ask, false);
	capitalRequest.send();

	if(capitalRequest.readyState != 4 || capitalRequest.status != 200 || capitalRequest.responseText === ""){
		window.console.error("Request had an error!");
		return;
	}

	var capitalInformation = JSON.parse(capitalRequest.responseText);

	lat = capitalInformation[0].latlng[0];
	lon = capitalInformation[0].latlng[1];

	var capital = ol.proj.fromLonLat([lon, lat]);
    view.animate({
      center: capital,
      duration: 2000
    });
}



window.onload = init;
