// Initialize your app
var myApp = new Framework7({
	material: true,
	swipePanel: 'left',
	modalTitle: 'iSaúde',
	showBarsOnPageScrollEnd: false,
	template7Pages: true,
	upscroller: {text : 'Topo'}
  
});


var $$ = Dom7;

var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true,
   
});


$(document).on('pageInit', function (e) {
e.preventDefault();

setInterval(function () {

  var s=navigator.onLine;
       if(s==false){
         myApp.alert('Sem conexão com a internet!','<div style="color:red">ALERTA!</div>', function () {
             window.location.href = "index.html";
          });
        }

      $.ajax({      //Função AJAX
      url:"https://www.isaudebelem.com.br/xdk/ctl_session.php",    
        success: function(data) {

       if(data[0].nome == 1) {

          myApp.alert('Sua sessão expirou!.','<div style="color:red">ALERTA!</div>', function () {
             window.location.href = "index.html";
          });
         }
      }
  });

      

},5000);




	$(document).ready(function(){
	
          $(".foto_perfil").on("click",function(){
            
            Foto.opcaoCamera();

          });

		function Perfil(){

		myApp.showIndicator();    

		$.ajax({			//Função AJAX
			url:"https://www.isaudebelem.com.br/xdk/perfil.php",			//Arquivo php

   			success: function (result){			//Sucesso no AJAX


              myApp.hideIndicator();  
             
              if(result.img != '' && result.img != null){
              $(".foto_perfil").html('<img src="https://www.isaudebelem.com.br/downloads/fotosprofissionais/'+result.img+'" class="imgperfil"  style="border-radius: 50%;" width="80" height="80"><div style="color:green;font-size:12px">Alterar imagem</div>');
            }else{
              $(".foto_perfil").html('<img src="css/img/user.png" class="imgperfil" style="border-radius: 50%;" width="80" height="80"><div style="color:green;font-size:12px">Insira foto do perfil</div>');
            }

               $('#nomeperfil').val(result.nome);
                $('#sobreperfil').val(result.sobrenome);
                 $('#dtnasc').val(result.dtnasc);
                   $('#end').val(result.end);
                    $('#cidade').val(result.cidade);
                     $('#comp').val(result.comp);
                      $('#bairro').val(result.bairro);
                        $('#uf').val(result.uf);
                         $('#tel').val(result.tel);
                          $('#cel').val(result.cel);
                            $('#cep').val(result.cep);
                             $('#mapaApp').html('<li><i class="flaticon-placeholder"></i> <a href="https://isaudebelem.com.br/mapatest.php?idprof='+result.id+'" class="external close-panel no-animation">Mapa</a></li>');
                            
                },
                error: function(data) {
                          myApp.hideIndicator();
                          window.location.href = "index.html"; 
                                      }, 
            })              
            
   }
	Perfil();
});

  // inserir info check

  $(document).ready(function(){
  
     $('#info_check').submit(function(e){  
        e.preventDefault();
 
          var horaent=$('#horaent').val();
          var horasai=$('#horasai').val(); 


          var idsecao = localStorage.getItem('idsecao');
          var checkin_msql = localStorage.getItem('checkin_msql');

          if (checkin_msql!='00:00'){

              if (horasai<=checkin_msql){
             myApp.alert('<label style="color:red">Erro! Hora de saída informada menor que o check-in. Corrija!</label>');
              return false;
            }
          } else {

        if (horasai<=horaent){
             myApp.alert('<label style="color:red">Erro! Hora de saída menor que a entrada. Corrija!</label>');
              return false;
            }
        }        
                var obs=$('#obs').val();
                if (obs==""){
                  myApp.alert('<label style="color:red">Sua observação é obrigatória. Favor Preenchê-la!</label>');
                  return false;
                }
                
                myApp.confirm('Confirma envio de info-check?', function () {
               
                myApp.showIndicator();    

                $.ajax({      //Função AJAX
                  url:"https://www.isaudebelem.com.br/xdk/infosessao2.php",      //Arquivo php
                  type:"post",        //Método de envio
                  data: "horaent="+horaent+"&horasai="+horasai+"&obs="+obs+"&idsecao="+idsecao,
                  async: false,
                  success: function (result){     //Sucesso no AJAX
                          
                      myApp.hideIndicator();  
                          
                          if (result=1){

                             
                              myApp.alert('Informação da sessão incluída com sucesso!','Info Perfil', function () {
                                       mainView.router.loadPage('agenda.html');
                                     })

                          } else {

                              myApp.alert('Houve algum erro!','Info Perfil', function () {
                                       return false;
                               })
                            } 
                  }
                
               })   
      })  
   })
}); 
/* Editar Perfil
	================================*/
	$(document).ready(function(){
  
  $('#editarperfil').submit(function(){  

                var nome=$('#nomeperfil').val();
                 var sobrenome=$('#sobreperfil').val(); 
                  var dtnasc=$('#dtnasc').val();
                    var end=$('#end').val();
                     var cidade=$('#cidade').val();
                      var comp= $('#comp').val();
                       var bairro=$('#bairro').val();
                        var uf=$('#uf').val();
                         var tel= $('#tel').val();
                          var cel=$('#cel').val();
                           var cep=$('#cep').val();
                         

    
    myApp.showIndicator();  

    $.ajax({      
      url:"https://www.isaudebelem.com.br/xdk/editarperfil.php",   
      type:"post",        //Método de envio
      data: "nome="+nome+"&sobrenome="+sobrenome+"&dtnasc="+dtnasc+"&end="+end+"&cidade="+cidade+"&comp="+comp+"&bairro="+bairro+"&uf="+uf+"&tel="+tel+"&cel="+cel+"&cep="+cep, 
        success: function (result){   

                    myApp.hideIndicator();  

                  if (result==1){
                         
                        myApp.alert('Registro alterado com sucesso!','Perfil', function () {
                            mainView.router.loadPage('perfil.html');
                      
                                  })
                     } else {
                        myApp.alert('Erro. Houve algum problema!','Perfil', function () {
                           return false;  
                      
                                  })

                     }
                Foto.uploadPhoto();
               
                }
         })
   return false;   
  })
});
  

/* Buscar terapias
	================================*/

$(document).ready(function(){

    function Terapias(){

myApp.showIndicator();

  $.ajax({      //Função AJAX
     url:"https://www.isaudebelem.com.br/xdk/terapiasvisual.php",
       success: function(data) {
  
      

myApp.hideIndicator();

var myList = myApp.virtualList('.list-block.contacts-block.list-block-search.searchbar-found', {
    items: data,
     // Template 7 template to render each item

    template: ' <li class="contact-info {{class}}">'+
                  '<a href="" onClick="PacPerfil({{idprof}})" class="pacperfil item-link item-content">'+
                   '<div class="item-media"><i class="flaticon-user"></i></div>'+
                   '<div class="item-inner">'+
                    '<div class="item-title buscar">{{nomepac}}</div>'+
                       '</div >'+
                    '</a>'+
                  '</li>',

                
           });

         },
         error: function(data) {
                          myApp.hideIndicator();
                          window.location.href = "index.html"; 
                                      }, 
    })

 }
 Terapias();
 });  


// Inicio incuir secoes
$(document).ready(function(){

	$('#incluirsecoes').submit(function(e){ 	//Ao submeter formulário
    e.preventDefault();
      
      document.getElementById("submit_").disabled = true;
 
    myApp.closeModal();
     
     myApp.showIndicator();
 
	   var dias =  new Array(); //criamos um novo array
	     $("input[name='dias[]']:checked").each(function () //percorremos todos os checkbox marcados
				{
				    dias.push($(this).val()); //adicionamos todos em nosso array
				});
		
		  var periodo=$('#periodo').val();
	    var idprof=$('input[type=hidden]#idprof').val();
   
		$.ajax({			//Função AJAX
			url:"https://isaudebelem.com.br/xdk/incluirsecoes2.php",	
			type:"post",				//Método de envio
			data: "dias="+dias+"&periodo="+periodo+"&idprof="+idprof,
      async: false,
   			success: function (data){			//Sucesso no AJAX
    
          if (data==1){
          
       mainView.router.loadPage('agenda.html')    
       myApp.hideIndicator();
       myApp.alert('Sessão(ões) incluída(s) com Sucesso!','iSaúde');
             
          } else {

      myApp.alert('Erro! Tente novamente', function () {
                         return false;
                               });
             
          }
       
    }
    })
  })
return false;
});


// Inicio COMUNICADOS
$(document).ready(function(){

 function Comunicados(){
                              
     myApp.showIndicator();    

      $.ajax({      //Função AJAX
      url:"https://www.isaudebelem.com.br/xdk/comunica.php",      //Arquivo php

      success: function (data){     //Sucesso no AJAX
              myApp.hideIndicator();  
   

   if(data=="") {
        $('#comunica').html('<h4 class="margin-top-50 text-center" style="color:red">*** SEM REGISTRO ***</h4>');
         }  else {         
        var i;
        var comunica="";
        for (i = 0; i < data.length; i++){

  comunica+='<li class="accordion-item">'+
              '<a href="" class=" item-link item-content">'+
                  '<div class="item-inner">'+
                     '<div class="item-title" style="font-size: 14px"><span >'+data[i].datacom+'</span> '+data[i].titulo+'</div>'+
                  '</div></a>'+
                    '<div class="accordion-item-content">'+
                                 '<div class="row">'+
                                    '<div class="col-100 tablet-50">'+
                                       '<div class="accorodinbox">'+
                                          '<h2>'+data[i].titulo+'</h2>'+
                                          '<p>'+data[i].descricao+'</p>'+ 
                                       '</div>'+
                                    '</div>'+
                                  '</div>'+
                              '</div>'+
                           '</li>';
        }
        $('#comunica').html(comunica);
       }
      },
       error: function(data) {
                          myApp.hideIndicator();
                          window.location.href = "index.html"; 
            },

   })
 }
  Comunicados();
});


// Inicio Info Status
$(document).ready(function(){

  $('#status_pac').submit(function(e){   //Ao submeter formulário
     e.preventDefault();

       document.getElementById("submit_").disabled = true;
 
       myApp.closeModal();

      var idstatus=$("select#idstatus").val();
     
      if (idstatus==null){
       $('#semstatus').html('<p style="color:red">Lembre-se de informar um Status</p>');
          return false;

      }

      var idprof=$('input[type=hidden]#idprof2').val();
      var obs_status=$("textarea#obs_status").val();
 

        myApp.showIndicator();

    $.ajax({      //Função AJAX
      url:"https://isaudebelem.com.br/xdk/alterarstatus.php", 
      type:"post",        //Método de envio
      data: "idstatus="+idstatus+"&idprof="+idprof+"&obs_status="+obs_status,
      async: false,
        success: function (data){     //Sucesso no AJAX
         
        myApp.hideIndicator();
         
          if (data==1){
          

       myApp.alert('Informação de Status enviada com sucesso!','iSaúde', function () {
                           mainView.router.loadPage('menu.html');
                               });
             
          } else {

      myApp.alert('Erro! Tente novamente', function () {
                         return false;
                               });
             
          }
       
    }
    })
  })
return false;
});



// Inicio Calendario

  $(document).ready(function(){
    function Agenda(){

      myApp.showIndicator();

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var eventos = new Array();
        

        $.ajax({      //Função AJAX
            url:"https://www.isaudebelem.com.br/xdk/secoesagenda.php",
            dataType: "json",
            success: function(json) {

       

                  if(parseInt(json.total) > 0){
                       
                    $.each(json.dados, function(i, obj){

                       if(obj.ctl!=0){
                  var utc = $.fullCalendar.moment.utc(obj.momento);
                      eventos.push({
                                  validausu: obj.validausu,
                                  ideve: obj.id,
                                  idprof: obj.idprof,
                                  idsecao: obj.idsecao,
                                  logradouro: obj.logradouro,
                                  bairro: obj.bairro,
                                  obs: obj.obs,
                                  imgperfil: obj.imgperfil,
                                  title: obj.paciente,
                                  description: obj.descricao,
                                  cidade: obj.cidade,
                                  uf: obj.uf,
                                  ctl_gps:obj.ctl_gps,
                                  confdata:obj.confdata,
                                  paciente: obj.paciente,
                                  dt_agenda:obj.dt_agenda,
                                  hora:obj.hora,
                                  min:obj.min,
                                  horafinal: obj.horafinal,
                                  minfinal:obj.minfinal,
                                  sobrenome: obj.sobrenome,
                                  img: obj.img,
                                  checkin_msql:obj.checkin_msql,
                                  color: obj.color,
                                  status:obj.status,
                                  checking:obj.checking,
                                  checkout:obj.checkout, 
                                  textColor: 'black',
                    
                                  start: new Date(parseInt(obj.ano), parseInt(obj.mes) -1, parseInt(obj.dia),parseInt(obj.hora), parseInt(obj.min)),
                                  end: new Date(parseInt(obj.ano), parseInt(obj.mes) -1, parseInt(obj.dia),parseInt(obj.horafinal), parseInt(obj.minfinal))

                                 
                              });
}
                    });
                
                  } 

            
                  $('#calendar').fullCalendar({  

                  
                header: { center: 'month,agendaWeek,agendaDay,listWeek'},

                          height:"auto", 
                          editable: false,
                          //eventLimit: true, // allow "more" link when too many events
                          events: (eventos),

           
          eventRender: function (event, element) {
                         
                     
                        element.attr('href', 'javascript:void(0);');

                        element.click(function () {

                             moment.locale('pt-br');
                              

                               var mostra="";
                               var horamarq="";
                               var obs="";
                               var idsecao = event.idsecao;  
                        
                   
                      
                      var data_agenda = moment(event.dt_agenda).format("YYYY-MM-DD"); 
                      var data_hoje = moment(date).format("YYYY-MM-DD");


                      if (data_agenda < data_hoje && event.checkin_msql == "00:00" && event.checkout=="30/11/-1 00:00" ) {
                         
                         infocheckin_da(event.idsecao,event.checkin_msql);

                       } else if (data_agenda < data_hoje && event.checkin_msql != "00:00" && event.checkout=="30/11/-1 00:00"){
                         infocheckout_da(event.idsecao,event.checkin_msql);

    } else if ( event.checkout=="30/11/-1 00:00" && event.confdata==1){
     
                        mainView.router.loadPage('mapa.html');
                        myApp.params.swipePanel = false; 
     
              

              if (ver == false){
            
                           ver = true; 

                           myApp.onPageInit('mapa', function (page) {
                              initMap2(event.idsecao,event.imgperfil); 

                            })

                           
              } else {
                    
                    
                   initMap2(event.idsecao,event.imgperfil);
      
                        
                }
                  
                   
                    map = getMap(); 
                

                  setInterval(function(){ 
                      navigator.geolocation.getCurrentPosition(function(position) {
                        var local = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

                        maker = getMarker();
                        marker.animateTo(local, {easing: 'linear', duration: 1000});
                      });

                  },1000);     

           
  } else {
                      
                  if (event.hora=="00"){
                      horamarq='<div class="item-title text-center margin-top-20">'+
                      
                      '<form id="horamarq">'+
                      '<input type="time" id="hora">'+
                      '<div id="horavazia"></div>'+
                      '<input type="hidden"  id="idsecao" value="'+event.idsecao+'">'+
                      '<input type="submit" id="submithora" class=" button button-fill color-blue margin-top-10" value="Marque a Hora">'+
                      '</form>'+
                      '</div>';


                  } else {

                                horamarq='<div class="item-title text-center margin-top-10">'+
                      
                      '<form id="horamarq">'+
                      '<input type="time" id="hora" value="'+event.hora+':'+event.min+'" >'+
                      '<input type="hidden"  id="idsecao" value="'+event.idsecao+'">'+
                      '<input type="submit" id="submit" class=" button button-fill color-blue margin-top-10" value="Remarque a Hora">'+
                      '</form>'+
                      '</div>';
                               }

                               if (event.obs==""){
                                 obs='<div class="item-title margin-top-10 text-center">'+
                      '<form id="obs">'+
                      '<h2 style="font-size:18px">Faça sua observação:</h2><br>'+
                      '<input type="text" id="observacao" maxlength="100">'+
                      '<input type="hidden"  id="idsecao" value="'+event.idsecao+'">'+
                      '<input type="submit" id="submit" class=" button button-fill color-gray margin-top-10" value="Enviar observação">'+
                      '</form>'+

                     '</div>';
                               } else {

                                obs= '<div class="text-center">'+
                                      
                                   '<h2 style="font-size:18px" class="text-center">Observação:</h2>'+event.obs+
                                     '</div>';
                               }

                 if(event.checking== "30/11/-1 00:00" && event.confdata==1){

						         mostra='<div class="item-title text-center margin-top-20"><a class="close-picker button button-fill color-green valmap" href="#" data-imgperfil="'+event.imgperfil+'" data-idsecao="'+event.idsecao+'" data-checkmap="'+event.check_map+'"><i class="fa fa-map-marker color-white"></i><span> Mapa Check-in</span></a></div>'+

										 '<div class="item-title text-center margin-top-20"><a class="close-picker button button-fill color-gray info_checkin" href="infosessao.html" data-idsecao="'+event.idsecao+'" ><i class="fa fa-info color-white"></i><span> Info Check</span></a></div>'+

                     '<div class="item-title"><p class="buttons-row margin-top-20"><a href="#" onclick="DelSecao('+event.idsecao+')" class="button button-fill color-red button-raised "><i class="fa fa-trash-o"></i><span> Apagar Sessão</span></a></p></div>';


                                } else if(event.checking== "30/11/-1 00:00" && event.confdata==0){

                                   mostra='<div class="item-title"><p class="buttons-row margin-top-20"><a href="#" onclick="DelSecao('+event.idsecao+')" class="button button-fill color-red button-raised "><i class="fa fa-trash-o"></i><span> Apagar Sessão</span></a></p></div>';

                            } else if (event.checking!="30/11/-1 00:00" && event.checkout=="30/11/-1 00:00"){

                                  horamarq='';

                             mostra='<div class="item-title margin-top-20 text-center"><h2 style="font-size:18px">Check-in realizado em :</h2><p> <i class="fa fa-calendar"></i> '+event.checking+'h</p></div>'+
                              

                              '<div class="item-title text-center margin-top-20"><a class="button button-fill color-red close-picker valmap" href="#" data-imgperfil="'+event.imgperfil+'". data-idsecao="'+event.idsecao+'" data-checkmap="'+event.check_map+'"><i class="fa fa-map-marker color-white"></i><span> Mapa Check-out</span></a></div>'+

                               '<div class="item-title text-center margin-top-20"><a class="close-picker button button-fill color-gray info_checkin" href="infosessao2.html" data-idsecao="'+event.idsecao+'" ><i class="fa fa-info color-white"></i><span> Info Check</span></a></div>'+

                                '<div class="item-title text-center margin-top-20"><a href="" onclick="ResetCheck('+event.idsecao+')" class="button button-fill color-blue" href=""><i class="fa fa-history color-white"></i><span> Resetar Check-in</span></a></div>';

                                } else {

                                	   mostra='<div class="item-title margin-top-20 text-center"><h2 style="font-size:18px">Check-in realizado em :</h2><p> <i class="fa fa-calendar"></i> '+event.checking+'h</p></div>'+
                                            '<div class="item-title margin-top-20 text-center"><h2 style="font-size:18px">Check-out realizado em :</h2><p> <i class="fa fa-calendar"></i> '+event.checkout+'h</p></div>'+obs;
                                            horamarq="";
                                }
                                  var popupHTML = ' <div class="picker-modal comment-form" style="height:100%">'+
												         '<div class="toolbar" style="background-color: green">'+
												            '<div class="toolbar-inner">'+
												               '<div class="left"><h4>Sessão:</h4></div>'+'<div class="right"><a href="" class="link close-picker"><img src="css/img/menu_close.png" width="32px" /></a></div>'+
                                       '</div>'+
												         '</div>'+
												         '<div class="picker-modal-inner">'+
												            '<div class="content-block">'+
												               '<div class="list-block inputs-list" style="margin:10px 0">'+
												               '<div class="item-content">'+
										                             '<div class="item-inner margin-top-10 text-center"><i class="fa fa-bed fa-2x" style="color:'+event.color+'"></i>'+
										                               '<div class="item-title  text-center"><h2>'+event.paciente+'</h2></div>'+
										                                '<div class="item-title  text-center">'+event.logradouro+' - '+event.bairro+'</div>'+
										                                  '<div class="item-title  text-center">'+event.cidade+' - '+event.uf+'</div>'+horamarq+mostra;
            																 
										                                // '<div id="map"></div>'+

												               	'</div></div></div></div></div>'
                                  myApp.hideIndicator();
                                  myApp.popup(popupHTML);

                                  return false;

                                }
                                
                              })
                             
                          }
 
                      })
            }
              
        })

 }
 Agenda();
  });
//fim  Calendario


$(document).on('submit','form#obs',function(e){
e.preventDefault();

  var obs=$('#observacao').val();
  var idsecao=$('#idsecao').val();  

  if (obs==""){
                  myApp.alert('Campo Vazio!');
                  return true;
                }
myApp.showIndicator();

 $.ajax({      //Função AJAX
     url:'https://www.isaudebelem.com.br/xdk/incluirobs.php',
      type:"post",
            data: "idsecao="+idsecao+"&obs="+obs, //Dados
            dataType: "json",
     success: function(data) {
     
      myApp.hideIndicator();

      if(data==1){
                        myApp.alert('Observação incluida com sucesso!','Agenda', function () {

                              myApp.closeModal('.picker-modal');
                           //window.location.href = "menu.html";  
                      
                                  });
                     
                         
                  } else {

                           myApp.alert('Erro! Sua observação não foi incluida!','Agenda', function () {
                           return false;
                      
                                  });

    }
  }

  })

  
});



 $('#periodoses').submit(function(e){ 
 e.preventDefault();
 
  var datainicial=$('#datainicial').val();
  var datafinal =$('#datafinal').val(); 
  var idpac=$("select#idpac").val();


 if (datainicial==""){
  myApp.addNotification({
      message: 'Data inicial vazia!',
      button: {
        text: 'Tente novamente',
        color: 'yellow'
      }
    });
  return false;

 } else if (datafinal==""){
  myApp.addNotification({
      message: 'Data final vazia!',
      button: {
        text: 'Tente novamente',
        color: 'yellow'
      }
    });
  return false;

 } if (datafinal<datainicial){
  myApp.addNotification({
      message: 'Data final menor que Data inicial!',
      button: {
        text: 'Tente novamente',
        color: 'yellow'
      }
    });
  return false;

 }
myApp.showIndicator();

 $.ajax({      //Função AJAX
     url:'https://www.isaudebelem.com.br/xdk/vissecoes.php?datainicial='+datainicial+'&datafinal='+datafinal+'&idpac='+idpac,
     type:'get',
     dataType: "json",      
     success: function(data) {

      myApp.hideIndicator();

if(data.length==0){

   myApp.alert('Período sem registros.Tente novamente.');
  return false;

   } else {
     var i=0;
     var vissessoes="";
     var sesfora=0;
     var l = (data.length)-1;
     var gps = data[l].gps;
     var parcial = data[l].parcial;
     var info_checkin = data[l].info_checkin;
     var tempo=data[l].tempototal;
     var prod=data[l].prodtotal


     for (i = 0; i < data.length; i++){

 vissessoes+='<tr style="color:#fff;background:'+data[i].background+'">'+
        '<td class="label-cell text-center">'+data[i].paciente+'</td>'+
        '<td class="label-cell text-center">'+data[i].checking+'</td>'+
         '<td class="label-cell text-center">'+data[i].checkout+'</td>'+
        '<td class="numeric-cell text-center">'+data[i].tempo+'</td>'+
        '<td class="numeric-cell text-center">'+data[i].prod+'</td>'+
      '</tr>';
   
  }


  
  //var percapp=((sesfora/i)*100).toFixed(0);

  
     $('#sessoesPer').html('<div class="data-table" style="overflow-x: auto;">'+
  '<table>'+
    '<thead>'+
      '<tr style="font-size:12px">'+
        '<th class="label-cell text-center">Paciente</th>'+
        '<th class="label-cell text-center">Check-in</th>'+
        '<th class="label-cell text-center">Check-out</th>'+
        '<th class="numeric-cell text-center">Tempo (min)</th>'+
        '<th class="numeric-cell text-center">Prod</th>'+
      '</tr>'+
   '</thead><tbody>'+vissessoes+'<tfoot>'+
                                           
                                          '<tr><td colspan="12"><div id="piechart"></div></td></tr>'+
                                       '</tbody></tfoot></table></div>');       
     } 


google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart() {
  var data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['GPS TOTAL', gps],
  ['GPS PARCIAL', parcial],
  ['INFO-CHECK', info_checkin]
]);
  // Optional; add a title and set the width and height of the chart
  var options = {
      legend: {position: 'bottom', textStyle: {color: 'blue', fontSize: 9}},
     
      title:'\n Qtd de Sessões: '+i+'\n Tempo Total: '+tempo+'\n Produçāo Total: '+prod,
      is3D: true,
      titleTextStyle:{
        width:'100%',
         fontSize:16,
         color:'green',
         fontName:'Source Sans Pro',
         bold:true,
      },
      width:'100%',
      height:400,
      //chartArea:{width:"95%",height:"500px"},
      colors: ['green','#6cb7e5','gray']
    };

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}

    }   
 })


});

$(document).ready(function(){
   
    $('#pacsessao').html('<i class="fa fa-circle-o-notch fa-spin" style="font-size:24px; color:green"></i>');

 $.ajax({      //Função AJAX
            url:"https://www.isaudebelem.com.br/xdk/pacsessao.php",
            type:"post",
            
            dataType: "json",

          success: function(data) { 
     
            var i;
            var pac="";
            for (i = 0; i < data.length; i++){
         
                pac+= '<option value="'+data[i].idpac+'">'+data[i].nomepac+'</option>';
            }
      
                    $('#pacsessao').html('<select id="idpac" name="idpac">'+
                      '<option selected=""  value="0">Todos</option>'+pac+
                      '</select>');
                   

         }         
       })

  

});

$(document).ready(function(){  
  $('#alterarsenha').submit(function(){  
 
      
   var contsenhanova = $('input[type=text]#senhanova').val().length;
    var senhaatual=$('input[type=text]#senhaatual').val();
     var senhanova=$('input[type=text]#senhanova').val();
      var senhaconfirma=$('input[type=text]#senhaconfirma').val(); 

      if(senhanova!=senhaconfirma){
         
		myApp.addNotification({
			message: 'Senhas näo conferem!',
			button: {
				text: 'Tente novamente',
				color: 'yellow'
			}
		});
 
           return false;

      } else if (senhanova==""){
            
		myApp.addNotification({
			message: 'Senha nova vazia!',
			button: {
				text: 'Entre com nova senha',
				color: 'yellow'
			}
		}); 
           return false;

      }  else if (contsenhanova<6){
         
		myApp.addNotification({
			message: 'Senha nova menor que 6 dígitos!',
			button: {
				text: 'Tente novamente',
				color: 'yellow'
			}
		});
        return false; 
      }

      myApp.showIndicator();
    
    $.ajax({      //Função AJAX
      url:"https://www.isaudebelem.com.br/xdk/alterarsenha.php",     //Arquivo php
      type:"post",        //Método de envio
      data: "senhanova="+senhanova+"&senhaatual="+senhaatual, //Dados
     
        success: function (result){ 
          myApp.hideIndicator();
          
          if (result==0){

          	 myApp.addNotification({
			message: 'Senha atual não confere!',
			button: {
				text: 'Tente novamente',
				color: 'yellow'
			}
		});

        return false; 
          
                } else if (result==1){

                        myApp.alert('Sua senha foi alterada com sucesso!','Senha', function () {
                           window.location.href = "menu.html";  
                      
                                  });
                     
                         
                  } else if (result==2){

                  	       myApp.alert('Erro! Sua senha não foi alterada!','Senha', function () {
                           return false;
                      
                                  });
                         
          }
         }

    })//ajax 
   return false;
  })//submit
 
}); //end



	/* Photo Browser 
	================================*/

			var myPhotoBrowserDark = myApp.photoBrowser({
			photos : [
				'http://placehold.it/400x200/?text=IMAGE',
				'http://placehold.it/400x200/?text=IMAGE',
				'http://placehold.it/400x200/?text=IMAGE',
				'http://placehold.it/400x200/?text=IMAGE',
				'http://placehold.it/400x200/?text=IMAGE',
				'http://placehold.it/400x200/?text=IMAGE',
			],
			theme: 'light',
			lazyLoading: true ,
		});

			$$('.pb-standalone-dark').on('click', function () {
			myPhotoBrowserDark.open();
			});
	
	
	
	/* SLIDE SLICK 
	================================*/
	var slickOpts = {
        slidesToShow: 1,
        slidesToScroll: 1,
		arrows: false,
        dots: true,
		centerMode: true,
		centerPadding: '15px',
    };
    $('#walkthrough-slides').slick(slickOpts);
	
	
	/* ACTION SHEET TO SHARE POSTS 
	===============================================*/
	$('.share-post').on('click', function () {

		var buttons = [
			{
				text: '<span class="text-thiny">Share this post with your friends</span>',
				label: true
			},
			{
				text: '<span class="text-small share-post-icon share-post-facebook"><i class="flaticon-facebook"></i> Share on Facebook</span>',
			},
			{
				text: '<span class="text-small share-post-icon share-post-twitter"><i class="flaticon-twitter"></i> Share on Twitter</span>',
			},
			{
				text: '<span class="text-small share-post-icon share-post-whatsapp"><i class="flaticon-whatsapp"></i> Share on Whatsapp</span>',
			},
			{
				text: '<span class="text-small">Cancel</span>',
				color: 'red'
			},
		];
		myApp.actions(buttons);
	});
// Aqui que quero colocar o ajax pra chamar o php  


	/* NOTIFICATIONS 
	================================*/
	$(document).on('click', '.alert', function() {
		$(this).addClass('is-hidden');
		return false;
	});
	
	$$('.notification-single').on('click', function () {
		myApp.addNotification({
			message: 'Simple message'
		});
	});
	$$('.notification-multi').on('click', function () {
		myApp.addNotification({
			message: 'Multi-line message. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in magna nisi.',
		});
	});
	$$('.notification-custom').on('click', function () {
		myApp.addNotification({
			message: 'Nice yellow button',
			button: {
				text: 'Click me',
				color: 'yellow'
			}
		});
	});
})// FIM  PageInit
$(document).ready(function(){
                  
	$('#login').submit(function(){ 	//Ao submeter formulário

document.addEventListener('deviceready', function () {
    localStorage.setItem('id_cel', device.uuid);
}, false);
                       
		var login= $('input[type=email]#login').val();	//Pega valor do campo email
		var senha= $('input[type=password]#senha').val();	//Pega valor do campo senha  
        var id_cel = localStorage.getItem('id_cel');
alert(id_cel)
    myApp.showIndicator();
                       
    $.ajax({			//Função AJAX
			url:"https://www.isaudebelem.com.br/xdk/login_versao2.php",			//Arquivo php
			type:"post",				//Método de envio
			data: "login="+login+"&senha="+senha+"&id_cel="+id_cel,  //Dados
                          
   		success: function (result){			//Sucesso no AJAX
           
        myApp.hideIndicator(); 
        
          
      if(result.valida == 1){
            localStorage.setItem('login_1', login);
            localStorage.setItem('senha_1', senha);

             window.location.href = "menu.html"; 
           
               document.addEventListener('deviceready', function () {
                // Enable to debug issues.
                // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
                
                var notificationOpenedCallback = function(jsonData) {
                  console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
                };

                window.plugins.OneSignal
                  .startInit("13ccc4ef-633f-465b-835c-fad94bbcb5e8")
                  .handleNotificationOpened(notificationOpenedCallback)
                  .endInit();

               
               window.plugins.OneSignal.sendTags({
                                                                idprof: result.idprof,
                                                                nome:result.nome,
                                                                sobrenome:result.sobrenome,
                                                                tipousu:result.tipousu,
                                                                especialidade:result.especialidade
                                                              });

      }, false);
                   
            
            

    	}  else if (result.valida == 2) {
              
              myApp.alert('<div class="text-center"><i class="fa fa-ban fa-3x color-red"></i><div style="color:red">Usuário utilizando outro dispositivo. Entre em contato com a administração!</div></div>','Alerta', function () {
                 return false; 
                      
                      })

          } else {

           

             myApp.alert('<div class="text-center"><i class="fa fa-ban fa-3x color-red"></i><div style="color:red">Login ou E-mail incorretos. Tente novamente!</div></div>','Alerta', function () {
                 return false; 
                      
                      })
          }



      }
		})
		return false;	//Evita que a página seja atualizada
	})
});


function Sair(){
	localStorage.removeItem('login_1');
	localStorage.removeItem('senha_1');
	window.location.href = "index.html";
	}

	function SairMenu(){
	window.location.href = "menu2.html";
	}
	function Mapa(){
  window.location.href = "mapa.html";
  }
	
$(document).ready(function(){
	function ImgPerfil(){
      myApp.showIndicator(); 
       	 
	  $.ajax({			//Função AJAX
			url:"https://www.isaudebelem.com.br/xdk/menu.php",			//Arquivo php
      success: function(data) {
       myApp.hideIndicator(); 

          if (data.imgp==""){
          
                  $('#imgperfil').html('<img src="css/img/user.png" class="imgperfil" style="border-radius: 50%;"  width="80" height="80"/> </div> ');

          } else {
                  
                  $('#imgperfil').html('<img src="https://isaudebelem.com.br/downloads/fotosprofissionais/'+data.imgp+'" class="imgperfil" style="border-radius: 50%;" width="80" height="80"/> </div> ');
		        }

              		$('#perfil').html(data.nome+'<br>'+data.sobrenome);  
              		$('#especialidade').html(data.especialidade);  
			}
    });
  }
   ImgPerfil();
});	



//adiciona mascara de cep
function mcep(v){
    v=v.replace(/\D/g,"")                    //Remove tudo o que não é dígito
    v=v.replace(/^(\d{5})(\d)/,"$1-$2")         //Esse é tão fácil que não merece explicações
    return v
}


  function mascaraData( campo, e )
{
  var kC = (document.all) ? event.keyCode : e.keyCode;
  var data = campo.value;
  
  if( kC!=8 && kC!=46 )
  {
    if( data.length==2 )
    {
      campo.value = data += '/';
    }
    else if( data.length==5 )
    {
      campo.value = data += '/';
    }
    else
      campo.value = data;
  }
}

function mascara(o,f){
    v_obj=o
    v_fun=f
    setTimeout("execmascara()",1)
}
function execmascara(){
    v_obj.value=v_fun(v_obj.value)
}
function mtel(v){
    v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return v;
}



function PacPerfil(idprof){

	 $.ajax({      //Função AJAX
            url:"https://www.isaudebelem.com.br/xdk/pacperfil.php",
            type:"post",
            data: "idprof="+idprof, //Dados
            dataType: "json",

          success: function(data) {

if (data.ctl_aceito==0){
	$('#btnaceiteagenda').html('<p class="buttons-row margin-top-15"><a href="#" onClick="Recusar('+idprof+')" class="button button-fill color-red button-raised ">Recusar</a>'+
		                  '<a href="#" onClick="Aceitar('+idprof+')" class="button button-fill color-green button-raised ">Aceitar</a></p>');
} else if (data.ctl_aceito!=0 && data.id_status_ter==1){
    $('#btnaceiteagenda').html('<p class="buttons-row margin-top-15"><a href="#" onClick="Status('+idprof+')" data-picker=".status" class="open-picker button button-fill color-red button-raised ">Info Status</a>'+

		                  '<a href="#" data-picker=".comment-form" onClick="Agendar('+idprof+')" class="open-picker button button-fill color-blue button-raised ">Agendar Sessões</a></p>');
} else {

   $('#btnaceiteagenda').html('<p class="buttons-row margin-top-15"><a href="#" onClick="Status('+idprof+')" data-picker=".status" class="open-picker button button-fill color-red button-raised ">Info Status</a>');

}

$('#nomepac').html('<h4 class="text-center color-green">'+data.nome+'</h4>');
$('#end').html('<p class="text-center"> <a class="external" href="https://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=pt&amp;geocode=&amp;q='+data.end+'-'+data.bairro+'-'+data.cidade+'-'+data.uf+'&amp;aq=0&amp;ie=UTF8&amp;hq=&amp;hnear='+data.end+'-'+data.bairro+'-'+data.cidade+'-'+data.uf+'&amp;t=m&amp;ll='+data.latlng+'&amp;z=15&amp;iwloc=&amp;output=embed">'+data.end+' '+data.comp+'<br> '+data.bairro+' - '+data.cidade+' - '+data.uf+'</a></p>');

$('#idade').html(data.idade);
$('#convenio').html(data.convenio);
$('#reg').html(data.reg);
$('#diagnostico').html(data.diagnostico);
$('#status').html(data.status);

if (data.tel!=""){
$('#tel').html('<p class="buttons-row"><a href="tel:'+data.tel+'" class="external button color-green button-raised ">'+data.tel+'</a>');
    }

		if (data.cel!=""){
		$('#cel').html('<p class="buttons-row"><a href="tel:'+data.cel+'" class="external button color-green button-raised ">'+data.cel+'</a>');
		   }

       }
		     


 }) 
  mainView.router.loadPage('pacperfil.html');             

};


function Recusar(idprof){

    myApp.confirm('Deseja recusar a terapia?', function () {
    myApp.showIndicator();
	 
    $.ajax({      //Função AJAX
            url:"https://www.isaudebelem.com.br/xdk/recusar.php",
            type:"post",
            data: "idprof="+idprof, //Dados
            dataType: "json",

          success: function(data) {
          	myApp.hideIndicator();
   if (data==1){
    myApp.alert('Terapia recusada com sucesso!','iSaúde!', function () {
                        window.location.href = "menu.html";  
                                  });
   } else{
   		myApp.alert('Houve algum problema. Tente novamente!')
   	 window.location.href = "menu.html";  
   }
    }
  })
})
};

function Aceitar(idprof){

     myApp.confirm('Confirma aceite da terapia?', function () {
     myApp.showIndicator();
	 
   $.ajax({      //Função AJAX
            url:"https://www.isaudebelem.com.br/xdk/aceitar.php",
            type:"post",
            data: "idprof="+idprof, //Dados
            dataType: "json",

          success: function(data) {
          	myApp.hideIndicator();
   if (data==1){
    myApp.alert('Terapia aceita com sucesso!','iSaúde!', function () {
                        window.location.href = "menu.html";  
                                  });
   } else{
   		myApp.alert('Houve algum problema. Tente novamente!')
   	window.location.href = "menu.html";  
     }
    }
  })
})
};


function Agendar(idprof){
$('#hiddenidprof').html('<input type="hidden" id="idprof" value="'+idprof+'"/>');
};

 

function Status(idprof){
    
    $('#hiddenidprof2').html('<input type="hidden" id="idprof2" value="'+idprof+'"/>');

    $('#info_status').html('<i class="fa fa-circle-o-notch fa-spin" style="font-size:24px; color:green"></i>');

 $.ajax({      //Função AJAX
            url:"https://www.isaudebelem.com.br/xdk/info_status.php",
            type:"post",
            
            dataType: "json",

          success: function(data) { 
     
            var i;
            var info="";
            for (i = 0; i < data.length; i++){
         
                info+= '<option value="'+data[i].idstatus+'">'+data[i].status+'</option>';
            }
      
                    $('#info_status').html('<select id="idstatus">'+
                      '<option selected disabled>Selecione o Status</option>'+info+
                      '</select>');
                    $('#hiddenidprof').html('<input type="hidden" id="idprof" value="'+idprof+'"/>');

         }         
       })

  };


function ResetCheck(idsecao){

     myApp.confirm('<div class="text-center"><i class="fa fa-exclamation-triangle  fa-3x color-red"></i><div style="color:red">Você está prestes a <b>RESETAR</b> esta sessão. Lembramos que está ação não tem volta. Deseja prosseguir? </div></div>','Atenção', function () {
     myApp.showIndicator();

      $.ajax({      //Função AJAX
            url:"https://www.isaudebelem.com.br/xdk/resetcheck.php",
            type:"post",
            data: "idsecao="+idsecao, //Dados
            dataType: "json",

          success: function(data) {
       
        myApp.hideIndicator();

           if (data==1){
        myApp.alert('Check-in resetado com sucesso!', function () {
                         window.location.href = "menu.html";   
                      
                                  })

           } else{

     myApp.alert('Erro! Houve algum problema. Tente novamente!','Mapa', function () {
                         window.location.href = "menu.html";  
                      
                                  })
           }
          }
      })
    })
};

function DelSecao(idsecao){

     myApp.confirm('Deseja deletar sessão?', function () {
     myApp.showIndicator();
     
     $.ajax({      //Função AJAX
            url:"https://www.isaudebelem.com.br/xdk/excluirsecao.php",
            type:"post",
            data: "idsecao="+idsecao, //Dados
            dataType: "json",

          success: function(data) {
      myApp.hideIndicator();
           if (data==1){
        myApp.alert('Sessão deletada com sucesso!', function () {
                         window.location.href = "menu.html";  
                      
                                  })

           } else{

        myApp.alert('Erro! Houve algum problema. Tente novamente!','Sessão', function () {
                        window.location.href = "menu.html";  
                      
                                  })
           }
          }
      })
    })
};



function check(idsecao,latcli,lngcli,idpac,x) {
  
     myApp.confirm('Deseja realizar o check-in?', function () {
     myApp.showIndicator();
     var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(check) {
      var pos = {
        lat: check.coords.latitude,
        lng: check.coords.longitude
      };
    
    
    var lat= check.coords.latitude;
    var lng= check.coords.longitude;
 
     
$.ajax({      //Função AJAX
url:'https://www.isaudebelem.com.br/xdk/checkapp.php?lat='+lat+'&lng='+lng+'&idsecao='+idsecao+'&latcli='+latcli+'&lngcli='+lngcli,
          type:"get",
          async: false,
          dataType: "json",

          success: function(data) {
            myApp.hideIndicator();

            if (data==1){
               myApp.alert('<div class="text-center"><i class="fa fa-thumbs-o-up fa-3x color-green"></i><div style="color:green"><b>Check-in</b> realizado com sucesso!</div></div>','Alerta', function () {
                                                                    window.location.href = "menu.html";  

                                                                  
                                                                              })

            } else if (data==0){
                       
                       myApp.alert('<div class="text-center"><i class="fa fa-ban fa-3x color-red"></i><div style="color:red">Paciente fora da área para o check-in!</div></div>','Alerta', function () {
                        
                        if (x==0){
                          atualizar (idpac);
                        } else {

                          ResetGPS (idsecao);
                        }

  
                      })

              return false; 

            } else if (data==3){
                   
                   myApp.alert('<div class="text-center"><i class="fa fa-ban fa-3x color-red"></i><div style="color:red">Para continuar você precisa finalizar as sessões iniciadas com check-in. Realize o check-out nessas sessões!</div></div>','Alerta', function () {
                        
                     window.location.href = "menu.html";  

                    });

            } else {

myApp.alert('Houve algum problema. Tente novamente.','Mapa',function () {
                        window.location.href = "menu.html";  
                                  })       
            }

            
   }
})      
      map.setCenter(pos);
    }, function() {
      handleLocationError(true,infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }



    })
};


function checkout(idsecao,latcli,lngcli,idpac) {
  
    
         myApp.showIndicator();

               $.ajax({      //Função AJAX
                    url:'https://www.isaudebelem.com.br/xdk/validar_horario.php?idsecao='+idsecao,
                    type:"get",
                    async: false,
                    dataType: "json",

                     success: function(result) {

                       myApp.hideIndicator();

                      if (result == 0){
                         
                         myApp.alert('<div class="text-center"><i class="fa fa-ban fa-3x color-red"></i><div style="color:red">Sessão superou tempo limite de 90 minutos! Faça info check-out.</div></div>','Alerta', function () {

                               return false;
                         })

                      } else if (result == 1){

                           myApp.confirm('<div class="text-center"><i class="fa fa-exclamation-triangle fa-3x color-yellow"></i><div>Falta pouco pra você realizar 2 produções. Deseja realizar o check-out mesmo assim?.</div></div>','Atenção', function () {
                                                     
                            
                                   Checkout_Validado(idsecao,latcli,lngcli,idpac)
                            })

                          } else if (result == 3){

                           myApp.confirm('<div class="text-center"><i class="fa fa-exclamation-triangle fa-3x color-yellow"></i><div>Falta pouco pra você realizar 1 produção. Deseja realizar o check-out mesmo assim?.</div></div>','Atenção', function () {
                                                     
                            
                                   Checkout_Validado(idsecao,latcli,lngcli,idpac)
                            })

                          } else {

                               myApp.confirm('Deseja realizar o check-out?', function () {
                                                     
                                     Checkout_Validado(idsecao,latcli,lngcli,idpac)

                            });

                          }

                                         
                      } 
                })

};

function Checkout_Validado(idsecao,latcli,lngcli,idpac){

   // Try HTML5 geolocation.
                              if (navigator.geolocation) {

                                  navigator.geolocation.getCurrentPosition(function(check) {   
                                  
                                  var lat= check.coords.latitude;
                                  var lng= check.coords.longitude;

                                            $.ajax({      //Função AJAX
                                            url:'https://www.isaudebelem.com.br/xdk/checkoutapp.php?lat='+lat+'&lng='+lng+'&idsecao='+idsecao+'&latcli='+latcli+'&lngcli='+lngcli,
                                                      type:"get",
                                                      async: false,
                                                      dataType: "json",

                                                    success: function(data) {

                                                         myApp.hideIndicator();


                                                        if (data==1){

                                                           myApp.alert('<div class="text-center"><i class="fa fa-thumbs-o-up fa-3x color-green"></i><div style="color:green"><b>Check-out</b>realizado com sucesso!</div></div>','Alerta', function () {
                                                                    window.location.href = "menu.html";  

                                                                  
                                                                              })

                                                        } else if(data==0){ 

                                                         myApp.alert('<div class="text-center"><i class="fa fa-ban fa-3x color-red"></i><div style="color:red">Paciente fora da área para o check-out!</div></div>','Alerta', function () {
                                                                      return false;
                                                                              })


                                                        } else {
                                                          myApp.alert('Houve algum problema. Tente novamente.','Mapa',function () {
                                                                     window.location.href = "menu.html";  
                                                                              })      
                                                        }

                                                        
                                               }
                                            }) 

                                    map.setCenter(pos);
                                      
                                    }, function() {
                                      handleLocationError(true,infoWindow, map.getCenter());
                                    });
                                  } else {
                                    // Browser doesn't support Geolocation
                                    handleLocationError(false, infoWindow, map.getCenter());
                                  }

};

function atualizar(idpac) {

  myApp.confirm('Deseja atualizar o local do paciente?', function () {
  myApp.showIndicator();
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(check) {
      var pos = {
        lat: check.coords.latitude,
        lng: check.coords.longitude
      };
    
    
    var lat= check.coords.latitude;
    var lng= check.coords.longitude;
    var pos = lat+','+lng;
 


$.ajax({      //Função AJAX
url:'https://www.isaudebelem.com.br/xdk/atualizar.php?pos='+pos+'&idpac='+idpac,
          type:"get",
          async: false,
          dataType: "json",

          success: function(result) {
            myApp.hideIndicator();
            if (result==1){

               myApp.alert('Local do paciente atualizado com sucesso!','Mapa',function () {
                       window.location.href = "menu.html";  
                                  })
            } else{
 myApp.alert('Erro! Houve algum problema. Tente novamente!','Mapa', function () {
                        window.location.href = "menu.html";  
                      
                                  })   
            }

            
   }
})        


    }, function() {
      handleLocationError(true,infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
 })

};


function ResetGPS(idsecao){

 myApp.confirm('Deseja alterar GPS do paciente?', function () {
  
    
  myApp.showIndicator();

  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(check) {
    
    var lat= check.coords.latitude;
    var lng= check.coords.longitude;
    

         $.ajax({      //Função AJAX
            url:"https://www.isaudebelem.com.br/xdk/resetgps2.php",
            type:"post",
            async: false,
            data: "idsecao="+idsecao+"&lat="+lat+"&lng="+lng, //Dados
            dataType: "json",
       
          success: function(data) {

            myApp.hideIndicator();

             if (data==1){

    myApp.alert('Solicitação enviada com sucesso! Aguarde resposta da Administração.', function () {
                         
             window.location.href = "menu.html";  
                      
                                  });

             } else if (data == 2) {
                  
                  myApp.alert('<div class="text-center"><i class="fa fa-ban fa-3x color-red"></i><div style="color:red">Solicitação desta sessão já enviada anteriormente! Aguarde o aceite da administração.</div></div>','Sessão', function () {
                       window.location.href = "menu.html";  
                      
                      })
                
             } else {

                     myApp.alert('Erro! Houve algum problema. Tente novamente!','Sessão', function () {
                        window.location.href = "menu.html";  
                      
                      })
           
             }
         }
    })

    }, function() {
      handleLocationError(true,infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
    }) 
};


$(document).on('click','a.info_checkin',function(){

       var idsecao =  $( this ).data('idsecao'); 
       var checkin_msql =  $( this ).data('checkin_msql'); 
       
            localStorage.setItem('idsecao', idsecao);
            localStorage.setItem('checkin_msql', checkin_msql);
          //mainView.router.loadPage('infosessao.html');   
});
// volta a rolar o slider left 
function Slider(){
   myApp.params.swipePanel = 'left';
 window.location.href = "menu.html";  
 

}


  function MarcarHora(idsecao){
 
        
        myApp.modalPassword('Marque o horário.', function (hora) {
                              

             if (hora==""){
                         
                 myApp.alert('Campo vazio!')
                 return false;

              } else {

                        myApp.showIndicator();

                      $.ajax({      //Função AJAX
                             url:'https://www.isaudebelem.com.br/xdk/editarhora.php',
                              type:"post",
                                    data: "idsecao="+idsecao+"&hora="+hora, //Dados
                                    dataType: "json",
                             success: function(data) {
                             
                                    myApp.hideIndicator();

                                         if(data==1){
                                                myApp.alert('Hora marcada com sucesso!','Agenda', function () {

                                                  window.location.href = "menu.html";  
                                                       
                                                          });
                                             
                                                 
                                          } else {

                                                   myApp.alert('Erro! Hora não foi marcada!','Agenda', function () {
                                                   window.location.href = "menu.html";  
                                              
                                                          });

                                            }
                               }

                        })
                   } 

return false;

  })
}

$(document).on('submit','form#horamarq',function(e){
e.preventDefault();

var hora=$('#hora').val();
var idsecao=$('#idsecao').val(); 

if (hora==""){

     myApp.alert('Campo vazio!')
     return false;

     } else {

myApp.showIndicator();

 $.ajax({      //Função AJAX
     url:'https://www.isaudebelem.com.br/xdk/editarhora.php',
      type:"post",
            data: "idsecao="+idsecao+"&hora="+hora, //Dados
            dataType: "json",
     success: function(data) {
     
      myApp.hideIndicator();

      if(data==1){
                     myApp.alert('Hora marcada com sucesso!','Agenda', function () {
                          myApp.closeModal('.picker-modal');
                        window.location.href = "menu.html";  
                                  });
                     
                         
                  } else {

                           myApp.alert('Erro! Hora não foi marcada!','Agenda', function () {
                         window.location.href = "menu.html";  
                                  });

    }
  }

  })
}
  
});


function infocheckin_da (idsecao, checkin_msql){
   localStorage.setItem('idsecao', idsecao);
   localStorage.setItem('checkin_msql', checkin_msql);
  mainView.router.loadPage('infosessao.html');
}

function infocheckout_da (idsecao, checkin_msql){
   localStorage.setItem('idsecao', idsecao);
   localStorage.setItem('checkin_msql', checkin_msql);
  mainView.router.loadPage('infosessao2.html');
}
