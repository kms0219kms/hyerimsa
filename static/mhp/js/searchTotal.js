$(document).ready(function(){
	$('#searchHeaderForm [name="searchWord"]').on("input", searchWordInputEvent);
	$("#searchHeaderBtn").on("click", searchHeaderBtnEvent);
	$('#searchHeaderForm [name="searchWord"]').keyup(function(e) { if (e.keyCode == 13) searchHeaderBtnEvent(); });
	$('#searchHeaderForm [name="searchWord"]').focus(function() {
			if($(this).val() == ""){
				$(this).attr("placeholder", "");
			}
		}).blur(function() {
			$(this).attr("placeholder", $(this).attr("data-holder"));
		});
	
	$('#searchMainForm [name="searchWord"]').keyup(function(e) { if (e.keyCode == 13) searchMainBtnEvent(); });	
	$("#searchMainBtn").on("click", searchMainBtnEvent);
	
	fnSearchManagerList("RW");
	fnSearchManagerList("PW");
	
	//매장안내
	$("#searchStore").keyup(function(e) { if (e.keyCode == 13) searchShopListAjax(); });
	$("#btnSearchStore").on("click", searchShopListAjax);
	$("#chgAddrBtn").on("click", chgAddrBtnEvent);
	
	fnSearchHistSet();
});

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

var fnSearchHistSet = function(){
	var urlHref = $(location).attr("href");
	var urlPath = $(location).attr("pathname");

	var siteTyp = $('#searchHeaderForm [name="siteTyp"]').val();
	var searchWord = $.trim($('#searchMainForm [name="searchWord"]').val());
	var menuTitle = $(document).attr("title");
	var outTyp = "";
	var histSeq = 0;

	//통합검색에서 이동된 경우
	if(urlHref.indexOf("histSeq") != -1 && urlPath.indexOf("loginForm.mhp") < 0){
		histSeq = $.urlParam("histSeq");
		outTyp = $.urlParam("outTyp");
		
		if(histSeq > 0){
			//검색이력 수정 (이동 경로 기록)
			$.ajax({
				url: '/search/updateSearchHist.mhpx',
				async: true,
				type: 'POST',
				dataType: 'json',
				data: {"outTyp":outTyp
					, "outUrl":urlHref
					, "menuTitle":menuTitle
					, "seq":histSeq},
				success: function (data) {
					/*alert(date);*/
				}	
			});
		}
	}
	
	//현재 URL이 통합검색인 경우
	if(urlPath.indexOf("searchTotalSearch.mhp") != -1){
		$("head").append('<meta name="description" content="LGU+의 믿을 수 있는 알뜰폰, 반값 요금, LTE, 아이폰 0원, 실속을 더하고 요금에 반하다" />');
		
		if(searchWord != ""){
			//검색이력 등록
			$.ajax({
				url: '/search/saveSearchHist.mhpx',
				async: true,
				type: 'POST',
				dataType: 'json',
				data: {"siteTyp":siteTyp, "searchWord":searchWord},
				success: function (data) {
					histSeq = data.seq;
					
					$("#container a").each(function() {			
						var href = this.href;
						if(href != "#" && href != "#none"){
							outTyp = $(this).attr("data-position");
							
							if (href.indexOf("?") != -1) {
								href = href + "&histSeq="+ histSeq +"&outTyp="+ outTyp;
							}else {
								href = href + "?histSeq="+ histSeq +"&outTyp="+ outTyp;
							}
							$(this).attr("href", href);
						}
					});
				}	
			});
		}
	}
}

var searchWordInputEvent = function(){
	if($.trim($('#searchHeaderForm [name="searchWord"]').val()) == ""){
		$(".related_word").html("");
	}else{
		var html = "";
		var searchWord = $.trim($('#searchHeaderForm [name="searchWord"]').val());
		$.ajax({
			url: '/search/searchAutoeWordList.mhpx',
			async: true,
			type: 'POST',
			dataType: 'json',
			data: {"searchWord":searchWord},
			success: function (data) {
				var list = data.resultList;
				html += "<ul>";
				$.each(list, function( index, value ) {
					html += "<li><a href='#' onclick='searchTotalEvent(this); return false;'>"+ value.word.replace(searchWord, "<strong class='epas'>"+searchWord+"</strong>") +"</a></li>";
				});
				html += "</ul>";
				$(".related_word").html(html);
				
				return false;
			}	
		});
	}
}

var searchHeaderBtnEvent = function(e){
	var strHolder = $('#searchHeaderForm [name="searchWord"]').attr("data-holder");
	var strHolderView = $('#searchHeaderForm [name="searchWord"]').attr("placeholder");
	
	if(strHolderView != ""){
		if(strHolder != strHolderView){
			$('#searchHeaderForm [name="searchWord"]').val(strHolderView);	
		}
	}
	if($.trim($('#searchHeaderForm [name="searchWord"]').val()) == ""){
		alert("검색어를 입력해주세요.");
		return false;
	}
	$('#searchHeaderForm').submit();
}

var searchMainBtnEvent = function(e){
	if($.trim($('#searchMainForm [name="searchWord"]').val()) == ""){
		alert("검색어를 입력해주세요.");
		return false;
	}
	$('#searchMainForm').submit();
}

var searchTotalEvent = function(obj){
	$('#searchHeaderForm [name="searchWord"]').val($(obj).text());
	$('#searchHeaderForm').submit();
}

var fnSearchManagerList = function(val){
	var siteTyp = $('#searchHeaderForm [name="siteTyp"]').val();
	var html = "";
	var cnt = 0;
	
	$.ajax({
		url: '/search/searchManagerList.mhpx',
//		async: true,
		type: 'POST',
		dataType: 'json',
		data: {"siteTyp":siteTyp, "tgtTyp":val},
		success: function (data) {
			var list = data.resultList;
//			html += "<ol class='orderly'>";			
//			$.each(list, function( index, value ) {
//				html += "<li><span class='num'>"+ value.sortNo +"</span>";
//				html += "<span class='txt_word'><a href='#' onclick='searchTotalEvent(this); return false;'>"+ value.word +"</a></span></li>";
//			});
			html = "";
			if(val == "RW"){
				$.each(list, function( index, value ) {
					html += '<dd><a href="#none" onclick="searchTotalEvent(this); return false;">' + value.word + '</a></dd>';
				});
				$("#searchWordRecommend .remnd_list").append(html);

//				if($('#searchHeaderForm [name="searchWord"]').val() == ""){
//					cnt = Math.round( Math.random()*(list.length-1) );
//					/*$('#searchHeaderForm [name="searchWord"]').val(list[cnt].word);	*/
//					$('#searchHeaderForm [name="searchWord"]').attr("placeholder", list[cnt].word);
//				}
			}else{
				$.each(list, function( index, value ) {
					$("#searchWordPop .ranking").append('<li><a href="#none"><strong class="nber">' + value.sortNo + '</strong><span onclick="searchTotalEvent(this); return false;">' + value.word + '</span></a></li>');
					$("#searchWordPop .ranking_view").append('<dd><a href="#none"><strong class="nber">' + value.sortNo + '</strong><span onclick="searchTotalEvent(this); return false;">' + value.word + '</span></a></dd>');
				});
			}
//			html += "</ol>";
			
			return false;
		}	
	});
}

var fnSearchDisp = function(obj, cssNm){
	if($("."+cssNm).css("display") == "none"){
		$("."+cssNm).show();
		$(obj).text($(obj).text().replace("+", "-"));
	} else {
		$("."+cssNm).hide();
		$(obj).text($(obj).text().replace("-", "+"));
	}
}

var searchShopListAjax = function(){	
	var searchStore = $('#searchMainForm [name="searchStore"]').val();

	if($.trim(searchStore) == ""){
		alert("매장명 또는 주소를 입력해주세요.");
		return false;
	}

	$(".service_info").hide();
	$(".store_list").show();
	
	var url = "/search/searchShopList.mhpx";
	$.ajax({
		url: url,
		data: {"searchWord":$("#searchStore").val()},
		type : "POST",
		success: function(data){
			$(".store_view").html("");
			
			if(data.resultList.length > 0){
				$("#chgAddrBtn").show();
				for(var i=0; i<data.resultList.length; i++){
					$(".store_view").append(
							"<li>" +
							"	<dl class='adrs_detail'>" +
							"		<dt>" + data.resultList[i].storeName + "</dt>"	+
							"		<dd>" +
							"			<div class='addr1'>" + data.resultList[i].address  + "</div>" +
							"			<div class='addr2' style='display:none;'>" + data.resultList[i].address2  + "</div>" +
							"			" + "LGUPLUS(" + data.resultList[i].storeName + ")" + " (" + data.resultList[i].dongNm + ")<br />" +
							"			<span class='tel_number'>" + data.resultList[i].telNo + "</span>" +
							"		</dd>" +
							"	</dl>" +
							"</li>"); 
	            }
			}else{
				$("#chgAddrBtn").hide();
				$(".store_view").append(
					"<li>" +
					"	<p class='no_data'>검색 결과가 없습니다.</p>" +
					"</li>");
			}

			$("#storeCnt").html(
				'<p class="txt_nbr">총 <strong>' + data.resultList.length + '</strong>건 검색되었습니다.</p>'
			);
		 }
    });
}

var chgAddrBtnEvent = function(){
	if($(this).text() =="지번 주소보기"){
		$(this).text('도로명 주소보기');
		$(".addr2").css("display","block");
		$(".addr1").css("display","none");
	}else{
		$(this).text('지번 주소보기');
		$(".addr2").css("display","none");
		$(".addr1").css("display","block");
	}
}