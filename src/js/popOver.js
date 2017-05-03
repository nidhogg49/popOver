/*

 Version: 0.0.1a
 Author: nidhogg49
 Website: http://nidhogg49.github.io/popUpjs
 Docs: https://github.com/nidhogg49/popUpjs
 Repo: https://github.com/nidhogg49/popUpjs
 Issues: https://github.com/nidhogg49/issues

 **
 *     @param {number}                  time                - время через которое показывается попОвер
 *     @param {string}                  title               - текст заголовка
 *     @param {Object}                  text                - текста
 *     @param {number}                  textTime            - время через которое переключаются текста
 *
 *

*/
;(function ($) {

    "use strict";

    const   title   = $('<div class="pop-over__title"></div>'),
            text    = $('<div class="pop-over__text"></div>');

    var defaults = {
        'time'             : 3600,
        'title'            : {
            text        : 'Забегайте в паблик в вк',
            fontSize    : 48
        },
        'content'          : {
            time        : 500,
            text        : ['vk.com/orkpod'],
            fontSize    : 24,
            animation   : 'leftRight'
        },
        'position'         : 'bottom',
        'background-color' : 'blue',
        'animation'        : 'opacity'
    };

    var methods = {
        init : function( params ) {
            var options = $.extend( {}, defaults, params);
            this.append(title.text(options.title.text)).append(text.text(options.content.text[0]));

            if (options.animation == 'upDown' || options.animation == 'opacity') {
                this.addClass(options.animation);
            } else {
                $.error( 'Анимация "' +  options.animation + '" не найдена в плагине jQuery.popOver' );
            }
            const $this = this;

            setInterval(function(){
                return methods.hideShow( $this );
            },options.time);

            setInterval(function(){
            },options.content.time);

        },
        hideShow : function( obj )  {
            obj.toggleClass('hide');
        },
        update : function( content ) {

        }
    };

    $.fn.popOver = function(method) {

        if ( methods[method] ) {
            // если запрашиваемый метод существует, мы его вызываем
            // все параметры, кроме имени метода прийдут в метод
            // this так же перекочует в метод
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            // если первым параметром идет объект, либо совсем пусто
            // выполняем метод init
            return methods.init.apply( this, arguments );
        } else {
            // если ничего не получилось
            $.error( 'Метод "' +  method + '" не найден в плагине jQuery.popOver' );
        }

    }

    $( document ).ready(function() {
        $('.pop-over').popOver();
    });

})(jQuery);