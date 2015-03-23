/*! Pwn INPUT TYPE=RADIO replacement. */

( function ( $, undefined ) {

	$.fn.pwn_radio = function () {

		return this.each( function () {
			var t = $( this );

			if ( 'input' !== t[0].tagName.toLowerCase() ||
				'radio' !== t.attr('type') ) {
				return;
			}

			var rd = $( "<div class='pwn-radio'></div>" );

			if ( t.prop( "checked" ) ) {
				rd.addClass( "checked" );
			}

			var label = t.parent( 'label.radio' );

			t.before( rd );
			t.hide();

			if ( 0 < label.length ) {
				label.on( "click touchstart", function ( e ) {
					e.preventDefault();
					rd.toggleClass( 'checked' );
					t.prop( "checked", ! t.prop( "checked" ) ).change();
				});
			} else {
				rd.on( 'click touchstart', function ( e ) {
					rd.toggleClass( 'checked' );
					t.prop( "checked", ! t.prop( "checked" ) ).change();
				});
			}
		});
	};
}( jQuery ) );
