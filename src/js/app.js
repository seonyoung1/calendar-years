import $ from 'jquery';
import { TweenMax } from 'gsap';

// let genesis = window.genesis || {};
window.genesis = (function($){
    "use strict";
    var common = {
        menuOpen : function(){
            $('header .gnb button').on('click', function(){
                if( $(this).parent().hasClass('is-open')){
                    $(this).parent().removeClass('is-open');
                }else{
                    $(this).parent().addClass('is-open');
                }
            });
        },
        pageMotion : function(){
            TweenMax.to($('body .motion_page'), 0.3, {top:0});
            TweenMax.to($('body .motion_page .intro_popup'), 0.3, {top:'50%'});
            $('.page_intro a, nav li a').on('click', function(){
                var url = $(this).attr('href');
                $('body section').animate({
                    // "opacity": "0",
                    // "top": "10px"
                },500, function () {
                    document.location.href = url;
                });
                return false;
            });
        },
        layerOpen : function(target){
            var el = $(target);
            el.removeClass('is-hidden').addClass('is-open');
            $('.overlay').addClass('on');
            return false;
        },
        layerClose : function(target){
            var el = $(target);
            el.removeClass('is-open').addClass('is-hidden');
            $('.overlay').removeClass('on');
            return false;
        },
        checked : function(){
            var all = $('#allCheck');
            var agree = $('input[name=agree]');
            all.click(function(){
                var $this = $(this);
                var checked = $this.prop('checked');
                agree.prop('checked', checked);
            });
            agree.change(function () {
                var boxLength = agree.length;
                var checkedLength = $('input[name="agree"]:checked').length;
                var selectAll = (boxLength === checkedLength);
                all.prop('checked', selectAll);
            });
        },
        QrSelected : function(type){
            $('.page_docent').removeClass('is-active').addClass('is-hidden');
            if( type === 'direct' ){
                $('.qr_direct').removeClass('is-hidden').addClass('is-active');
            }else{
                $('.qr_camera').removeClass('is-hidden').addClass('is-active');
            }
        },
        QrSelectedClose : function(){
            $('.page_docent').removeClass('is-hidden').addClass('is-active');
            $('.qr_direct, .qr_camera').removeClass('is-active').addClass('is-hidden');
        },
        init : function(){
            common.menuOpen();
            // common.pageMotion();
            common.checked();
        },
    };
    const showroom = {
        pointMotion : function(){
            TweenMax.set('.showroom .link_showroom .obj1', {opacity:1, scale:0.5});
            TweenMax.set('.showroom .link_showroom .obj2', {opacity:0.1});
            TweenMax.set('.showroom .link_showroom .obj3', {opacity:0.1});
            TweenMax.to($('.showroom .link_showroom .obj1'), 0.5, {
                scale:1,
                repeat: -1,
                yoyo:true
            });
            TweenMax.to($('.showroom .link_showroom .obj2'), 0.5, {
                scale:1.8,
                opacity: 0.2,
                repeat: -1,
                yoyo:true
            });
            TweenMax.to($('.showroom .link_showroom .obj3'), 0.5, {
                scale:2.8,
                opacity: 0.2,
                repeat: -1,
                yoyo:true
            });
        },
        init : function(){
            // showroom.pointMotion();
        },
    };

    $(document).ready(function(){
        common.init();
        showroom.init();
    });

    return{
        layerOpen: common.layerOpen,
        layerClose: common.layerClose,
        QrSelected: common.QrSelected,
        QrSelectedClose: common.QrSelectedClose,
    }
})($);
