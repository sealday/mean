/**
 * Created by Yaoh on 2015/7/10.
 */

angular
    .module('mean')
    .controller('NavModalCtrl', NavModalCtrl)
    .controller('NavRegisterCtrl', NavRegisterCtrl)
    .controller('NavSignCtrl', NavSignCtrl);

/* @ngInject */

NavModalCtrl.$inject = ['$modal', '$log', 'signService', '$window', '$state'];
function NavModalCtrl($modal, $log, signService, $window, $state) {
    var vm = this;
    vm.error = false;
    vm.signService = signService;
    vm.Register = Register;
    vm.Signin = Signin;
    vm.signout = signout;
    vm.goDetails = goDetails;

    function goDetails() {
        var id = JSON.parse($window.localStorage.getItem('localUser'))._id;
        $state.go('user.details', {id: id});
    }

    function signout() {

        signService.signout()
    }

    function Register(size) {
        var size = "";
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'NavRegister.html',
            controller: 'NavRegisterCtrl',
            controllerAs: 're',
            size: size,
            resolve: {}
        });

        modalInstance.result.then(
            function (error) {
                vm.error = error;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
    };

    function Signin(size) {
        var size = "";
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'NavSignin.html',
            controller: 'NavSignCtrl',
            controllerAs: 'si',
            size: size,
            resolve: {}
        });

        modalInstance.result.then(function (error) {
            vm.error = error;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

};


NavRegisterCtrl.$inject = ['$modalInstance', 'signService'];
function NavRegisterCtrl($modalInstance, signService) {
    var si = this;
    si.signService = signService;
    si.error = false;

    si.cancel = cancel;
    si.register = register;

    function register() {
        console.log(si.username);
        console.log(si.password);
        signService.register(si.username, si.password).then(function () {
            console.log('username\n' + si.username + '\nregister success!');
            $modalInstance.close();
        }, function () {
            si.error = true;
            console.log('username\n' + si.username + '\nmay already exist!')
        });

    };

    function cancel() {
        $modalInstance.dismiss('cancel');
    };
};

NavSignCtrl.$inject = ['$modalInstance', 'signService'];
function NavSignCtrl($modalInstance, signService) {
    var si = this;
    si.signService = signService;

    si.cancel = cancle;
    si.signin = signin;

    function signin() {
        console.log(si.username);
        console.log(si.password);
        signService.signin(si.username, si.password).then(function () {
            console.log('username' + si.username + 'sign in success!');
            $modalInstance.close();
        }, function () {
            si.error = true;
            console.log('username\n' + si.username + '\nusername or password error')
        });
    };

    function cancle() {
        $modalInstance.dismiss('cancel');
    };
}