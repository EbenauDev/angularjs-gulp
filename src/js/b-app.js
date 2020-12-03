"use strict";

(function () {
  'use strict';

  angular.module('app', []);
})();
"use strict";

(function () {
  'use strict';

  angular.module('app').controller('AppController', AppController);
  AppController.$inject = [];

  function AppController() {
    var vm = this;
    vm.titulo = "Meu aplicativo";
    vm.descricao = "Meu aplicativo";
    vm.geleria = ["https://images.pexels.com/photos/51415/pexels-photo-51415.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", "https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", "https://images.pexels.com/photos/1337247/pexels-photo-1337247.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"];
  }
})();