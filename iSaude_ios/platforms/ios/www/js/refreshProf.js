
  $(document).on('click','a.refresh',function(){

       
     
    var idsecao = localStorage.getItem('idsecao_');
    var imgperfil = localStorage.getItem('imgperfil_');

         var map;


function initMap(){

       
        var map = new google.maps.Map(document.getElementById('map'), {
          maxZoom: 18, // for max zoom
          zoom: 18,
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


        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
             
            };


      

var overlay = new google.maps.OverlayView();
overlay.draw=function() {};

overlay.setMap(map);

overlay.getPanes();


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

       var marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon:imgper,
        animation: google.maps.Animation.DROP,
        optimized:false }); 


    var myoverlay = new google.maps.OverlayView();
     myoverlay.draw = function () {
         this.getPanes().markerLayer.id='markerLayer';
     };

       myoverlay.setMap(map);

        map.setCenter(pos);


          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }


$.ajax({      //Função AJAX
      url:"https://www.isaudebelem.com.br/xdk/mapa.php?idsecao="+idsecao,      //Arquivo php
      type:"get",  
      async: false,
        success: function (dados){  
 
    var localizacao = dados.localizacao.split(","); 
    var point = new google.maps.LatLng(localizacao[0], localizacao[1]);
    
    var latpac=localizacao[0];
    var lngpac=localizacao[1];

 
$('#nomepaciente').html('<h4 class="text-center color-green">'+dados.nome+'</h4>');
$('#endpac').html('<p class="text-center">'+dados.endereco+' <br> '+dados.bairro+' - '+dados.cidade+' - '+dados.uf+'</p>');

if (dados.ctl_checking==0){

  if (dados.ctl_gps==0){
$('#butmap1').html(' <button class="col open-confirm button button-big button-raised button-fill color-green" onClick="check('+dados.idsecao+','+latpac+','+lngpac+')"><i class="fa fa-check"></i><span> Check-in</span></button>');

$('#butmap2').html('<button class="col button button-big button-raised button-fill color-gray" onClick="BuscarPac('+latpac+','+lngpac+','+dados.idprof+')"> <i class="flaticon-placeholder"></i> Paciente </button>');

$('#butmap3').html('<button class="col button button-big button-raised button-fill color-blue" onClick="atualizar('+dados.id+')"><i class="fa fa-refresh"></i> 1ª Atualização</button>');

} else {

$('#butmap1').html(' <button class="col open-confirm button button-big button-raised button-fill color-green" onClick="check('+dados.idsecao+','+latpac+','+lngpac+')"><i class="fa fa-check"></i><span> Check-in</span></button>');

$('#butmap2').html('<button class="col button button-big button-raised button-fill color-gray" onClick="BuscarPac('+latpac+','+lngpac+','+dados.idprof+')"> <i class="flaticon-placeholder"></i> Paciente </button>');

$('#butmap3').html('<button class="col button button-big button-raised button-fill color-red" onClick="ResetGPS('+idsecao+')"><i class="fa fa-refresh"></i> Atualizar</button>');
}

} else { 

$('#butmap1').html(' <button class="col-50 open-confirm button button-big button-raised button-fill color-red" onClick="checkout('+dados.idsecao+','+latpac+','+lngpac+')"><i class="fa fa-check"></i><span> Check-out</span> </button>');
$('#butmap2').html('<button class="col-50 button button-big button-raised button-fill color-gray" onClick="BuscarPac('+latpac+','+lngpac+','+dados.idprof+')"> <i class="flaticon-placeholder"></i> Paciente </button>');

$('#checkinfo').html('<p class="text-center color-red"><i class="fa fa-clock-o" aria-hidden="true"></i> Check-in <br>'+dados.checking+'h</p>');


      } 


          // Add the circle for this city to the map.
          var raioCircle = new google.maps.Circle({
            strokeColor: 'green',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: 'green',
            fillOpacity: 0.35,
            map: map,
            center: point,
            radius: 150
          });

     var image='css/img/iconeprime2.png'; 
      
      // Icone do Paciente

      var marker = new google.maps.Marker({
        position: point,
        map: map,
        animation: google.maps.Animation.DROP,
        icon:image
     }); 

  


                } 
            })

   window.setTimeout("initMap()", 1000);     
 }

initMap();

});
