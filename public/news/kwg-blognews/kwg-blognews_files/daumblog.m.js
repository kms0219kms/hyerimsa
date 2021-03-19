(function ($) {
  $(document).ready(function () {
    renderLightBox();
  });

  function getOriginalImageUrl(url) {
    if (url.match(/^https?:\/\/\S+\.daumcdn\.net\/cfile\/\S+\/\S+/)) {
      return url + '?original'
    }

    return url
  }

  function renderLightBox() {
    lightbox.option({
      stopEvent: true,
    });

    $('img.txc-image, img.tx-daum-image').each(function (index, element) {
      // parent 가 'a', 즉 링크가 걸린 이미지일 경우 lightbox를 넣으면 안되므로
      // 체크해서 스킵한다.
      if (element.parentElement && element.parentElement.tagName.toLowerCase() === 'a') {
        return;
      }

      $(element).wrap('<a href="'+ getOriginalImageUrl(element.getAttribute('src')) +'" data-lightbox="lightbox" data-alt="' + element.getAttribute('data-filename') + '"></a>');
    });
  }
})(jQuery);
