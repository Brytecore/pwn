/* Pwn tabbed interface. */

( function ( $, undefined ) {

	$.fn.pwn_tabs = function () {

		return this.each( function () {
			var t = $( this );
			var tb, ph, phc, tabName;

			if ( 'true' === t.attr( 'data-pwned' ) ) {
				return;
			}

			// Build accordian headers
			t.find( '.tab' ).each( function() {
				ph = $( this ).clone();
				phc = ( ph.hasClass( 'active') ) ? "page-header active" : "page-header";
				ph.attr( "class", phc );
				ph.insertBefore( $( ".page[data-tab=" + ph.attr( 'data-tab' ) + "]") );
			});

			t.on( "click touchstart", ".tab", function( e ) {
				// Tab click
				e.preventDefault();
				tb = $( this );
				tabName = tb.attr( 'data-tab' );
				$( '.tab, .page', t ).removeClass( 'active' );
				$( ".page[data-tab=" + tabName + "], .tab[data-tab=" + tabName + "]", t ).addClass( 'active' );
				t.trigger( 'tabChanged', tabName );
			}).on( "click touchstart", ".page-header", function(e) {
				// Accordian click
				e.preventDefault();
				ph = $( this );
				tabName = ph.attr( 'data-tab' );
				$( '.page-header, .page', t ).removeClass( 'active' );
				$( ".page[data-tab=" + tabName + "], .page-header[data-tab=" + tabName + "]", t ).addClass( 'active' );
				t.trigger( 'tabChanged', tabName );
			});

			t.attr( 'data-pwned', 'true' );
		});
	};

}( jQuery ) );
