document.addEventListener('deviceready', function () {
                          var notificationOpenedCallback = function(jsonData) {
                                                        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
                           };
                           // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
                           window.plugins.OneSignal
                                                                                  .startInit("13ccc4ef-633f-465b-835c-fad94bbcb5e8")
                                                                                  .handleNotificationOpened(notificationOpenedCallback)
                                                                                  .endInit();
   localStorage.setItem('id_cel', device.uuid);
}, false);

// sample index.js
var app = {
  initialize: function() {
    this.bindEvents();
  },
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
    document.addEventListener('resume', this.onDeviceResume, false);
  },
  onDeviceReady: function() {
    app.handleBranch();
  },
  onDeviceResume: function() {
    app.handleBranch();
  },
 
};

 

app.initialize();

$(document).ready(function(){
                  
  var s=navigator.onLine;
    if(s==false){
       
      myApp.alert('Sem conexão com a internet','iSaúde!', function () {
        myApp.hideIndicator();                  
        return false;

      });
       } else {

         
              var login = localStorage.getItem('login_1');
              var senha = localStorage.getItem('senha_1');
              var id_cel = localStorage.getItem('id_cel');

              myApp.showIndicator();
   
	       if (login!="" && senha!=""){

                			$.ajax({			//Função AJAX

                    			url:"https://www.isaudebelem.com.br/xdk/login_versao2.php",			//Arquivo php
                    			type:"post",				//Método de envio
                    			data: "login="+login+"&senha="+senha+"&id_cel="+id_cel,	//Dados
                   			  
                          success: function (result){			//Sucesso no AJAX

                                    myApp.hideIndicator();

                                		if(result.valida==1){	

                                                 window.location.href = "menu.html";
                                    document.addEventListener('deviceready', function () {
                                                 window.plugins.OneSignal.sendTags({
                                                                                                      idprof: result.idprof,
                                                                                                      nome:result.nome,
                                                                                                      sobrenome:result.sobrenome,
                                                                                                      tipousu:result.tipousu,
                                                                                                      especialidade:result.especialidade
                                                                                                    });
                                              }, false);
                                    } if (result.valida == 2) {

                                         myApp.alert('<div class="text-center"><i class="fa fa-ban fa-3x color-red"></i><div style="color:red">Usuário utilizando outro dispositivo. Entre em contato com a administração!</div></div>','Alerta', function () {
                                          return false; 
                      
                      })

                                    } else {

                                            myApp.hideIndicator();     
                                                return false;    
                                            
                                      }
                          }  
                     });
              } else {

                return false;

              }
    }
});


$(document).ready(function(){
 $('#redefinirsenha').submit(function(e){ 
  e.preventDefault();

var email= $('input[type=email]#email').val();

  myApp.showIndicator();

      $.ajax({      //Função AJAX
      url:"https://www.isaudebelem.com.br/xdk/senharedefinir.php",     //Arquivo php
      type:"post",        //Método de envio
      data: "email="+email, //Dados
        success: function (result){     //Sucesso no AJAX

          myApp.hideIndicator();
                    if(result==1){ 
                      myApp.alert("Senha enviada para o e-mail!");
                       

                    } else{
                      myApp.alert("E-mail não encontrado no sistema!"); 

                    }

                }
         })
      
      
})    
});
 



