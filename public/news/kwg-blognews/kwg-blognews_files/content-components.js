// 이미지 슬라이드
(function($) {
  function initImageSlide() {
    $('.imageslideblock').each(function(index, item) {
      var $item = $(item),
        $indexBtns = $item.find('.mark span'),
        $btnPrev = $item.find('.btn-prev'),
        $btnNext = $item.find('.btn-next'),
        $imgContainer = $item.find('.image-container'),
        $imgWrap = $item.find('.image-wrap'),
        $img = $item.find('img'),
        currentIndex = 0,
        initialized = false,
        width = 480,
        height = 360;

      function init($firstImage, w, h) {
        if (initialized || !w || !h) {
          return;
        }
        w = w > 860? 860 : w < 480? 480 : w;
        h = h > 860? 860 : h < 300? 300 : h;

        initialized = true;
        $item.addClass('ready');
        width = w;
        height = h;
        $imgContainer.width(w);
        $imgContainer.height(h);

        resizeImage($firstImage);
      }

      function showImage(index) {
        if (!initialized) {
          return;
        }

        if (index >= $imgWrap.length) {
          index = 0;
        }
        if (index < 0) {
          index = $imgWrap.length - 1;
        }

        currentIndex = index;
        $imgWrap.removeClass('selected');
        $($imgWrap.get(index)).addClass('selected');
        // $img.attr('src', images[index].src);
        $indexBtns.css('backgroundColor', '#d6d6d6');
        $($indexBtns.get(index)).css('backgroundColor', '#000');
      }

      function resizeImage($curImg) {
        $curImg.removeAttr('width');
        $curImg.removeAttr('height');
      }


      $img.on('load', function(e) {
        var $curImg = $(this),
          curWidth = $curImg[0].offsetWidth,
          curHeight = $curImg[0].offsetHeight;

        if (currentIndex === 0) {
          init($curImg, curWidth, curHeight);
        } else {
          resizeImage($curImg);
        }
      });

      $indexBtns.on('click', function(e) {
        showImage($(this).data('index'));
      });

      $btnPrev.on('click', function(e) {
        showImage(currentIndex - 1);
      });
      $btnNext.on('click', function(e) {
        showImage(currentIndex + 1);
      });

      init($img, $img[0].offsetWidth, $img[0].offsetHeight);
    })
  }

  $(function() {
    initImageSlide();
  });
})(tjQuery);

// moreless
(function($) {
  function close($btn, $parent) {
    $parent.removeClass('open');
    $btn.text($parent.attr('data-text-more') || '더보기');
  }
  function open($btn, $parent) {
    $parent.addClass('open');
    $btn.text($parent.attr('data-text-less') || '접기');
  }

  function init() {
    var $morelessBtn = $('[data-ke-type="moreLess"] .btn-toggle-moreless');
    $morelessBtn.on('click', function(e) {
      e.preventDefault();
      var $this = $(this),
        $parent = $this.parent();

      if ($parent.hasClass('open')) {
        close($this, $parent);
      } else {
        open($this, $parent);
      }
    });
    close($morelessBtn, $morelessBtn.parent());
  }

  $(function() {
    init();
  });
})(tjQuery);
