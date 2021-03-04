

$(function(){

	/* 메인 비쥬얼  */
	if ( $('.visual_banner .banner_slide').length ) {
		var $visualSlide = $('.banner_slide'),
			  len = $visualSlide.find('.slide').length;
		
		$visualSlide.on('init', function(event, slick) {
			$(this).append('<div class="slick-counter"><span class="current"></span><span class="total"></span></div>');
			$('.current').text(slick.currentSlide + 1);
			$('.total').text(slick.slideCount);
		})

		 $visualSlide.slick({
			autoplay: true,
			autoplaySpeed: 4000,
			infinite: true,
			arrows: true,
			dots: true,
			dotsClass: "nav_btnwrap col" + len,			
			playButton: true
		})
		.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
	      $('.current').text(nextSlide + 1);
		});		
	}

	/* 자주 찾기 메뉴 */
	$('.frequent_inner .frequent_nav li a').on('click', function(){
		var $indx = $(this).closest('li').index();
		$('.frequent_cont>.meun_list').removeClass('on')
		$('.frequent_inner .frequent_nav li').removeClass('on')
		
		$(this).closest('li').addClass('on')
		$('.frequent_cont>.meun_list').eq($indx).addClass('on')
	});
		

	//카드리스트
	masonry()			 			
	function masonry(){		
		if ($('.card_columns').length>0){
		
			var $grid = $('.card_columns').imagesLoaded( function() {		
				$card =  $('.card_columns').masonry({
					itemSelector : '.card',
					columnWidth: 334,
					gutter: 40,				
					transitionDuration:0,
					fitWidth : true
				});	
			
			});
		}
	}		

	// 카드 탭
	$('.card_view .nav_sort>li>a').on('click', function(){		
		
		var $thisbar =  $(this).parent('li').outerWidth();
		var $thisPstn = $(this).parent('li').position().left;		
		var $index = $(this).parent('li').index();	
		var $cont = $(this).closest('.nav_sort').siblings('.card_cont').children('.card_list');
			masonry()

		$('.card_columns').addClass('on');
		$('.card_columns .card').addClass('default')
			setTimeout(function(){		
				$('.card_columns .card').removeClass('default')
			},500);
		
		$cont.removeClass('on');
		$cont.eq($index).addClass('on');
		
		$(this).parent('li').siblings('li').removeClass('on');
		$(this).parent('li').addClass('on');
	});	
	
	// 카드 생성
	$('.card_more').on('click', function(evt){
		evt.preventDefault();
		var request = $.ajax({
			url: '/cmmn/contsBannerList.mhpx',
			type: 'post',
			data: { "pageIndex": Math.ceil($(".card_list.on .card").length / 6) + 1, "contentsTypeCd" : $(".card_view .nav_sort li.on").data("cd") },
			dataType: 'json',
			success: function(data) {
				$(".card_cont .card_list.on .card_columns").append($.templates("#jsrender-cardTemplate").render(data));
				
				if(data.page >= data.totalPage) {
					$(".card_cont .card_list.on").find(".btn_more").hide();
				}
			}
		});	
	
		setTimeout(function(){		
			$card.append(request).masonry('appended', request, true);
			$card.masonry( 'reloadItems' );
			$card.masonry( 'layout' );	
			$card.masonry();				
			$('.card_list .add ').addClass('on')	

		}, 400);	
	});
	 
	$(window).scroll(function(){	
		if ($('.card_list').length>0){			
			var $offet = $('.card_list').offset().top-600;

			if ($(window).scrollTop() >= $offet ){
				$('.card_columns').addClass('on');
				setTimeout(function(){		
					$('.card_columns .card').removeClass('default')
				},500);
			}		
		}
	});

	var fn_pricFind = function(evt, ui) {
		evt.preventDefault();
		
		var rngSlide01Val = $.trim($('#rngSlide01 .ui-slider-value').text());
		var rngSlide02Val = $.trim($('#rngSlide02 .ui-slider-value').text());
		rngSlide01Val = rngSlide01Val != null && typeof rngSlide01Val !== 'undefined' ? rngSlide01Val.replace('+', '') : rngSlide01Val;
		rngSlide02Val = rngSlide02Val != null && typeof rngSlide02Val !== 'undefined' ? rngSlide02Val.replace('+', '') : rngSlide02Val;
		
		$.ajax({
			url: "/pric/pricFind.mhpx",
			data: {
				"devKdCd": $('.tariff_choice .choice_typ li.on').data('seq'),
				"inputVce": rngSlide01Val,
				"inputData": rngSlide02Val,
			},
			dataType: "json",
			success: function(res) {
				// ppnNm: "유심 데이터만 20GB"
				$(".tariff_view .itm_tit").text(res.resultMap.ppnNm);
				
				var upPpnCd = res.resultMap.upPpnCd;
				
				if(upPpnCd == res.cdMap.ugsupcd || upPpnCd == res.cdMap.ulvupcd || upPpnCd == res.cdMap.uhpupcd ||parseInt(res.resultMap.p0PrPrcAddVat) > 0){
					$(".tariff_view .itm_price .price").attr("data-count", parseInt(res.resultMap.bscChrg) - parseInt(res.resultMap.p0PrPrcAddVat));
				} else {
					$(".tariff_view .itm_price .price").attr("data-count", parseInt(res.resultMap.bscChrg));
				}
				
				$(".tariff_view a").attr("href", "/pric/pricDetail.mhp?upPpnSeq=" + res.resultMap.upPpnSeq + "&devKdCd=" + $('.tariff_choice .choice_typ li.on').data('seq'));
				
				dataCunt();
			},
			error: function(xhr) {
//				
			}
		});
		
		return false;
	}

	var dataCunt = function() {
		
		$('.itm_price .price').each(function(str) {
			  var $this = $(this),
				  countTo = $this.attr('data-count');
				
				$this.text('')

			 $('.tariff_view').addClass('open');
			 setTimeout(function(){	
				 $('.tariff_view').removeClass('open');
			 },600);

			  $({ countNum: $this.text()}).stop().animate({
				countNum: countTo					
			  },
			  {
				duration: 800,
				easing:'easeOutBounce',
				step: function() {
				  $this.text(Math.floor(String(this.countNum)));
				},
				complete: function() {
				  $this.text(String(this.countNum).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
				}				
			  });		
		});	
	}

	//요금제 찾기 
	$('.typ_wrp .choice_typ li a').on('click', function(){
		var $thisP = $(this).parent('li').position().left;
		var $result = Math.floor($thisP);
		var $thisW = $(this).parent('li').outerWidth();
		
		$('.typ_wrp .choice_typ li').removeClass('on')
		$(this).parent('li').addClass('on');
		
		$('.bg_box').animate({'left': $result, 'width':$thisW}, 300, 'easeOutQuart')
	});
	
	// range slider
	var unit01 = "", unit02 = "";
	
	$("#rngSlide01").slider({
		range: "min",
		value: defaultRcmdPpnInfo.voice,
		min: 0,
		max: 500,
		step: 10,
		create: function(event, ui){
			this.$state = $(this).find(".ui-slider-value");
		
		},
		start: function(event, ui) {
			this.$state.html(ui.value + unit01);
			this.$state.css("display") != "block" ? this.$state.show() : null;
		},
		slide: function(event, ui) {
			var uiVal = ui.value != 500 ? ui.value + unit01 : ui.value + unit01 + "+";
			this.$state.html(uiVal);
			$("#inputVce").val(ui.value);
			
		},
		stop: function(event, ui) {
//			dataCunt();
			var uiVal = ui.value != 500 ? ui.value + unit01 : ui.value + unit01 + "+";
			this.$state.html(uiVal);
			fn_pricFind(event, ui);
		}
		
	});

	$("#rngSlide02").slider({
		range: "min",
		value: defaultRcmdPpnInfo.data * 1000,
		min: 0,
		max: 20000,
		step: 100,
		create: function(event, ui){
			this.$state = $(this).find(".ui-slider-value");
		
		},
		start: function(event, ui) {
			this.$state.html((ui.value / 1000) + unit02);
			this.$state.css("display") != "block" ? this.$state.show() : null
		},
		slide: function(event, ui) {
			var uiVal = ui.value / 1000;
			uiVal = uiVal != 20 ? uiVal + unit02 : uiVal + unit02 + "+";

			this.$state.html(uiVal);
			$("#inputData").val(ui.value / 1000);
		},
		stop: function(event, ui) {
//			dataCunt();
			var uiVal = ui.value / 1000;
			uiVal = uiVal != 20 ? uiVal + unit02 : uiVal + unit02 + "+";

			this.$state.html(uiVal);
			fn_pricFind(event, ui);
		}
	});
	
	$(".tariff_choice .choice_typ li").on("click", fn_pricFind);
	
	$(".tariff_choice .choice_typ li[data-seq='" + defaultRcmdPpnInfo.ctgr + "'] a").trigger("click");
	
	//동영상
	$('.vdo_list li a').hover(function(){			
		var $idx = $(this).parent('li').index();

		$('.vdo_list li').removeClass('on');
		$('.vido .vdo_thumb').removeClass('on');

		$(this).parent('li').addClass('on');
		$('.vido .vdo_thumb').eq($idx).addClass('on');
	});

	$(window).scroll(function(){	
		var $scrlT = $('.tariff_search').offset().top-300;
		
		if ($(window).scrollTop() >= $scrlT ){
			$('.video_box .vido').addClass('open')
		}
	});

	//동영상 팝업
	$('.btn_video').on('click', function() {	

		var $vidoUrl = $(this).data('video');
		
		$('.video_layer .vde').html($vidoUrl);
		$('#modal_box').removeClass('close').addClass('open');	
	});

	$('#modal_box .modal_close').on('click', function(){
		$(this).closest('#modal_box').removeClass('open').addClass('close');	
		$('.video_layer .vde .iframe').remove()
		$(this).siblings('.vde').children('iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');			
	});
});
