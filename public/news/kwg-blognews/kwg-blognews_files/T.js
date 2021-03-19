/**
 * jQuery $의 사용의 충돌방지를 위해 noConflict 모드를 사용합니다.
 */
if (jQuery) {
	window.tjQuery = jQuery.noConflict();
} else {
	alert("jQuery를 로드해주세요");
}

var T = window.T = {
	/**
	 PC 에서만 공용으로 사용하는 object
	 */
	"p": {
		"blog": {},

		"admin": {},

		"util": {}
	},

	/**
	 mobile 에서 공용으로 사용하는 object
	 */
	"m": {
		"UA": jQuery('#ttUAinfoValue').val() ? (jQuery.parseJSON(jQuery('#ttUAinfoValue').val())) : null,

		"blog": {},

		"admin": {},

		"util": {}
	},

	/**
	 PC mobile 공용으로 사용하는 util object
	 */
	"util": {}
};
