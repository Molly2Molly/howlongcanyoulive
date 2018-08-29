(function(doc, win,designWidth) {

	var docEl = doc.documentElement,
  metaEl = doc.querySelector('meta[name="viewport"]'),
	isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
	dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
	dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
  scale = 1 / dpr,
	resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

	docEl.dataset.dpr = dpr;

  var recalc = function(width) {
    docEl.dataset.width = width;
    docEl.dataset.percent = 100 * (width / designWidth);
    docEl.style.fontSize = 100 * (width / designWidth) + 'px';
    metaEl.setAttribute('content', 'width=' + width + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
  };
  
  var width = docEl.clientWidth * dpr;
  if(width<320) width=320;
  recalc(width);

	if (!doc.addEventListener) return;
  // win.addEventListener(resizeEvt, function(){
  //   recalc(width);
  //   setTimeout(function(){width=docEl.clientWidth;},1000);
  // }, false);

})(document, window,750);

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


function showOverlay(classname) {
  if(classname) {
      $(".overlay."+classname).removeClass("hide");
  }else{
      $(".overlay").removeClass("hide");
  }
  $("main").addClass("de-emphasized");
  $("body,html").addClass("overflow");
}
function hideOverlay(classname) {
  if(classname) {
      $(".overlay."+classname).addClass("hide");
  }else{
      $(".overlay").addClass("hide");
  }
  $("main").removeClass("de-emphasized");
  $("body,html").removeClass("overflow");
}

