// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'ionic.service.core', 'ionic.service.push'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(['$ionicAppProvider', function($ionicAppProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: '669da69a',
    // The public API key all services will use for this app
    api_key: 'b191f7887f360cfb51dd266826503f3758d64e1537b5490d',
    // Set the app to use development pushes
    //o definir esta bandeira podemos enviar notificações push desenvolvimento.
    dev_push: true
    //Estes impulsos não passam por GCM (Google Cloud Messaging) ou APNS
     //(Apple Empurre Notfication Service) para notificações push por isso significa que 
     //você não tem que passar pelo incômodo de definir aqueles up. No entanto, há algumas
    //  limitações para o uso de desenvolvimento empurra: Tokens durar apenas 2 horas Você só pode receber notificações push se o aplicativo está aberto
  });
}])


.controller('MainCtrl', function($scope, $rootScope, $ionicUser, $ionicPush) {

  $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
    alert("Successfully registered token " + data.token);
    console.log('Ionic Push: Got token ', data.token, data.platform);
    $scope.token = data.token;
  });

  // Identifies a user with the Ionic User service
  //Identifica um usuário com o Ionic de serviço do usuário
  $scope.identifyUser = function() {
    console.log('Ionic User: Identifying with Ionic User service');

    var user = $ionicUser.get();
    if(!user.user_id) {
      // Set your user_id here, or generate a random one.
      //Defina o seu user_id aqui, ou gerar um aleatório
      user.user_id = $ionicUser.generateGUID();
    };

    // Add some metadata to your user object.
    angular.extend(user, {
      name: 'Ionitron',
      bio: 'I come from planet Ion'
    });

    // Identify your user with the Ionic User Service
   //Identifique o seu usuário com o Ionic utilizador do serviço
    $ionicUser.identify(user).then(function(){
      $scope.identified = true;
      alert('Identified user ' + user.name + '\n ID ' + user.user_id);
    });
  };

  // Registers a device for push notifications and stores its token
  //Registra um dispositivo para notificações push e armazena seu token
  $scope.pushRegister = function() {
    console.log('Ionic Push: Registering user');

    // Register with the Ionic Push service.  All parameters are optional.
    //Registra com o serviço push Ionic. Todos os parâmetros são opcionais
    $ionicPush.register({
      canShowAlert: true, //Can pushes show an alert on your screen? Pode empurra mostrar um alerta na tela?
      canSetBadge: true, //Can pushes update app icon badges?Pode empurra app atualização ícone emblemas? 
      canPlaySound: true, //Can notifications play a sound? Pode notificações reproduzir um som 
      canRunActionsOnWake: true, //Can run actions outside the app, possível executar ações fora do aplicativo
      onNotification: function(notification) {
        // Handle new push notifications here Handle novas notificações push aqui 
        alert(notification);
        return true;
      }
    });
  };
})
