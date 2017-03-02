function tell(tekst) {
		responsiveVoice.speak(tekst,'Polish Female');
	}
	
	
	var i =2;
	var zmienna=0;
	
	function test2() {
		var arr = [];
		var l = document.getElementsByClassName('adres');
		var k = document.getElementsByClassName('temat');
		for (var j=0;j<l.length;j++) arr.push(l[j].innerHTML+" "+k[j].innerHTML);
		arr.push("Powrót");
		return arr;
		
   }
   
   function test3() {
		var arr = [];
		var l = document.getElementsByClassName('tresc');
		for (var j=1;j<=l.length;j++) arr.push("border"+j);
		arr.push("ret_but");
		return arr;
   }	
   
   /**--------------------------------------------Strategia Glosowe-------------------------------------**/
   var Glos = function() {
		this.strategy = "";
	};
 
	Glos.prototype = {
		setStrategy: function(strategy) {
			this.strategy = strategy;
		},
 
		start: function() {
			this.strategy.start();
		},
		
		change: function() {
			this.strategy.change();
		}
	};
	
	var start="";
	var log = "";
	var log2="";
	var reg2 = "";
	var tab ="";
	var tab2 = "";
	var glos = new Glos();
	
	var Log = function() {
    this.start = function() {
			start = new Array("Logowanie", "Rejestracja", "Wstecz"); 
			log = new Array("Uzytkownik","Haslo","Wyslij");
			log2 = new Array("user_log","pass_log","but_log");
			reg2 = new Array("user_reg","pass_reg","but_reg");
			tab= start;
			tab2= start;
		}
	this.change = function() {
		if (tab==start && i==0) {
			tab=log;tab2=log2;i=tab.length-1;
		} else if(tab==start && i==1) {
			tab=log;tab2=reg2;i=tab.length-1;
		}else{
			tab=start;tab2=start;i=tab.length-1;
		}
	}
	};	
 
	var Mail = function() {
		this.start = function() {
			start = new Array("Odczytaj", "Napisz", "Wyloguj"); 
			log = new Array("Adresat","Tytuł","Wiadomosc","Wyślij");
			log2 = new Array("to","title","tresc","mail_but");	
			reg2 = new Array("user_reg","pass_reg","but_reg");
			tab= start;
			tab2= start;
		}
		
		this.change = function() {
			if (tab==start && i==0) {
				tab=test2();tab2=test3();i=tab.length-1;zmienna=1;
			} else if(tab==start && i==1) {
				tab=log;tab2=log2;i=tab.length-1;zmienna=0;
			}else if(i==tab.length-1){
				tab=start;tab2=start;i=tab.length-1;zmienna=0;
			}
		}
	};
	
	
	$(document).ready(function(){
    $(document).mousedown(function(event){
	var sPath = window.location.pathname;
	var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
	if(sPage=="glos.html" || sPage=="mail.html"){
		if(event.button==0) {
			if(i==tab.length-1) i=0;
			else i=i+1;
				tell(tab[i]);			
			};
			if(event.button==2) {
				if(tab==start || i==tab.length-1 || zmienna==1) {
					var elem = document.getElementById(tab2[i]).onclick.toString();
					var pos = elem.indexOf("{");
					elem = elem.substring(pos+4,elem.length-1);
					eval(elem);
					glos.change();
				} else {
					console.log(tab2[i]);
					help(tab2[i]);
					
				}
			};
			}
		});		
	});

 
	function run() {
    
    var l = new Log();
    var m = new Mail();
	
	var sPath = window.location.pathname;
	var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
	if (sPage=="glos.html") glos.setStrategy(l);			
	else glos.setStrategy(m);
	glos.start(); 
    
	}
   
	$(document).ready(run())   
   
   /**--------------------------------------Koniec--------------------------------------------**/
   function czytaj(id){
		tell(document.getElementById(id).innerHTML);
   }
     
   function wstecz() {
		window.location.href='glos.html';
   }
   
   var numerMaila=0;

function odczytMaila() {
  var maileLista=document.getElementsByClassName("col-lg-12 border");
  if(maileLista.length > 0){
    if((numerMaila-1 >= 0 )&&(numerMaila-1 <= maileLista.length-1))
      maileLista[numerMaila-1].style.display= 'none';
    
    if (numerMaila > maileLista.length-1)
      numerMaila=0;

    var adres =maileLista[numerMaila].getElementsByClassName("tekst col-lg-3 adres")[0].innerHTML;

    
    var temat =maileLista[numerMaila].getElementsByClassName("tekst col-lg-9 temat")[0].innerHTML;
    var tresc =maileLista[numerMaila].getElementsByClassName("tresc")[0].innerHTML;

    document.getElementById("adresM").innerHTML=adres;
    document.getElementById("tematM").innerHTML=temat;
    document.getElementById("trescM").innerHTML=tresc;

  }
}


function nastepnyMail() {
  numerMaila++;
}