//서비스 가입 여부 확인 팝업
function fn_entrChk_popup(returnUrl){
	
	$.ajax({
		url: '/mypg/retrieveEntrChk.mhpx',
		async: true,
		type: 'POST',
		data: {returnUrl : returnUrl},
		dataType: 'html',
		success: function (data) {
		
			$('#layerPopup_check').html(data);
			layer_open('layerPopup_check');
			
			return false;
		}, error: function (err) {
			alert("작업 중 오류가 발생하였습니다.");
			return false;
		}		
	});
}

//가입 상담 팝업
function openEntrCnslPop(cnslKdCd) {
	var style = "";
	
	if(cnslKdCd == 'UC') {
		style = "width=630, height=600, scrollbars=yes, resizable=no";
	} else if (cnslKdCd == 'NC') {
		style = "width=630, height=750, scrollbars=yes, resizable=no";
	} else {
		style = "width=630, height=480, scrollbars=yes, resizable=no";
	}
	window.open("/entr/cnsl.mhp?cnslKdCd=" + cnslKdCd, "openEntrCnslPop", style);
}

//온라인 가입 신청 팝업
function openOnSalePop(url1, url2, url3, flag) {
	if(url1 == '' && url2 == '' && url3 == '') {
		alert("판매 준비 중입니다.");
	} else {
		window.open("", "openOnSalePop", "width=1200, height=800, scrollbars=yes, resizable=no");
		$('#onSaleForm').attr('action', '/cmmn/onsale.mhp');
		$('#onSaleForm').attr('target', 'openOnSalePop');
		$('#onSaleUrl1').val(url1);
		$('#onSaleUrl2').val(url2);
		$('#onSaleUrl3').val(url3);
		$('#onSaleForm').submit();
		
		if(flag == 'GNB') {
			$('.layer_onSale').hide();
			e.preventDefault();
		}
	}
}

//휴대폰상세페이지온라인가입신청팝업 - 이민철
function newOpenOnSalePop(url,msgText) {
	if(url == '' || url == null){
		if(msgText == '' || msgText == null){
			alert("판매 준비중입니다.");
			return false;
		}else{
			alert(msgText);
			return false;
		}
	}else{
		window.open("", "openOnSalePop", "width=1200, height=800, scrollbars=yes, resizable=no");
		$('#onSaleForm').attr('action', '/cmmn/onsale.mhp');
		$('#onSaleForm').attr('target', 'openOnSalePop');
		$('#onSaleUrl1').val(url);
		$('#onSaleForm').submit();
	}
}

//온라인가입신청 레이어팝업
function layer_open_onSale(el){
	var temp = $('#' + el);
	var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수
	if(bg){
		$('.layer_onSale').show(); //'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
		
	}else{
		temp.fadeIn();
	}
	// 화면의 중앙에 레이어를 띄운다.
	if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
	else temp.css('left', '0px');

	temp.find('.btn_close').click(function(e){
		if(bg){
			$('.layer_onSale').hide(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
		}else{
			temp.hide();
		}
		e.preventDefault();
	});
	$('.layer_onSale .bg').click(function(e){	//배경을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
		$('.layer_onSale').hide();
		e.preventDefault();
	});
}

//USIM 지정 단말기 보기
function openUsimDevPop() {
	window.open("/dev/usimList.mhp", "openUsimDevPop", "width=400, height=600, scrollbars=yes, resizable=no");
}

//유효성검사 정규식
var getCheckPattern = function(patternNm) {
	var pattern = '';
	
	switch (patternNm) {
		case 'num': //숫자
			pattern = /^[0-9]*$/;
			break;
		case 'password': //비밀번호
			pattern = /^[0-9]*$/;
			break;
		case 'subject': // 영소, 영대, 한글, 숫자, 특수(일부), 공백
			pattern = /^[a-zA-Z0-9가-힣\.\-_\/\@\$\[\]\ ]*$/;
			break;
		case 'fileName': // 영소, 영대, 한글, 숫자, 특수(일부), 공백
			pattern = /^[a-zA-Z0-9가-힣\.:\\\-_\/\[\]]*$/;
			break;
		case 'emailid': // email 사용자 아이디(영소, 숫자, 특수(일부))
			pattern = /^[a-z\d\.\@\-_]*$/;
			break;
		case 'descKor': // 영소, 영대, 한글, 숫자, 특수(일부), 공백
			pattern = /^[a-zA-Z0-9가-힣\.\-_\/\@\$\ ]*$/;
			break;
		case 'telno': // 숫자, 특수(-)
			pattern = /^[0-9\-]*$/;
			break;
		default:
			break;
	}
	return pattern;
};

//유효성검사
var checkPattern = function(patternNm, value) {
	var result = true;
	var pattern = getCheckPattern(patternNm);
	if(!value.match(pattern)) {
		result = false;
	}
	return result;
};

var checkRequired = {
	message : {
		"num" : "입력값이 올바르지 않습니다."
		, "password" : "비밀번호는 숫자4자리로 입력해주세요."
		, "subject" : "입력값이 올바르지 않습니다."
		, "fileName" : "입력값이 올바르지 않습니다."
		, "emailid" : "입력값이 올바르지 않습니다."
		, "descKor" : "입력값이 올바르지 않습니다."
		, "telno" : "입력값이 올바르지 않습니다."
	}
	, requieCheck : true
	, check : function( obj, message , patternNm ){
		var $obj	= $(obj);
		var ret		= false;
		var tag		= $.trim($obj.prop('tagName').toLowerCase()); 
		
		if( checkRequired.requieCheck ){
			switch( tag ){
				case "input":
					var type = $obj.attr("type").toLowerCase();
					
					if( type == "text" || type == "password" || type == "file" ){
						if( $.trim($obj.val()) == "" ){
							alert(message);
							$obj.val("");
							$obj.focus();
							ret = true;
						}
					}else if( type == "radio" || type == "checkbox" ){
						if( $(tag + ":" + type + "[name='" + $obj.attr('name') + "']:checked").length <= 0){
							alert(message);
							$obj.focus();
							ret = true;
						}
					}else{
						ret = false;
					}
					break;
				case "select":
					if( $("option:selected", tag + "[id='" + $obj.attr('id') + "']").val() == "" ){
						alert(message);
						$obj.focus();
						ret = true;
					}
					break;
				case "textarea":
					if( $.trim($obj.val()) == "" ){
						alert(message);
						$obj.val("");
						$obj.focus();
						ret = true;
					}
					break;
				case "":
					break;
			}
		}
		
		if( patternNm != null && ret == false ){
			ret = !checkPattern(patternNm, $obj.val());
			
			if( ret ){
				alert(checkRequired.message[patternNm]);
				$obj.val("");
				$obj.focus();
			}
		}
		
		return ret;
	}
};

//팝업창 열기 [url:팝업주소, nm:팝업제목, w:가로길이, h:세로길이, scroll:스크롤유무(yes, no)]
var popupEvent = function(url, nm, w, h, scroll) {
	var popupwidth  = w;
	var popupheight = h;
	var titleName 	= nm; 
	
	var Top = (window.screen.height - popupheight) / 3;
	var Left = (window.screen.width - popupwidth) / 2;
	if (Top < 0) Top = 0;
	if (Left < 0) Left = 0;
	var Future = "fullscreen=no,toolbar=no,location=no,directories=no,status=no,menubar=no,	scrollbars="+ scroll +",resizable=no,left=" + Left + ",top=" + Top + ",width=" + popupwidth + ",height=" + popupheight;

	var popupUrl = url;

	PopUpWindow = window.open(popupUrl, titleName, Future);
	PopUpWindow.focus();
};

//페이지이동
function goPage(page) {
//	location.href = contextPath + "/web" + page;
	location.href = page;
};

//숫자만 입력가능
function onlyNumber(event) {
    var key = window.event ? event.keyCode : event.which;    
    if ((event.shiftKey == false) && ((key  > 47 && key  < 58) || (key  > 95 && key  < 106)
    || key  == 35 || key  == 36 || key  == 37 || key  == 39  // 방향키 좌우,home,end  
    || key  == 8  || key == 9 || key  == 46 ) // del, tab, back space
    ) {
        return true;
    }else {
        return false;
    }    
};

//숫자,-만 입력가능
function onlyNumberHyphen(event) {
    var key = window.event ? event.keyCode : event.which;    

    if ((event.shiftKey == false) && ((key  > 47 && key  < 58) || (key  > 95 && key  < 106)
    || key  == 35 || key  == 36 || key  == 37 || key  == 39  // 방향키 좌우,home,end  
    || key  == 8  || key  == 46 || key  == 109 || key  == 189 ) // del, back space, -
    ) {
        return true;
    }else {
        return false;
    }    
};

// 세자리 마다 콤마(,) 찍기  ex) 1000000 => 1,000,000  
function commaNum(num) {  

    var len, point, str;

    num = num + "";  
    point = num.length % 3;
    len = num.length;  

    str = num.substring(0, point);  
    while (point < len) {  
        if (str != "") str += ",";  
        str += num.substring(point, point + 3);  
        point += 3;  
    }  
    return str;
	
} 

//이메일 목록 삽입
function emailList(obj) {
	var html = "<option value=''>직접입력</option>" 
		+ "<option value='naver.com'>naver.com</option>"
		+ "<option value='daum.net'>daum.net</option>"
		+ "<option value='hanmail.net'>hanmail.net</option>"
		+ "<option value='nate.com'>nate.com</option>"
		+ "<option value='gmail.com'>gmail.com</option>"
		+ "<option value='dreamwiz.com'>dreamwiz.com</option>"
		+ "<option value='lycos.co.kr'>lycos.co.kr</option>"
		+ "<option value='chol.com'>chol.com</option>";
	$('#'+obj).html(html);
}

// timestamp -> String (DB -> Date형(VO) -> String(javascript)
function time_stamp2string(timestamp) {
	   var stringDate		=new Date(timestamp);
	   return stringDate.getFullYear() + "." + (stringDate.getMonth() + 1) + "." + stringDate.getDate() + " " + stringDate.getHours() + ":" + stringDate.getMinutes() + ":" + stringDate.getSeconds();
}

// 날짜 더하기, 빼기
function dateAdd(v, t) {
	var todayDate	= new Date();

	var yy = todayDate.getFullYear();
	var mm = todayDate.getMonth()+1;
	var dd = todayDate.getDate();

	if(t == "d"){
		d = new Date(yy, mm - 1, dd + v);
	}else if(t == "m"){
		d = new Date(yy, mm - 1 + v, dd);
	}else if(t == "y"){
		d = new Date(yy + v, mm - 1, dd);
	}else{
		d = new Date(yy, mm - 1, dd + v);
	}

	yy = d.getFullYear();
	mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
	dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;

	return '' + yy + '-' +  mm  + '-' + dd;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//한글 및 영문만 입력 가능
function onlyHanguel(event) {
	var key = window.event ? event.keyCode : event.which; 
	if((key  > 47 && key  < 58) || (key  > 95 && key  < 106) ||
		key == 189 || key == 187 || key == 110 || key == 188 || key ==190 ||
		key == 191 || key == 186 || (key  > 218 && key  < 223)){
		return false;
	}else{
		 return true;
	}
};


/**
 * 주소검색 팝업
 */
function roadAddrSearchPop(){
	var xsize = "817";
	var ysize = "700";
	var xpos = xsize / 2;
	var ypos = ysize / 2;
	//document.domain = "umobi.co.kr";
	
	window.open('','_roadAddrSearchPop', 'width=817,height=700, menubar=0, status=1, scrollbars=yes,left=' + xpos + ',top=' + ypos +',resizable=no');
	var form1 = document.formBill;
	form1.action = "/cc/popAddr.mhp?code=post";
	form1.method = "POST";
	form1.target = "_roadAddrSearchPop";
	form1.submit();
	
};

//동일신청 IP 신청 회선수 체크
function fn_checkSameIPAplyCount(){
	var isSkip = false;
	$.ajax({
		url: '/shop/dev/checkSameIPAply.mhpx',
		async: false,
		type: 'POST',
		data: {},
		dataType: 'json',
		success: function (data) {
			if(data.lmitYN == "Y"){
				window.open("/shop/dev/alertSameIPAply.mhp", 'chkAply');
				$('.layer_pop').attr('data-exec','N');
				isSkip = false;
			}else{
				$('.layer_pop').attr('data-exec','');
				isSkip = true;
			}
			setTimeout(function(){$('.layer_pop').attr('data-exec','');}, 100);
			
		}, error: function (err) {
			alert("작업 중 오류가 발생하였습니다.");
			return false;
		}
	});
	return isSkip;
}
