/* Pwn tabbed interface. */

( function ( $, undefined ) {

	$.fn.pwn_tabs = function () {

		return this.each( function () {
			var t = $( this );

			if ( 'true' === t.attr( 'data-pwned' ) ) {
				return;
			}

			t.on( "click touchstart", ".tab", function( e ) {
				e.preventDefault();
				var tb = $( this );
				$( '.tab, .page', t ).removeClass( 'active' );
				$( ".page[data-tab=" + tb.attr( 'data-tab' ) + "], .tab[data-tab=" + tb.attr( 'data-tab' ) + "]", t ).addClass( 'active' );
			});

			t.attr( 'data-pwned', 'true' );
		});
	};

}( jQuery ) );
