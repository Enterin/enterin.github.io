/*
 * Copyright 2013 Gianfilippo Balestriero
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * 		http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */
var app = {

	effectTime:60,

	init: function(){

		setTimeout(function(){
			app.loading(function(){	
				app.bindBodyTransition();
				app.bindEnterIN();
				app.startAnimation();
			});			
		},500)

	},

	loading: function(callback){
		var images = [

			'planets/planet-1.png',
			'planets/planet-3.png',
			'planets/planet-4.png',
			'planets/planet-5.png',
			'planets/planet-7.png',
			'planets/planet-8.png',
			'planets/planet-9.png',

			'img/star-1.png',
			'img/star-2.png',
			'img/last-message.png',

		];

		var countImages = images.length;

		var loaded = 0;

		var perc   = Math.ceil(100/countImages);

		for(var i = 0; i< countImages; i++) {

			var img = jQuery("<img>");
			img.src= images[i];	
			
			img.one('load', function() {
				var nPerc = perc*(i+1);
				jQuery("#loading span").css("width", perc*(i+1)+"%");
				if(nPerc>=100) {
					setTimeout(function(){
						app.hideLoading();
						callback();
					},3000)
					
				}
			}).each(function() {
				if(this.complete) jQuery(this).load();
			});
		}

		

		return;
	},

	hideLoading: function(callback) {
		jQuery("#loading").fadeOut("slow");
	},

	bindBodyTransition: function() {
		jQuery("body").css("transition", "all 1s");
	},

	bindEnterIN: function(){
		jQuery("#enterin-wrapper").enterin({
			effectTime: app.effectTime,
			ease: 'cubic-bezier(.97,.06,.72,.65)'
		});

	},
	startAnimation: function(){
		
		jQuery("#enterin-wrapper").enterin.goToSlide(15);

		jQuery("body").addClass("universe");

		setTimeout(function(){
			jQuery(".enterin-slide").addClass("hidden");
			jQuery(".slide-11").removeClass("hidden");
			jQuery(".planet").removeClass("hidden");
			jQuery(".planet").addClass("lunar");
		},1500);

		app.rotateMessage();

		setTimeout(function(){
			app.endAnimation();
		},((app.effectTime+2)*1000));
		
	},

	endAnimation: function(){
		jQuery("#enterin-wrapper").fadeOut("slow");
		jQuery("#end-message").fadeIn("slow");
	},

	rotateMessage: function(){
		var lengthMessages = jQuery("#end-message .end").length;
		for(var i = 1; i <=lengthMessages; i++) {
			app.rotateH1(i);
		}
	},

	rotateH1: function(i){
		var fff = (((app.effectTime/jQuery("#end-message .end").length)*1030))*i;
		setTimeout(function(){
			jQuery("#end-message .end").stop().fadeOut(1400, function(){

				setTimeout(function(){
					jQuery("#end-message .end").eq(i-1).fadeIn(1000);
					jQuery(this).delay(2000).fadeOut();
				},1400);					
			});			
		},fff);	

	}

};

jQuery(function(){
	app.init();
});