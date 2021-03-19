(function($) {

	$(document).ready(function() {
		$.fn.extend({size: function() { return this.length }});
		$.fn.UOCLike.defaults.updateServiceCategory = true;

		var likeStatus = false;

		var $icon = $(".uoc-icon"),
			$btnHeaderLike = $('#header_daumlike').find('.uoc-icon'),
			$btnTitleLike = $('#title_daumlike').find('.uoc-icon'),
			$countHeaderLike = $btnHeaderLike.find('.uoc-like-count'),
			$countTitleLike = $btnTitleLike.find('.uoc-like-count'),
			$btnUOCLike = $(".like_btn");

		$btnUOCLike.UOCLike({
			buttonType: 'blank',
			hideBestButton: true,
			importCss: true,
			showLayer: true,
			maxCount: '',
			useMinidaumTracker: false,
			useAnimation: false,
			useOperationText: false,
			updateServiceCategory: true,

			svc : 'blog',
			uid: DaumLike.uid,
			sc: DaumLike.sc,

			author: TistoryPost.author,
			image: TistoryPost.image,
			title: TistoryPost.title,
			description: TistoryPost.description,
			pcUrl: DaumLike.pcUrl,
			fetchUrl: DaumLike.fetchUrl,

			beforeWidgetLoad : function(widget) { },
			completeWidgetLoad : function(widget) { },
			successGetLikeCount : function(widget) {
				handleChangeLike(widget.likeCount, widget.isLiked);
			},
			errorGetLikeCount : function(widge, status) {},

			successLike : function(widget) {
				handleChangeLike(widget.likeCount, widget.isLiked);
			},
			successUnlike : function(widget) {
				handleChangeLike(widget.likeCount, widget.isLiked);
			}
		});

		function handleChangeLike(likeCount, isLiked) {
			updateLikeStatus(isLiked);
			updateLikeCount(likeCount);
		}

		function updateLikeStatus(isLiked) {
			if (isLiked) {
				$icon.addClass("like_on");
			} else {
				$icon.removeClass("like_on");
			}
			likeStatus = isLiked;
		}

		function updateLikeCount(likeCount) {
			$countHeaderLike.html(Utils.adjustCount(likeCount, 99));
			$countTitleLike.html(likeCount);
		}

		function handleLikeClick() {
			if (likeStatus) {
				$btnUOCLike.UOCLike("unlike");
			} else {
				$btnUOCLike.UOCLike("like");
			}
		}

		$btnHeaderLike.on("click", handleLikeClick);
		$btnTitleLike.on("click", handleLikeClick);
	});


})(jQuery);

