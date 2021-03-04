$(document).ready(function() {
	
	/*********개인정보관리**********/
	$('#pswdChkBtn').on('click', pswdChkBtnEvent);
	$('#updtBtn').on('click', updtBtnEvent);
	$('#mmbrScssBtn').on('click', mmbrScssBtnEvent);
	$('#scssBtn').on('click', scssBtnEvent);
	$('#cancelBtn').on('click', cancelBtnEvent);
	
	
	/*********통화자료제공열람신청**********/
	$('#reportOfferPswdChk').on('click', reportOfferPswdChkEvent);
	
	/*********회원가입**********/
	//이메일 목록 삽입
	//emailList('emailList');
	
	//아이디 입력시
	$("#mmbrId").on('keypress', mmbrIdPressCheck);
	$("#mmbrId").on('keyup', mmbrIdKeyupCheck);
	$("#mmbrId").on('change', mmbrIdKeyupCheck);
	$("#mmbrId").on('blur', mmbrIdKeyupCheck);
	
	//비밀번호 입력시
	$("#pswd").on('keypress', noSpase);
	$("#pswd").on('keyup', pswdCheck);
	$("#pswd").on('change', pswdCheck);
	
	//아이디 입력시
	$("#mmbrId_1").on('keypress', mmbrIdPressCheck);
	$("#mmbrId_1").on('keyup', mmbrIdKeyupCheck_1);
	$("#mmbrId_1").on('change', mmbrIdKeyupCheck_1);
	
	//비밀번호 입력시
	$("#pswd_1").on('keypress', noSpase);
	$("#pswd_1").on('keyup', pswdCheck_1);
	$("#pswd_1").on('change', pswdCheck_1);
	
	//비밀번호 확인 입력시
	$("#pswdChk").on('keypress', noSpase);
	$("#pswdChk").on('keyup', pswdChkCheck);
	$("#pswdChk").on('change', pswdChkCheck);
	
	$("#telNo").on('keypress', telNoCheck);
	$("#telNo").on('keyup', telNoCheck);
	
	$("#telNo2").on('keyup', telNo2Check);
	//이메일 입력시
	$("#emailId").on('keypress', emailIdCheck);
	$("#emailId").on('keyup', emailIdCheck);
	$("#emailSite").on('keypress', emailSiteCheck);
	$("#emailSite").on('keyup', emailSiteCheck);
	$("#emailList").on('change', emailChange);
	
	$("#legAgntTelNo").on('keypress', legAgntTelNoCheck);
	$("#legAgntTelNo").on('keyup', legAgntTelNoCheck);
	
	//확인 버튼 클릭시
	$("#saveBtn").on('click', saveBtnEvent);
	
	//취소 버튼 클릭시
	$("#cancelBtnE").on('click', cancelBtnEventE);
	
	// 회원가입 폼 버튼 활성화 이벤트 처리
	$('.btn_act_tbl input').on('change, keyup', eventBtnEvent);
	$('.btn_act_tbl select').on('change', eventBtnEvent);
	
	/*********로그인**********/
	//로그인 버튼 클릭
	$("#loginBtn").on('click',  loginBtnEvent);
	
	// 기기변경 로그인 버튼 클릭
	$("#devLoginBtn").on('click',  chgDevLoginBtn);
	$("#noLoginBtn").on('click',  closeLoginLayer);
	
	/*********Main 로그인**********/
	//Main 로그인 버튼 클릭
	$("#mainLoginBtn").on('click', mainLoginBtn);
	
	/*********외부인증**********/
	//휴대폰 인증 버튼 클릭
	$("#checkPlusBtn").on('click', checkPlusBtnEvent);
	//아이핀 인증 버튼 클릭
	$("#ipinBtn").on('click', ipinBtnEvent);
	
	/*********SMS로 App다운로드 URL 받기**********/
	$('#smsSendUrl').on('click', fnSendUrlEvent);
	
	// 주문 상세페이지에서 입고알림 팝업 휴대폰 번호 입력시
	$('#wearingTel2').on('keyup', validWearingAlert);
	
	// 입고알림 팝업 인증번호 전송
	$('#wearingCertNum').on('click', sendCertSmsWearing);
	
	// 입고알림 팝업 인증번호 확인
	$('#wearingCertCheck').on('click', checkCertSmsWearing);
	
	// 입고알림 신청하기
	$('#applyWearingAlrt').on('click', applyWearingAlrtData);
});

//로그인 ID 쿠키 저장함수
function setLoginIdCookie(name, value, expiredays){
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    var domain_l = window.location.hostname;
	document.cookie = name + "=" + escape(value) + "; domain=" + (domain_l.indexOf('uplussave.com') != -1 ? '.uplussave.com' : domain_l) + "; path=/; expires="
            + todayDate.toGMTString();
};

function getLoginIdCookie (name){
	var arg = name + "=";
   	var alen = arg.length;
   	var clen = document.cookie.length;
   	var i = 0;
   	while (i < clen){
   		var j = i + alen;
   		if (document.cookie.substring(i, j) == arg){
   			return getCookieLoginIdVal (j);	
   		}
   		i = document.cookie.indexOf(" ", i) + 1;
   		if (i == 0){
   			break;	
   		} 
   	}
   	return null;
}

function getCookieLoginIdVal(offset){
	var endstr = document.cookie.indexOf(";",offset);
	if(endstr == -1){
		endstr = document.cookie.length;
	}
	return unescape(document.cookie.substring(offset,endstr));
}

//페이지 로드 시 쿠키 저장 ID 있으면 표시
window.onload = function() {
	if($("#loginForm").length == 1) {
		// 로그인 안 한 상태
		var userId = getLoginIdCookie("userId");
		if(userId != null && userId != "" && getLoginIdCookie("success") == "success"){
			document.loginForm.mmbrId.value = userId;
			document.loginForm.chk_save.checked = true;
			$('label[for=mmbrId]').addClass('on');
		}else if(userId == null) {
			document.loginForm.mmbrId.value = "";
			document.loginForm.chk_save.checked = false;
		};
	}
};

//회원가입
var idCheckVal = false;
var idDupChkVal = false;
var tempId = '';
var pswdCheckVal1 = false;
var pswdCheckVal2 = false;

//[id] 입력시
var mmbrIdPressCheck = function(e){
	var key = window.e ? e.keyCode : e.which; 
	if(key == 0 || key == 8){
		return true;
	}
	
	if(key == 32){
		return false;
	}
	
	if(key != 13 && key != 9 && key != 16 && key != null){
		idDupChkVal = false;
		return mmbrCheckPattern('id', key);
	}
};

var telNo2Check = function(e){
	if($("#telNo2").val() != ""){
		var inputVal = $("#telNo2").val();
		$("#telNo2").val(inputVal.replace(/[^0-9\-]/gi,''));
	}
};

var mmbrIdKeyupCheck = function(e){
	var mmbrId = $('#mmbrId').val(); 
	var key = window.e ? e.keyCode : e.which;
	var idReg = /^[a-z0-9]*$/;
	
	// 170621 수정 : ie8에서 blur 이벤트 발생 시 value 값이 빈값으로 치환되는 문제로 인하여 예외 처리
	if (mmbrId != "" && mmbrId != $('#mmbrId').attr("placeholder") ) {
		$('#mmbrId').val(mmbrId.replace(/[^a-z0-9]/gi,''));
	}
		
	if(key != 9 && key != 16 && key != null){
		if(mmbrId.length < 5){
			$('#mmbrIdMsg').css('margin-top','16px');
			$('#mmbrIdMsg').text('아이디는 최소 5자 이상입니다.');
			idCheckVal = false;
		}else{
			var wordList = /(admin|Admin|administrator|Administrator|umobi|Umobi|uMobi|webadmin|master|webmaster|manager|root|test|masterweb)/gi;
			if (wordList.test(mmbrId)) {
				$('#mmbrIdMsg').css('margin-top','16px');
				$('#mmbrIdMsg').text('아이디에 사용할 수 없는 단어가 포함되어 있습니다. 관리자 혹은 사회통념상 허가되기 어려운 단어는 피해주시기 바랍니다');
				idCheckVal = false;
			}else{
				if(!idReg.test(mmbrId)){
					$('#mmbrIdMsg').css('margin-top','16px');
					$('#mmbrIdMsg').text('영문 소문자 또는 숫자만 입력이 가능합니다.');
					idCheckVal = false;
				} else {
					$('#mmbrIdMsg').text('');
					$('#mmbrIdMsg').css('margin','0');
					idDupChkBtnEvent();
				}
				
			}
		}
	}
	
	return false;
};

var mmbrIdKeyupCheck_1 = function(e){
	var mmbrId = $('#mmbrId_1').val(); 
	var key = window.e ? e.keyCode : e.which;
	var idReg = /^[a-z0-9]*$/;
	
	// 170621 수정 : ie8에서 blur 이벤트 발생 시 value 값이 빈값으로 치환되는 문제로 인하여 예외 처리
	if (mmbrId != "" && mmbrId != $('#mmbrId_1').attr("placeholder") ) {
		$('#mmbrId_1').val(mmbrId.replace(/[^a-z0-9]/gi,''));
	}
		
	if(key != 9 && key != 16 && key != null){
		if(mmbrId.length < 5){
			$('#mmbrIdMsg').css('margin-top','16px');
			$('#mmbrIdMsg').text('아이디는 최소 5자 이상입니다.');
			idCheckVal = false;
		}else{
			var wordList = /(admin|Admin|administrator|Administrator|umobi|Umobi|uMobi)/gi;
			if (wordList.test(mmbrId)) {
				$('#mmbrIdMsg').css('margin-top','16px');
				$('#mmbrIdMsg').text('아이디에 사용할 수 없는 단어가 포함되어 있습니다. 관리자 혹은 사회통념상 허가되기 어려운 단어는 피해주시기 바랍니다');
				idCheckVal = false;
			}else{
				if(!idReg.test(mmbrId)){
					$('#mmbrIdMsg').css('margin-top','16px');
					$('#mmbrIdMsg').text('영문 소문자 또는 숫자만 입력이 가능합니다.');
					idCheckVal = false;
				} else {
					$('#mmbrIdMsg').text('');
					$('#mmbrIdMsg').css('margin','0');
					idDupChkBtnEvent_1();
				}
				
			}
		}
	}
	
	return false;
};

//아이디 중복 검사
var idDupChkBtnEvent = function(e){
	var mmbrId = $('#mmbrId').val(); 
	if(mmbrId.length < 5){
		alert('아이디는 최소 5자 이상입니다.');
		return false;
	}else{
		$.ajax({
			url: '/mmbr/idDupChk.mhpx',
			async: true,
			type: 'POST',
			dataType: 'json',
			data: {mmbrId : $('#mmbrId').val()},
			success: function (data) {
				if(data.result == '0000'){
					$('#mmbrIdMsg').css('margin-top','16px');
					$('#mmbrIdMsg').text('사용 가능한 아이디 입니다.');
					tempId = $('#mmbrId').val();
					idDupChkVal = true;
					idCheckVal = true;
				}else if(data.result == '0001'){
					$('#mmbrIdMsg').css('margin-top','16px');
					$('#mmbrIdMsg').text('이미 사용하고 있는 아이디 입니다. 다른 아이디를 입력해 주세요.');
					idDupChkVal = false;
				}else {
					alert('작업 중 오류가 발생하였습니다.');
				}
				return false;
			}, error: function (err) {
				alert('작업 중 오류가 발생하였습니다.');
				return false;
			}		
		});
	}
	
	return false;
};

//아이디 중복 검사
var idDupChkBtnEvent_1 = function(e){
	var mmbrId = $('#mmbrId_1').val(); 
	if(mmbrId.length < 5){
		alert('아이디는 최소 5자 이상입니다.');
		return false;
	}else{
		$.ajax({
			url: '/mmbr/idDupChk.mhpx',
			async: true,
			type: 'POST',
			dataType: 'json',
			data: {mmbrId : $('#mmbrId_1').val()},
			success: function (data) {
				if(data.result == '0000'){
					$('#mmbrIdMsg').css('margin-top','16px');
					$('#mmbrIdMsg').text('사용 가능한 아이디 입니다.');
					tempId = $('#mmbrId').val();
					idDupChkVal = true;
					idCheckVal = true;
				}else if(data.result == '0001'){
					$('#mmbrIdMsg').css('margin-top','16px');
					$('#mmbrIdMsg').text('이미 사용하고 있는 아이디 입니다. 다른 아이디를 입력해 주세요.');
					idDupChkVal = false;
				}else {
					alert('작업 중 오류가 발생하였습니다.');
				}
				return false;
			}, error: function (err) {
				alert('작업 중 오류가 발생하였습니다.');
				return false;
			}		
		});
	}
	
	return false;
};
//////////////////////////////////////////////////////////////////////////
//개인정보 관리
//비밀번호 확인
var pswdChkBtnEvent = function(e){
	$("#chkPswd").hide();
	if($('#pswd').val() == '' || $('#pswd').val() ==  $('#pswd').attr('placeholder')){
		alert('비밀번호를 입력해 주세요.');
		return false;
	}
	//비밀번호 오입력 시 안내 추가. 190121 alswn0325
	$.ajax({
		url: '/mypg/chkMmbrInfo.mhpx',
		dataType : "json",
		async: false,
		type: 'POST',
		data: {mmbrId : $('#mmbrId').val(), pswd : $('#pswd').val()},
		success: function (data) {
			if(data.result == "0000"){
				var url = "/mypg/privMgmtUpdt.mhp";
				$('#loginForm').attr('action', url);
				$('#loginForm').submit();
			} else {
				$("#chkPswd").show();
			}
			return false;
		}, error: function (err) {
			alert('작업 중 오류가 발생하였습니다.');
			return false;
		}		
	});
};

//[확인] 버튼 클릭시
var updtBtnEvent = function(e){
	//header('Content-Type: text/plain; charset=utf-8');
	if ($('#pswd').val() ==  $('#pswd').attr('placeholder')) {
		$('#pswd').val("");
	}
	if($('#pswdChk').val() ==  $('#pswdChk').attr('placeholder')){
		$('#pswdChk').val("");
	}
	if ($('#pswd').val() != '' && $('#pswdChk').val() == ''){
		alert('비밀번호 확인을 입력해 주세요.');
		$('#pswdChk').focus();
		return false;
	}
	
	/*if ($('#ctn').val() == ''){
		alert('휴대폰번호를 입력해 주세요.');
		$('#ctn').focus();
		return false;
	}*/

	if ($('#telNo').val() == '' || $('#telNo').val() == $('#telNo').attr('placeholder')){
		alert('연락처를 입력해 주세요.');
		$('#telNo').focus();
		return false;
	}
	
	var telNo = $('#telNo').val();
	
	if (telNo.length < 9){
		alert('연락처는 지역번호를 포함하여 입력해 주세요.');
		$('#telNo').focus();
		return false;
	}
	
	if ($('#emailId').val() == '' || $('#emailId').val() == $('#emailId').attr('placeholder')){
		alert('이메일을 입력해 주세요.');
		$('#emailId').focus();
		return false;
	}
	
	if ($('#emailId').val() != '' && $('#emailSite').val() == '' || $('#emailSite').val() == $('#emailSite').attr('placeholder')){
		alert('이메일을 확인해 주세요.');
		$('#emailSite').focus();
		return false;
	}
	
	if ($('#legAgntNm').val() != ''){
		if($('#legAgntTelNo').val() == ''){
			alert('법정대리인 연락처를 입력해 주세요.');
			$('#legAgntTelNo').focus();
			return false;
		}
		
		var legAgntTelNo = $('#legAgntTelNo').val();
		
		if ($('#legAgtnTelNo').val() != '' && legAgntTelNo.length < 9){
			alert('법정대리인 연락처는 지역번호를 포함하여 입력해 주세요.');
			$('#legAgntTelNo').focus();
			return false;
		}
	}
	
	if ($('#pswd').val() != ''){
		pswdCheck();
		pswdChkCheck();
		if (pswdCheckVal1 == false){
			alert('비밀번호를 확인해 주세요.');
			$('#pswd').focus();
			return false;
		} else if (pswdCheckVal2 == false){
			alert('비밀번호 확인이 일치하지 않습니다.');
			$('#pswdChk').focus();
			return false;
		}
	}
	
	var email = "" + $('#emailId').val() + "@" + $('#emailSite').val();  
	var pattrn = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
	$('#email').val(email);
	
	if (!pattrn.test(email)){
		alert('이메일 형식이 맞지 않습니다.');
		$('#emailId').focus();
		return false;
	}
	
	if ($('#smsYn').is(':checked') == true){
		$('#smsAgreeYn').val('Y');
	} else {
		$('#smsAgreeYn').val('N');
	}
	
	if ($('#emailYn').is(':checked') == true){
		$('#emailAgreeYn').val('Y');
	} else {
		$('#emailAgreeYn').val('N');
	}
	var telTmp=$('#telNo').val();
	var telArr = telTmp.split('-');
	var totTel="";
	for(var i in telArr){
		totTel += telArr[i];
	}
	$('#telNo').val(totTel);
	
	var tel2Tmp=$('#telNo2').val();
	var tel2Arr = tel2Tmp.split('-');
	var totTel2="";
	for(var i in tel2Arr){
		totTel2 += tel2Arr[i];
	}
	$('#telNo2').val(totTel2);
	
	$.ajax({
		url: '/mypg/updtMmbrInfo.mhpx',
		dataType : "json",
		async: false,
		type: 'POST',
		data: $('#mmbrVO').serialize(),
		success: function (data) {
			if(data.result == "0000"){
				alert('정상적으로 변경되었습니다.');				
				goPage("/mypg/privMgmtLogin.mhp");
			} else if (data.result == "0002"){
				alert('비밀번호 변경으로 로그아웃 됩니다. 변경된 비밀번호로 다시 로그인 해주세요.');
				goPage("/mmbr/logout.mhp");
			} else if (data.result == "0003"){
				alert('기존에 사용하던 비밀번호는 새로운 비밀번호로 사용할 수 없습니다.');
			} else if (data.result == "9999"){
				//DB에러
				alert('작업 중 오류가 발생하였습니다.');
			} else if (data.result == "9998"){
				switch(data.checkResult){
				case 'P':
					alert('비밀번호 형식이 맞지 않습니다.');
					break;
				case 'PP':
					alert('비밀번호로 쓰기에 안전하지 않습니다.');
					break;
				case 'PI':
					alert('아이디를 포함하는 비밀번호는 사용할 수 없습니다.');
					break;
				case 'T':
					alert('연락처 형식이 맞지 않습니다.');
					break;
				case 'E':
					alert('이메일 형식이 맞지 않습니다.');
					break;
				case 'AT':
					alert('법정대리인 연락처 형식이 맞지 않습니다.');
					break;
				}
			}
			return false;
		}, error: function (err) {
			alert('작업 중 오류가 발생하였습니다.');
			return false;
		}		
	});
	
	return false;
};

//[탈퇴] 버튼 클릭시
var mmbrScssBtnEvent = function(e){
	
	var url = "/mypg/mypgScss.mhp";
	
	$('#mmbrVO').attr('action', url);
	$('#mmbrVO').submit();
	
};

//탈퇴 페이지 [확인] 버튼 클릭 시
var scssBtnEvent = function(e){
	$.ajax({
		url: '/mypg/mypgScss.mhpx',
		async: false,
		dataType: "json",
		type: 'POST',
		success: function (data) {
			if(data.result == '0000'){
				var url = "/cmmn/index.mhp";
				
				$('#formVO').attr('action', url);
				$('#formVO').submit();
			}else {
				alert('작업 중 오류가 발생하였습니다.');
			}
		}
	});		
	return false;
};

var cancelBtnEvent = function(e){
	
	//회원탈퇴 취소 버튼 클릭시 이동 페이지 수정 2019/03/04 ok84j 
	alert('회원탈퇴를 취소하셨습니다.');
	/*var url = "/mypg/privMgmtUpdt.mhp";*/ 
	var url = "/mypg/privMgmtLogin.mhp";
	
	$('#formVO').attr('action', url);
	$('#formVO').submit();
};
//////////////////////////////////////////////////////////////////////////

//[이메일 목록] 선택시
var emailChange = function(e){
	var value = $("#emailList").val();
	if(value != ''){
		$("#emailSite").val(value);
		$("#emailSite").attr("readonly", "readonly");
	}else{
		$("#emailSite").val("");
		$("#emailSite").removeAttr("readonly");
	}
};

//[법정대리인연락처] 입력시
var legAgntTelNoCheck = function(e){
	var key = window.e ? e.keyCode : e.which;
	if(key == 0 || key == 8){
		return true;
	}
	if(mmbrCheckPattern('num', key)){
		$('#legAgntTelNo').val(telNoAutoFmt($('#legAgntTelNo').val()));
	}
	return mmbrCheckPattern('num', key);
};

//[가입] 버튼 클릭시
var saveBtnEvent = function (e) {
	var num = /^[0-9]*$/;
	var regExp = /^01([0|1|6|7|8|9]?)([0-9]{3,4})([0-9]{4})$/;
	if($('#ipinTel').length > 0){
		if($('#ipinTel option:selected').val() == ''){
			alert('가입 휴대폰번호를 선택해 주세요!');
			return false;
		}
	}
	
	if ($("input[name='mmbrId']").val() == $("input[name='mmbrId']").attr("placeholder")) {
		$("input[name='mmbrId']").val("");
    }
	
	if($('#mmbrId').val() == ''){
		alert('아이디를 입력해 주세요.');
		$('#mmbrId').focus();
		return false;
	}
	
	if ($("input[name='pswd']").val() == $("input[name='pswd']").attr("placeholder")) {
		$("input[name='pswd']").val("");
    }
	
	if($('#pswd').val() == ''){
		alert('비밀번호를 입력해 주세요.');
		$('#pswd').focus();
		return false;
	}
	
	if ($("input[name='pswdChk']").val() == $("input[name='pswdChk']").attr("placeholder")) {
		$("input[name='pswdChk']").val("");
    }
	
	if($('#pswdChk').val() == ''){
		alert('비밀번호 확인을 입력해 주세요.');
		$('#pswdChk').focus();
		return false;
	}
	
	if ($("input[name='telNo2']").val() == $("input[name='telNo2']").attr("placeholder")) {
		$("input[name='telNo2']").val("");
    }
	
	if($('#telNo2').val() != ''){
		var strTel2 = $('#telNo2').val();
		if(!num.test(strTel2)){
			alert('연락처는 숫자만 입력이 가능합니다.');
			$('#telNo2').val('').focus();
			return false;
		}
	}
	
	if ($("input[name='telNo']").val() == $("input[name='telNo']").attr("placeholder")) {
		$("input[name='telNo']").val("");
    }
	
	if($('#telNo').val() == ''){
		$('#telNoChkMsg').text('필수정보입니다.');
		alert('휴대폰 번호를 입력해 주세요.');
		$('#telNo').focus();
		return false;
	} else {
		var telNo = $('#telNo').val();
		if(!num.test(telNo)){
			alert('휴대폰 번호는 숫자만 입력이 가능합니다.');
			$('#telNo').focus();
			return false;
		} else {
			if(!regExp.test(telNo)){
				alert('입력하신 번호는 휴대폰 번호 형식에 맞지 않습니다.');
				$('#telNo').focus();
				return false;
			}
		}
	}
	
	if ($("input[name='emailId']").val() == $("input[name='emailId']").attr("placeholder")) {
		$("input[name='emailId']").val("");
    }
	
	if ($("input[name='emailSite']").val() == $("input[name='emailSite']").attr("placeholder")) {
		$("input[name='emailSite']").val("");
    }
	
	if($('#emailId').val() == ''){
		alert('이메일을 입력해 주세요.');
		$('#emailId').focus();
		return false;
	}
	if($('#emailId').val() != '' && $('#emailSite').val() == ''){
		alert('이메일을 확인해 주세요.');
		$('#emailSite').focus();
		return false;
	}
	if($('#emailId').val() == '' || $('#emailSite').val() == ''){
		$('#emailChkMsg').text('필수정보입니다.');
		return false;
	}
	
	
	if($('#legAgntNm').val() != ''){
		if($('#legAgntTelNo').val() == ''){
			alert('법정대리인 연락처를 입력해 주세요.');
			$('#legAgntTelNo').focus();
			return false;
		}
		var legAgntTelNo = $('#legAgntTelNo').val();
		if($('#legAgtnTelNo').val() != '' && legAgntTelNo.length < 9){
			alert('법정대리인 연락처는 지역번호를 포함하여 입력해 주세요.');
			$('#legAgntTelNo').focus();
			return false;
		}
	}
	
	if(idCheckVal == false){
		alert('아이디를 확인해 주세요.');
		$('#mmbrId').focus();
		return false;
	}else if(pswdCheckVal1 == false){
		alert('비밀번호를 확인해 주세요.');
		$('#pswd').focus();
		return false;
	}else if(pswdCheckVal2 == false){
		alert('비밀번호 확인이 일치하지 않습니다.');
		$('#pswdChk').focus();
		return false;
	}else if(idDupChkVal == false || tempId != $('#mmbrId').val()){
		alert('아이디 중복확인을 해주세요.');
		return false;
	}
	
	var email = "" + $('#emailId').val() + "@" + $('#emailSite').val();  
	var pattrn = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
	$('#email').val(email);
	
	if(!pattrn.test(email)){
		alert('이메일 형식이 맞지 않습니다.');
		$('#emailId').focus();
		return false;
	}
	
	if($('#smsYn').is(':checked') == true){
		$('#smsAgreeYn').val('Y');
	}else{
		$('#smsAgreeYn').val('N');
	}
	
	if($('#emailYn').is(':checked') == true){
		$('#emailAgreeYn').val('Y');
	}else{
		$('#emailAgreeYn').val('N');
	}
	
	$.ajax({
		url: '/mmbr/saveMmbr.mhpx',
		async: false,
		type: 'POST',
		data: $('#mmbrVO').serialize(),
		success: function (data) {
			if(data.result == "0000"){
				$('#mmbrNm').val(data.mmbrVO.mmbrNm);
				var url = '/mmbr/mmbrEntrEnd.mhp';
				$('#mmbrVO').attr('action', url);
				$('#mmbrVO').submit();
			}else if(data.result == "0001"){
				alert('중복된 가입이십니다.');
			}else if(data.result == "9999"){
				//DB에러
				alert('작업 중 오류가 발생하였습니다.');
			}else if(data.result == "9998"){
				//메일 발송 에러
				$('#mmbrNm').val(data.mmbrVO.mmbrNm);
				var url = '/mmbr/mmbrEntrEnd.mhp';
				$('#mmbrVO').attr('action', url);
				$('#mmbrVO').submit();
			}else if(data.result == "9997"){
				switch(data.checkResult){
				case 'I':
					alert('아이디 형식이 맞지 않습니다.' );
					break;
				case 'X':
					alert('아이디에 사용할 수 없는 단어가 포함되어 있습니다. 관리자 혹은 사회통념상 허가되기 어려운 단어는 피해주시기 바랍니다' );
					break;
				case 'P':
					alert('비밀번호 형식이 맞지 않습니다.');
					break;
				case 'PP':
					alert('비밀번호로 쓰기에 안전하지 않습니다.');
					break;
				case 'PI':
					alert('아이디를 포함하는 비밀번호는 사용할 수 없습니다.');
					break;
				case 'T':
					alert('연락처 형식이 맞지 않습니다.');
					break;
				case 'E':
					alert('이메일 형식이 맞지 않습니다.');
					break;
				case 'AT':
					alert('법정대리인 연락처 형식이 맞지 않습니다.');
					break;
				}
				
			}
			return false;
		}, error: function (err) {
			alert('작업 중 오류가 발생하였습니다.');
			return false;
		}		
	});

	return false;
};

//[회원가입취소] 버튼 클릭시
var cancelBtnEventE = function(e) {
	var url = "/mmbr/mmbrEntrCancel.mhp";
	$('#mmbrVO').attr('action', url);
	$('#mmbrVO').submit();
	return false;
};

var eventBtnEvent = function() {
	console.log('eventBtnEvent START!!!');
	var evntFlag = true;
	var num = /^[0-9]*$/;
	var regExp = /^01([0|1|6|7|8|9]?)([0-9]{3,4})([0-9]{4})$/;
	if($('#ipinTel').length > 0){
		if($('#ipinTel option:selected').val() == ''){
			evntFlag = false;
		}
	}
	
	if($('#mmbrId').val() == ''){
		evntFlag = false;
	}
	
	if($('#pswd').val() == ''){
		evntFlag = false;
	}
	
	if($('#pswdChk').val() == ''){
		evntFlag = false;
	}
	
	if($('#telNo2').val() != ''){
		var strTel2 = $('#telNo2').val();
		if(!num.test(strTel2)){
			evntFlag = false;
		}
	}
	
	if($('#telNo').val() == ''){
		evntFlag = false;
	} else {
		var telNo = $('#telNo').val();
		if(!num.test(telNo)){
			evntFlag = false;
		} else {
			if(!regExp.test(telNo)){
				evntFlag = false;
			}
		}
	}
	
	if($('#emailId').val() == ''){
		evntFlag = false;
	}
	if($('#emailId').val() != '' && $('#emailSite').val() == ''){
		evntFlag = false;
	}
	if($('#emailId').val() == '' || $('#emailSite').val() == ''){
		evntFlag = false;
	}
	
	
	if($('#legAgntNm').val() != ''){
		if($('#legAgntTelNo').val() == ''){
			evntFlag = false;
		}
		var legAgntTelNo = $('#legAgntTelNo').val();
		if($('#legAgtnTelNo').val() != '' && legAgntTelNo.length < 9){
			evntFlag = false;
		}
	}
	
	if(idCheckVal == false){
		evntFlag = false;
	}else if(pswdCheckVal1 == false){
		evntFlag = false;
	}else if(pswdCheckVal2 == false){
		evntFlag = false;
	}else if(idDupChkVal == false || tempId != $('#mmbrId').val()){
		evntFlag = false;
	}
	
	var email = "" + $('#emailId').val() + "@" + $('#emailSite').val();  
	var pattrn = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
	$('#email').val(email);
	
	if(!pattrn.test(email)){
		evntFlag = false;
	}
	
	if(evntFlag){
		$('#saveBtn').removeClass('disble');
	} else {
		$('#saveBtn').addClass('disble');
	}
}


///////////////////////////////////////////////////////////////////////
//로그인 화면
//[로그인] 버튼 클릭시
var loginDblClkFg = false;
var loginBtnEvent = function(e) {
	if($('#mmbrId').val() == '' || $('#mmbrId').val() == null || $("#mmbrId").val() == $("#mmbrId").attr("placeholder")){
		$('#failMsg').html('아이디를 입력해 주세요.');
		return false;
	}else if($('#pswd').val() == ''|| $('#pswd').val() == null || $("#pswd").val() == $("#pswd").attr("placeholder")){
		$('#failMsg').html('비밀번호를 입력해 주세요.');
		return false;
	}
	
	if(loginDblClkFg){
		alert("로그인중입니다.");
		return false;
	}
	
	loginDblClkFg = true;
	$.ajax({
		url: '/mmbr/login.mhpx',
		async: false,
		type: 'POST',
		dataType: 'json',
		data: {	'mmbrId' : $('#mmbrId').val(),
			      'pswd' : $('#pswd').val(),
			   'nextUrl' : $('#nextUrl').val(),
			   'selectedSn' : $('#selectedSn').val(),
			   'modelCd' : $('#modelCd').val(),
			   'devKdCd' : $('#devKdCd').val(),
			   'loginDvCd' : $('#loginDvCd').val()			   
		},
		success: function (data) {	
			switch(data.loginResult){
			case 'Y':
				//로그인 성공
				if($("input[id=chk_save]:checkbox:checked").length == 1 ){
					setCookie("userId", $('#mmbrId').val(), 1); //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
					setCookie("success", "success", 1);
				} else { // 아이디 저장을 체크 하지 않았을때
			        setCookie("userId", $('#mmbrId').val(), 0); //날짜를 0으로 저장하여 쿠키삭제
			        setCookie("success", "fail", 0);
			    }
				
				if(data.backpage.indexOf("intrDetail") > -1 ||
				   data.backpage.indexOf("intrSpDetail") > -1 ||
				   data.backpage.indexOf("intrOnlyDetail") > -1){
					if ( data.backpage.indexOf("/svc") > -1){
						$('#loginForm').attr('method',"POST");
						$('#loginForm').attr('action',data.backpage);
						$('#loginForm').submit();
					} else {
						// 다이렉트몰 구매후기 노출 확대, 변경 적용 요청 건-2020-10-15
						var reqUrl = data.backpage;
						if(reqUrl != null && reqUrl.indexOf('modelCd=') < 0){
							if(reqUrl.indexOf('?') < 0) {
								reqUrl += "?modelCd="+data.modelCd;
							}else{
								reqUrl += "&modelCd="+data.modelCd;
							}
						}
						if (location.href.indexOf('tab=goodsEpilogueList') > 0) {
							reqUrl += '&tab=goodsEpilogueList';
						}
						location.href = reqUrl;
						/*$('#loginForm').attr('method',"GET");
						$('#loginForm').attr('action',data.backpage);
						$('#loginForm').submit();*/
					}
				}else if(data.backpage.indexOf("evntDetail") > -1){
					if(!(data.selectedSn == '' || data.selectedSn == null)){
						$('#loginForm').attr('method',"GET");
						$('#loginForm').attr('action',data.backpage);
						$('#loginForm').submit();
					}else{
						data.backpage = "/cc/evntList.mhp";
						$('#loginForm').attr('action', data.backpage);
						$('#loginForm').submit();
					}
				}else if(data.backpage.indexOf("evntWinDetail") > -1){
					location.href = data.backpage;
					
				}else if(data.backpage.indexOf("pswdFindCheckForm") > -1){
					$('#loginForm').attr('action', "/cmmn/index.mhp");
					$('#loginForm').submit();
				}else if(data.backpage.indexOf("userCommentList") > -1){
					$('#userCometForm').attr('method',"POST");
					$('#userCometForm').attr('action', data.backpage);
					$('#userCometForm').submit();
				}else if(data.backpage.indexOf("shop/dev/goodsEpilogueList.mhp") > -1){
					//다이렉트몰 상품후기 페이지에서 로그인으로 넘어오는 경우
					var fullUrl 	= data.backpage;					//shop/dev/goodsEpilogueList.mhp?model=SM-N920L64&gdType=devOnly 식으로 넘어옴
					var reqUrl = fullUrl.split('?');
					
					var fullUrlArr  = fullUrl.split('&');				//&기준으로 split fullUrlArr[0]=model=SM-N920L64 fullUrlArr[1]=gdType=devOnly
					
					if(fullUrlArr.length > 0){
						var modelCdParam = fullUrlArr[0];
						var modelCdArr = modelCdParam.split('=');
						$('#modelCd').val(modelCdArr[1]);
					}

					if(fullUrlArr.length > 1){
						var gdTypeParam = fullUrlArr[1];
						var gdTypeParamArr = gdTypeParam.split('=');
						$('#gdType').val(gdTypeParamArr[1]);
					}
					
					$('#mmbrId').val("");
					$('#loginForm').attr('action', reqUrl[0]);
					$('#loginForm').submit();					
				}else{
					$('#loginForm').attr('action', data.backpage);
					$('#loginForm').submit();
				}
				break;
			case 'N':
				//로그인 실패
				$('#failMsg').show();
				if(data.loginFailCnt != null){
					if(data.loginFailCnt < 5){						
						/*$('#failMsg').html('비밀번호 오류 : ' + data.loginFailCnt + '회 입력하신 아이디가 없거나, 비밀번호가 맞지 않습니다.<br/> 5회 연속 비밀번호가 틀릴경우 보안을 위해 서비스가 제한됩니다.');*/
						$('#failMsg').html('로그인 실패 : 고객님의 정보보호를 위해 로그인 5회 실패 시, 비밀번호를 재설정하셔야 합니다.');
					}else {
						$('#loginForm').attr('action', data.backpage);
						$('#loginForm').submit();
					}
				}else{
					/*$('#failMsg').html('입력하신 아이디가 없거나, 비밀번호가 맞지 않습니다.');*/
					$('#failMsg').html('로그인 실패 : 고객님의 정보보호를 위해 로그인 5회 실패 시, 비밀번호를 재설정하셔야 합니다.');
				}
				
				loginDblClkFg = false;
				break;
			case 'O':
				//비밀번호 변경 6개월 초과
				$('#loginForm').attr('action', data.backpage);
				$('#loginForm').submit();
				break;
			case 'C':
				//계약 해지
				/* 해지고객도 로그인가능토록 수정 2015/03/11 ok84j 
				document.getElementById("layerBack").style.display='block';
				document.getElementById("layerPop").style.display='block';
				$('#header').css('z-index','40','y-index','82');
				$('#mmbrId').val("");
				$('#pswd').val("");
				break;
				*/

				if(data.backpage.indexOf("intrDetail") > -1 ||
				   data.backpage.indexOf("intrSpDetail") > -1 ||
				   data.backpage.indexOf("intrOnlyDetail") > -1){
					if ( data.backpage.indexOf("/svc") > -1){
						$('#loginForm').attr('method',"POST");
						$('#loginForm').attr('action',data.backpage);
						$('#loginForm').submit();
					} else {
						// 다이렉트몰 구매후기 노출 확대, 변경 적용 요청 건-2020-10-15
						var reqUrl = data.backpage;
						if(reqUrl != null && reqUrl.indexOf('modelCd=') < 0){
							if(reqUrl.indexOf('?') < 0) {
								reqUrl += "?modelCd="+data.modelCd;
							}else{
								reqUrl += "&modelCd="+data.modelCd;
							}
						}
						if (location.href.indexOf('tab=goodsEpilogueList') > 0) {
							reqUrl += '&tab=goodsEpilogueList';
						}
						location.href = reqUrl;
						/*$('#loginForm').attr('method',"GET");
						$('#loginForm').attr('action',data.backpage);
						$('#loginForm').submit();*/
					}
				}else if(data.backpage.indexOf("evntDetail") > -1){
					if(!(data.selectedSn == '' || data.selectedSn == null)){
						$('#loginForm').attr('method',"GET");
						$('#loginForm').attr('action',data.backpage);
						$('#loginForm').submit();
					}else{
						data.backpage = "/cc/evntList.mhp";
						$('#loginForm').attr('action', data.backpage);
						$('#loginForm').submit();
					}
				}else if(data.backpage.indexOf("userCommentList") > -1){
					$('#userCometForm').attr('method',"POST");
					$('#userCometForm').attr('action', data.backpage);
					$('#userCometForm').submit();					
				}else if(data.backpage.indexOf("shop/dev/goodsEpilogueList.mhp") > -1){
					//다이렉트몰 상품후기 페이지에서 로그인으로 넘어오는 경우
					var fullUrl 	= data.backpage;					//shop/dev/goodsEpilogueList.mhp?model=SM-N920L64&gdType=devOnly 식으로 넘어옴
					var reqUrl = fullUrl.split('?');
					
					var fullUrlArr  = fullUrl.split('&');				//&기준으로 split fullUrlArr[0]=model=SM-N920L64 fullUrlArr[1]=gdType=devOnly
					
					if(fullUrlArr.length > 0){
						var modelCdParam = fullUrlArr[0];
						var modelCdArr = modelCdParam.split('=');
						$('#modelCd').val(modelCdArr[1]);
					}

					if(fullUrlArr.length > 1){
						var gdTypeParam = fullUrlArr[1];
						var gdTypeParamArr = gdTypeParam.split('=');
						$('#gdType').val(gdTypeParamArr[1]);
					}
					
					$('#mmbrId').val("");
					$('#loginForm').attr('action', reqUrl[0]);
					$('#loginForm').submit();
				}else{
					$('#loginForm').attr('action', data.backpage);
					$('#loginForm').submit();
				}
				break;
			case 'P': 
				//선불고객 추가. 2017/08/09 ok84j 
				if(data.backpage.indexOf("evntDetail") > -1){
					if(!(data.selectedSn == '' || data.selectedSn == null)){
						$('#loginForm').attr('method',"GET");
						$('#loginForm').attr('action',data.backpage);
						$('#loginForm').submit();
					}else{
						data.backpage = "/cc/evntList.mhp";
						$('#loginForm').attr('action', data.backpage);
						$('#loginForm').submit();
					}
				}else if(data.backpage.indexOf("userCommentList") > -1){
					$('#userCometForm').attr('method',"POST");
					$('#userCometForm').attr('action', data.backpage);
					$('#userCometForm').submit();
				}else if(data.backpage.indexOf("shop/dev/goodsEpilogueList.mhp") > -1){
					//다이렉트몰 상품후기 페이지에서 로그인으로 넘어오는 경우
					var fullUrl 	= data.backpage;					//shop/dev/goodsEpilogueList.mhp?model=SM-N920L64&gdType=devOnly 식으로 넘어옴
					var reqUrl = fullUrl.split('?');
					
					var fullUrlArr  = fullUrl.split('&');				//&기준으로 split fullUrlArr[0]=model=SM-N920L64 fullUrlArr[1]=gdType=devOnly
					
					if(fullUrlArr.length > 0){
						var modelCdParam = fullUrlArr[0];
						var modelCdArr = modelCdParam.split('=');
						$('#modelCd').val(modelCdArr[1]);
					}

					if(fullUrlArr.length > 1){
						var gdTypeParam = fullUrlArr[1];
						var gdTypeParamArr = gdTypeParam.split('=');
						$('#gdType').val(gdTypeParamArr[1]);
					}
					
					$('#mmbrId').val("");
					$('#loginForm').attr('action', reqUrl[0]);
					$('#loginForm').submit();
				}else{
					$('#loginForm').attr('action', data.backpage);
					$('#loginForm').submit();
				}
				break;
			case 'D':
				alert('이미 로그인 상태입니다.');
				$('#loginForm').attr('action', data.backpage);
				$('#loginForm').submit();
				break;
			// 법인 회선탈퇴 회원 처리
			case 'L':
				alert(' U+알뜰모바일 휴대폰번호가 해지된 계정으로, 홈페이지 회원 탈퇴 처리 되었습니다.\n그동안 U+알뜰모바일을 이용해 주셔서 감사합니다.');
				$('#loginForm').attr('action', data.backpage);
				$('#loginForm').submit();
				break;
			//휴면계정
			case 'R':
				if(data.loginFailCnt != null){
					if(data.loginFailCnt < 5){						
						$('#failMsg').show();
						$('#failMsg').html('로그인 실패 : 고객님의 정보보호를 위해 로그인 5회 실패 시, 비밀번호를 재설정하셔야 합니다.');
						loginDblClkFg = false;
					}else {
						$('#loginForm').attr('action', data.backpage);
						$('#loginForm').submit();
					}
				}else{
					$('#loginForm').attr('action', data.backpage);
					$('#loginForm').submit();
				}
				break;
			case 'E':
				alert('작업 중 오류가 발생하였습니다.');
				loginDblClkFg = false;
				break;
			}
			
			//loginDblClkFg = false;
			return false;
		}, error: function (err) {
			alert('작업 중 오류가 발생하였습니다.');
			
			loginDblClkFg = false;
			return false;
		}		
	});
	return false;
};

///////////////////////////////////////////////////////////////////////
//Main 로그인 화면
//Main [로그인] 버튼 클릭시
var mainLoginBtn = function(e) {
	if($('#mmbrId').val() == '' || $('#mmbrId').val() == null || $("#mmbrId").val() == $("#mmbrId").attr("placeholder")){
		alert('아이디를 입력해 주세요.');
		return false;
	}else if($('#pswd').val() == ''|| $('#pswd').val() == null || $("#pswd").val() == $("#pswd").attr("placeholder")){
		alert('비밀번호를 입력해 주세요.');
		return false;
	}
	
	if(loginDblClkFg){
		alert("로그인중입니다.");
		return false;
	}
	loginDblClkFg = true;
	
	var returnUrl = "";
	
	$.ajax({
		url: '/mmbr/login.mhpx',
		async: false,
		type: 'POST',
		dataType: 'json',
		data: {	mmbrId : $('#mmbrId').val(),
			      pswd : $('#pswd').val(),
			   nextUrl : $('#nextUrl').val(),
			   selectedSn : $('#selectedSn').val(),
			   modelCd : $('#modelCd').val(),
			   devKdCd : $('#devKdCd').val(),
			   loginDvCd : $('#loginDvCd').val()			   
		},
		success: function (data) { 
			switch(data.loginResult){
			case 'Y':
				//로그인 성공
				if($("input[id=chk_save]:checkbox:checked").length == 1 ){
					setLoginIdCookie("userId", $('#mmbrId').val(), 7); //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
					setLoginIdCookie("success", "success", 7);
				} else { // 아이디 저장을 체크 하지 않았을때
					setLoginIdCookie("userId", $('#mmbrId').val(), 0); //날짜를 0으로 저장하여 쿠키삭제
					setLoginIdCookie("success", "fail", 0);
			    }
			    $('#loginForm').attr('action', data.backpage);
				$('#loginForm').submit();
				break;
			case 'N':
				//로그인 실패'
				returnUrl = "/mmbr/mainLoginForm.mhp";
				setCookie("success", "fail", 0);
				if(data.loginFailCnt != null){
					if(data.loginFailCnt < 5){
						//location.href = returnUrl;
						/*$('#failMsg').val('비밀번호 오류 : ' + data.loginFailCnt + '회 입력하신 아이디가 없거나, 비밀번호가 맞지 않습니다. 5회 연속 비밀번호가 틀릴경우 보안을 위해 서비스가 제한됩니다.');*/
						alert("로그인 실패 : 고객님의 정보보호를 위해 로그인 5회 실패 시, 비밀번호를 재설정하셔야 합니다.");
						$('#failMsg').html('로그인 실패 : 고객님의 정보보호를 위해 로그인 5회 실패 시, 비밀번호를 재설정하셔야 합니다.');
						$('#loginForm').attr('action', returnUrl);
						$('#loginForm').submit();
					}else {
						$('#loginForm').attr('action', data.backpage);
						$('#loginForm').submit();
					/*	$('#loginForm').attr('action', returnUrl);
						$('#loginForm').submit();*/
					}
				}else{
					location.href = returnUrl;
					/*$('#failMsg').val('입력하신 아이디가 없거나, 비밀번호가 맞지 않습니다.');*/
					alert("로그인 실패 : 고객님의 정보보호를 위해 로그인 5회 실패 시, 비밀번호를 재설정하셔야 합니다.");
					$('#failMsg').html('로그인 실패 : 고객님의 정보보호를 위해 로그인 5회 실패 시, 비밀번호를 재설정하셔야 합니다.');
					$('#loginForm').attr('action', returnUrl);
					$('#loginForm').submit();
				}
				
				break;
			case 'O':
				//비밀번호 변경 6개월 초과
				//$('#mmbrId').val("${param.mmbrId}");
				//$('#pswd').val("${param.pswd}");
				$('#loginForm').attr('action', data.backpage);
				$('#loginForm').submit();
				break;
			case 'C':
				//계약 해지
				/* 해지고객도 로그인가능토록 수정 2015/03/11 ok84j 
				//document.getElementById("layerBack").style.display='block';
				document.getElementById("layerPop").style.display='block';
				$('#header').css('z-index','2');
				$('#mmbrId').val("");
				$('#pswd').val("");
				break;
				*/  
				//로그인 성공
				if($("input[id=chk_save]:checkbox:checked").length == 1 ){
					setLoginIdCookie("userId", $('#mmbrId').val(), 7); //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
					setLoginIdCookie("success", "success", 7);
				} else { // 아이디 저장을 체크 하지 않았을때
					setLoginIdCookie("usd", $('#mmbrId').val(), 0); //날짜를 0으로 저장하여 쿠키삭제
					setLoginIdCookie("success", "fail", 0);
			    }
				//로그인 성공
				if($("input[id=idsave]:checkbox:checked").length == 1 ){
					
					if(document.loginForm != undefined) {
						setCookie("userId", document.loginForm.mmbrId.value, 1); //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
					} else {
						setCookie("userId", $("#mmbrId").val(), 1); //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
					}
					setCookie("success", "success", 1);
				} else { // 아이디 저장을 체크 하지 않았을때
					if(document.loginForm != undefined) {
						setCookie("userId", document.loginForm.mmbrId.value, 0);  //날짜를 0으로 저장하여 쿠키삭제
					} else {
						setCookie("userId", $("#mmbrId").val(), 0);  //날짜를 0으로 저장하여 쿠키삭제
					}
			        setCookie("success", "fail", 0);
			    }
			    $('#loginForm').attr('action', data.backpage);
				$('#loginForm').submit();
				break;
			case 'P':
				//로그인 성공
				if($("input[id=chk_save]:checkbox:checked").length == 1 ){
					setLoginIdCookie("userId", $('#mmbrId').val(), 7); //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
					setLoginIdCookie("success", "success", 7);
				} else { // 아이디 저장을 체크 하지 않았을때
					setLoginIdCookie("userId", $('#mmbrId').val(), 0); //날짜를 0으로 저장하여 쿠키삭제
					setLoginIdCookie("success", "fail", 0);
			    }
				//선불고객 추가. 2017/08/09 ok84j 
				if($("input[id=idsave]:checkbox:checked").length == 1 ){
					if(document.loginForm != undefined) {
						setCookie("userId", document.loginForm.mmbrId.value, 1); //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
					} else {
						setCookie("userId", $("#mmbrId").val(), 1); //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
					}
					setCookie("success", "success", 1);
				} else { // 아이디 저장을 체크 하지 않았을때
					if(document.loginForm != undefined) {
						setCookie("userId", document.loginForm.mmbrId.value, 0);  //날짜를 0으로 저장하여 쿠키삭제
					} else {
						setCookie("userId", $("#mmbrId").val(), 0);  //날짜를 0으로 저장하여 쿠키삭제
					}
			        setCookie("success", "fail", 0);
			    }
			    $('#loginForm').attr('action', data.backpage);
				$('#loginForm').submit();
				break;
			case 'D':
				alert('이미 로그인 상태입니다.');
				$('#loginForm').attr('action', data.backpage);
				$('#loginForm').submit();
				break;
				// 법인 회선탈퇴 회원 처리
			case 'L':
				alert(' U+알뜰모바일 휴대폰번호가 해지된 계정으로, 홈페이지 회원 탈퇴 처리 되었습니다.\n그동안 U+알뜰모바일을 이용해 주셔서 감사합니다.');
				$('#loginForm').attr('action', data.backpage);
				$('#loginForm').submit();
				break;
			//휴면계정
			case 'R':
				//로그인 실패'
				returnUrl = "/mmbr/mainLoginForm.mhp";
				setCookie("success", "fail", 0);
				if(data.loginFailCnt != null){
					if(data.loginFailCnt < 5){
						alert("로그인 실패 : 고객님의 정보보호를 위해 로그인 5회 실패 시, 비밀번호를 재설정하셔야 합니다.");
						$('#failMsg').html('로그인 실패 : 고객님의 정보보호를 위해 로그인 5회 실패 시, 비밀번호를 재설정하셔야 합니다.');
						$('#loginForm').attr('action', returnUrl);
						$('#loginForm').submit();
					}else {
						$('#loginForm').attr('action', data.backpage);
						$('#loginForm').submit();
					}
				}else{
					$('#loginForm').attr('action', data.backpage);
					$('#loginForm').submit();
				}
				break;	
			case 'E':
				alert('작업 중 오류가 발생하였습니다.1');
				break;
			}
			
			//로그인 성공
			if($("input[id=chk_save]:checkbox:checked").length == 1 ){
				setLoginIdCookie("userId", $('#mmbrId').val(), 7); //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
				setLoginIdCookie("success", "success", 7);
			} else { // 아이디 저장을 체크 하지 않았을때
				setLoginIdCookie("userId", $('#mmbrId').val(), 0); //날짜를 0으로 저장하여 쿠키삭제
				setLoginIdCookie("success", "fail", 0);
		    }
			// 2017-01-23 위치이동
			//로그인 성공 
			if($("input[id=idsave]:checkbox:checked").length == 1 ){
				if(document.loginForm != undefined) {
					setCookie("userId", document.loginForm.mmbrId.value, 1); //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
				} else {
					setCookie("userId", $("#mmbrId").val(), 1); //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
				}
				setCookie("success", "success", 1);
			} else { // 아이디 저장을 체크 하지 않았을때
				if(document.loginForm != undefined) {
					setCookie("userId", document.loginForm.mmbrId.value, 0);  //날짜를 0으로 저장하여 쿠키삭제
				} else {
					setCookie("userId", $("#mmbrId").val(), 0);  //날짜를 0으로 저장하여 쿠키삭제
				}
		        setCookie("success", "fail", 0);
		    }
			
			//loginDblClkFg = false;
		}, error: function (err) {
			alert('작업 중 오류가 발생하였습니다.');

			loginDblClkFg = false;
			return false;
		}		
	});
	return false;
};

//[비밀번호] 입력시
var pswdCheck = function(e) {
	var pswd = $('#pswd').val();
	var msg = '';
	
	if(0 < pswd.length){
		if(pswdPatternCheck(pswd, false) == false){
			$('#pswdMsg').addClass('font_r');
			$('#pswdMsg').show();
			msg = '특수, 영문자, 숫자 중 최소 2개 이상 조합으로 설정해 주세요.';
			pswdCheckVal1 = false;
		} 
			
		if(pswdPatternCheck(pswd, false) == true && isContinuedValue(pswd) == true){
			$('#pswdMsg').addClass('font_r');
			$('#pswdMsg').show();
			msg = '123 혹은 asd 등 연속된 문자나 숫자가 있는 비밀번호 또는 111 혹은 aaa 등 동일한 문자나 숫자가 연속으로 있는 비밀번호는 사용할 수 없습니다';
			pswdCheckVal1 = false;
		}
		
		if(pswdPatternCheck(pswd, false) == true && isContinuedValue(pswd) == false && pswd.length < 10){
			$('#pswdMsg').addClass('font_r');
			$('#pswdMsg').show();
			msg = '특수, 영문자, 숫자 중 최소 2개 이상 조합일 경우 10자리 이상으로 설정해 주세요.';
			pswdCheckVal1 = false;
		}
		
		if(pswdPatternCheck(pswd, true) == true && pswd.length < 8){
			$('#pswdMsg').addClass('font_r');
			$('#pswdMsg').show();
			msg = '특수, 영문자, 숫자 중 3개 이상 조합일 경우 8자리 이상으로 설정해 주세요.';
			pswdCheckVal1 = false;
		}
		
		if(pswdPatternCheck(pswd, false) == true && isContinuedValue(pswd) == false && 10 <= pswd.length){
			var beforePswd=$('#beforePswd').val();
			if(beforePswd == pswd) {
				msg = '기존에 사용하던 비밀번호는 새로운 비밀번호로 사용할 수 없습니다.';
			} else {
				msg = '사용가능한 비밀번호 입니다.';
			}
			$('#pswdMsg').removeClass('font_r');
			$('#pswdMsg').show();
			
			pswdCheckVal1 = true;
		}
		
		if(pswdPatternCheck(pswd, true) == true && 8 <= pswd.length){
			if(beforePswd == pswd) {
				msg = '기존에 사용하던 비밀번호는 새로운 비밀번호로 사용할 수 없습니다.';
			} else {
				msg = '안전한 비밀번호 입니다.';
			}
			$('#pswdMsg').removeClass('font_r');
			$('#pswdMsg').show();
			
			pswdCheckVal1 = true;
		}
	}else{
		$('#pswdMsg').hide();
		msg = '';
	}
	$('#pswdMsg').css('margin-top','16px');
	$('#pswdMsg').text(msg);
};

//[비밀번호] 입력시
var pswdCheck_1 = function(e) {
	var pswd = $('#pswd_1').val();
	var msg = '';
	
	if(0 < pswd.length){
		if(pswdPatternCheck(pswd, false) == false){
			$('#pswdMsg').addClass('font_r');
			$('#pswdMsg').show();
			msg = '특수, 영문자, 숫자 중 최소 2개 이상 조합으로 설정해 주세요.';
			pswdCheckVal1 = false;
		} 
			
		if(pswdPatternCheck(pswd, false) == true && isContinuedValue(pswd) == true){
			$('#pswdMsg').addClass('font_r');
			$('#pswdMsg').show();
			msg = '123 혹은 asd 등 연속된 문자나 숫자가 있는 비밀번호 또는 111 혹은 aaa 등 동일한 문자나 숫자가 연속으로 있는 비밀번호는 사용할 수 없습니다';
			pswdCheckVal1 = false;
		}
		
		if(pswdPatternCheck(pswd, false) == true && isContinuedValue(pswd) == false && pswd.length < 10){
			$('#pswdMsg').addClass('font_r');
			$('#pswdMsg').show();
			msg = '특수, 영문자, 숫자 중 최소 2개 이상 조합일 경우 10자리 이상으로 설정해 주세요.';
			pswdCheckVal1 = false;
		}
		
		if(pswdPatternCheck(pswd, true) == true && pswd.length < 8){
			$('#pswdMsg').addClass('font_r');
			$('#pswdMsg').show();
			msg = '특수, 영문자, 숫자 중 3개 이상 조합일 경우 8자리 이상으로 설정해 주세요.';
			pswdCheckVal1 = false;
		}
		
		if(pswdPatternCheck(pswd, false) == true && isContinuedValue(pswd) == false && 10 <= pswd.length){
			var beforePswd=$('#beforePswd').val();
			if(beforePswd == pswd) {
				msg = '기존에 사용하던 비밀번호는 새로운 비밀번호로 사용할 수 없습니다.';
			} else {
				msg = '사용가능한 비밀번호 입니다.';
			}
			$('#pswdMsg').removeClass('font_r');
			$('#pswdMsg').show();
			
			pswdCheckVal1 = true;
		}
		
		if(pswdPatternCheck(pswd, true) == true && 8 <= pswd.length){
			if(beforePswd == pswd) {
				msg = '기존에 사용하던 비밀번호는 새로운 비밀번호로 사용할 수 없습니다.';
			} else {
				msg = '안전한 비밀번호 입니다.';
			}
			$('#pswdMsg').removeClass('font_r');
			$('#pswdMsg').show();
			
			pswdCheckVal1 = true;
		}
	}else{
		$('#pswdMsg').hide();
		msg = '';
	}
	$('#pswdMsg').css('margin-top','16px');
	$('#pswdMsg').text(msg);
};

//[비밀번호 확인] 입력시
var pswdChkCheck = function(e){
	if($('#pswd').val() == $('#pswdChk').val()){
		$('#pswdChkMsg').text('');
		pswdCheckVal2 = true;
	}else{
		$('#pswdChkMsg').text('비밀번호가 일치하지 않습니다.');
		pswdCheckVal2 = false;
	}
};

//[연락처] 입력시
var telNoCheck = function(e){
	var key = window.e ? e.keyCode : e.which;
	var strTel = $('#telNo').val(); 
	$('#telNo').val(strTel.replace(/[^0-9\-]/gi,''));
	
	if(key == 0 || key == 8){
		return true;
	}
	
	return mmbrCheckPattern('num', key);
};

//[이메일id] 입력시
var emailIdCheck = function(e){
	var key = window.e ? e.keyCode : e.which;
	var strEmailId = $("#emailId").val();
	$("#emailId").val(strEmailId.replace(/[^a-z0-9A-Z_\.-]/gi,''));
	if(key == 0 || key == 8){
		return true;
	}
	return mmbrCheckPattern('emailid', key);
};

//[이메일site] 입력시
var emailSiteCheck = function(e){
	var key = window.e ? e.keyCode : e.which;
	var strEmailSite = $("#emailSite").val();
	$("#emailSite").val(strEmailSite.replace(/[^a-z0-9A-Z_\.-]/gi,''));
	if(key == 0 || key == 8){
		return true;
	}
	return mmbrCheckPattern('emailsite', key);
};

//[이메일 목록] 선택시
var emailChange = function(e){
	var value = $("#emailList").val();
	if(value != ''){
		$("#emailSite").val(value);
		$("#emailSite").attr("readonly", "readonly");
	}else{
		$("#emailSite").val("");
		$("#emailSite").removeAttr("readonly");
	}
};

//공통 유틸
//패턴 검사 (회원가입에 적합한 패턴이 공통에 없어서 common-common.js의 것을 개조)
var mmbrCheckPattern = function(patternNm, value) {
	var result = false;
	switch (patternNm) {
	case 'name':
		result = false;
		break;
	case 'id': //아이디
		if((96 < value && value < 123) || (64 < value && value < 91) || (47 < value && value < 58)){
			result = true;
		}
		break;
	case 'emailid': // email 아이디
		if((96 < value && value < 123) || (64 < value && value < 91) || (47 < value && value < 58) || value == 45 || value == 46 || value == 95){
			result = true;
		}
		break;
	case 'emailsite': // email 사이트
		if((96 < value && value < 123) || (64 < value && value < 91) || (47 < value && value < 58) || value == 46){
			result = true;
		}
		break;
	case 'num': // 숫자만
		if(47 < value && value < 58){
			result = true;
		}
		break;
	default:
		break;
	}
	
	return result;
};

//숫자, 영문, 특수문자 조합 검사
function pswdPatternCheck(value, fCheck){
	var pattern1 = /^[a-zA-Z]*$/;
	var pattern2 = /^[0-9]*$/;
	var pattern3 = /^[\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\\\|,<.>?\/\[\]\{\}\;\:\'\"]*$/;
	
	var check1 = 0;
	var check2 = 0;
	var check3 = 0;
	
	for(var i=0 ; i < value.length ; i++){
		if(value.charAt(i).match(pattern1)){
			check1 = check1 + 1;
		}
		if(value.charAt(i).match(pattern2)){
			check2 = check2 + 1;
		}
		if(value.charAt(i).match(pattern3)){
			check3 = check3 + 1;
		}
	}
	
	if(fCheck == true){
		if(check1 >= 1 && check2 >= 1 && check3 >= 1){
			return true;
		}
	}else{
		if((check1 >= 1 && check2 >= 1) || (check1 >= 1 && check3 >= 1) || (check2 >= 1 && check3 >= 1)){
			return true;
		}
	}
	return false;
}

//연속 된 숫자, 영문, 특수문자 검사
function isContinuedValue (value) {
    var intCnt1 = 0;
	var intCnt2 = 0;
	var intCnt3 = 0;
	var intCnt4 = 0;
	var intCnt5 = 0;
	var temp0 = "";
	var temp1 = "";
	var temp2 = "";
	
	var pattern1 = "~!@#$%^&*()_+|";
	var pattern2 = "|+_)(*&^%$#@!~";
	
	for ( var i = 0; i < value.length; i++) {
		temp0 = value.charAt(i);
		temp1 = value.charAt(i + 1);
		temp2 = value.charAt(i + 2);
		
		//숫자, 영문 역순 
		if (temp0.charCodeAt(0) - temp1.charCodeAt(0) == 1 
				&& temp1.charCodeAt(0) - temp2.charCodeAt(0) == 1) {
			intCnt1 = intCnt1 + 1;
		}

		//숫자, 영문
		if (temp0.charCodeAt(0) - temp1.charCodeAt(0) == -1
				&& temp1.charCodeAt(0) - temp2.charCodeAt(0) == -1) {
			intCnt2 = intCnt2 + 1;
		}
		
		//특수문자 
		for(var j=0;j<pattern1.length-2;j++){
			if(temp0.charCodeAt(0) - pattern1.charCodeAt(j) == 0
				&& temp1.charCodeAt(0) - pattern1.charCodeAt(j+1) == 0
				&& temp2.charCodeAt(0) - pattern1.charCodeAt(j+2) == 0){
				intCnt3 = intCnt3 + 1;
			}
		}
		
		//특수문자 역순
		for(var j=0;j<pattern2.length-2;j++){
			if(temp0.charCodeAt(0) - pattern2.charCodeAt(j) == 0
				&& temp1.charCodeAt(0) - pattern2.charCodeAt(j+1) == 0
				&& temp2.charCodeAt(0) - pattern2.charCodeAt(j+2) == 0){
				intCnt4 = intCnt4 + 1;
			}
		}
		
		//중복 검사
		if (temp0.charCodeAt(0) - temp1.charCodeAt(0) == 0
				&& temp1.charCodeAt(0) - temp2.charCodeAt(0) == 0) {
			intCnt5 = intCnt5 + 1;
		}
	}

	if (intCnt1 > 0 || intCnt2 > 0 || intCnt3 > 0 || intCnt4 > 0 || intCnt5 > 0) {
		return true;
	} else {
		return false;
	}
}

///////////////////////////////////////////////////////////////////////////////////////// 
//외부 인증
window.name ="Parent_window" + Math.round(Math.random() * 1000);

//휴대폰인증 버튼
var checkPlusBtnEvent = function(e){
	window.open('', 'popupChk', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
	document.form_chk.action = "/mmbr/checkPlusCertForm.mhp";
	document.form_chk.target = "popupChk";
	document.form_chk.submit();
};

//아이핀인증 버튼
var ipinBtnEvent = function(e){
	window.open('', 'popupIPIN2', 'width=450, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
	document.form_ipin.target = "popupIPIN2";
	document.form_ipin.action = "/mmbr/ipinCertForm.mhp";
	document.form_ipin.submit();
};

//신용카드인증 버튼
var cardBtnEvent = function(e){
	window.open('', 'popupCARD', 'width=650, height=650, top=100, left=60, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
	document.form_card.target = "popupCARD";
	document.form_card.action = "/mypg/cardAuthPopup.mhp";
	document.form_card.submit();
};

/*통화자료 제공열람신청*/
//비밀번호 확인
var reportOfferPswdChkEvent = function(e){
	if($('#pswd').val() == ''){
		$('#errorMsg').html('비밀번호를 입력해 주세요.');
		$('#pswd').focus();
		return false;
	}
	var url = "/mypg/reportOfferForm.mhp";
	$('#loginForm').attr('action', url);
	$('#loginForm').submit();
};

//스페이스키 입력 방지
var noSpase = function(e){
	var key = window.e ? e.keyCode : e.which;
	if(key == 32){
		return false;
	}
};

//SMS로 App 다운로드 URL 받기
function fnSendUrlEvent(){
	
	if($('#centerNum').val() == '' || $('#centerNum').val().length < 4){
		alert('핸드폰 앞 4자리를 입력해 주세요.');
		$('#centerNum').focus();
		return false;
	}
	if($('#lastNum').val() == '' || $('#lastNum').val().length < 4){
		alert('핸드폰 뒤 4자리를 입력해 주세요.');
		$('#lastNum').focus();
		return false;
	}
	
	$.ajax({
		url: '/mmbr/sendSmsUrl.mhpx',
		async: false,
		type: 'POST',
		dataType: 'json',
		data: {	
				centerNum : $('#centerNum').val(),
				lastNum : $('#lastNum').val()
			 },
		success: function (data) {
			switch(data.resultCode){
			case 'S':
				alert(data.ctn + "로 다운로드 URL을 보내드렸습니다.");
				break;
			case 'F':
				alert("유모비 폰으로만 전송 받을 수 있습니다.");
				break;
			}
			return false;
		}, error: function (err) {
			alert('작업 중 오류가 발생하였습니다.');
			return false;
		}		
	});
	return false;
}

function checkMmbrId() {
	var mId = $("input[name='mmbrId']").val(); 
	return mId;
}

// 기기변경일 경우 로그인 로직
function chgDevLoginBtn() {
	if($('#mmbrId_1').val() == '' || $('#mmbrId_1').val() == null || $("#mmbrId_1").val() == $("#mmbrId_1").attr("placeholder")){
		$('#failMsg').html('아이디를 입력해 주세요.');
		return false;
	}else if($('#pswd_1').val() == ''|| $('#pswd_1').val() == null || $("#pswd_1").val() == $("#pswd_1").attr("placeholder")){
		$('#failMsg').html('비밀번호를 입력해 주세요.');
		return false;
	}
	
	if(loginDblClkFg){
		alert("로그인중입니다.");
		return false;
	}
	
	loginDblClkFg = true;

	$.ajax({
		url: '/mmbr/login.mhpx',
		async: false,
		type: 'POST',
		dataType: 'json',
		data: {	mmbrId : $('#mmbrId_1').val(),
			      pswd : $('#pswd_1').val(),
			   nextUrl : $('#nextUrl').val(),
			   selectedSn : $('#selectedSn').val(),
			   modelCd : $('#modelCd').val(),
			   devKdCd : $('#devKdCd').val(),
			   loginDvCd : $('#loginDvCd').val()			   
		},
		success: function (data) { 
			switch(data.loginResult){
			// Y = 성공, C = 회선해지, P = 선불폰
			case 'Y':
			case 'C':
			case 'P':
				var isMove = updateMmbrInfo();
				closeLoginLayer(isMove);
				loginDblClkFg = false;
				// applyStep1 호출 후 3초 뒤에 reload 호출 (cross domain 문제로 인하여 timer 사용)
				setTimeout(reloadCurPage, 3000);
				break;
			case 'N':
				//로그인 실패
				$('#failMsg').show();
				if(data.loginFailCnt != null){
					if(data.loginFailCnt < 5){						
						$('#failMsg').html('로그인 실패 : 고객님의 정보보호를 위해 로그인 5회 실패 시, 비밀번호를 재설정하셔야 합니다.');
					}else {
						$('#loginForm').attr('action', data.backpage);
						$('#loginForm').submit();
					}
				}else{
					$('#failMsg').html('로그인 실패 : 고객님의 정보보호를 위해 로그인 5회 실패 시, 비밀번호를 재설정하셔야 합니다.');
				}
				
				loginDblClkFg = false;
				break;
			case 'O':
				//비밀번호 변경 6개월 초과
				$("<form  />").attr("name", "form_chk").attr("action", data.backpage)
				.appendTo("body").submit();
				break;
			case 'D':
				alert('이미 로그인 상태입니다.');
				loginDblClkFg = false;
				break;
			// 법인 회선탈퇴 회원 처리
			case 'L':
				alert(' U+알뜰모바일 휴대폰번호가 해지된 계정으로, 홈페이지 회원 탈퇴 처리 되었습니다.\n그동안 U+알뜰모바일을 이용해 주셔서 감사합니다.');
				loginDblClkFg = false;
				break;
			//휴면계정
			case 'R':
				//로그인 실패
				if(data.loginFailCnt != null){
					if(data.loginFailCnt < 5){			
						$('#failMsg').show();
						$('#failMsg').html('로그인 실패 : 고객님의 정보보호를 위해 로그인 5회 실패 시, 비밀번호를 재설정하셔야 합니다.');
						loginDblClkFg = false;
					}else {
						$('#loginForm').attr('action', data.backpage);
						$('#loginForm').submit();
					}
				}else{
					$('#loginForm').attr('action', data.backpage);
					$('#loginForm').submit();
				}
				break;	
			case 'E':
				alert('작업 중 오류가 발생하였습니다.');
				loginDblClkFg = false;
				break;
			}
			
			return false;
		}, error: function (err) {
			alert('작업 중 오류가 발생하였습니다.');
			loginDblClkFg = false;
			return false;
		}		
	});
	return false;
}

function closeLoginLayer(nextAct) {
	// 비로그인 가입신청서
	var isMove = false;
	if (typeof nextAct == "object") {
		isMove = true;
	} 
	// nextAct의 값이 존재할 경우 Y일 때에만
	else if (typeof nextAct == "string" && nextAct == "Y") {
		isMove = true;
		$("#isReload").val("true");
	}
	// E일 경우 refresh
	else if (typeof nextAct == "string" && nextAct == "E") {
		$("#isReload").val("true");
		reloadCurPage();
		return false;
	}
	
	if (isMove) {
		var btDv = $("#prevBtDv").val();
		fMoveOnsale(btDv);
	}
	$("#for_usim_login").find(".btn_close").trigger("click");
}

// 기기변경시 팝업에서 호출될 경우 해당 페이지 리로드
function reloadCurPage() {
	if ($("#isReload").val() && $("#isReload").val() == "true") {
		$("#isReload").val("");
		location.reload();
	}
}

function updateMmbrInfo() {
	var isSuccess = "Y";
	$.ajax({
		url: '/mmbr/mmbrInfo.mhpx',
		type: 'POST',
		async: false,
		dataType: 'json',
		success: function (data) { 
			if (data.mmbrId) {
				$("input[name='mmbrId']").val(data.mmbrId);				
			}
			if (data.entrNo) {
				$("input[name='entrNo']").val(data.entrNo);
			}
			// 회선이 없는 경우
			if (data.chkEntrNo == "E") {
				alert("휴대폰 교체하기 가입 대상자가 아닙니다.");
				isSuccess = "E";
			}
		},
		error : function (data) {
			isSuccess = "N";
		}
	});
	return isSuccess;		
	
}

// 입고알림 휴대폰 번호 확인
function validWearingAlert() {
	if($("#wearingTel2").val() != ""){
		var inputVal = $("#wearingTel2").val();
		$("#wearingTel2").val(inputVal.replace(/[^0-9\-]/gi,''));
	}
	
	if($('#wearingTel2').val() == '' || $('#wearingTel2').val() == null || $("#wearingTel2").val() == $("#wearingTel2").attr("placeholder") 
			|| ($('#wearingTel2').val() && $('#wearingTel2').val().length < 7)){
		$('#whFailMsg').html('7~8자리 숫자로 입력해주세요.');
		return false;
	} else {
		$('#whFailMsg').html('');
	}
	
	// 인증완료 후 전화번호 수정 액션이 있을 경우
	if ($("input[name='certResult']").val()) {
		// 휴대폰 인증 초기화 및 인증번호 초기화
		$("input[name='certResult']").val('');
		$("#wearingAccredit").val('');
		// 필요할 경우 아래 alert 추가
		// alert("휴대폰 인증이 초기화 되었습니다.");
	}
	
	return true;
}

//입고알림 인증번호요청
function sendCertSmsWearing(e) {
	e.preventDefault();
	var isValid = validWearingAlert();
	if (!isValid) {
		return false;
	}
	
	$("input[name='certResult']").val('');
	var obj = {
		tel : $("#wearingTel1").val() + $("#wearingTel2").val(),
		openmktCd : $("input[name='urlOpenmktCd']").val()
	};
	
	$.ajax({
		url : '/shop/dev/certNumEasyShop.mhpx',
		data : obj,
		dataType : "text",
		success : function(data) {
			alert(data.replace(/\"/g, ""));
			$("input[name='certResult']").val(false);
			setTimeout(function() {
				if ($("input[name='certResult']").val() != "" && $("input[name='certResult']").val() == false) {
					alert("인증번호가 만료되었습니다.");
				}
			}, 240000);
		},
		error : function(data) {
			alert('작업 중 오류가 발생하였습니다.');
		}
	});
};

function checkCertSmsWearing(e) {			
	e.preventDefault();
	if ($("#wearingAccredit").val().length < 6) {
		alert("인증번호를 확인해주세요.");
		$("#wearingAccredit").focus();
		return;
	}

	$.ajax({
		url : '/shop/dev/checkCertNumEasyShop.mhpx',
		data : { certNum : $("#wearingAccredit").val() },
		dataType : "text",
		success : function(data) {
			$("input[name='certResult']").val(true);
			alert(data.replace(/\"/g, ""));
		},
		error : function(data) {
			if (data.status == 417) {
				alert(data.responseText.replace(/\"/g, ""));
			} else {
				alert('작업 중 오류가 발생하였습니다.');
			}
		}
	});
};

function applyWearingAlrtData(e) {
	e.preventDefault();
	
	// 각 입력값 확인
	// 이름 확인
	if ($("#whName").val() && $("#whName").val().length > 0) {
		// 인증번호 확인 여부
		if ($("input[name='certResult']").val() == "true") {
			// 수집 동의 여부
			if ($("input[name='agreement_01']").attr("checked")) {
				// 모든 조건을 만족함으로 입고알림 입력
				$.ajax({
					url: '/shop/dev/applyWhAlrt.mhpx',
					async: false,
					type: 'POST',
					dataType: 'json',
					data: {
						name : $("#whName").val(),
						modelCd : $("#whModelCd").val(),
						color : $("#whColor").val(),
						telNo : $("#wearingTel1").val() + $("#wearingTel2").val(),
						joinTyp : $("#whJoinTyp").val()
					},
					success: function (data) {
						if(data.result == 'success'){
							alert(data.resultMsg);
						}else if(data.result == 'fail'){
							alert(data.resultMsg);
						}else {
							alert('작업 중 오류가 발생하였습니다.');
						}
						closeWhLayer();
						return false;
					}, error: function (err) {
						alert('작업 중 오류가 발생하였습니다.');
						return false;
					}
				});
			} else {
				alert("개인정보 수집 이용 동의 후 신청하실 수 있습니다.");
			}
		} else {
			alert("휴대폰번호를 인증해주세요.");
		}
	} else {
		alert("이름을 입력해주세요.");
	}
}

function closeWhLayer() {
	clearWhLayerData();
	$("#wearing_alert").find(".btn_close").trigger("click");
	return false;
}

function clearWhLayerData() {
	$("#whName").val("");
	$("input[name='certResult']").val("");
	if ($("input[name='agreement_01']").attr("checked")) {
		$("input[name='agreement_01']").trigger("click");
	}
	$("#wearingTel2").val("");
	$("#wearingAccredit").val("");
	return false;
}

//전화번호 입력시 하이픈 자동입력
function telNoAutoFmt(param){
	var val = param.replace(/\-/g,'');
	
	var comp = "0123456789";
	var str = "";
	var err=0;
	
	for(var i=0; i<val.length; i++){
		if(comp.indexOf(val.charAt(i)) >=0){
			str += val.charAt(i);
		}else{
			err++;
		}
	}
	//자동하이픈시작
	val = str;
	var len = val.length;
	var phoneNum = val;
	if(val.substring(0,1) == "0"){
		if(len > 2){
			if(val.substring(0,2) == "02"){
				phoneNum = val.substring(0,2) + "-";
				if(len > 2 && len <6){
					phoneNum += val.substring(2);
				}else if(len > 5 && len <10){
					phoneNum += val.substring(2,5) + "-" + val.substring(5);
				}else if(len == 10){
					phoneNum += val.substring(2,6) + "-" + val.substring(6);
				}else{
					phoneNum += val.substring(2,6) + "-" + val.substring(6,10);
				}
			}else if(len > 3){
				if(val.substring(0,5) == "0505"){
					if(len > 4){
						phoneNum = val.substring(0,4) + "-";
						if(len > 4 && len < 8){
							phoneNum += val.substring(4);
						}else if(len > 7 && len <12){
							phoneNum += val.substring(4,7) + "-" + val.substring(7);
						}else if(len == 12){
							phoneNum += val.substring(4,8) + "-" + val.substring(8);
						}else{
							phoneNum += val.substring(4,8) + "-" + val.substring(8,12);
						}
					}
				}else{
					phoneNum = val.substring(0,3) + "-";
					if(len > 3 && len <7){
						phoneNum += val.substring(3);
					}else if(len>6 && len <11){
						phoneNum += val.substring(3,6) + "-" + val.substring(6);
					}else if(len == 11){
						phoneNum += val.substring(3,7) + "-" + val.substring(7);
					}else{
						phoneNum += val.substring(3,7) + "-" + val.substring(7,11);
					}
				}
			}
		}
	}else{
		if(len > 3){
			phoneNum = val.substring(0,3)+"-";
			if(len > 3 && len <8){
				phoneNum += val.substring(3);
			}else if(len == 8){
				phoneNum += val.substring(0,4) + "-"+val.substring(4);
			}else{
				phoneNum += val.substring(0,4) + "-" + val.substring(4,8);
			}
		}
	}
	return val.vaule = phoneNum; 
}