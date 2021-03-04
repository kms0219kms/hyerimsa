$(document).ready(function() {	
	//아이디 입력시
	$("#hMmbrId").on('keypress', hMmbrIdPressCheck);
	$("#hMmbrId").on('keyup', hMmbrIdKeyupCheck);
	$("#hMmbrId").on('change', hMmbrIdKeyupCheck);
	$("#hMmbrId").on('blur', hMmbrIdKeyupCheck);
	
	//비밀번호 입력시
	$("#hPswd").on('keypress', hNoSpase);
	
	/*********Main 로그인**********/
	//Main 로그인 버튼 클릭
	$("#hMainLoginBtn").on('click', hMainLoginBtn);
});

//로그인 ID 쿠키 저장함수
function setLoginIdCookieHeader(name, value, expiredays){
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    var domain_l = window.location.hostname;
	document.cookie = name + "=" + escape(value) + "; domain=" + (domain_l.indexOf('uplussave.com') != -1 ? '.uplussave.com' : domain_l) + "; path=/; expires="
            + todayDate.toGMTString();
};

function getLoginIdCookieHeader (name){
	var arg = name + "=";
   	var alen = arg.length;
   	var clen = document.cookie.length;
   	var i = 0;
   	while (i < clen){
   		var j = i + alen;
   		if (document.cookie.substring(i, j) == arg){
   			return getCookieLoginIdValHeader (j);	
   		}
   		i = document.cookie.indexOf(" ", i) + 1;
   		if (i == 0){
   			break;	
   		} 
   	}
   	return null;
}

function getCookieLoginIdValHeader(offset){
	var endstr = document.cookie.indexOf(";",offset);
	if(endstr == -1){
		endstr = document.cookie.length;
	}
	return unescape(document.cookie.substring(offset,endstr));
}

//페이지 로드 시 쿠키 저장 ID 있으면 표시
window.onload = function() {
	if($("#loginFormHeader").length == 1) {
		// 로그인 안 한 상태
		var userId = getLoginIdCookieHeader("userId");
		if(userId != null && userId != "" && getLoginIdCookieHeader("success") == "success"){
			document.loginFormHeader.hMmbrId.value = userId;
			document.loginFormHeader.chk_save_header.checked = true;
			$('label[for=hMmbrId]').addClass('on');
		}else if(userId == null) {
			document.loginFormHeader.hMmbrId.value = "";
			document.loginFormHeader.chk_save_header.checked = false;
		};
	}
};

//[id] 입력시
var hMmbrIdPressCheck = function(e){
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

var hMmbrIdKeyupCheck = function(e){
	var mmbrId = $('#hMmbrId').val(); 
	var key = window.e ? e.keyCode : e.which;
	var idReg = /^[a-z0-9]*$/;
	
	// 170621 수정 : ie8에서 blur 이벤트 발생 시 value 값이 빈값으로 치환되는 문제로 인하여 예외 처리
	if (mmbrId != "" && mmbrId != $('#hMmbrId').attr("placeholder") ) {
		$('#hMmbrId').val(mmbrId.replace(/[^a-z0-9]/gi,''));
	}
	
	return false;
};

///////////////////////////////////////////////////////////////////////
//Main 로그인 화면
//Main [로그인] 버튼 클릭시
var hMainLoginBtn = function(e) {
	if($('#hMmbrId').val() == '' || $('#hMmbrId').val() == null || $("#hMmbrId").val() == $("#hMmbrId").attr("placeholder")){
		alert('아이디를 입력해 주세요.');
		return false;
	}else if($('#hPswd').val() == ''|| $('#hPswd').val() == null || $("#hPswd").val() == $("#hPswd").attr("placeholder")){
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
		data: {	mmbrId : $('#hMmbrId').val(),
			      pswd : $('#hPswd').val(),
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
				if($("input[id=chk_save_header]:checkbox:checked").length == 1 ){
					setLoginIdCookieHeader("userId", $('#hMmbrId').val(), 7); //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
					setLoginIdCookieHeader("success", "success", 7);
				} else { // 아이디 저장을 체크 하지 않았을때
					setLoginIdCookieHeader("userId", $('#hMmbrId').val(), 0); //날짜를 0으로 저장하여 쿠키삭제
					setLoginIdCookieHeader("success", "fail", 0);
			    }
			    $('#loginFormHeader').attr('action', data.backpage);
				$('#loginFormHeader').submit();
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
						$('#loginFormHeader').attr('action', returnUrl);
						$('#loginFormHeader').submit();
					}else {
						$('#loginFormHeader').attr('action', data.backpage);
						$('#loginFormHeader').submit();
					/*	$('#loginForm').attr('action', returnUrl);
						$('#loginForm').submit();*/
					}
				}else{
					location.href = returnUrl;
					/*$('#failMsg').val('입력하신 아이디가 없거나, 비밀번호가 맞지 않습니다.');*/
					alert("로그인 실패 : 고객님의 정보보호를 위해 로그인 5회 실패 시, 비밀번호를 재설정하셔야 합니다.");
					$('#failMsg').html('로그인 실패 : 고객님의 정보보호를 위해 로그인 5회 실패 시, 비밀번호를 재설정하셔야 합니다.');
					$('#loginFormHeader').attr('action', returnUrl);
					$('#loginFormHeader').submit();
				}
				
				break;
			case 'O':
				$('#loginFormHeader').attr('action', data.backpage);
				$('#loginFormHeader').submit();
				break;
			case 'C':
				//로그인 성공
				if($("input[id=chk_save_header]:checkbox:checked").length == 1 ){
					setLoginIdCookieHeader("userId", $('#hMmbrId').val(), 7); //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
					setLoginIdCookieHeader("success", "success", 7);
				} else { // 아이디 저장을 체크 하지 않았을때
					setLoginIdCookieHeader("userId", $('#hMmbrId').val(), 0); //날짜를 0으로 저장하여 쿠키삭제
					setLoginIdCookieHeader("success", "fail", 0);
			    }
				//로그인 성공
				if($("input[id=idsave]:checkbox:checked").length == 1 ){
					
					if(document.loginFormHeader != undefined) {
						setCookie("userId", document.loginFormHeader.hMmbrId.value, 1); //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
					} else {
						setCookie("userId", $("#hMmbrId").val(), 1); //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
					}
					setCookie("success", "success", 1);
				} else { // 아이디 저장을 체크 하지 않았을때
					if(document.loginFormHeader != undefined) {
						setCookie("userId", document.loginFormHeader.hMmbrId.value, 0);  //날짜를 0으로 저장하여 쿠키삭제
					} else {
						setCookie("userId", $("#hMmbrId").val(), 0);  //날짜를 0으로 저장하여 쿠키삭제
					}
			        setCookie("success", "fail", 0);
			    }
			    $('#loginFormHeader').attr('action', data.backpage);
				$('#loginFormHeader').submit();
				break;
			case 'P':
				//로그인 성공
				if($("input[id=chk_save_header]:checkbox:checked").length == 1 ){
					setLoginIdCookieHeader("userId", $('#hMmbrId').val(), 7); //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
					setLoginIdCookieHeader("success", "success", 7);
				} else { // 아이디 저장을 체크 하지 않았을때
					setLoginIdCookieHeader("userId", $('#hMmbrId').val(), 0); //날짜를 0으로 저장하여 쿠키삭제
					setLoginIdCookieHeader("success", "fail", 0);
			    }
				//선불고객 추가. 2017/08/09 ok84j 
				if($("input[id=idsave]:checkbox:checked").length == 1 ){
					if(document.loginFormHeader != undefined) {
						setCookie("userId", document.loginFormHeader.hMmbrId.value, 1); //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
					} else {
						setCookie("userId", $("#hMmbrId").val(), 1); //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
					}
					setCookie("success", "success", 1);
				} else { // 아이디 저장을 체크 하지 않았을때
					if(document.loginFormHeader != undefined) {
						setCookie("userId", document.loginFormHeader.hMmbrId.value, 0);  //날짜를 0으로 저장하여 쿠키삭제
					} else {
						setCookie("userId", $("#hMmbrId").val(), 0);  //날짜를 0으로 저장하여 쿠키삭제
					}
			        setCookie("success", "fail", 0);
			    }
			    $('#loginFormHeader').attr('action', data.backpage);
				$('#loginFormHeader').submit();
				break;
			case 'D':
				alert('이미 로그인 상태입니다.');
				$('#loginFormHeader').attr('action', data.backpage);
				$('#loginFormHeader').submit();
				break;
				// 법인 회선탈퇴 회원 처리
			case 'L':
				alert(' U+알뜰모바일 휴대폰번호가 해지된 계정으로, 홈페이지 회원 탈퇴 처리 되었습니다.\n그동안 U+알뜰모바일을 이용해 주셔서 감사합니다.');
				$('#loginFormHeader').attr('action', data.backpage);
				$('#loginFormHeader').submit();
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
						$('#loginFormHeader').attr('action', returnUrl);
						$('#loginFormHeader').submit();
					}else {
						$('#loginFormHeader').attr('action', data.backpage);
						$('#loginFormHeader').submit();
					}
				}else{
					$('#loginFormHeader').attr('action', data.backpage);
					$('#loginFormHeader').submit();
				}
				break;	
			case 'E':
				alert('작업 중 오류가 발생하였습니다.1');
				break;
			}
			
			//로그인 성공
			if($("input[id=chk_save_header]:checkbox:checked").length == 1 ){
				setLoginIdCookieHeader("userId", $('#hMmbrId').val(), 7); //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
				setLoginIdCookieHeader("success", "success", 7);
			} else { // 아이디 저장을 체크 하지 않았을때
				setLoginIdCookieHeader("userId", $('#hMmbrId').val(), 0); //날짜를 0으로 저장하여 쿠키삭제
				setLoginIdCookieHeader("success", "fail", 0);
		    }
			// 2017-01-23 위치이동
			//로그인 성공 
			if($("input[id=idsave]:checkbox:checked").length == 1 ){
				if(document.loginFormHeader != undefined) {
					setCookie("userId", document.loginFormHeader.hMmbrId.value, 1); //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
				} else {
					setCookie("userId", $("#hMmbrId").val(), 1); //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
				}
				setCookie("success", "success", 1);
			} else { // 아이디 저장을 체크 하지 않았을때
				if(document.loginFormHeader != undefined) {
					setCookie("userId", document.loginFormHeader.hMmbrId.value, 0);  //날짜를 0으로 저장하여 쿠키삭제
				} else {
					setCookie("userId", $("#hMmbrId").val(), 0);  //날짜를 0으로 저장하여 쿠키삭제
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

//공통 유틸
//패턴 검사 (회원가입에 적합한 패턴이 공통에 없어서 common-common.js의 것을 개조)
var hMmbrCheckPattern = function(patternNm, value) {
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

//스페이스키 입력 방지
var hNoSpase = function(e){
	var key = window.e ? e.keyCode : e.which;
	if(key == 32){
		return false;
	}
};