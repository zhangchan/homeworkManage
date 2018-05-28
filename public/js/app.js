(function($) {
  'use strict';

  $(function() {
    var $fullText = $('.admin-fullText');
    $('#admin-fullscreen').on('click', function() {
      $.AMUI.fullscreen.toggle();
      $.AMUI.fullscreen.isFullscreen ? $fullText.text('关闭全屏') : $fullText.text('开启全屏');
    });
    function init() {
    	var height = $(window).height() - 51;
    	$('.admin-sidebar').height(height);
    }
    init();
    $(window).resize(init);
    

  });
})(jQuery);

function getQueryObject(url) {
    url = url == null ? window.location.href : url;
    var search = url.substring(url.lastIndexOf("?") + 1);
    var obj = {};
    var reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, function (rs, $1, $2) {
        var name = decodeURIComponent($1);
        var val = decodeURIComponent($2);               
        val = String(val);
        obj[name] = val;
        return rs;
    });
    return obj;
}
var urlMpa = getQueryObject(location.href);
function exit() {
    sessionStorage.removeItem("account");
    sessionStorage.removeItem("u_type");
    sessionStorage.removeItem("u_account");
    sessionStorage.removeItem("u_department");
    sessionStorage.removeItem("u_name");
    sessionStorage.removeItem("u_major");
    location.href="/login";
}
