/*********************************************************************************************************
	GNB MENU
*********************************************************************************************************/
$(document).on('click', '.btn_gnb', function() {
	gnbOpenFn(this)
});

// GNB OPEN FUNCTION
var gnbOpenFn = function(clickEl) {
	var _gnbWrap = $('#gnbWrap');
	var _gnbBox = $('.gnb_box', _gnbWrap).attr('tabindex', '0');
	var _btnClose = $('.gnb_close', _gnbWrap);
	var _btnOpen = $('#header .btn_gnb');
	var	_accessbility01;
	var _accessbility02;
	
	_btnOpen.attr('aria-expanded', true);
	_gnbWrap.attr('aria-hidden', false);
	_gnbWrap.data('btn-gnb', clickEl);
	_gnbWrap.prepend('<div class="AccessibilityHtml1" tabindex="0" aria-hidden="true"></div>');
	_gnbWrap.append('<div class="AccessibilityHtml2" tabindex="0" aria-hidden="true"></div>');
	_gnbWrap.addClass('active');
	_gnbBox.focus();

	_accessbility01 = $('.AccessibilityHtml1', _gnbWrap);
	_accessbility02 = $('.AccessibilityHtml2', _gnbWrap);

	// S :GNB close
	_btnClose.off('click').on('click', function() {
		gnbCloseFn();
	});
	_gnbWrap.off('click').on('click', function() {
		gnbCloseFn();
	});
	// E :GNB close

	// S : _gnbWrap.click 팝업 close 이벤트 상쇄
	_gnbBox.off('click').on('click', function(e) {e.stopPropagation();});
	// E : _gnbWrap.click 팝업 close 이벤트 상쇄

	// S : GNB 처음, 마지막 포커스 이동 컨트롤
	_accessbility01.off('focusin').on('focusin', function() {
		// console.log(_btnClose.is(':hidden') || !_btnClose.length);
		if(_btnClose.is(':hidden') || !_btnClose.length) {
			_gnbBox.focus();
		}else{
			_btnClose.focus();
		}
	});
	_accessbility02.off('focusin').on('focusin', function() {
		_gnbBox.focus();
	});
	// E : GNB 처음, 마지막 포커스 이동 컨트롤
}

// GNB CLOSE FUNCTION
var gnbCloseFn = function() {
	var _gnbWrap = $('#gnbWrap');
	var _gnbBox = $('.gnb_box', _gnbWrap);
	var _clickEl = $(_gnbWrap.data('btn-gnb'));
	var _accessbility01 = $('.AccessibilityHtml1', _gnbWrap);
	var _accessbility02 = $('.AccessibilityHtml2', _gnbWrap);

	_accessbility01.remove();
	_accessbility02.remove();
	_gnbWrap.attr('aria-hidden', true).removeClass('active');
	_clickEl.focus().attr('aria-expanded', false);
	_gnbBox.removeAttr('tabindex');
	_gnbWrap.removeData('btn-gnb');
}

/*********************************************************************************************************
	COMBOBOX
*********************************************************************************************************/
$(document).on('click', '[class^="combo_list_wrap"] .combo_opt', function() {
	var _this = $(this);
	var _comboLayer = _this.closest('.layer_wrap');
	var _comboBtnEl = $(_comboLayer.data('click-target'));
	var _comboTitleClone = $('[class^="combo_title"]', _comboBtnEl).clone();
	var _optElHtml = _this.html();

	_comboBtnEl.empty().append(_comboTitleClone);
	_comboBtnEl.append(_comboTitleClone).append(_optElHtml);
	_comboTitleClone.attr('aria-hidden', true)

	layerCloseFn(_comboLayer);
});

/*********************************************************************************************************
	TAB
*********************************************************************************************************/
var tabControlFn = function(target, options) {
	// 함수 옵션
	var options = options || {};

	var _targetWrap = $(target);

	// tab position index
	var _oldIdx;
	var _nowIdx;

	// rol = tablist
	var _tabItems = $('.tab_item > [role="tab"]', _targetWrap);

	// rol = tabpanel
	var _tabPanelItems = $('> [role="tabpanel"]', _targetWrap);

	// data-tab-name
	var _tabUiName = _targetWrap.attr('tab-name');

	// id, aria 속성 셋팅
	var _setTabAttrFn = function() {
		_tabItems.each(function(i) {
			var _this = $(this);
			var _num = i + 1;
			var _tabId = ('tab_' + _tabUiName) + '_' + (_num < 10 ? '0' + _num : i+1);
			var _tagName = _this.prop('tagName').toUpperCase();

			_this.attr('id', _tabId);
			if(_tagName === 'BUTTON') _setPanelAttrFn(i, 'aria-labelledby', _tabId);
			if($(this).parent().hasClass('active')) {
				_this.attr('aria-selected', true).attr('tabindex', 0);
				if(_tagName === 'BUTTON') _setPanelAttrFn(i, 'aria-hidden', 'false');
				if(_tagName === 'A') {
					_setPanelAttrFn(0, 'aria-labelledby', _tabId);
					_setPanelAttrFn(0, 'aria-hidden', 'false');
				}
				_oldIdx = _idxCycleFn(i - 1);
				_nowIdx = i;
			} else {
				_this.attr('aria-selected', false).attr('tabindex', -1);
				if(_tagName === 'BUTTON') _setPanelAttrFn(i, 'aria-hidden', 'true');
			}
		});
	}

	var _setPanelAttrFn = function(idx, attrName, attrVale) {
		var _num = idx + 1;
		var _panelId = ('tabpanel_' + _tabUiName) + (_num < 10 ? '0' + _num : _num+1);
		_tabPanelItems.eq(idx).attr(attrName, attrVale);
		_tabItems.eq(idx).attr('aria-controls', _panelId);
	}

	// initial function
	var _initialFn = function() {
		_setTabAttrFn();
	}

	// tab change
	var _tabChFn = function(idx) {
		_tabItems.attr('aria-selected', 'false');
		_tabItems.attr('tabindex', '-1');
		_tabItems.parent().removeClass('active');
		_tabItems.eq(idx).attr('aria-selected', 'true');
		_tabItems.eq(idx).attr('tabindex', '0');
		_tabItems.eq(idx).parent().addClass('active');
	}

	// tab panel change
	var _panelChFn = function(idx) {
		_tabPanelItems.attr('aria-hidden', 'true');
		_tabPanelItems.eq(idx).attr('aria-hidden', 'false');

		if(options.panelChangeAfter) {
			options.panelChangeAfter(idx, _tabPanelItems.eq(idx));
		}
	}

	// index recycle function
	var _idxCycleFn = function(idx) {
		return (_tabItems.length + (idx % _tabItems.length)) % _tabItems.length
	}

	// tab item disabled check function
	var _isDisabledFn = function(idx) {
		return _tabItems.eq(idx).parent().hasClass('disabled');
	}

	// calculate move tab idx function
	var _calcMoveIdx = function(idx, dir) {
		var _isDisabled;
		_oldIdx = idx;
		if(dir === 'minus') {
			_nowIdx = _idxCycleFn(idx-1);
			_isDisabled = _isDisabledFn(_nowIdx);
		} else if(dir === 'plus') {
			_nowIdx = _idxCycleFn(idx+1);
			_isDisabled = _isDisabledFn(_nowIdx);
		}

		if(_isDisabled) {
			return _calcMoveIdx(_nowIdx, dir);
		} else {
			return _nowIdx;
		}
	}

	// click event
	_tabItems.on('click', function() {
		var _this = $(this);
		var _thisIdx = _tabItems.index(this);
		var _tagName = _this.prop('tagName').toUpperCase();

		if(_tagName === 'BUTTON') {
			_tabChFn(_thisIdx);
			_panelChFn(_thisIdx);
		}
	});

	// key event
	_tabItems.on('keyup', function(e) {
		/**
		 * e.keyCode
		 * 37 : 좌, 39 : 우
		 * 38 : 상, 40: 하
		 */
		var _this = $(this);
		var _thisIdx = _tabItems.index(this);
		var _keycode = e.keyCode;
		var _tagName = _this.prop('tagName').toUpperCase();
		var _moveIdx;

		if(_keycode < 37 || _keycode > 40 ) return;

		if(_keycode === 37 || _keycode === 38) {
			_moveIdx = _calcMoveIdx(_thisIdx, 'minus');
		} else if(_keycode === 39 || _keycode === 40) {
			_moveIdx = _calcMoveIdx(_thisIdx, 'plus');
		}

		if(_tagName === 'BUTTON') {
			_tabChFn(_moveIdx);

			if(options.asyncPanelChange) options.asyncPanelChange(_moveIdx, _panelChFn);
			if(!options.asyncPanelChange) _panelChFn(_moveIdx);
		}
		_tabItems.eq(_moveIdx).focus();
	});

	_initialFn();
	
}

/*********************************************************************************************************
	LAYER POPUP
*********************************************************************************************************/
var layerOpenFn = function(target, clickEl) {
	var _layerWrap = $(target);
	var _layerBox = $('.layer_box', _layerWrap).attr('tabindex', '0');
	var _btnClose = $('.layer_close', _layerBox);
	var _accessbility01;
	var _accessbility02;

	$('body').addClass('isPop');
	$(clickEl).attr('aria-expanded', true);
	_layerWrap.attr('aria-hidden', false).css({'visibility' : 'visible'});
	_layerWrap.data('click-target', clickEl);
	_layerWrap.data('scroll-pos', $(window).scrollTop());
	_layerWrap.prepend('<div class="AccessibilityHtml1" tabindex="0" aria-hidden="true"></div>');
	_layerWrap.prepend('<div class="layer_mask" aria-hidden="true"></div>');
	_layerWrap.append('<div class="AccessibilityHtml2" tabindex="0" aria-hidden="true"></div>');
	if(_layerWrap.hasClass('float_bottom')) _layerBox.slideDown();
	_layerBox.focus();

	_accessbility01 = $('.AccessibilityHtml1', _layerWrap);
	_accessbility02 = $('.AccessibilityHtml2', _layerWrap);

	// S :팝업 close
	_btnClose.off('click').on('click', function() {
		layerCloseFn(target);
	});
	$('.layer_mask', _layerWrap).off('click').on('click', function() {
		layerCloseFn(target);
	});
	// E :팝업 close

	// S : 팝업 처음, 마지막 포커스 이동 컨트롤
	_accessbility01.off('focusin').on('focusin', function() {
		// console.log(_btnClose.is(':hidden') || !_btnClose.length);
		if(_btnClose.is(':hidden') || !_btnClose.length) {
			_layerBox.focus();
		}else{
			_btnClose.focus();
		}
	});
	_accessbility02.off('focusin').on('focusin', function() {
		_layerBox.focus();
	});
	// E : 팝업 처음, 마지막 포커스 이동 컨트롤

}

var layerCloseFn = function(target) {
	var _layerWrap = $(target);
	var _layerBox = $('.layer_box', _layerWrap);
	var _clickEl = $(_layerWrap.data('click-target'));
	var _accessbility01 = $('.AccessibilityHtml1', _layerWrap);
	var _accessbility02 = $('.AccessibilityHtml2', _layerWrap);
	$('body').removeClass('isPop');
	_accessbility01.remove();
	_accessbility02.remove();
	$('.layer_mask', _layerWrap).remove();
	_layerWrap.attr('aria-hidden', true).css({'visibility' : 'hidden'});
	_layerWrap.removeData('click-target');
	_layerBox.removeAttr('tabindex');
	if(_layerWrap.hasClass('float_bottom')) _layerBox.slideUp();
	$(_clickEl).focus().attr('aria-expanded', false);
}