(function($) {

	var $body = $(document.body);

	var BODY_NO_SCROLL_CLASS = "no_scroll";

	$(document).ready(function() {
		reportReady();
	});

	window.TistoryReport = (function() {

		var fetching = false;

		var $reportForm = $("#reportForm"),
			$etcReport = $("#reportForm [name=etcReport]"),
			$contentType = $("#reportForm [name=contentType]"),
			$postId = $("#reportForm [name=postId]"),
			$commentId = $("#reportForm [name=commentId]"),
			$reportLayer = $(".report_layer"),
			$etcWriteArea = $(".report_layer .write_area");

		var closeLayer = function() {
			$reportForm[0].reset();
		};

		var _closeLayer = function() {
			$reportLayer.hide();
			$body.removeClass(BODY_NO_SCROLL_CLASS);
		};

    var isDaumblogDomain = function() {
      return ((window.location.hostname).substr(-9) == '.daum.net');
    };

		var openLayer = function(contentType, postId, commentId) {
			$contentType.val(contentType);
			$postId.val(postId);
			$commentId.val(commentId);

			if (isDaumblogDomain()) {
        window.open('https://cs.daum.net/redbell/top.html', '_blank', null);
			  return false;
      }

			adjustFormOption();
			$reportLayer.show();
			$body.addClass(BODY_NO_SCROLL_CLASS);
		};

		var adjustFormOption = function() {
			var etcChecked = getReasonCodeValue() == "G";
			$etcReport.attr("disabled", !etcChecked);
			if (etcChecked) {
				$etcWriteArea.show();
				$etcReport.focus();
			} else {
				$etcWriteArea.hide();
			}
		};

		var report = function(contentType, postId, commentId, reasonCode, etc) {
			if (fetching) {
				return;
			}

			fetching = true;
			$reportForm.css({opacity: "0.6"});
			$.ajax({
				method: "POST",
				url: T.util.url.addPrefix("/report/"+ contentType),
				data: {
					postId: postId,
					commentId: commentId,
					reasonCode: reasonCode,
					reasonMention: etc
				}
			}).done(function (response) {
				alert("신고되었습니다.");
				closeLayer();
			}).fail(function(response) {
				alert("오류가 발생했습니다. (" + response.status + ")");
			}).always(function() {
				fetching = false;
				$reportForm.css({opacity: "1.0"});
			});
		};

		var getReasonCodeValue = function() {
			return $("#reportForm [name=reasonCode]:checked").val();
		};

		$reportForm.on("submit", function(e) {
			e.preventDefault();

			var contentTypeVal = $contentType.val(),
				postIdVal = $postId.val(),
				commentIdVal = $commentId.val(),
				reasonCodeVal = getReasonCodeValue(),
				etcReportVal = $etcReport.val();


			if (!reasonCodeVal) {
				alert("신고 사유를 선택해 주세요");
				return;
			}

			if (reasonCodeVal == "G" && etcReportVal == "") {
				alert("상세 사유를 입력해 주세요");
				$etcReport.focus();
				return;
			}

			report(contentTypeVal, postIdVal, commentIdVal, reasonCodeVal, etcReportVal);
		});

		$reportForm.on("reset", function(e) {
			_closeLayer();
		});

		$("#reportForm [name=reasonCode]").on("change", function() {
			adjustFormOption();
		});

		$(".report_layer .btn_cancel").on("click", function() {
			closeLayer();
		});

		$(".report_layer .btn_close").on("click", function() {
			closeLayer();
		});


		return {
			reportPost: function(postId) {
				if (TistoryUser.id) {
					openLayer("article", postId, 0);
				} else {
					TistoryUser.requestLogin({hash: "report"});
				}
			},

			reportComment: function(postId, commentId) {
				if (TistoryUser.id) {
					openLayer("comment", postId, commentId);
				} else {
					TistoryUser.requestLogin({hash: "reportComment:" + commentId});
				}
			}
		}
	})();


	var reportReady = function() {

		$(".ico_report").parent().on("click", function (e) {
			e.preventDefault();
			TistoryReport.reportPost(TistoryPost.id);
		});

        $(".ico_statistics").parent().on("click", function (e) {
            var entryId = $(this).attr("data-entry-id");
            window.open('/manage/statistics/entry/' + entryId);
        });

		var goReport = function(hash) {
			if (!hash) {
				return;
			}

			var attrs = hash.substring(1).split(":"),
				command = attrs[0],
				id = attrs.length > 1 ? attrs[1]:undefined;

			if (command == "report") {
				TistoryReport.reportPost(TistoryPost.id);
				location.hash = "";
			} else if (command == "reportComment" && id) {
				TistoryReport.reportComment(TistoryPost.id, id);
				location.hash = "";
			}
		};

		goReport(location.hash);
	};

})(jQuery);
