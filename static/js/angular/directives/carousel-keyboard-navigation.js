(function () {
    'use strict';

     /*
     * Left / right keyboard navigation to bootstrap carousel
     */
    angular.module('CarouselNavigation', []).directive('carouselNavigation', function() {
       return {
           restrict: 'A',
           link: function(scope, elem, attr) {
               $(document).keydown(function(e) {
                   /*
                   * Previous slide
                   */
                   if (e.keyCode === 37) {
                       $(elem).find('.carousel-control.left').click();
                       return false;
                   }
                   /*
                   * Next slide
                   */
                   if (e.keyCode === 39) {
                       $(elem).find('.carousel-control.right').click();
                       return false;
                   }

               });
           }
       };
    });
})();
