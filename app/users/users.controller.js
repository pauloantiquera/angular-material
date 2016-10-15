(function() {
    'use strict';

    angular
        .module('users')
        .controller('usersController', usersController);

    usersController.$inject = [
        'usersResource',
        '$mdBottomSheet',
        '$mdSidenav'
    ];

    function usersController(usersResource, $mdBottomSheet, $mdSidenav) {
        var vm = this;

        vm.users = [];
        vm.selectedUser = null;
        vm.allDisabled = false;

        vm.isTheSelectedUser = isTheSelectedUser;
        vm.select = select;
        vm.share = share;
        vm.toggleList = toggleList;

        function fillUsersList() {
            usersResource
                .loadAllUsers()
                .then(function(users) {
                    vm.users = [].concat(users);
                    vm.selectedUser = users[0];
                });
        }

        function isTheSelectedUser(user) {
            if (!vm.selectedUser) {
                return false;
            }

            return vm.selectedUser.name === user.name;
        }

        function select(user) {
            vm.selectedUser = user;
            toggleList();
        }

        function createBottomSheetConfig() {
            var configObject = {
                controller: 'userShareController',
                controllerAs: 'userShareCtrl',
                templateUrl: 'app/users/userShareBottomSheet.html',
                parent: angular.element(document.querySelector('#content')),
                resolve: {
                    user: function() {
                        return vm.selectedUser;
                    }
                }
            };

            return configObject;
        }

        function postHideShareBottomSheetAction() {
            vm.allDisabled = false;
        }

        function share(user) {
            var configObject = createBottomSheetConfig();

            vm.allDisabled = true;

            $mdBottomSheet
                .show(configObject)
                .then(
                    function(item) {
                        console.log(item);
                        postHideShareBottomSheetAction();
                    },
                    function() {
                        postHideShareBottomSheetAction();
                    }
                );
        }

        function toggleList() {
            $mdSidenav('usersList').toggle();
        }
        ////////////////        

        function activate() { 
            fillUsersList();
        }

        activate();
    }
})();