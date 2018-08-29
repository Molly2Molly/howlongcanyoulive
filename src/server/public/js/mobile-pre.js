(function(doc, win,designWidth) {
	var docEl = doc.documentElement,
	isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
	dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
	dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
	resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	docEl.dataset.dpr = dpr;
	var recalc = function() {
		var width = docEl.clientWidth;
		if (width / dpr > designWidth) {
			/*width = designWidth * dpr;*/
			width = designWidth;
		}
		docEl.dataset.width = width
		docEl.dataset.percent = 100 * (width / designWidth);
		docEl.style.fontSize = 100 * (width / designWidth) + 'px';
	};
	recalc()
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
})(document, window,1080);

//修正页面高度100%的渲染错误
document.documentElement.style.height = window.innerHeight + 'px'; 


function $$(selector, context) {
	context = context || document;
	var elements = context.querySelectorAll(selector);
	return Array.prototype.slice.call(elements);
}

function testProperty(property) {
	var root = document.documentElement;
	if (property in root.style) {
		root.classList.add(property.toLowerCase());
		return true;
	}
	root.classList.add('no-' + property.toLowerCase());
	return false;
}

function testValue(id, value, property) {
	var dummy = document.createElement('p');
	dummy.style[property] = value;
	if (dummy.style[property]) {
		root.classList.add(id);
		return true;
	}
	root.classList.add('no-' + id);
	return false;
}


function showTerms(classname) {
  if(classname) {
      $(".sharediv."+classname).removeClass("hide");
  }else{
      $(".sharediv").removeClass("hide");
  }
  $("body,html").addClass("overflow");
}
function hideTerms(classname) {
  if(classname) {
      $(".sharediv."+classname).addClass("hide");
  }else{
      $(".sharediv").addClass("hide");
  }
  $("body,html").removeClass("overflow");
}

