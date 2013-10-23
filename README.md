# EnterIN

> A CSS 3 and Javascript Effect inspired by [HTC ONE EXPLORE](http://one.htc.com/experienceit/index.html)

## How it work

### jQuery Library:

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>

### Bootstrap 3:
	
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/bootstrap-theme.min.css">
	
	<script src="js/vendor/bootstrap.min.js"></script>

### Main Javascript:

    <script src="js/main.js"></script>
    
### Main Style:    

    <link rel="stylesheet" href="css/main.css" />
    
### EnterIN logic:    

#### EnterIN controller example:
    
    <a data-enterin="0">Click me for main slide</a>
    <a data-enterin="2">Click me for slide 2</a>
    <a data-enterin="3">Click me for slide 3</a>
    
#### EnterIN div slides class:

	class: .v-div
	
	<div id="v1" class="v-div"></div>
	<div id="v2" class="v-div"></div>
	<div id="v3" class="v-div"></div>
		
#### EnterIN #id .v-div backgrounds:

	#v1 {
		background: url("../img/mac.jpg") no-repeat center center transparent;
		background-size: 97%;			
	}
	
	#v2 {
		background: url("../img/ipad.png") no-repeat center center transparent;
		background-size: 110%;
		margin-top:10%;
	}
	
	#v3 {
		background: url("../img/iphone.png") no-repeat center center transparent;
		background-size: 50%;			
	}

#### EnterIN <body> class change logic example:

#### html logic:

the controller click event add some classes with "e" prefix to &lt;body&gt; tag
		
example:
		
##### [data-enterin="2"] clicked:

	body like this:
		
		<body class="e2">
				
##### [data-enterin="3"] clicked:

body like this:
		
	<body class="e2 e3">
		
##### [data-enterin="4"] clicked:

body like this:
		
	<body class="e2 e3 e4">	
					
#### css logic:
		
when data-enterin="2" was clicked and &lt;body&gt; have e2 class:
		
	body.e2 #v1 {
		width:250%;
		opacity:0;
		z-index:0;	
	}
			
	body.e2 #v2 {
		width:100%;
		opacity:1;
		z-index:1;	
	}

#### javascript logic:

jquery on document load:

	jQuery(function() {
	
		enterin.init();
	
	});
		
on call <b>enterin.init()</b> set default slide to 0:

	enterin.changeSlide(0);
		
when slide change, remove all <b>.active</b> classes from controller:

	jQuery("[data-enterin]").removeClass("active");
	jQuery("[data-enterin='"+to+"']").addClass("active");	
		
when slide change, remove all e(n) class from &lt;body&gt; by .v-div count:
			
	for(var i = 1; i <= (jQuery(".v-div").length); i++ ) {
	
		jQuery("body").removeClass("e"+i);
	
	}

when slide change, add some class to &lt;body&gt; at start point "2" to [data-enterin="(n)"]:
		
	for(var a = 2; a<=to; a++) {
		
		jQuery("body").addClass("e"+a);
		
	}

		
© 2013 Gianfilippo Balestriero under [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)
