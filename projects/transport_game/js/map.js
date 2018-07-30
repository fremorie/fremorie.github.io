import { Destination } from './destination.js';

var myMap;
var destinations;
const numberOfDestinations = 10;

function addDestinationToMap(destination, num) {
  let placemark = new ymaps.Placemark(destination.coords, {
    hintContent: destination.timeToString(),
    balloonContent: num
    });
  myMap.geoObjects.add(placemark);
}

function generateDestinations(numberOfDestinations) {
  var destinations = {};
  for (let i = 0; i < numberOfDestinations; i++) {
    destinations[`${i}`] = Destination.generate();
  }
  return destinations;
}

window.onload = function() {
  myMap = new ymaps.Map("map", {
    center: Destination.mapCenter(),
    zoom: 10
  });
  console.log(Destination.mapCenter());
  destinations = generateDestinations(numberOfDestinations);
  console.log(destinations);
  Object.keys(destinations).forEach(function(key) {
    addDestinationToMap(destinations[key], key);
  });
}
