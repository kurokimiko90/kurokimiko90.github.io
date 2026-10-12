// Everything is visible at rest. Objects below the fold are "set down" once, just before
// they enter the viewport; ink (stamps, punches) lands only after the object touches the mat.
(function(){
  // 100-cell link grid: 67 opened / 11 PDF / 22 could not open (1,196 links)
  document.querySelectorAll('.grid100').forEach(function(g){
    var spec=(g.dataset.mix||'').split(',').map(function(p){var a=p.split(':');return [a[0],+a[1]]});
    var html='',n=0;
    spec.forEach(function(s){for(var i=0;i<s[1];i++){html+='<i class="'+s[0]+'" style="--n:'+(n++)+'"></i>'}});
    g.innerHTML=html;
  });
  document.querySelectorAll('[data-seq]').forEach(function(box){
    box.querySelectorAll('.ink,.punch').forEach(function(el,i){el.style.setProperty('--n',i)});
  });
  if(!('IntersectionObserver' in window))return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting)return;
      e.target.classList.add('in');io.unobserve(e.target);
    });
  },{rootMargin:'0px 0px 40px 0px'});
  document.querySelectorAll('.set,main .tape,.grid100,[data-seq]').forEach(function(el){
    if(el.getBoundingClientRect().top>innerHeight)io.observe(el);
  });
})();
