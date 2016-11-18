(function () {
    'use strict';

    angular
        .module('Language')
        .directive('language', language);

    function language() {
        return {
            restrict: "A",
            link: function (scope, elem, attr) {
                var $element = $(elem);
                $element.on('click', function () {
                    var $dropLanguage = $(this).parent();
                    $dropLanguage.toggleClass('open');
                    $(window).on('scroll', function () {
                        if ($dropLanguage.hasClass('open')) {
                            $dropLanguage.removeClass('open');
                        }
                    });
                });
            }
        };
    }
})();
