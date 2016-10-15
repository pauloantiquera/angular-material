(function() {
    'use strict';

    angular
        .module('users')
        .controller('userShareController', userShareController);

    userShareController.$inject = [
        'user',
        '$mdBottomSheet'
    ];
    function userShareController(user, $mdBottomSheet) {
        var vm = this;
        
        vm.user = user;
        vm.items = [
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'svg/phone.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'svg/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'svg/hangouts.svg'}
        ];

        vm.performAction = performAction;

        function performAction(item) {
            $mdBottomSheet.hide(item);
        }

        ////////////////
        activate();

        function activate() {
        }
    }
})();