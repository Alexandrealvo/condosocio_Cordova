function BuscarPac(lat,lng,idprof) {

  var uluru = {lat:lat, lng:lng};
        var map = new google.maps.Map(document.getElementById('map'), {
          maxZoom: 18, // for max zoom
          zoom: 17,
          center: uluru,
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


     var image='css/img/iconeprime2.png'; 
      
      // Icone do Paciente

      var pos = {
              lat:lat,
              lng: lng
             
            };

       
       var marker = new google.maps.Marker({
        position: pos,
        map: map,
        animation: google.maps.Animation.DROP,
        icon:image,
        title: "local paciente", }); 



          // Add the circle for this city to the map.
          var raioCircle = new google.maps.Circle({
            strokeColor: 'green',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: 'green',
            fillOpacity: 0.35,
            map: map,
            center: pos,
            radius: 150
          });

      map.setCenter(pos);

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            
            var pac = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
             
            };
             

var overlay = new google.maps.OverlayView();
overlay.draw=function() {};

overlay.setMap(map);

overlay.getPanes();

$.ajax({      //Função AJAX
            url:"https://www.isaudebelem.com.br/xdk/prof_img.php?idprof="+idprof,           
            dataType: "json",

            success: function(data) {


if (data.imgperfil==""){
var url="css/img/user.png";
} else {
 var url="https://www.isaudebelem.com.br/downloads/fotosprofissionais/"+data.imgperfil;
}
  var imgper = {
    url:url, // url
        size: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0,50),
        scaledSize: new google.maps.Size(50,50),
    
};    

       var marker = new google.maps.Marker({
        position: pac,
        map: map,
        icon:imgper,
        animation: google.maps.Animation.DROP,
        optimized:false }); 

    var myoverlay = new google.maps.OverlayView();
     myoverlay.draw = function () {
         this.getPanes().markerLayer.id='markerLayer';
     };

       myoverlay.setMap(map);


            }
    })
       

          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

  }