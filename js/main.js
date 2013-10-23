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


/*
 * timeout for slides in milliseconds
 */

var time = 1000;

var enterin = {
	
	init: function() {
		
		enterin.bindEnterButtons();
		
		enterin.changeSlide(0);
		
	},
	
	bindEnterButtons: function() {
		
		jQuery("a[data-enterin]").click(function(){
			
			var $this  	= jQuery(this);
			var $to	    = $this.data("enterin");
			
			enterin.changeSlide($to);
			
		});
		
	},
	
	changeSlide: function(to) {
		
		jQuery("[data-enterin]").removeClass("active");
		jQuery("[data-enterin='"+to+"']").addClass("active");		
			
		for(var i = 1; i <= (jQuery(".v-div").length); i++ ) {
			
			jQuery("body").removeClass("e"+i);
			
		}
		
		if(to == 0) {
			
			return;
			
		}

		
		for(var a = 2; a<=to; a++) {
			
			jQuery("body").addClass("e"+a);
			
		}
		
	}
	
};


jQuery(function() {
	
	enterin.init();
	
});



