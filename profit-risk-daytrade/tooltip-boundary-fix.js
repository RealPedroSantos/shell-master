(function(){
'use strict';
function byId(id){return document.getElementById(id)}
function clamp(v,min,max){return Math.max(min,Math.min(max,v))}
function keepInside(host,ev){
  requestAnimationFrame(function(){
    var tip=byId('pr-rich-tooltip');
    if(!tip||tip.style.display==='none')return;
    var boundary=host.closest('.card')||host;
    var b=boundary.getBoundingClientRect();
    var w=tip.offsetWidth||260,h=tip.offsetHeight||160,pad=10,gap=14;
    var minX=b.left+pad,maxX=b.right-pad-w;
    var minY=b.top+pad,maxY=b.bottom-pad-h;
    var x=ev.clientX+gap;
    var y=ev.clientY+gap;
    if(x+w>b.right-pad)x=ev.clientX-gap-w;
    if(y+h>b.bottom-pad)y=ev.clientY-gap-h;
    if(maxX<minX){x=Math.max(8,Math.min(window.innerWidth-w-8,ev.clientX-w/2));}
    else{x=clamp(x,minX,maxX)}
    if(maxY<minY){y=Math.max(8,Math.min(window.innerHeight-h-8,ev.clientY-h/2));}
    else{y=clamp(y,minY,maxY)}
    tip.style.left=Math.round(x)+'px';
    tip.style.top=Math.round(y)+'px';
  });
}
function bind(id){
  var host=byId(id);if(!host||host.dataset.boundaryFix)return;
  host.dataset.boundaryFix='1';
  host.addEventListener('pointermove',function(ev){keepInside(host,ev)});
}
function bindAll(){['equityChart','dailyChart','hourChart','sideChart'].forEach(bind)}
var mo=new MutationObserver(bindAll);mo.observe(document.documentElement,{childList:true,subtree:true});
bindAll();
setTimeout(bindAll,250);setTimeout(bindAll,1000);
})();