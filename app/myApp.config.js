(function() {
    'use strict';

    angular
        .module('MyApp')
        .config(myAppSvgAvatarsConfig)
        .config(myAppSvgIconSetConfig)
        .config(myAppThemingConfig);

    myAppSvgAvatarsConfig.$inject = [
        '$mdIconProvider'
    ];
    
    function myAppSvgAvatarsConfig($mdIconProvider) {
        $mdIconProvider
            .defaultIconSet('./svg/avatars.svg', 128);
    }

    myAppSvgIconSetConfig.$inject = [
        '$mdIconProvider'
    ];

    function myAppSvgIconSetConfig($mdIconProvider) {
        $mdIconProvider
            .icon('share', './svg/share.svg')
            .icon('phone', './svg/phone.svg')
            .icon('twitter', './svg/twitter.svg')
            .icon('google_plus', './svg/google_plus.svg')
            .icon('hangouts', './svg/hangouts.svg')
            .icon('menu', './svg/menu.svg');
    }

    myAppThemingConfig.$inject = [
        '$mdThemingProvider'
    ];

    function myAppThemingConfig($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('brown')
            .accentPalette('red');
    }

})();