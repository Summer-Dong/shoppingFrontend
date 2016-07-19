'use strict';

/**
 * @ngdoc function
 * @Summer shoppingFrontend.controller:MainCtrl
 * @2016-7-19
 * # MainCtrl
 * Controller of the shoppingFrontend
 */
angular.module('shoppingFrontend')
    .directive( 'whenActive', function ( $location ) {
        return {
            scope: true,
            link: function ( scope, element, attrs ) {
                scope.$on( '$routeChangeSuccess', function () {
                    if ( $location.path() == element.attr( 'href' ) ) {
                        element.addClass( 'active' );
                    }
                    else {
                        element.removeClass( 'active' );
                    }
                });
            }
        };
    });