var headerHtml = function() {
	var html = '';
		html += '<header id="header">';
		html += '<div class="header_inner">';
		html += '<h1 class="logo">부산은행</h1>';
		html += '<button type="button" class="btn_gnb" aria-haspopup="true" aria-controls="gnbWrap">GNB MENU</button>';
		html += '</div>';
		html += '</header>';

	document.write(html);
}


var gnbHtml = function() {
	var html = '';
		html += '<nav id="gnbWrap" aria-hidden="true" aria-label="전체메뉴">';
		html += '<div class="gnb_box">';
		html += '<div class="gnb_list_box">';
		html += '<ul>';
		html += '<li><a href="#">GNB MENU</a></li>';
		html += '<li><a href="#">GNB MENU</a></li>';
		html += '<li><a href="#">GNB MENU</a></li>';
		html += '<li><a href="#">GNB MENU</a></li>';
		html += '<li><a href="#">GNB MENU</a></li>';
		html += '<li><a href="#">GNB MENU</a></li>';
		html += '</ul>';
		html += '</div>';
		html += '<button type="button" class="gnb_close"><em class="blind">닫기</em></button>';
		html += '</div>';
		html += '</nav>';

	document.write(html);
}
