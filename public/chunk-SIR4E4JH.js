import{$ as f,Aa as E,B as x,C,K as s,P as u,R as l,T as o,U as i,W as v,X as y,Y as c,Z as a,_ as I,aa as A,ea as j,fa as P,oa as w,pa as F,qa as T,ra as k,s as p,w as m,x as d,za as M}from"./chunk-BZBDG7SZ.js";function J(e,n){if(e&1){let t=v();o(0,"button",6),y("click",function(){let _=x(t).$implicit,N=c();return C(N.comprobarLetra(_))}),a(1),j(2,"uppercase"),i()}if(e&2){let t=n.$implicit,r=c();l("disabled",r.letrasAdivinadas.includes(t)||r.letrasFalladas.includes(t)),s(),f(" ",P(2,2,t)," ")}}function V(e,n){if(e&1&&(o(0,"p"),a(1),i()),e&2){let t=c(2);s(),f("\xA1Has perdido! La palabra era: ",t.palabra,"")}}function L(e,n){e&1&&(o(0,"p"),a(1,"\xA1Has ganado!"),i())}function R(e,n){if(e&1){let t=v();o(0,"div"),u(1,V,2,1,"p",5)(2,L,2,0,"p",5),o(3,"button",7),y("click",function(){x(t);let _=c();return C(_.reiniciar())}),a(4,"Reiniciar"),i()()}if(e&2){let t=c();s(),l("ngIf",t.intentos>=t.maxIntentos),s(),l("ngIf",t.intentos<t.maxIntentos&&!t.palabraOculta.includes("_"))}}var g=class e{palabra="";palabraOculta="";intentos=0;letrasFalladas=[];letrasAdivinadas=[];juegoTerminado=!1;palabras=["test","gian","ferrari"];maxIntentos=5;constructor(){}ngOnInit(){this.iniciarJuego()}iniciarJuego(){this.intentos=0,this.letrasFalladas=[],this.letrasAdivinadas=[],this.juegoTerminado=!1,this.palabra=this.palabras[Math.floor(Math.random()*this.palabras.length)],this.palabraOculta="_ ".repeat(this.palabra.length).trim()}comprobarLetra(n){n=n.toLowerCase(),!this.juegoTerminado&&(this.palabra.includes(n)?(this.letrasAdivinadas.push(n),this.revelarPalabra()):this.letrasFalladas.includes(n)||(this.letrasFalladas.push(n),this.intentos++),this.intentos>=this.maxIntentos&&(this.juegoTerminado=!0),this.palabraOculta.includes("_")||(this.juegoTerminado=!0))}revelarPalabra(){this.palabraOculta=this.palabra.split("").map(n=>this.letrasAdivinadas.includes(n)?n:"_").join(" ")}reiniciar(){this.iniciarJuego()}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=m({type:e,selectors:[["app-ahorcado"]],decls:16,vars:6,consts:[[1,"ahorcado-container"],[1,"palabra-oculta"],[1,"intentos"],[1,"teclado"],[3,"disabled","click",4,"ngFor","ngForOf"],[4,"ngIf"],[3,"click","disabled"],[3,"click"]],template:function(t,r){t&1&&(o(0,"div",0)(1,"h1"),a(2,"Juego del ahorcado"),i(),o(3,"h3"),a(4,"Adivina la palabra"),i(),o(5,"div",1)(6,"h3"),a(7),i()(),o(8,"div",2)(9,"p"),a(10),i(),o(11,"p"),a(12),i()(),o(13,"div",3),u(14,J,3,4,"button",4),i(),u(15,R,5,2,"div",5),i()),t&2&&(s(7),I(r.palabraOculta),s(3),A("Intentos fallidos: ",r.intentos," / ",r.maxIntentos,""),s(2),f("Letras fallidas: ",r.letrasFalladas.join(", "),""),s(2),l("ngForOf","abcdefghijklmnopqrstuvwxyz".split("")),s(),l("ngIf",r.juegoTerminado))},dependencies:[w,F,T],styles:["[_nghost-%COMP%]{display:flex;justify-content:center;align-items:center;height:100vh;background:linear-gradient(135deg,#7e98f4,#ebb3b3)}.ahorcado-container[_ngcontent-%COMP%]{font-family:system-ui;text-align:center;padding:20px}.palabra-oculta[_ngcontent-%COMP%]{font-size:2rem;letter-spacing:.2rem;margin-bottom:20px}.intentos[_ngcontent-%COMP%]{margin-bottom:20px}.teclado[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:center}.teclado[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:10px;margin:5px;font-size:1.2rem;width:40px;border-radius:10px}.teclado[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#ece0e0;border-radius:10px}.teclado[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled{background-color:#f1e3e3;color:#fff}button[_ngcontent-%COMP%]{cursor:pointer}"]})};var h=class e{static \u0275fac=function(t){return new(t||e)};static \u0275cmp=m({type:e,selectors:[["app-mayormenor"]],decls:2,vars:0,template:function(t,r){t&1&&(o(0,"p"),a(1,"mayormenor works!"),i())},styles:["[_nghost-%COMP%]{display:flex;justify-content:center;align-items:center;height:100vh;background:linear-gradient(135deg,#7e98f4,#ebb3b3)}"]})};var z=[{path:"",component:E},{path:"ahorcado",component:g},{path:"mayormenor",component:h}],b=class e{static \u0275fac=function(t){return new(t||e)};static \u0275mod=d({type:e});static \u0275inj=p({imports:[M.forChild(z),M]})};var S=class e{static \u0275fac=function(t){return new(t||e)};static \u0275mod=d({type:e});static \u0275inj=p({imports:[k,b]})};export{S as JuegosModule};
