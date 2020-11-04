var ver = false;
var markers = [];
var marker, map;

function initMap2(idsecao,imgperfil) {
  
    //var myLatlng = new google.maps.LatLng(-1.4425948,-48.4916424);
    var mapOptions = {
        maxZoom: 18, // for max zoom
        zoom: 16,
        disableDefaultUI: true,
        //center: myLatlng,
        //mapTypeId: google.maps.MapTypeId.ROADMAP,
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


    }


    map = new google.maps.Map(document.getElementById('map'), mapOptions);
            


                if (imgperfil==""){

                    var url="css/img/user.png";

                } else {
                     var url="https://www.isaudebelem.com.br/downloads/fotosprofissionais/"+imgperfil;
                  }
                       var imgper = {
                          url: url, // url
                          size: new google.maps.Size(50, 50),
                          origin: new google.maps.Point(0, 0),
                          anchor: new google.maps.Point(25,25),
                            
                       };    

                            var overlay = new google.maps.OverlayView();
                            overlay.draw=function() {};

                            overlay.setMap(map);

                            overlay.getPanes();

                            var myoverlay = new google.maps.OverlayView();
                                 myoverlay.draw = function () {
                                     this.getPanes().markerLayer.id='markerLayer';
                                 };

                            myoverlay.setMap(map);

        if (navigator.geolocation) {

          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
             
            }; 

  

    marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon:imgper,
        animation: google.maps.Animation.DROP,
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

                $.ajax({      //Função AJAX
                          url:"https://www.isaudebelem.com.br/xdk/mapa.php?idsecao="+idsecao,      //Arquivo php
                          type:"get",  
                          async: false,
                            success: function (dados){  


                                                        var localizacao = dados.localizacao.split(","); 
                                                        var point = new google.maps.LatLng(localizacao[0], localizacao[1]);
                                                        
                                                        var latpac=localizacao[0];
                                                        var lngpac=localizacao[1];
                                                        


                                                    if (dados.ctl_checking==0){


                                                    $('#butmap').html('<a href="#" onclick="DelSecao('+idsecao+')" style="background-color:red"> <i class="fa fa-trash-o"></i></a><br>');

                                                    $('#butmap1').html('<a href="infosessao.html" class="info_checkin"  data-idsecao="'+idsecao+'" data-checkin_msql="'+dados.checkin_msql+'" style="background-color:gray"> <i class="fa fa-info"></i></a><br>');

                                                    

                                                    $('#butmap4').html('<a href="#"  onclick="MarcarHora('+idsecao+')" style="background-color:#589688"><i class="fa fa-clock-o"></i></a><br>');


                                                    var check_info = "";

                                                        if (dados.ctl_gps==0){

                                                    $('#butmap2').html('<a href="#" onClick="check('+dados.idsecao+','+latpac+','+lngpac+','+dados.id+',0)"><i class="fa fa-check"></i></a><br>');

                                                    $('#butmap3').html('<a href="#" style="background-color:blue" onClick="atualizar('+dados.id+')"><i class="fa fa-refresh"></i></a><br>');


                                                        } else {

                                                    $('#butmap2').html('<a href="#" onClick="check('+dados.idsecao+','+latpac+','+lngpac+','+dados.id+',1)"><i class="fa fa-check"></i></a><br>');

                                                    $('#butmap3').html('<a href="#" style="background-color:orange" onClick="ResetGPS('+idsecao+')"><i class="fa fa-refresh"></i></a></br>');
                                                          }


                                                    checkmap="";


                                                         } else { 

                                                    //$('#butmap').html('<a href="" onclick="ResetCheck('+idsecao+')"  style="background-color:blue"><i class="fa fa-history"></i></a><br>');

                                                    $('#butmap2').html('<a href="#" style="background-color:red" onClick="checkout('+dados.idsecao+','+latpac+','+lngpac+','+dados.id+')"><i class="fa fa-check-square"></i></a><br>');

                                                    $('#butmap1').html('<a href="infosessao2.html" class="info_checkin" data-idsecao="'+idsecao+'" data-checkin_msql="'+dados.checkin_msql+'" style="background-color:gray"><i class="fa fa-info"></i></a><br>');


                                                    var check_info = '<p class="text-center color-red"><i class="fa fa-clock-o" aria-hidden="true"></i> Check-in <br>'+dados.checking+'h</p>'; 

                                                    checkmap = new Date(parseInt(dados.anoch), parseInt(dados.mesch) -1, parseInt(dados.diach),parseInt(dados.horach), parseInt(dados.minch));

                                                     
                                                    } 

                                                    var Faz = setInterval(function(){
                                                       Tempo(checkmap);
                                                     },1000);

                                                    function Tempo(check){
                                                    if (check!=""){
                                                        var dt_hj = new Date(); 
                                                        var dt_ch= new Date(check);
                                                        var hj_ms = dt_hj.getTime();
                                                        var ch_ms = dt_ch.getTime();
                                                        var dif_tempo = hj_ms - ch_ms;
                                                        //var t = dt_hj.toLocaleTimeString();
                                                        seg1 = dif_tempo/1000;
                                                        min1 = seg1/60;
                                                        hor1 = min1/60;
                                                        hor  = parseInt(hor1,10);
                                                        min2 =  min1 - hor*60;
                                                        min  = parseInt(min2,10);
                                                        seg2 =  seg1 - ((hor*60*60) + (min*60));
                                                        seg  = parseInt(seg2,10);

                                                    if (seg<=9){ var zs = 0;} else { var zs ="";}
                                                    if (min<=9){ var zm = 0;} else { var zm ="";}
                                                    if (hor<=9){ var zh = 0;} else { var zh ="";}
                                                    tempo = zh+""+hor+ ":"+zm+min + ":"+zs+seg;

                                                        document.getElementById("tempo").innerHTML ="<i class='fa fa-clock-o color-white' style='padding-right:8px'></i><label style='font-weight:600'>"+tempo+"</label>";
                                                      

                                                      } else{
                                                        
                                                        clearInterval(Faz);
                                                        document.getElementById("tempo").innerHTML ="";
                                                          }

                                                    }

                                                    var contentString = '<div id="content" style="text-align:center">'+

                                                                        '<i class="fa fa-bed fa-2x color-green"></i>'+
                                                                        '<h4 class="text-center color-green">'+dados.nome+'</h4>'+
                                                                        '<p class="text-center">'+dados.endereco+' <br> '+dados.bairro+' - '+dados.cidade+' - '+dados.uf+'</p>'+
                                                                         check_info+
                                                                        '</div>';

                                                            var infowindow = new google.maps.InfoWindow({
                                                              content: contentString
                                                            });
                                                              // Add the circle for this city to the map.
                                                              var raioCircle = new google.maps.Circle({
                                                                strokeColor: 'green',
                                                                strokeOpacity: 0.8,
                                                                strokeWeight: 2,
                                                                fillColor: 'green',
                                                                fillOpacity: 0.35,
                                                                map: map,
                                                                center: point,
                                                                radius: 200
                                                              });


                                                         var image='css/img/iconeprime2.png'; 
                                                          // Icone do Paciente



                                                          var marker2 = new google.maps.Marker({
                                                            position: point,
                                                            map: map,
                                                            icon:image,
                                                            optimized:true
                                                            //animation: google.maps.Animation.DROP
                                                         }); 

                                                          
                                                       marker2.addListener('click', function() {
                                                              infowindow.open(map, marker2);
                                                            });



                                                    if (navigator.geolocation) {
                                                              navigator.geolocation.getCurrentPosition(function(position) {
                                                                
                                                    var loc_prof = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                                                    var bounds = new google.maps.LatLngBounds();
                                                        bounds.extend(loc_prof);
                                                        bounds.extend(point);
                                                        map.fitBounds(bounds);
                                                    })
                                                     infowindow.open(map, marker2);
                                                             } else {
                                                              // Browser doesn't support Geolocation
                                                              handleLocationError(false, infoWindow, map.getCenter());
                                                            }

                                                     

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

function clearMarkers() { 

     
       for (var i = 0; i <3; i++) {
          markers[i].setMap(null);
        }
      
      markers=[];

      }

      // Removes the markers from the map, but keeps them in the array.
   

     
    
/* WILLIAM - FIM */
  
     
