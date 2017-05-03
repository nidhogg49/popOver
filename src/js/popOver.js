/*

 Version: 0.0.1a
 Author: nidhogg49
 Website: http://nidhogg49.github.io/popUpjs
 Docs: https://github.com/nidhogg49/popUpjs
 Repo: https://github.com/nidhogg49/popUpjs
 Issues: https://github.com/nidhogg49/issues
 */
;(function ($, window, document) {

    "use strict";

    const   popUp   = $('.pop-over'),
            title   = $('.pop-over__title'),
            text    = $('.pop-over__text');

    var PopOver = {

        init: function () {

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                this.ui.$html.addClass('is-mobile');
                this.meta.isMobile = true;
            } else {
                PopOver.generate();
            }

        },
        
        generate: function (params) {
            
        }
    };

    $(function () {
        PopOver.init();
    });

})(jQuery, window, document);