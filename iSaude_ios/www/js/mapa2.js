                  
 function initMap() {

       
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          
          styles:[
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

       var image='css/img/perfilmedico.png';
       var marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon:image,
        title: "sua localização", }); 

       
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

$('#butmap1').html(' <button class="col open-confirm button button-big button-raised button-fill color-green" onClick="check('+dados.idsecao+','+latpac+','+lngpac+')">Check-in</button>');
$('#butmap2').html('<button class="col button button-big button-raised button-fill color-gray" onClick="BuscarPac('+latpac+','+lngpac+')"> <i class="flaticon-placeholder"></i> Paciente </button>');
$('#butmap3').html('<button class="col button button-big button-raised button-fill color-blue" onClick="atualizar('+dados.id+')"> Atualizar </button>');

} else { 

$('#butmap1').html(' <button class="col open-confirm button button-big button-raised button-fill color-red" onClick="checkout('+dados.idsecao+','+latpac+','+lngpac+')">Check-out</button>');
$('#butmap2').html('<button class="col button button-big button-raised button-fill color-gray" onClick="BuscarPac('+latpac+','+lngpac+')"> <i class="flaticon-placeholder"></i> Paciente </button>');
$('#butmap3').html('<button class="col button button-big button-raised button-fill color-blue" onClick="atualizar('+dados.id+')"> Atualizar </button>');
$('#checkinfo').html('<p class="text-center color-red">Check-in realizado: <br>'+dados.checking+'</p>');


      } 


     var image='css/img/iconeprime2.png'; 
      
      // Icone do Paciente

      var marker = new google.maps.Marker({
        position: point,
        map: map,
        icon:image
     }); 

                } 
            })
      }  
 
 