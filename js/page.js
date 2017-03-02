	var pass="kamil";
		var login="kamil";
		function openModal(id){
			$(id).modal();
		}
		
		function rejestr() {
			
			login = $('#user_reg').val();
			pass = $('#pass_reg').val();
			var dd = document.getElementById('header');
			if(dd==null) pokaz('head');
			else pokaz('header');
					
		}		
		
		/**---------------------------------Logowanie Fasada----------------------------------------------------------- **/
		var Logowanie = function() {}; 
		
		Logowanie.prototype = {
			loguj: function(page){
				l = $('#user_log').val();
				p = $('#pass_log').val();
				login = $('#user_reg').val();
				pass = $('#pass_reg').val();
				new Glosowo().check(page,l,p,login,pass);
				new Intelekt().check(page,l,p,login,pass);
				new Wzrok().check(page,l,p,login,pass);
			}			
		}
		
		var Glosowo = function() {
			this.check = function(page,l,p,login,pass){
				if(l==login && p==pass && page=="glos.html") window.location.href='mail.html';
			}
		}
		
		var Intelekt = function() {
			this.check = function(page,l,p,login,pass){
				if(l==login && p==pass && page=="intelektualnie.html") window.location.href='mail_i.html';
			}
		}
		
		var Wzrok = function() {
			this.check = function(page,l,p,login,pass){				
				if(l==login && p==pass && page=="test.html") window.location.href='mail_view.html';				
			}
		} 
		
		function zaloguj() {
			
			var log = new Logowanie();
			
			var sPath = window.location.pathname;
			var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
			log.loguj(sPage);
		}
		/**-----------------------------------------------------Koniec----------------------------------------**/
		
		/** --------------------------------Obserwator dla ukrywania elementow -------------------------------------------- **/
		function Observer() {
			this.handlers = [];  // observers
		}
		
		Observer.prototype = {
 
		dodaj: function(fn) {
			this.handlers.push(fn);
		},    
	
		usun: function(fn) {
			this.handlers = this.handlers.filter(
				function(item) {
					if (item !== fn) {
						return item;
					}
				}
			);
		},
	
		odpal: function(o, thisObj) {
			var scope = thisObj || window;
			this.handlers.forEach(function(item) {
				item.call(scope, o);
			});
			}
		}
		
		function ukrywanie(pole){
			var p = document.getElementById(pole);
			if(p!=null) p.style.display = 'none';
		}
		
		var handl = new Observer();
		function runHandlers(){
			var Head = function(item) { ukrywanie('head') };
			var Header = function(item) { ukrywanie('header') };
			var MyModal = function(item) { ukrywanie('myModal') };
			var MyModal2 = function(item) { ukrywanie('myModal2') };
			var MyModal11 = function(item) { ukrywanie('myModal11')};
			var MyModal21 = function(item) { ukrywanie('myModal21')};
			var MyModal22 = function(item) { ukrywanie('myModal22')};
 
			handl.dodaj(Head);
			handl.dodaj(Header);
			handl.dodaj(MyModal);
			handl.dodaj(MyModal2);
			handl.dodaj(MyModal11);
			handl.dodaj(MyModal21);
			handl.dodaj(MyModal22);
		}
		
		function ukryj() {
			handl.odpal("");
		}	
		
		$(document).ready(runHandlers())
		
		/**-----------------------------------------------------------------Koniec----------------------------------------**/
					
		function pokaz(id){
			ukryj();
			document.getElementById(id).style.display = 'block';			
		}
		
		function czysc(id) {
			document.getElementById(id).reset();
		}
		
     $(function() {
        var selector = '.nav li';
		$(selector).on('click', function(){
		$(selector).removeClass('active');
		$(this).addClass('active');
		});
     });