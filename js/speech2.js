
   
		window.SpeechRecognition = window.SpeechRecognition       ||
                                 window.webkitSpeechRecognition ||
                                 null;

      
        var recognizer = new window.SpeechRecognition();
        recognizer.continuous = true;
		recognizer.start();
		
       
        function help(id){
			
			console.log('start');
			var transcription = document.getElementById(id);
			if(transcription==null) console.log("test");
			recognizer.onresult = function(event) {
			
			
			for (var i = event.resultIndex; i < event.results.length; i++) {
				var elem="";
				elem = event.results[i][0].transcript;
				if(i>0) elem = elem.substring(1,elem.length);
				if(id=='tresc'){
					console.log(elem);
					transcription.value = transcription.value+" "+elem;
				}
				else{
					console.log(elem);
					transcription.value = elem;
				}
				
			}
			}
			
		}