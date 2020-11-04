  
function initMap(idsecao,imgperfil){ 
alert(idsecao)
       
        var map;
        var markers = [];       
        var map = new google.maps.Map(document.getElementById('map'), {
            maxZoom: 18, // for max zoom
            zoom: 17,
          
            disableDefaultUI: true,
            styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
]
        });


         var infoWindow = new google.maps.InfoWindow({map: map});

         
if (imgperfil==""){
var url="css/img/user.png";
} else {
 var url="https://www.isaudebelem.com.br/downloads/fotosprofissionais/"+imgperfil;
}
  var imgper = {
      url: url, // url
       size: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0,50),
        
};    
//aqui apagamos o marke 
/* Loop();

  setInterval(function(){
     for (var i = 0; i < markers.length; i++ ) {
     markers[i].setMap(null);
    }

    Loop();

  },2000);

*/

var overlay = new google.maps.OverlayView();
overlay.draw=function() {};

overlay.setMap(map);

overlay.getPanes();

 var myoverlay = new google.maps.OverlayView();
     myoverlay.draw = function () {
         this.getPanes().markerLayer.id='markerLayer';
     };

myoverlay.setMap(map);

 /*
function Loop(){
  
 //Try HTML5 geolocation.

 */
        if (navigator.geolocation) {

          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
             
            }; 
/*
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    var latmin=lat-0.00200;
    var latmax=parseFloat(lat)+parseFloat(0.00200);
    var lngmin=lng-0.00200;
    var lngmax=parseFloat(lng)+parseFloat(0.00200);


if (lat<latmin || lat>latmax || lng<lngmin || lng>lngmax){
var cor = 'green';
} else {
var cor = 'red';
}
*/ 
       var marker_pac = new google.maps.Marker({
        position: pos,
        map: map,
        icon:imgper,
        //animation: google.maps.Animation.DROP,
        optimized:false 

      }); 

 //markers.push(marker);

   

          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
  //}; 


$.ajax({      //Função AJAX
      url:"https://www.isaudebelem.com.br/xdk/mapa.php?idsecao="+idsecao,      //Arquivo php
      type:"get",  
      async: false,
        success: function (dados){  
 


                } 

          })

 
}


/* WILLIAM - INICIO */
function getMarker(){
    return marker;
}

function getMap(){
    return map;
}
/* WILLIAM - FIM */