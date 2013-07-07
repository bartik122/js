var months = 1; //Ilosc miesiecy, po ktorych znow pokaze sie okienko
var seconds = 'n'; //Ilosc sekund, po ktorych okienko zniknie (wpisz 'n', aby wylaczyc odliczanie)
 
//Tworzenie ciasteczka
function setCookie(name, value, expire) {
  document.cookie = name + "=" + escape(value) + ((expire==null)?"" : ("; expires=" + expire.toGMTString()));
}
//Sprawdzenie wartosci ciasteczka
function checkCookie(name) {
	if (document.cookie!="") {
		var toCookie=document.cookie.split("; ");
		for (i=0; i<toCookie.length; i++) {
			var CookieName=toCookie[i].split("=")[0];
			var CookieValue=toCookie[i].split("=")[1];
			if (CookieName==name) return unescape(CookieValue);
		}
	}
}
//Usuniecie boxa
function removeBox(divID, months) {
	var div = document.getElementById(divID);
	div.style.display = 'none';
	var expire = new Date();
	expire.setMonth(expire.getMonth()+months);
	setCookie('showedBox','yes',expire);
}
//Sprawdzenie wysokosci diva
function checkHeight(divID){
    return ((document.getElementById(divID).offsetHeight));
}
//Wysrodkowanie diva
function verticalCenter(divID){
    var div = document.getElementById(divID);
    div.style.marginTop = ((window.innerHeight-checkHeight(divID))/2)+'px';
}
 
//Odliczanie sekund
function countDown(sec, months) {
	if(sec >= 0 && sec != 'n') {
		if(!document.getElementById('FBox_countdown')) {
			div = document.createElement('div');
			div.setAttribute('id','FBox_countdown');
			div.innerHTML = 'Okienko zamknie się automatycznie za <span id="FBox_seconds"></span> sekund.';
			document.getElementById('FBox_content').appendChild(div);
		}
		document.getElementById('FBox_seconds').innerHTML = sec;
		setTimeout(function(){countDown(--sec)},1e3);
		if(sec == 0) removeBox('FBox',months);
	}
}
 
//Wykonanie skryptu
window.onload = (function() { 
	if (checkCookie('showedBox')!='yes') {
		document.getElementById('FBox').style.display = 'block';
		verticalCenter('FBox_content');
		countDown(seconds, months);
		document.getElementById('FBox_close').addEventListener('click', function(){removeBox('FBox',months)}, false);
	}
});
window.onresize = (function() { 
	if (checkCookie('showedBox')!='yes') {
		verticalCenter('FBox_content');
	}
});
