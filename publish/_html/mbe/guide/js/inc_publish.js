var CURRENT_WIDGET_ID = null;
$(function(){
    $('#contents').wrapInner('<div class="pageStack"></div>');
    
    var header = $('#header');
    var footer = $('#footer');
    var wrap = $('#wrap');
    var html;
	
    if( header.length >= 1 ){    	
        //header
    	if(header.hasClass('header_cmn')){//21-03-12 추가 회원가입 상단
    		html ='<div class="header h_cmn">';
            html+=' <h1 class="tit_cmn"><img src="/resource/img/mwp/hd_logo.png" alt="부산은행" /></h1>';
            html+=' <button class="btn_exit">나가기</button>';
            html+='</div>';
    	}else if(header.hasClass('h_cnt')){//19-06-14 추가
    		html ='<div class="header">';
            html+=' <h1 class="tit"><span>페이지타이틀</span></h1>';
            html+=' <button class="btn_back">뒤로</button>';
            html+='</div>';
    	}else if(wrap.hasClass('wrap_frp')){//22-02-28 추가 안면인식결제
            return;
        }else{
    		html ='<div class="header">';
            html+=' <h1 class="tit"><span>페이지타이틀</span></h1>';
            html+=' <button class="btn_back">뒤로</button>';
//            html+=' <button class="btn_my on">마이페이지</button>';
//            html+=' <button class="btn_cart">장바구니</button>';
            html+=' <button class="btn_sch">검색</button>';
            html+=' <button class="btn_allmenu">전체메뉴</button>';
            html+='</div>';
    	}
        
        if ( header.find('.header').length <= 0  && !header.parent().hasClass('mweb_branch')) { //22-01-28 추가 영업점방문 사전입력 header는 별도
        	header.prepend(html);
        }
    }
    
    //footer
    if( footer.length >= 1 ){//19-06-19 수정
        //footer
        html='<div class="footer">';
        html+=' <ul class="fnb_link">';
        html+='     <li><a href="#">공지사항</a></li>';
        html+='     <li><a href="#">이벤트</a></li>';
        html+='     <li><a href="#">고객센터</a></li>';
        html+='     <li><a href="#"><strong>개인정보처리방침</strong></a></li>';
        html+=' </ul>';
        html+=' <p class="copyright">COPYTRIGHT &copy; 2019 BUSANBANK. ALL RIGHTS RESERVED.</p>';
        html+=' </div>';
        html+=' <a href="#wrap" class="btn_pagetop">Top</a>';    
        
        //2019-05-30 독바 추가  //2019-06-19 class수정 - bar_btn -> v02_bar_btn
        html+='<div class="footer_bar">';
        html+='    <ul>';
        html+='        <li class="v02_bar_btn1 on">뱅킹</li>';
		html+='        <li class="v02_bar_btn2">상품몰</li>';
		html+='        <li class="v02_bar_btn6">통합조회</li>'; //19.10.23 오픈뱅킹 수정
		html+='        <li class="v02_bar_btn4">간편결제</li>';
		html+='        <li class="v02_bar_btn7">라이프</li>';
		html+='    </ul>';
		html+='</div>';

        footer.html(html);
    }
    var didScroll;
    $(window).scroll(function(){

        if ($(this).scrollTop() > 50) {
            $('.btn_pagetop').fadeIn();
        } else {
            $('.btn_pagetop').fadeOut();
        } 
        
        //2019-05-30 독바 스크립트
        if($(this).scrollTop() < didScroll){
        	$('.footer_bar').slideDown();
        }else{
        	$('.footer_bar').slideUp();
        }
        
        didScroll = $(this).scrollTop();
    });
    
    $('.btn_pagetop').click(function(){
        var  pTop = $( $(this).attr('href') ).offset().top;
        $('html, body').animate({scrollTop : pTop}, 200);                                       
        return false;
    });

    reAct();
    if( $page_ID.find('.date_calendar').length ) { fnCalendar(); }  //달력
    
})


