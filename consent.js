/* Cookie consent for Google Analytics. Ads consent is never granted. */
(function(){
  var KEY = "cookie_consent", GA_ID = "G-HKSBELEELY";
  var DENIED = {analytics_storage:"denied"};

  function read(){
    try{
      var s = JSON.parse(localStorage.getItem(KEY));
      if(!s || s.v !== 1 || typeof s.analytics !== "boolean") return null;
      var until = new Date(s.at); until.setMonth(until.getMonth() + 12);
      if(isNaN(until) || until < new Date()) return null;
      return s;
    }catch(_){ return null; }
  }
  function save(analytics){
    try{ localStorage.setItem(KEY, JSON.stringify({analytics:analytics, v:1, at:new Date().toISOString()})); }catch(_){}
  }
  function deleteGaCookies(){
    var host = location.hostname.split("."), domains = [null];
    for(var i = 0; i < host.length - 1; i++){ domains.push(host.slice(i).join(".")); }
    document.cookie.split(";").forEach(function(c){
      var name = c.split("=")[0].trim();
      if(name !== "_ga" && name.indexOf("_ga_") !== 0) return;
      domains.forEach(function(d){
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + (d ? "; domain=" + d : "");
      });
    });
  }

  var stored = read();
  if(stored && stored.analytics){ gtag("consent", "update", {analytics_storage:"granted"}); }

  var banner;
  function hide(){ if(banner) banner.hidden = true; }
  function show(){
    if(!banner) return;
    banner.hidden = false;
    var first = banner.querySelector("button");
    if(first) first.focus();
  }
  function choose(analytics){
    save(analytics);
    if(analytics){
      gtag("consent", "update", {analytics_storage:"granted"});
    }else{
      gtag("consent", "update", DENIED);
      deleteGaCookies();
    }
    hide();
  }

  document.addEventListener("DOMContentLoaded", function(){
    banner = document.getElementById("cookieBanner");
    if(!banner) return;
    document.getElementById("cookieAccept").addEventListener("click", function(){ choose(true); });
    document.getElementById("cookieReject").addEventListener("click", function(){ choose(false); });
    Array.prototype.forEach.call(document.querySelectorAll("[data-cookie-settings]"), function(el){
      el.addEventListener("click", function(e){ e.preventDefault(); show(); });
    });
    if(!stored){ banner.hidden = false; }
  });
})();
