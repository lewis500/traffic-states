(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{139:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(11),i=a(264),l=a(260),o=a(49),s=a(10),m=a(27),u=1.5873015873015872,f=.492*u;function h(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},n=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(a).filter(function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),n.forEach(function(t){d(e,t,a[t])})}return e}function d(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function p(e){return function(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var y=function(e){return Math.max(Math.min(8e4/3600,8.888888888888888*(e/4-1)),0)},g={play:!1,cars:[],time:0,numCars:0,history:[]},E=Object(m.a)(function(e,t){return e%t<t/2}),b=function(e,t){switch(t.type){case"TICK":console.log(e.time);var a=t.payload,n=E(e.time,40),r=e.cars.map(function(e,t,r){var c=0===t?1/0:r[t-1];return!n&&e<=135&&(c=Math.min(c,139)),Math.min(c,e+y(c-e)*a)}).filter(function(e){return e<180}),c=e.numCars-r.length,i=e.time,l=e.history.map(function(e,t){return t<c?e:[].concat(p(e),[[i,r[t-c]]])});return h({},e,{history:l,cars:r,time:e.time+a});case"ADD":var o=Math.min(-8e4/3600/f+e.cars[e.cars.length-1]-1||-20,-20),s=[e.time,o];return h({},e,{numCars:e.numCars+1,history:[].concat(p(e.history),[[s]]),cars:[].concat(p(e.cars),[o])});case"SET_PLAY":return h({},e,{play:t.payload});case"RESET":return h({},e,{time:0,history:[],numCars:0,cars:[]});default:return e}},v=r.a.createContext({state:g,dispatch:null}),x=a(6),j=a(141),w=Object(j.a)({road:{fill:x.a.grey[700]},car:{fill:x.a.yellow.A700,rx:1,ry:1},svg:function(e){return{width:e.width,height:e.height,display:"block","& text":{fontFamily:"Puritan, san-serif",fontSize:"13px"}}},light:{strokeWidth:"5px",fill:"none",stroke:function(e){return e.isGreen?x.a.green.A400:x.a.red.A200}},text:{textAlign:"center",fontSize:"12px",fontFamily:"Puritan, sans-serif"}}),O=Object(s.a)().range([0,800]).domain([0,180]),k=Object(s.a)().range([100,0]).domain([0,22.5]),N=O(3),A=100-k(2),C=100-k(10),S=O(135),M=function(e){var t=e.x,a=e.className;return Object(n.createElement)("rect",{width:N,height:A,className:a,y:50-A/2,x:t-N})},P=function(e){var t=e.className;return Object(n.createElement)("g",{},Object(n.createElement)("rect",{height:C,width:800,className:t,x:0,y:50-C/2}),Object(n.createElement)("rect",{height:100,width:C,className:t,x:S,y:0}))},L="M".concat(S,",").concat((100-C)/2,"L").concat(S,",").concat((100+C)/2),T=function(e){var t=e.className;return Object(n.createElement)("path",{className:t,d:L})},z=function(){var e=Object(n.useContext)(v).state,t=w({width:800,height:100,isGreen:E(e.time,40)});return r.a.createElement("svg",{className:t.svg},r.a.createElement(P,{className:t.road}),r.a.createElement(T,{className:t.light}),e.cars.map(function(e,a){return r.a.createElement(M,{key:a,x:O(e),className:t.car})}))},I=a(23),D=a.n(I),R=(a(37),a(258)),W=Object(j.a)(Object(R.a)({svg:{"& text":{fontFamily:"Puritan, san-serif",fontSize:"13px"}},math:{fontSize:"12px"},trajectory:{fill:"none",stroke:x.a.lightBlue.A700,strokeWidth:"2px"},hidden:{fill:"white",opacity:0},marker:{fill:x.a.lightBlue.A700}})),F=a(38),B=a.n(F);function Y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,c=void 0;try{for(var i,l=e[Symbol.iterator]();!(n=(i=l.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(e){r=!0,c=e}finally{try{n||null==l.return||l.return()}finally{if(r)throw c}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var G=10,J=20,K={width:700+J+44,height:350+G+10},_=Object(s.a)().domain([0,178]).range([350,0]),q=Object(s.a)().domain([0,100]).range([0,700]),H="translate(".concat(J,",").concat(G,")"),U=(Array.apply(null,{length:50}).map(function(e,t){return t}),r.a.createElement("mask",{id:"myMask"},r.a.createElement("rect",{width:700,height:350,fill:"white"}))),X=r.a.memo(function(e){var t=e.mathClass;return r.a.createElement("g",{transform:"translate(0,".concat(_(135),")")},r.a.createElement("path",{d:"M0,0L".concat(700,",0"),fill:"none",stroke:"black"}),r.a.createElement("foreignObject",{width:"90",height:"75",transform:"translate(".concat(703,",-10)")},r.a.createElement("span",{className:t},r.a.createElement(D.a,{math:"t \\; \\text{(sec)}"}))))}),Q=r.a.memo(function(e){var t=e.mathClass;return r.a.createElement("g",null,r.a.createElement("path",{d:"M0,0L0,".concat(350),fill:"none",stroke:"black"}),r.a.createElement("foreignObject",{width:"90",height:"75",transform:"translate(5,-10)"},r.a.createElement("span",{className:t},r.a.createElement(D.a,{math:"x \\; \\text{(m)}"}))))}),V=r.a.memo(function(e){var t=e.trajectory,a=e.className;return Object(n.createElement)("path",{className:a,markerEnd:"url(#arrow)",d:B()(t.map(function(e){var t=Y(e,2),a=t[0],n=t[1];return{x:q(a),y:_(n)}}),.5).reduce(function(e,t){return e+t.x+","+t.y+" "},"M")})}),Z=r.a.memo(function(e){var t=e.className;return r.a.createElement("defs",null,r.a.createElement("marker",{id:"arrow",viewBox:"0 0 15 15",refY:"5",refX:"-1",markerWidth:"5",markerHeight:"5",orient:"auto-start-reverse",className:t},r.a.createElement("path",{d:"M 0 0 L 10 5 L 0 10 z"})))}),$={},ee=function(){var e=W($),t=Object(n.useContext)(v).state;return r.a.createElement("svg",{className:e.svg,style:K},r.a.createElement(Z,{className:e.marker}),r.a.createElement("g",{transform:H},r.a.createElement(X,{mathClass:e.math}),r.a.createElement(Q,{mathClass:e.math}),U,r.a.createElement("g",{style:{mask:"url(#myMask)"}},t.history.map(function(t,a){return Object(n.createElement)(V,{className:e.trajectory,trajectory:t,key:a})}))))},te=Object(j.a)({svg:{"& text":{fontFamily:"Puritan, san-serif",fontSize:"13px"}},math:{fontSize:"12px"},path:{fill:"none",strokeWidth:2,stroke:x.a.blue.A400},hidden:{fill:"white",opacity:0}}),ae=10,ne=40,re=40,ce=10,ie=Object(s.a)().domain([0,.25]).range([0,200]),le=Object(s.a)().domain([0,1.2*u]).range([400/3,0]),oe=(Object(m.a)(function(e,t){return"translate(".concat(e,",").concat(t,")")}),Array.apply(null,{length:50}).map(function(e,t){return t})),se=r.a.createElement("mask",{id:"myMask"},r.a.createElement("rect",{width:200,height:400/3,fill:"white"})),me=r.a.memo(function(e){var t=e.mathClass;return r.a.createElement("g",{transform:"translate(0,".concat(400/3,")")},r.a.createElement("path",{d:"M0,0L".concat(200,",0"),fill:"none",stroke:"black"}),r.a.createElement("foreignObject",{width:"90",height:"75",transform:"translate(".concat(203,",-10)")},r.a.createElement("span",{className:t},r.a.createElement(D.a,{math:"k \\; \\text{(veh/km)}"}))))}),ue=r.a.memo(function(e){var t=e.mathClass;return r.a.createElement("g",null,r.a.createElement("path",{d:"M0,0L0,".concat(400/3),fill:"none",stroke:"black"}),r.a.createElement("foreignObject",{width:"90",height:"75",transform:"translate(5,-10)"},r.a.createElement("span",{className:t},r.a.createElement(D.a,{math:"q \\; \\text{(veh/min)}"}))))}),fe=function(e){return Math.min(e*(8e4/3600),8.888888888888888*(.25-e))},he=r.a.memo(function(e){var t=e.className;return Object(n.createElement)("path",{className:t,d:"M"+oe.map(function(e){return e/(oe.length-1)*.25}).map(function(e){return[ie(e),le(fe(e))]}).join("L")})}),de={},pe={height:400/3+ae+ne,width:200+re+ce},ye="translate(".concat(re,",").concat(ae,")"),ge=function(){var e=te(de);return r.a.createElement("svg",{className:e.svg,style:pe},r.a.createElement("g",{transform:ye},se,r.a.createElement("rect",{className:e.hidden,width:200,height:400/3}),r.a.createElement(me,{mathClass:e.math}),r.a.createElement(ue,{mathClass:e.math}),r.a.createElement(he,{className:e.path})))},Ee=a(259),be=Object(Ee.a)({"@global":{body:{margin:"0 !important",padding:"0 !important",fontFamily:" 'Puritan', sans-serif"}},main:{maxWidth:"900px",color:x.a.grey[800],margin:"0 auto",boxSizing:"border-box",display:"flex",flexDirection:"column"},red:{fill:x.a.red.A400},paper:{maxWidth:"500px",margin:"auto",display:"flex",padding:"20px",flexDirection:"row",alignItems:"center"},button:{margin:"5px"},visContainer:{margin:"0 auto"},sliderContainer:{width:"300px",padding:"20px",boxSizing:"border-box"}});function ve(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,c=void 0;try{for(var i,l=e[Symbol.iterator]();!(n=(i=l.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(e){r=!0,c=e}finally{try{n||null==l.return||l.return()}finally{if(r)throw c}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var xe={},je=function(){var e=Object(n.useContext)(v),t=e.state,a=e.dispatch,c=t.play,s=be(xe);return function(e,t){var a=Object(n.useRef)(0);a.current=e,Object(n.useLayoutEffect)(function(){if(t){var e=0,n=Object(o.a)(function(t){var n=(t-e)/1e3;e=t,a.current&&a.current(n)});return function(){return n.stop()}}},[t])}(function(e){e/=.35,a({type:"TICK",payload:Math.min(e,300)})},c),t.time>100&&a({type:"RESET"}),function(e,t,a){var r=Object(n.useRef)(0);r.current=e,Object(n.useLayoutEffect)(function(){if(a){var e=setInterval(function(){r.current&&r.current()},1e3*t);return function(){return clearInterval(e)}}},[t,a])}(function(){return a({type:"ADD"})},1/f*.35,c),r.a.createElement("div",{className:s.main},r.a.createElement(l.a,{className:s.paper,elevation:2},r.a.createElement(i.a,{className:s.button,variant:"contained",color:"secondary",onClick:function(){return a({type:"SET_PLAY",payload:!c})}},c?"PAUSE":"PLAY"),r.a.createElement(i.a,{className:s.button,variant:"contained",color:"secondary",onClick:function(){a({type:"RESET"})}},"Reset")),r.a.createElement("div",{className:s.visContainer},r.a.createElement(z,null)),r.a.createElement(ee,null),r.a.createElement(ge,null))},we=a(262),Oe=a(48),ke=a(46),Ne=a.n(ke),Ae=a(47),Ce=a.n(Ae),Se=document.getElementById("root");if(!Se)throw Error("no root container");var Me=Object(Oe.a)({palette:{primary:{main:Ne.a[500]},secondary:{main:Ce.a[500]}}});Object(c.render)(r.a.createElement(we.a,{theme:Me},r.a.createElement(function(){var e=ve(Object(n.useReducer)(b,g),2),t=e[0],a=e[1];return r.a.createElement(v.Provider,{value:{state:t,dispatch:a}},r.a.createElement(je,null))},null)),Se)}},[[139,1,2]]]);