/* Pwn tabbed interface. */

( function ( $, undefined ) {

	$.fn.pwn_tabs = function () {

		return this.each( function () {
			var t = $( this );
			var tb, ph, phc, tabName;

			// Exit if this element has already had pwn_tabs run on it.
			if ( 'true' === t.attr( 'data-pwned' ) ) {
				return;
			}

			// Build accordion headers
			t.find( '.tab' ).each( function() {
				ph = $( this ).clone();
				phc = ( ph.hasClass( 'active') ) ? "page-header active" : "page-header";
				ph.attr( "class", phc );
				ph.insertBefore( $( ".page[data-tab='" + ph.attr( 'data-tab' ) + "']") );
			});

			// Change page on tab/accordion click
			t.on( "click touchstart", ".tab, .page-header", function( e ) {
				e.preventDefault();

				tb = $( this );
				if ( tb.hasClass( 'active' ) ) {
					// Exit if current tab is already active
					return;
				}

				// Determine which tab was clicked
				tabName = tb.attr( 'data-tab' );

				// Remove active class from all pages, tabs and page-headers
				$( '.tab, .page-header, .page', t ).removeClass( 'active' );

				// Add active class to active page, tab and page-header
				$( ".page[data-tab='" + tabName + "'], .tab[data-tab='" + tabName + "'], .page-header[data-tab='" + tabName + "']", t ).addClass( 'active' );

				// Trigger the tabChanged event.
				t.trigger( 'tabChanged', tabName );
			});

			// Track that this element has been altered, in order to prevent
			// running this code again, even if user tries to.
			t.attr( 'data-pwned', 'true' );
		});
	};

}( jQuery ) );
