/*
* 
* EnterIN JS | The new Front(ier)end of web development
* Copyright (c) 2013 Gianfilippo Balestriero <enterin.github@gmail.com>
* 
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as
* published by the Free Software Foundation, either version 3 of the
* License, or (at your option) any later version.
* 
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Affero General Public License for more details.
* 
* You should have received a copy of the GNU Affero General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
* 
*/
var main = {
	init: function(){
		main.makePaypalForm();
		main.makeMailTo();
	},
	makePaypalForm: function(){
		var html = [];
		html.push('<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">');
		html.push('<input type="hidden" name="cmd" value="_donations">');
		html.push('<input type="hidden" name="business" value="gianbalexdev@gmail.com">');
		html.push('<input type="hidden" name="lc" value="US">');
		html.push('<input type="hidden" name="item_name" value="Donation for Contribute to the EnterIN Framework Project">');
		html.push('<input type="hidden" name="item_number" value="enterin_pp">');
		html.push('<input type="text" name="amount" value="25.00"><span class="s">$</span>');
		html.push('<input type="hidden" name="currency_code" value="USD">');
		html.push('<input type="hidden" name="bn" value="PP-DonationsBF:btn_donate_LG.gif:NonHosted">');
		html.push('<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">');
		html.push('<img alt="" border="0" src="https://www.paypalobjects.com/it_IT/i/scr/pixel.gif" width="1" height="1">');
		html.push('</form>');

		jQuery("#donate").html(html.join(""));
	},
	makeMailTo: function(){
		jQuery("#email").attr("href", "mailto:"+main.generateMail()).text(main.generateMail());
	},
	generateMail: function(){
		return 'ent'+'er'+'in'+'.git'+'hub'+'@gmail'+'.com';
		
	}
};

jQuery(function(){
	main.init();
});