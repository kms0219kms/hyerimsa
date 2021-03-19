(function($) {

	var $window = $(window),
		$document = $(document);

	$document.ready(function() {
		headerRaady();

		sidebarReaddy();

		searchReady();
	});

	var headerRaady = function() {
		var HEADER_HEIGHT = 59,
			GOTOP_HEIGHT = 200;

		var $kakaoWrap = $("#kakaoWrap"),
			$btnTop = $(".btn_top"),
      $btnEntryWrite = $("#btnEntryWrite"),
      $btnRequestFriend = $("#btnRequestFriend"),
      $btnRequestFriendWithLogin = $("#btnRequestFriendWithLogin"),
			$btnLogout = $(".btn_logout");

		var lastScrollTop = $window.scrollTop();
		$window.on("scroll", function() {
			var scrollTop = $window.scrollTop();

			if (scrollTop > HEADER_HEIGHT) {
				$kakaoWrap.addClass("b_scroll");
			} else {
				$kakaoWrap.removeClass("b_scroll");
			}

			if (lastScrollTop > scrollTop && scrollTop > GOTOP_HEIGHT) {
				$btnTop.show();
			} else {
				$btnTop.hide();
			}
			lastScrollTop = scrollTop;
		});

		$btnLogout.on("click", function(e) {
			return confirm("로그아웃 하시겠습니까?");
		});

    $btnEntryWrite.on("click", function(e) {
      document.location = T.util.url.addPrefix("/manage/post");
    });
    $btnRequestFriend.on("click", function(e) {
      //return confirm("친구 신청");
    });
    $btnRequestFriendWithLogin.on("click", function(e) {
      //return confirm("로그인 및 친구 신청");
    });

	};

	var sidebarReaddy = function() {

		var GNB_OPEN_CLASS = "gnb_open",
			NO_SCROLL_CLASS = "no_scroll",
			SIDE_SCROLL_CLASS = "side_scroll";

		var categoriInit = false;

		var $sidebarWrap = $(".tistory_gnb"),
			$btnSidebar = $(".btn_sidebar"),
			$wrapMenu = $(".wrap_menu"),
			$body = $(document.body),
			$wrapKakao = $("#kakaoWrap"),
			$categories = $("#categories");

		var openSidebar = function() {
			$wrapKakao.addClass(GNB_OPEN_CLASS);
			$body.addClass(NO_SCROLL_CLASS);
			if (!categoriInit) {
				$.ajax({
					url: T.util.url.addPrefix("/data/categories.json")
				}).done(function(res) {
					categoriInit = true;
					$categories.html(TistoryTemplate.Categories({
						totalPostsCount: res.totalPostsCount,
						list: res.list,
						categoryId: TistoryList.categoryId,
            prefix: TistoryBlog.mobileUrl
					}));
				})
			}
		};

		var closeSidebar = function() {
			$wrapKakao.removeClass(GNB_OPEN_CLASS);
			$body.removeClass(NO_SCROLL_CLASS);
		};


		if (!$btnSidebar.attr("href")) {
      $btnSidebar.on("click", function() {
				if ($wrapKakao.hasClass(GNB_OPEN_CLASS)) {
					closeSidebar();
				} else {
					openSidebar();
				}
			});
		}

		$wrapMenu.on("scroll", function() {
			if ($wrapMenu.scrollTop() > 0) {
				$sidebarWrap.addClass(SIDE_SCROLL_CLASS);
			} else {
				$sidebarWrap.removeClass(SIDE_SCROLL_CLASS);
			}
		});
	};

	var searchReady = function() {
		var $searchForm = $("#search_form"),
			$searchInput = $("#keywordSearch"),
			$searchBox = $(".box_search");

		var SEARCH_ON_CLASS = "search_on";

		$searchForm.on("submit", function(e) {
			e.preventDefault();
			document.location = TistoryBlog.mobileUrl + "/search/" + $searchInput.val();
		}).on("reset", function(e) {
			$searchInput.val("").focus();
		});

		$searchInput.on("focus", function() {
			$searchBox.addClass(SEARCH_ON_CLASS);
		}).on("blur", function() {
			if ($searchInput.val() == "") {
				$searchBox.removeClass(SEARCH_ON_CLASS);
			}
		});
	};

})(jQuery);
