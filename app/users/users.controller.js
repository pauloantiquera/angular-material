(function() {
    'use strict';

    angular
        .module('users')
        .controller('usersController', usersController);

    usersController.$inject = [
        'usersResource',
        '$mdBottomSheet'
    ];

    function usersController(usersResource, $mdBottomSheet) {
        var vm = this;

        vm.users = [];
        vm.selectedUser = null;

        vm.isTheSelectedUser = isTheSelectedUser;
        vm.select = select;
        vm.share = share;
        vm.allDisabled = false;

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
        ////////////////        

        function activate() { 
            fillUsersList();
        }

        activate();
    }
})();