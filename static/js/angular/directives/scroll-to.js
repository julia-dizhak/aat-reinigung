'use strict';

angular.module('scrollTo', []).directive('scrollTo', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attr) {
            elem.on('click', function () {
                angular.element('body, html').animate({
                    scrollTop: angular.element(attr.scrollTo).offset().top
                });
            });
        }
    };
});
