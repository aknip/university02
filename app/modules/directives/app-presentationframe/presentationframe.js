'use strict';

angular.module('famousApp')
    .directive('appPresentationframe', function($compile, appOptions) {
        return {
            replace : true,
            scope : false,
            restrict: 'EA',
            link: function($scope, $element, $attr) {

                // Compute Output DOM:
                var deviceDom1 = '<div style="position: relative; width: 385px; margin: 0 auto;"> <!-- Phone Picture as SVG --> <svg class ="phone-frame" x="0px" y="0px"viewBox="0 0 188 390" enable-background="new 0 0 188 390" xml:space="preserve" preserveAspectRatio="none" height="812" width="384">  <path fill="#FFFFFF" stroke="#868684" stroke-miterlimit="10" d="M3.9,58H3.7c-1,0-1.8,0.8-1.8,1.8v13.4c0,1,0.8,1.8,1.8,1.8h0.2   L3.9,58L3.9,58z"/>  <path fill="#FFFFFF" stroke="#868684" stroke-miterlimit="10" d="M3.9,93.1H3.7c-1,0-1.8,0.9-1.8,1.9v9.6c0,1.1,0.8,1.9,1.8,1.9h0.2   L3.9,93.1L3.9,93.1z"/>  <path fill="#FFFFFF" stroke="#868684" stroke-miterlimit="10" d="M3.9,124.6H3.7c-1,0-1.8,0.9-1.8,1.9v9.6c0,1.1,0.8,1.9,1.8,1.9   h0.2L3.9,124.6L3.9,124.6z"/>  <path fill="#FFFFFF" stroke="#868684" stroke-miterlimit="10" d="M184.2,352.4V41c0-35.5-23.1-35-23.1-35s-96.4,0-127.9,0   S3.6,41,3.6,41v311.4c0.4,35.5,24.1,32.8,24.1,32.8s105.9,0,131.8,0C185.4,385.2,184.2,352.4,184.2,352.4z"/>  <path fill="#414141" d="M173.6,331c0,1-0.8,1.8-1.8,1.8H16.3c-1,0-1.8-0.8-1.8-1.8V59.7c0-1,0.8-1.8,1.8-1.8h155.5   c1,0,1.8,0.8,1.8,1.8L173.6,331L173.6,331z"/>  <ellipse fill="#F0EEE9" cx="94.1" cy="357.7" rx="16.7" ry="16.5"/>  <ellipse fill="#FFFFFF" cx="94.1" cy="357.7" rx="14.9" ry="14.8"/>  <path fill="#5E5E5E" d="M109.1,38.8c0,1-0.8,1.8-1.8,1.8H80.9c-1,0-1.8-0.8-1.8-1.8V38c0-1,0.8-1.8,1.8-1.8h26.4   c1,0,1.8,0.8,1.8,1.8V38.8z"/>  <ellipse fill="#5E5E5E" cx="69.3" cy="38.4" rx="2.5" ry="2.5"/>  <ellipse fill="#5E5E5E" cx="94.1" cy="24.2" rx="3.4" ry="3.4"/>  <path fill="#FFFFFF" stroke="#868684" stroke-miterlimit="10" d="M152,5.9c0.7,0,1.4,0,2.1,0.1V4.2c0-1-0.8-1.8-1.8-1.8h-27.2   c-1,0-1.8,0.8-1.8,1.8v1.6H152z"/>  </svg>';

                var deviceDom2 = '</div>';

                var famousDomDevice = '<!-- Container for Famo.us --> <div class="phone-view-container" ui-view></div>';

                var famousDomPlain = '<!-- Container for Famo.us --> <div class="plain-view-container" ui-view></div>';

                var css1 = '<style type="text/css"> \n'+
                    'Add style rules here \n'+
                    '</style> \n';

                var device = $attr.device || 'none';
                appOptions.device = device;
                appOptions.appSize = appOptions.deviceSizes[appOptions.device].screenSize;


                var outputDOM = '';
                var csscode = '';

                if (device != 'none') {
                    outputDOM = angular.element(deviceDom1 + famousDomDevice + deviceDom2);
                    csscode = ".appsize {width:"+ appOptions.appSize[0] +"px; height:" + appOptions.appSize[1] + "px}";
                } else {
                    outputDOM = angular.element(famousDomPlain);
                    //csscode = ".appsize {width:"+ appOptions.appSize[0] +"px; height:" + appOptions.appSize[1] + "px}";
                    csscode = ".appsize {position: fixed; top: 0; right: 0; bottom: 0; left: 0;}";
                }


                // CREATE CSS
                var style = document.createElement('style');
                style.type = 'text/css';
                if (style.styleSheet) {
                    // IE
                    style.styleSheet.cssText = csscode;
                } else {
                    // Other browsers
                    style.innerHTML = csscode;
                }
                document.getElementsByTagName("head")[0].appendChild( style );


                // compile and finish
                var $e =$compile(outputDOM)($scope);
                $element.replaceWith($e);
            }
        }
    });