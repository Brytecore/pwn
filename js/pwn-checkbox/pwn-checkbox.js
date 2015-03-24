/*! Pwn INPUT TYPE=CHECKBOX replacement. */

( function ( $, undefined ) {

	$.fn.pwn_checkbox = function () {

		return this.each( function () {
			var t = $( this );

			if ( 'input' !== t[0].tagName.toLowerCase() ||
				'checkbox' !== t.attr('type') ) {
				return;
			}

			var cb = $( "<div class='pwn-checkbox'></div>" );

			if ( t.prop( "checked" ) ) {
				cb.addClass( "checked" );
			}

			var label = t.parent( 'label.checkbox' );

			t.before( cb );
			t.hide();

			if ( 0 < label.length ) {
				label.on( "click touchstart", function ( e ) {
					e.preventDefault();
					t.prop( "checked", ! t.prop( "checked" ) ).change();
				});
			} else {
				cb.on( 'click touchstart', function ( e ) {
					t.prop( "checked", ! t.prop( "checked" ) ).change();
				});
			}

			t.on( "change", function() {
				if ( t.prop( "checked" ) ) {
					cb.addClass( "checked" );
				} else {
					cb.removeClass( "checked" );
				}
			});
		});
	};
}( jQuery ) );