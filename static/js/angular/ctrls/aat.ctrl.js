(function () {
    'use strict';

    angular
        .module('aatApp')
        .controller('aatController', aatController);

    aatController.$inject = ['$scope', '$http', '$uibModal'];

    function aatController($scope, $http, $uibModal) {
        $scope.sendMessage = sendMessage;
        init();

        function init() {
            $scope.request = {}
            $scope.formEnabled = true;
            $scope.formSent = false;

            $scope.showGalleryTop = showGalleryTop;
            $scope.showGalleryBottom = showGalleryBottom;
        }

        function releaseForm () {
            $scope.formEnabled = true;
        }

        function sendMessage(isValid) {
            console.log('test')
            if (!isValid) {
                return false;
            }

            var url = '/feedback/';
            var data = angular.copy($scope.request);

            $scope.formEnabled = false;

            $http
                .post(url, data)
                .then(
                    function () {
                        $scope.formSent = true;
                        releaseForm();
                    },
                    function () {
                        releaseForm();
                    }
                )

        }

        function showGalleryTop() {
            var $modalInstance = $uibModal.open({
                templateUrl: 'galleryTop.html',
                windowClass: 'modal-slider',
                scope: $scope
            });
            $scope.closeDialog = function () {
                $modalInstance.dismiss('cancel');
            };
        }

        function showGalleryBottom() {
            var $modalInstance = $uibModal.open({
                templateUrl: 'galleryBottom.html',
                windowClass: 'modal-slider',
                scope: $scope
            });
            $scope.closeDialog = function () {
                $modalInstance.dismiss('cancel');
            };
        }
    }
})();
