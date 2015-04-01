/* Pwn INPUT TYPE=RADIO replacement. */

( function ( $, undefined ) {

	$.fn.pwn_radio = function () {

		return this.each( function () {
			var t = $( this );
			var name = t.attr( "name" );

			if ( 'input' !== t[0].tagName.toLowerCase() ||
				'radio' !== t.attr('type') ||
				'true' === t.attr( 'data-pwned' ) ) {
				return;
			}

			var rd = $( "<div class='pwn-radio'></div>" );
			rd.attr( "name", name );

			if ( t.prop( "checked" ) ) {
				rd.addClass( "checked" );
			}

			if ( t.prop( "inverse" ) ) {
				rd.addClass( "inverse" );
			}

			var label = t.parent( 'label.radio' );

			t.before( rd );
			t.hide().attr( 'data-pwned', 'true' );

			if ( 0 < label.length ) {
				label.on( "click touchstart", function ( e ) {
					e.preventDefault();
					t.prop( "checked", ! t.prop( "checked" ) ).change();
				});
			} else {
				rd.on( 'click touchstart', function ( e ) {
					t.prop( "checked", ! t.prop( "checked" ) ).change();
				});
			}

			t.on( "change", function() {
				$( ".pwn-radio[name=" + name + "]" ).removeClass( "checked" );

				if ( t.prop( "checked" ) ) {
					rd.addClass( "checked" );
				} else {
					rd.removeClass( "checked" );
				}
			});
		});
	};
}( jQuery ) );
