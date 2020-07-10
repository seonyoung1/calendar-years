var genesis = window.genesis || {};
genesis = (function($){
    "use strict";
    var common = {
        menuOpen : function(){
            $('header .gnb button').on('click', function(){
                if( $(this).parent().hasClass('is-open')){
                    $(this).parent().removeClass('is-open');
                    $('body').removeClass('nav-opens');
                }else{
                    $(this).parent().addClass('is-open');
                    $('body').addClass('nav-opens');
                }
            });
        },
        gnbSubClick : function(){
            $('header .links').on('click', function(){
                if(!$(this).parent().hasClass('is-open')){
                    $(this).parent().addClass('is-open');
                }else{
                    $(this).parent().removeClass('is-open');
                }
            });
        },
        pageMotion : function(){
            var $motion = $('body .motion_page');
            TweenMax.set( $motion, { top: '300px' });
            TweenMax.to( $motion, .3, { top:0 });
            // $('.page_intro a, nav li a').on('click', function(){
            //     var url = $(this).attr('href');
            //     $('body section').animate({
            //         // "opacity": "0",
            //         // "top": "10px"
            //     },500, function () {
            //         document.location.href = url;
            //     });
            //     return false;
            // });
        },
        layerOpen : function(target){
            var el = $(target);
            el.removeClass('is-hidden').addClass('is-open');
            // $('.overlay').addClass('on');
            return false;
        },
        layerClose : function(target){
            var el = $(target);
            el.removeClass('is-open').addClass('is-hidden');
            // $('.overlay').removeClass('on');
            return false;
        },
        checked : function(){
            var all = $('#allCheck');
            var agree = $('input.agree');
            all.click(function(){
                var $this = $(this);
                var checked = $this.prop('checked');
                agree.prop('checked', checked);
            });
            agree.change(function () {
                var boxLength = agree.length;
                var checkedLength = $('input.agree:checked').length;
                var selectAll = (boxLength === checkedLength);
                all.prop('checked', selectAll);
            });
        },
        QrSelected : function(type){
            $('.page_docent').removeClass('is-active').addClass('is-hidden');
            $('body').addClass('white');
            if( type === 'direct' ){
                $('.qr_direct').removeClass('is-hidden').addClass('is-active');
            }else{
                $('.qr_camera').removeClass('is-hidden').addClass('is-active');
            }
        },
        QrSelectedClose : function(){
            $('body').removeClass('white');
            $('.page_docent').removeClass('is-hidden').addClass('is-active');
            $('.qr_direct, .qr_camera').removeClass('is-active').addClass('is-hidden');
        },
        souvenirFin : function(){
            common.layerClose('.souvenir');
            common.layerOpen('.souvenir_fin');
        },
        slider : function(target){
            $(target).slick({
                infinite: true,
                dots: true,
                arrows: false,
                fade: true,
            });
        },
        videoPlay: function(){
            var video = $('.video');
            var overlay = $('.overlay');
            var iframe = '<iframe src="https://www.youtube.com/embed/E4xHyx7JOvQ?mute=1&autoplay=1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
            video.find('div').append(iframe);
            video.removeClass('is-hidden').addClass('is-active');
            overlay.addClass('on');
        },
        videoSkip : function(){
            var video = $('.video');
            var overlay = $('.overlay');
            if( video.hasClass('is-active')){
                document.getElementById('video_show').pause();
                // video.find('div').empty();
                video.removeClass('is-active').addClass('is-hidden');
                overlay.removeClass('on');
            }
        },
        videoSound : function(){
            var $btn = $('.video .sound');

            $btn.on('click', function(){
                if( ! $btn.hasClass("off")){
                    $("#video_show").prop('muted', true);
                    $btn.addClass("off");
                }else{
                    $("#video_show").prop('muted', false);
                    $btn.removeClass("off");
                }
            });
        },
        init : function(){
            this.menuOpen();
            this.pageMotion();
            this.checked();
            this.slider('.photo_slider');
            this.videoSound();
            this.gnbSubClick();
        },
    };

    const showroom = {
        pointMotion : function(){
            TweenMax.set('.link_showroom .obj2', {opacity:0.1, scale:.8});
            TweenMax.set('.link_showroom .obj3', {opacity:0.1, scale:.8});
            TweenMax.to($('.link_showroom .obj2'), 0.8, {
                scale:1, opacity: 0.2, repeat: -1, yoyo:true
            });
            TweenMax.to($('.link_showroom .obj3'), 0.8, {
                scale:1, opacity: 0.2, repeat: -1, yoyo:true
            });
        },
        init : function(){
            if( $('section').hasClass('motion_page')){
                this.pointMotion();
            }
        },
    };

    const docent = {
        audioPlay : function(){
            var audio = document.getElementById("audio1");
            var $btn = $('#audio_btn');
            if( $btn.hasClass("off")){
                audio.play();
                $btn.removeClass("off");
                console.log('play');
            }
        },
        audioPause : function(){
            var audio = document.getElementById("audio1");
            audio.pause();
        },
        audioControl : function(){
            var audio = document.getElementById("audio1");
            var $btn = $('#audio_btn');

            $btn.on('click', function () {
                if( ! $btn.hasClass("off") ){
                    audio.pause();
                    $btn.addClass("off");
                    // console.log('pause');
                }else{
                    audio.play();
                    $btn.removeClass("off");
                    // console.log('play');
                }
            });
        },
        guideLayer : function(){
            common.layerOpen('.docent_first');
            // $('.docent_first .guide').slick({
            //     infinite: true,
            //     dots: false,
            //     arrows: false,
            //     fade: true,
            //     autoplay:true,
            //     autoplaySpeed: 1000,
            //     speed: 0,
            // });
        },
        guideLayerClose : function(){
            // $('.docent_first .guide').slick('unslick');
            common.layerClose('.docent_first');
        },
        init : function(){
            this.audioControl();
        }
    };

    $(document).ready(function(){
        common.init();
       showroom.init();
        docent.init();
    });

    return{
        layerOpen: common.layerOpen,
        layerClose: common.layerClose,
        QrSelected: common.QrSelected,
        QrSelectedClose: common.QrSelectedClose,
        souvenirFin: common.souvenirFin,
        guideLayer: docent.guideLayer,
        guideLayerClose: docent.guideLayerClose,
        videoSkip: common.videoSkip,
        videoPlay: common.videoPlay,
    }
})(jQuery);

