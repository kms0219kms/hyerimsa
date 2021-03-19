(function($) {

  var $window = $(window),
    $body = $(document.body);

  var BODY_NO_SCROLL_CLASS = "no_scroll";

  $(document).ready(function() {
    postReady();

    shareReady();

    etcLayerReady();

    plusmapReady();

    postImageReady();

    postIframeReady();

    moreCategoryPostsReady();

    protectedReady();

    subscription();
  });

  var showTooltip = function(text) {
    if (typeof text != 'undefined' && text.length > 0) {
      var $layer = $('.tooltip_type1');
      $(".txt_tooltip", $layer).html(text);
      $layer.show();

      setTimeout(function() {
        $layer.hide();
      }, 1000);
    }
  };

  var followBlog = function(blogId, $target, url, device) {
    if (!!initData.user) {
      var requestUrl = "/subscription/";

            $.ajax({
                method: "POST",
                // dataType: "jsonp",
                url: requestUrl,
                data: {
                    blogId: blogId,
                    type: "follow",
                    token: TistoryBlog.token,
					url: url,
                    device: device
                },
                xhrFields: {
                    withCredentials: true
                }
            }).done(function (r) {
                if (r.success) {
                    $(".btn_subscription").addClass("following");
                    $(".btn_subscription .txt_post,.btn_subscription .txt_state").html('구독중');
                    $(".btn_subscription .ico_state").addClass('ico_check').removeClass('ico_plus');
                    alert("이 블로그를 구독합니다.");
                } else {
                    alert(r.data);
                }
            }).fail(function (r) {
                alert("구독 실패");
            }).always(function() {
            	$target.data("doing", false);
			});
        } else {
            window.location = window.appInfo.loginUrl + "?redirectUrl=" + encodeURIComponent(window.location.href);
        }
	};

  var unfollowBlog = function(blogId, $target, url, device) {
    if (!!initData.user) {
      var requestUrl = "/subscription/";

            $.ajax({
                method: "POST",
                // dataType: "jsonp",
                url: requestUrl,
                data: {
                    blogId: blogId,
                    type: "unfollow",
                    token: TistoryBlog.token,
					url: url,
                    device: device
                },
                xhrFields: {
                    withCredentials: true
                }
            }).done(function (r) {
                if (r.success) {
                    $(".btn_subscription").removeClass("following");
                    $(".btn_subscription .txt_post,.btn_subscription .txt_state").html('구독하기');
                    $(".btn_subscription .ico_state").removeClass('ico_check').addClass('ico_plus');
                    alert("이 블로그 구독을 취소합니다.");
                } else {
                    alert("구독 취소 실패");
                }
            }).fail(function (e) {
                alert("구독 취소 실패");
            }).always(function() {
                $target.data("doing", false);
            });
        } else {
            window.location = window.appInfo.loginUrl + "?redirectUrl=" + encodeURIComponent(window.location.href);
        }
	};

  var subscription = function() {
    var $button = $(".btn_subscription");
    $button.on("click", function(e){
      if ($(this).data("doing")) {
        return;
      }

      $(this).data("doing", true);

      var blogId = $(this).data("blogId");
      var isSubscriber = $(this).hasClass("following");
      var device = $(this).data("device");
      var url = $(this).data("url");

      if (isSubscriber) {
        unfollowBlog(blogId, $(this), url, device);
      } else {
        followBlog(blogId, $(this), url, device);
      }
    });
  };

	var postReady = function() {
		var $listMenu = $("ul.list_menu"),
			$tooltip = $(".footnote_tooltip"),
      $tooltipInner = $tooltip.find('.inner_tooltip'),
			$tooltipText = $tooltip.find(".txt_footnote");

    $window.on("scroll", function() {
      $listMenu.removeClass("menu_on");
    });

    $(".blogview_head .blogview_head_btn_more").on("click", function() {
      $listMenu.toggleClass("menu_on");
    });

    $(".link_footnote").on("click", function() {
      var $this = $(this),
        footnoteId = $this.data("id");

      $tooltip.show();
      $tooltipText.hide();
      $("#footnote_" + footnoteId).show();
      return false;
    });

    $tooltip.find(".btn_close").on("click", function(){
      $tooltip.hide();
    });

    $tooltip.on('click', function(e) {
      if ($tooltipInner[0] != e.target && !$.contains($tooltipInner[0], e.target)) {
        $tooltip.hide();
      }
    });

		$(".blogview_content .btn_more").on("click", function() {
			$("#more" + this.id.substring(4)).hide();
			$("#content" + this.id.substring(4)).show()
		});
		$(".blogview_content .btn_fold").on("click", function() {
			$("#more" + this.id.substring(4)).show();
			$("#content" + this.id.substring(4)).hide();
		});

    $('#btnDelete').on('click', function(e) {
      e.preventDefault()
      if (!confirm("글을 삭제하시겠습니까?")) {
        return
      }

      $.ajax({
        url: T.util.url.addPrefix("/manage/post/" + TistoryPost.id),
        method: 'delete',
        dataType: 'json',
        timeout: 30000
      }).done(function(res) {
        location.href = TistoryBlog.mobileUrl
      }).fail(function(r) {
        alert("글을 삭제하지 못했습니다.")
      })
    })
  };

  var shareReady = function() {

    var $shareLayer = $(".layer_sns");

    $(".ico_share").parent().on("click", function() {
      $shareLayer.show();
      $body.addClass(BODY_NO_SCROLL_CLASS);
    });

    $shareLayer.on("click", function(e) {
      var $target = $(e.target);
      if ($target.hasClass("btn_copy") || ($target.parents(".inner_sns").length == 0 && !$target.hasClass("inner_sns"))) {
        $shareLayer.hide();
        $body.removeClass(BODY_NO_SCROLL_CLASS);
      }
    });

  };

  var etcLayerReady = function() {
    var $layer = $(".tistory_layer_type1");

    $(".ico_etc").parent().on("click", function() {
      $layer.show();
      $body.addClass(BODY_NO_SCROLL_CLASS);
    });

    $layer.on("click", function(e) {
      var $target = $(e.target);
      if ($target.hasClass("tistory_layer_type1")) {
        $layer.hide();
        $body.removeClass(BODY_NO_SCROLL_CLASS);
      }
    })
  };

  var plusmapReady = function() {
    var $map = $('.map_attach');
    if ($map.length > 0) {
      plusmap.load(function() {
        plusmap.init($map).render();
      });

    }
  }

  var postImageReady = function() {
    $(".tm_gallery").each(function(i, gallery) {
      var $gallery = $(gallery),
        $images = $gallery.find(".tm_gallery_img img"),
        $info = $gallery.find(".tm_gallery_info"),
        $btnPrev = $gallery.find(".btn_prev"),
        $btnNext = $gallery.find(".btn_next");

      var currentIndex = 0,
        count = $images.length;

      $btnPrev.on("click", function() {
        var prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
          prevIndex = count - 1;
        }

        viewImage(prevIndex);
      });

      $btnNext.on("click", function() {
        var nextIndex = currentIndex + 1;
        if (nextIndex >= count) {
          nextIndex = 0;
        }

        viewImage(nextIndex);
      });

      var viewImage = function(index) {
        $($images[currentIndex]).hide();
        $($images[index]).css({"display":"block"});

        currentIndex = index;
        updateInfo();
      };

      var updateInfo = function() {
        $info.html((currentIndex + 1) + " / " + count);
      };

      updateInfo();

    });
  };

  var postIframeReady = function() {

    var $content = $(".blogview_content");

    var getSize = function(value, realSize) {
      if (value && value.indexOf('%') < 0) {
        return value;
      }
      if (realSize) {
        return realSize;
      }
      return null;
    };

		var adjustIframeSize = function() {
			$content.find("iframe").each(function(i, iframe) {
				var $iframe = $(iframe);

				if ($iframe.parent() && $iframe.parent().attr('class') === 'video-wrap') {
				  return;
        }

				$iframe.wrap('<div class="video-wrap"></div>');
      })
    };

    adjustIframeSize();
    $window.on("orientationchange resize", adjustIframeSize);
  };

  var moreCategoryPostsReady = function() {
    var $section = $(".section_differ");
    if ($section.length == 0) {
      return;
    }

    var $loading = $section.find(".section_differ_loading"),
      $inner = $section.find(".section_differ_inner"),
      $title = $section.find(".tit_sectionview"),
      $list = $section.find(".list_post"),
      $linkMore= $section.find(".link_more");

    var loadLock = false;

    function loadList() {
      if (loadLock) {
        return;
      }

      loadLock = true;
      $.ajax({
        url: T.util.url.addPrefix("/data/relatedPosts.json?postId=" + TistoryPost.id),
        dataType: 'json',
        timeout: 30000
      }).done(function(res) {
        if (!res || res.list.length == 0) {
          $section.hide();
          return;
        }
        $list.append(TistoryTemplate.Posts({
          list: res.list,
          isCategory: TistoryList.categoryId > 0,
          categoryId: TistoryList.categoryId,
          prefix: res.prefix
        }));
        $linkMore.attr({"href": res.moreUrl});
        $title.html(res.title);

        $loading.hide();
        $inner.show();
      }).fail(function() {
        $section.hide();
      })
    }

    function onScroll() {
      if (loadLock) {
        return;
      }

      var top = $loading.offset().top,
        appearTop = $window.scrollTop() + $window.height();

      if (appearTop + 200 > top) {
        loadList();
      }
    }

    $window.on("scroll", onScroll);
    onScroll();
  };

  var protectedReady = function() {
    var $protectedForm = $("#protected"),
      $password = $("#password"),
      $btn = $("#passwordSubmit");

    $password.on("change keyup paste focus", function () {
      if ($password.val() == "") {
        $btn.attr("disabled","disabled");
      } else {
        $btn.removeAttr("disabled");
      }
    });

    $protectedForm.on("submit", function(e) {
      var value = $password.val();
      if (value != "") {
        document.cookie = "GUEST_PASSWORD=" + encodeURIComponent(value) + ";path=";
        window.location.reload();
      }
      return false;
    })
  };


})(jQuery);
