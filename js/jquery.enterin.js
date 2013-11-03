/*
* EnterIN jQuery Plugin v2.0
* 
* Copyright 2013 Gianfilippo Balestriero
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*       http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* 
*/

(function ($) {

    $.fn.enterin = function(options) {

        var $defaults = {
            controllers:    false,
            maxScale:       20,
            effectTime:     3.0,
            ease:           'linear',
            endCallback:    function(){}
        };

        $.fn.enterin.goToSlide = function(slideIndex, scaleOverride){
            setTimeout(function(){
                enterin.changeSlide(slideIndex, scaleOverride);
            },30);
        };

        return this.each(function() {

            var settings = $.extend( {}, $defaults, options );

            var enterin = {

                init: function(element){

                    enterin.isInit  = true;

                    enterin.to      = 1;

                    enterin.ctrl    = false

                    enterin.wrapper = jQuery(element);

                    enterin.wrapper.attr("data-slides-count", enterin.wrapper.find(".enterin-slide").length);

                    if(settings.controllers != false) {

                        enterin.ctrl    = jQuery(settings.controllers);
                    }
                    else {
                        enterin.ctrl    = false;
                    }

                    enterin.bindKeyAndMouseEvents();

                    enterin.reorderSlide();

                    enterin.setWrapperStyle();

                    enterin.setSlidesStyle();

                    enterin.bindControllers();

                    enterin.bindAnimation();

                    enterin.changeSlide(1);

                },

                bindKeyAndMouseEvents: function(){

                    enterin.wrapper.bind("mousewheel", function(event, delta){
                        
                        if(delta=="-1") {
                            enterin.to = enterin.to+1;
                        }
                        else {
                            enterin.to = enterin.to-1;
                        }  

                        enterin.keyFire();

                    });

                    jQuery("body").keydown(function (e) {
                        var keyCode = e.keyCode || e.which,
                        arrow = {left: 37, up: 38, right: 39, down: 40 };

                        switch (keyCode) {
                            case arrow.left:
                                enterin.to = enterin.to-1;

                            break;
                            case arrow.right:
                                 enterin.to = enterin.to+1;
                            break;                            
                            case arrow.up:
                                 enterin.to = enterin.to-1;
                            break;

                            case arrow.down:
                                 enterin.to = enterin.to+1;
                            break;
                        }

                        enterin.keyFire();

                    });                    
                },

                keyFire: function(){
                    var t;

                    if(enterin.to<1) {
                        enterin.to = enterin.wrapper.find(".enterin-slide").length;
                    }
                    else if(enterin.to>enterin.wrapper.find(".enterin-slide").length){
                        enterin.to = enterin.to>enterin.wrapper.find(".enterin-slide").length;
                    }

                    clearTimeout(t);
                    
                    t = setTimeout(function(){

                        enterin.changeSlide(enterin.to);

                    },200);

                },

                reorderSlide: function() {

                    var markupHtml = enterin.wrapper.clone();

                    var max = markupHtml.find(".enterin-slide").length-1;
                    
                    enterin.wrapper.text("");

                    var html;

                    for(var i = 0; i<max+1; i++) {
                        html = markupHtml.find(".enterin-slide").eq(max-i);
                        enterin.wrapper.append(html);
                    }

                },

                setWrapperStyle: function(){
                    enterin.wrapper.css("position",     "relative");
                    enterin.wrapper.css("overflow",     "hidden");
                },

                setSlidesStyle: function(){

                    var time            = settings.effectTime+"s";

                    var ease            = settings.ease;

                    var countSlides     = enterin.wrapper.find(".enterin-slide").length;

                    var d               = (settings.effectTime/countSlides);

                    var b               = ["-webkit-","-moz-", "-ms-", "-o-",""];

                    var cssTrans        = {};

                    for(var i in b) {

                        var css = b[i]+"transform "+settings.effectTime+"s "+settings.ease+", opacity "+settings.effectTime+"s "+settings.ease+", margin "+settings.effectTime+"s "+settings.ease;

                        
                        enterin.wrapper.find(".enterin-slide").css(b[i]+"perspective","1000");

                        enterin.wrapper.find(".enterin-slide").css(b[i]+"transition",css);
                        enterin.wrapper.find(".enterin-slide").css(b[i]+"backface-visibility","hidden");


                    }

                    setTimeout(function(){
                        enterin.wrapper.find(".enterin-slide").css("position",      "absolute");
                        enterin.wrapper.find(".enterin-slide").css("top",           "0px");
                        enterin.wrapper.find(".enterin-slide").css("left",          "0px");

                    },10);


                },

                bindControllers: function(){

                    enterin.isInit = false;

                    var jqueryElement;

                    if(enterin.ctrl != false) {
                        jqueryElement = enterin.ctrl.find("[data-enterin]");
                    }
                    else {
                        jqueryElement = jQuery("[data-enterin]");
                    }

                    jqueryElement.click(function(){

                        var $this   = jQuery(this);
                        var $to     = $this.data("enterin");

                        enterin.changeSlide($to);

                    });     

                },

                bindAnimation: function(){


                    jQuery(".enterin-slide").unbind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd');

                    jQuery(".enterin-slide").eq(enterin.to-1).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd', function(){
                        if(enterin.isInit) {
                            enterin.isInit = false;
                            return;
                        }
                        else {
                            settings.endCallback(enterin.to-1);                        
                           
                        }

                    });

                },

                changeZindex: function(){

                    var countSlides     = enterin.wrapper.find(".enterin-slide").length;

                    setTimeout(function(){
                        enterin.wrapper.find(".enterin-slide").each(function(i, val){
                            var a = ((countSlides-i)-1);
                            var b = (enterin.to-1)
                            enterin.wrapper.find(".enterin-slide").eq(i).css("z-index", i);
                            if(a == b) {
                                enterin.wrapper.find(".enterin-slide").eq(i).css("z-index", countSlides*2);
                            }
                        });
                    }, settings.effectTime*000);


                },

                changeActive: function(){
                    enterin.wrapper.find(".enterin-slide").removeClass("enterin-active");
                    enterin.wrapper.find(".enterin-slide").eq(enterin.wrapper.find(".enterin-slide").length-enterin.to).addClass("enterin-active");
                },

                changeSlide: function(to, scaleOverride) {

                    if(typeof scaleOverride == "undefined") {
                        scaleOverride = false;
                    }

                    enterin.wrapper.find(".enterin-slide").each(function(i, val){

                        var a = (1/enterin.wrapper.data("slides-count"))*(i+1);
                        var b = (1/enterin.wrapper.data("slides-count"));

                        var s = a+((to-1)*b);

                        var o = s;

                        var v = "visible";

                        if(o>1){
                            o = 0;
                            v = "hidden"
                        }

                        jQuery(this).css({
                            transform: 'scale('+s+')',
                            opacity: o,
                            visibility: v
                        });
                   
                    });

                    enterin.to = to;

                    enterin.bindAnimation();

                    enterin.changeZindex();

                    enterin.changeActive();

                },

            };

            enterin.init(this);


        });

    };

}(jQuery));