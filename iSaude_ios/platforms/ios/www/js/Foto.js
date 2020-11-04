/**
* @author Roni
* @email roni@bananadev.com.br
*/

"use strict";
var Foto = {
  pictureSource : null,
  destinationType: null,
  imageData: null,
  tipoImagem: '',

  capturePhoto: function(){
    var cam = myApp.device.os === 'android' ? navigator.camera.DestinationType.FILE_URI :
        navigator.camera.DestinationType.NATIVE_URI;
        
    navigator.camera.getPicture(Foto.onSuccess, Foto.onFail, 
        { 
          quality: 50,
          targetWidth: 120,
          targetHeight: 120,
          allowEdit: true,
          destinationType: cam,
          correctOrientation: false,
          sourceType: navigator.camera.PictureSourceType.CAMERA  
        });
  },


 captureGaleria: function(){
  
    var cam = myApp.device.os === 'android' ? navigator.camera.DestinationType.FILE_URI :
        navigator.camera.DestinationType.NATIVE_URI;

        navigator.camera.getPicture(Foto.onSuccess, Foto.onFail,{
                quality: 50,
                targetWidth: 120,
                targetHeight: 120,
                allowEdit: true,
                destinationType: cam,
                correctOrientation: false,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY  

              });
  },

  uploadPhoto: function(){
    var fileURI = Foto.imageData;
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    
    var params = new Object();    
    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();

    ft.upload(fileURI, encodeURI("https://www.isaudebelem.com.br/xdk/UploadImagem.php"),

      function (r){

        if(myApp.device.os != 'android'){
          var smallImage = Foto.imageData.replace("assets-library://","cdvfile://localhost/assets-library/");
        }else{
          var smallImage = Foto.imageData;
        }
        $('#imgperfil').html('<img src="'+smallImage+'" class="imgperfil" style="border-radius: 50%;" width="80" height="80"/> </div> ');      
        
        Foto.clearCamera();

      }, function (error){
        console.log(error);
        myApp.alert('Ops, ocorreu algum erro para salvar a sua imagem');
      }, options);
   
  return true;
  },

  opcaoCamera: function(){
    var buttons = [
    
        {
            text: '<div class="text-center">Altere a foto do perfil</div>',
            
           
        },
        {
            text: '<div class="text-center button button-fill color-blue" style="margin-bottom:10px"></i><span>  Câmera</span></div>',
            onClick: function () {
                Foto.capturePhoto();
            }
        },
        {
            text: '<div class="text-center button button-fill color-green" style="margin-bottom:20px"><span>  Galeria</span></div>',
            onClick: function () {
                Foto.captureGaleria();
            }
        },
        ];
        var buttons2 = [
        {
            text: '<div class="text-center button button-fill color-red" style="margin-bottom:10px"><span>  Cancelar</span></div>',
       
        }
    ];
    var groups = [buttons, buttons2];
    myApp.actions(groups);
  },
 
  onSuccess: function(imageData){
    Foto.imageData = imageData;
    
    var smallImage = imageData;   
    if(myApp.device.os != 'android'){
      smallImage = smallImage.replace("assets-library://", "cdvfile://localhost/assets-library/");      
    }  
   $$(".foto_perfil").html('<img src="'+smallImage+'" alt="" style="border-radius: 50%;" width="80" height="80" class="imgperfil">');
  },

  onFail: function(message){
    myApp.alert('Imagem não selecionada!','iSaúde');
  },

  clearCamera: function(){
    navigator.camera.cleanup();
  }

}


