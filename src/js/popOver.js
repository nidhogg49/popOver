/*

 Version: 0.0.1a
 Author: nidhogg49
 Website: http://nidhogg49.github.io/popOver
 Docs: https://github.com/nidhogg49/popOver
 Repo: https://github.com/nidhogg49/popOver
 Issues: https://github.com/nidhogg49/popOver/issues

 * * *
 *     @param {number}                  time                - время через которое показывается попОвер
 *     @param {string}                  title               - текст заголовка
 *     @param {Object}                  text                - текста
 *     @param {number}                  textTime            - время через которое переключаются текста
 * * *

*/
;(function ($) {

    "use strict";

    const   title   = $('<div class="pop-over__title"></div>'),
            text    = $('<div class="pop-over__text"></div>');

    var defaults = {
        'time'             : 10000,
        'duration'         : 5000,
        'title'            : {
            text        : 'Tilte',
            background  : '#5190d0',
            color       : '#ffffff',
            fontSize    : 48
        },
        'content'          : {
            time        : 1000,
            text        : ['Content Text1','Content Text2', 'Content Text3'],
            fontSize    : 24,
            color       : '#000000',
            animation   : 'leftRight'
        },
        'position'         : 'bottom',
        'background'       : '#54a3f4',
        'animation'        : 'upDown'
    },
        blockInterval = null,
        contentInterval = null,
        durationTimer = null;

    var methods = {
        init : function( params ) {
            var options = $.extend( {}, defaults, params),
                self = this;

            self.css('background-color',options.background).addClass('pop-over');

            //вставляем заголовок
            self.append(title.text(options.title.text).css({ //стили для Title
                'font-size':options.title.fontSize,
                'background-color'  : options.title.background,
                'color'  : options.title.color
            }));

            //вставляем контент
            options.content.text.forEach(function(element, index){
                self.append(text.clone().text(options.content.text[index]).css({ //стили для content
                    'font-size':options.content.fontSize,
                    'color':options.content.color
                }));
            });

            //анимация для всего блока
            if (options.animation == 'upDown' || options.animation == 'opacity') {
                self.addClass(options.animation);
            } else {
                $.error( 'Анимация "' +  options.animation + '" не найдена в плагине jQuery.popOver' );
            }

            //анимация для контента
            if (options.content.animation == 'leftRight' || options.content.animation == 'opacity') {
                $(self.find('.pop-over__text')).addClass(options.content.animation);
                $(self.find('.pop-over__text')[0]).addClass('active');
            } else {
                $.error( 'Анимация "' +  options.content.animation + '" не найдена в плагине jQuery.popOver' );
            }

            return self.popOver('hideShow');
        },
        hideShow : function( params )  {
            var options = $.extend( {}, defaults, params),
                self = this;

            function startDurationTimer() {

                durationTimer = setTimeout(function () {

                    self.addClass('hide');

                    clearInterval(contentInterval);

                    startBlock();

                }, options.duration);
            }

            function startBlock() {

                blockInterval = setTimeout(function(){

                    self.toggleClass('hide');
                    startContent();
                    startDurationTimer();

                },options.time);
            }

            function startContent() {

                contentInterval = setInterval(function(){

                    var prevElem = $(self.find('.pop-over__text.active')),
                        currElem = prevElem.next('.pop-over__text');

                    prevElem.removeClass('active');
                    self.append(prevElem);
                    currElem.addClass('active');

                },options.content.time);
            }

            startDurationTimer();

            if (options.content.text.length > 1) {
                startContent();
            }
        },
        update : function( params ) {
            var options = $.extend( {}, defaults, params),
                self = this;

            return self.popOver(options);
        }
    };

    $.fn.popOver = function(method) {

        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Метод "' +  method + '" не найден в плагине jQuery.popOver' );
        }

    };

})(jQuery);