/**
 * Created by Yaoh on 2015/7/16.
 */
angular
    .module('user', [])
    .controller('UserController', UserController)
    .controller('UserDetailsController', UserDetailsController);
UserController.$inject = ['$http', '$state'];
UserDetailsController.$inject = ['$http', '$state'];

/* @ngInject */
function UserController($http, $state) {
    /* jshint validthis: true */
    var user = this;
    user.user = {};
    user.users = [];
    user.title = 'UserController';
    user.error = false;

    user.addUser = addUser;
    user.getAllUsers = getAllUsers;
    user.removeUser = removeUser;
    user.goDetails = goDetails;

    getAllUsers();

    ////////////////

    function getAllUsers() {
        $http.get('/api/users').success(function (users) {
            user.users = users;
            console.dir(users);
        }).error(function () {
            console.log('get users error')
        })
    }

    function addUser() {
        $http.post('/api/users', {
            name: user.name,
            username: user.username,
            password: user.password,
            role: user.role
        }).success(function () {
            console.log('add user success,');
            getAllUsers();
        }).error(function () {
            user.error = true;
            console.log('add user failure');
        })

    }


    function removeUser(id) {
        $http.delete('/api/users/' + id)
            .success(function () {
                console.log('delete user success');
                getAllUsers();
            })
            .error(function () {
                console.log('delete user error');
            });

    }

    function goDetails(id) {
        $state.go('user.details', {id: id});
    }
}

function UserDetailsController($http, $state) {
    var vm = this;
    vm.user = {};
    vm.user._id = $state.params.id;
    vm.editing = false;

    vm.cancel = cancel;
    vm.getDetail = getDetail;
    vm.edit = edit;
    vm.save = save;

    vm.getDetail(vm.user._id);
    function getDetail(id) {
        $http.get('/api/users/' + id).success(function (result) {
            vm.user = result;
            console.log(' get details success');
        }).error(function () {
            console.log('get details failure');
        })
    }

    function edit() {
        console.log(vm.editing);
        vm.editing = true;
        console.log(vm.editing);
        vm.user =
        {
            _id: vm.user._id,
            name: vm.user.name,
            username: vm.user.username,
            password: vm.user.password,
            role: vm.user.role
        };
        console.log(vm.user);
    }

    function save(id) {
        $http.post('/api/users/' + id, vm.user).success(function () {
                getDetail(id);
                vm.editing = false;
                console.log('save  success')
            }
        ).error(function () {
                console.log('save failure');
            })
    }

    function cancel() {
        console.log(vm.editing);
        vm.editing = false;
        console.log(vm.editing);
        vm.getDetail(vm.user._id);
    }
}
