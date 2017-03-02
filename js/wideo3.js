function say()
  {
	console.log("tekst_funkcji");
  }
  
  function cofnij(pole){
		
		
		var lb2 = pole.value.length;
		pole.value = pole.value.substring(0,lb2-1);
  }
  
  var Iterator = function(items) {
    this.index = 0;
    this.items = items;
}
 
 /**----------------------------------------------------Iterator-----------------------------------------**/
	Iterator.prototype = {
		first: function() {
			this.reset();
			return this.next();
		},
		next: function() {
			return this.items[this.index++];
		},
		hasNext: function() {
			return this.index <= this.items.length;
		},
		reset: function() {
			this.index = 0;
		},
		each: function(callback) {
			for (var item = this.first(); this.hasNext(); item = this.next()) {
				callback(item);
			}
		}
	}
  
  /**------------------------------------------------------Koniec-------------------------------------------**/
  var tx;
  function write(pole, znaki,licz){
	
	var doc = document.getElementById(pole);
	tx = doc.value	
	if(licz>1){
		var l = tx.length;		
		tx = tx.substring(0,l-1);
	}
	var lb = (licz/10)|0;
	lb = lb%(znaki.length);
	doc.value = (tx + znaki.substr(lb,1));
	
	
  }
  
  
  var licznik=0;
  function numeric(posx,posy)
  {
	var bt = document.getElementsByClassName("przycisk");
	var iter = new Iterator(bt);
	for (var item = iter.first(); iter.hasNext(); item = iter.next())
	{		
		width2 = item.style.width;
		width2 = parseInt(width2.substring(0,width2.length-2));
		height2 = item.style.height;
		height2 = parseInt(height2.substring(0,height2.length-2));
		
		var elem = $(item).position();
		left2=elem.left;
		top2=elem.top;
		
		if(posx>=left2 && posx<=left2+width2+5 && posy>=top2 && posy<=top2+height2+5)
		{
			
			var tt2 = item.onclick.toString();
			var pos2 = tt2.indexOf("{");
			tt2 = tt2.substring(pos2+4,tt2.length-2);
			var smb = item.innerHTML;
			licznik = licznik+1;
			write(tt2,smb,licznik)
			return 0;
				
		}	
	}
	licznik=0;
  }
   
  
  var check_but = 0;
  function check(posx, posy)
  {	
	var ch = 0;
	var b = document.getElementsByClassName("button");
	var iter = new Iterator(b);
	for (var item = iter.first(); iter.hasNext(); item = iter.next())
	{		
		width2 = item.style.width;
		width2 = parseInt(width2.substring(0,width2.length-2));
		height2 = item.style.height;
		height2 = parseInt(height2.substring(0,height2.length-2));
		
		var elem = $(item).position();
		left2=elem.left;
		top2=elem.top;
		
		if(posx>=left2 && posx<=left2+width2+5 && posy>=top2 && posy<=top2+height2+5)
		{
			ch = 1;
			if(check_but==0){
			var tt = item.onclick.toString();
			var pos = tt.indexOf("{");
			tt = tt.substring(pos+4,tt.length-1);
			eval(tt);
			check_but = 1;			
			return 0;
			}		
		}	
	}
	if(ch==0){	
	check_but = 0;
	}	
  }
  
  
	var z = 0;
    window.onload = function() {
	var width = (window.innerWidth
	|| document.documentElement.clientWidth
	|| document.body.clientWidth);
	var height = (window.innerHeight
	|| document.documentElement.clientHeight
	|| document.body.clientHeight);
	var w = width/320;
	var h = height/240;
	console.log(width);
	console.log(height);
	console.log(w);
	console.log(h);
	
	  var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
	  canvas.width = width;
	  canvas.height = height;
      var context = canvas.getContext('2d');
	  context.fillStyle = "#FF7700";

	  console.log(canvas.width);
      var tracker = new tracking.ObjectTracker('face');
      tracker.setInitialScale(2);
      tracker.setStepSize(1);
      tracker.setEdgesDensity(0.1);
	  
	  var lastx = 0;
	  var lasty = 0;

      tracking.track('#video', tracker, { camera: true });

      tracker.on('track', function(event) {
		var k = 0;
        

		event.data.forEach(function(rect) {
          
		  if(k==0){
		  
		  var rx = (rect.x+rect.width/2)*w;
		  var ry = (rect.y+rect.height/2)*h;
		  if(z==0)
		  {
		  context.clearRect(0, 0, canvas.width, canvas.height);
		  context.fillRect(rx-12,ry-12,10, 10);
		  lastx = rx;
		  lasty = ry;
		  k = k+1;
		  z = z+1;
		  
		   check(rx,ry);
		  numeric(rx,ry);
		   }
		  else if((Math.abs(rx-lastx)<200) && (Math.abs(ry-lasty)<200)){
		  context.clearRect(0, 0, canvas.width, canvas.height);
          context.fillRect(rx-12,ry-12,10, 10);
		  lastx = rx;
		  lasty = ry;
		  k = k+1;
		  z = z+1;
		  check(rx,ry);
		  numeric(rx,ry);
		  }
		  
		  }
          
        });
      });

      
    };