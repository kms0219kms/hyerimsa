(function($) {

	window.Utils = {
		smoothScroll: function(anchor) {
			if (anchor && anchor.hash) {
				var target = $(anchor.hash), top;
				target = target.length ? target : $('[name=' + anchor.hash.slice(1) +']');
				if (target.length) {
					top = target.offset().top - 50;

					$('html,body').animate({
						scrollTop: top
					}, 500);
					return false;
				}
			}
		},

		adjustCount: function(count, max) {
			return count > max? max + "+" : count;
		},

		updatePostCommentCount: function(count) {
			$(".count_comment").html(count);
			$("header .count_comment").html(Utils.adjustCount(count, 99));
		}
	};

  T.util.url = {
    addPrefix: function(path) {
      if (!this.isDaumblogDomain()) {
        return "/m" + path;
      }

      var blogname = (window.location.pathname).split('/')[1];
      return '/' + blogname + path;
    },

    isDaumblogDomain: function() {
      return ((window.location.hostname).substr(-9) == '.daum.net');
    }
  }

})(jQuery);
