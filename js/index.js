window.onload = function() {
	var wrap = document.getElementById("wrap");
	var pic = document.getElementById("picture");
	var Li = document.getElementById("list").getElementsByTagName("li");
	var pre = document.getElementById("pre");
	var next = document.getElementById("next");
	var nowgun = false; // 滚动与否
	var index = 0; //第几张图   圆标
	var timer = null; // 时间
	/*
	  	旁边的点击键设置
	 */
	next.onclick = function() {
		if(nowgun) {
			return;
		} else {
			index++;
			if(index > Li.length - 1) {
				index = 0;
			}
		}
		showlist();
		if(nowgun==false) {
			gun(-1000);
		}
	}
	pre.onclick = function() {
		if(nowgun) {
			return;
		} else {
			index--;
			if(index < 0) //??????
			{
				index = Li.length - 1;
			}
		}
		showlist();
		if(!nowgun) {
			gun(1000);
		}
	}
	/*
	 	下标自动更改
	 */
	for(var i = 0; i < Li.length; i++) {
		Li[i].num = i;
		Li[i].onclick = function() {
			if(this.className == "on") {
				return;
			}
			var offset = -1000 * (this.num - index);
			if(nowgun==false) {
				gun(offset);
			}
			index = this.num;
			showlist();
		}
	}
	/*
	 	自动播放
	 */
	function gun(offset) {
		nowgun = true;
		var newLeft = parseInt(pic.style.left) + offset;
		var time = 300;
		var interval = 10;
		var speed = offset / (time / interval);

		function go() {
			if((speed < 0 && parseInt(pic.style.left) > newLeft) || (speed > 0 && parseInt(pic.style.left) < newLeft)) {
				pic.style.left = parseInt(pic.style.left) + speed + 'px';
				setTimeout(go, interval);
			} else {
				nowgun = false;
				pic.style.left = newLeft + 'px';
				if(newLeft > -1000) {
					pic.style.left = -5000 + 'px';
				}
				if(newLeft < -5000) {
					pic.style.left = -1000 + 'px';
				}
			}
		}
		go();
	}
/*
 下标圆圈的更改
 */
	function showlist() {
		for(var i = 0; i < Li.length; i++) {
			Li[i].className= " ";
		}
		Li[index].className = "on";
	}
	
	/*
	 	这个部分还没理解
	 */
	
	function play() {
					timer = setInterval(function() {
						next.onclick();
					}, 2000);
				}

				function stop() {
					clearInterval(timer);
				}
				wrap.onmouseover = stop;
				wrap.onmouseout = play;
				play();
}