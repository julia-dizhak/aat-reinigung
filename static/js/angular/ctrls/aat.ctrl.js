(function () {
    'use strict';

    angular
        .module('aatApp')
        .controller('aatController', aatController);

    aatController.$inject = ['$scope', '$uibModal'];

    function aatController($scope, $uibModal) {
        init();

        $scope.showGalleryTop = showGalleryTop;
        $scope.showGalleryBottom = showGalleryBottom;

        function init() {

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
