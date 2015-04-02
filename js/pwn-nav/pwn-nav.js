/* Pwn navigation menu. */

( function ( $, undefined ) {

	$.fn.pwn_nav = function() {

		return this.each( function () {
			var t = $( this );

			$( ".hamburger", t ).on( "click", function(e) {
				e.preventDefault();

				$( ".menu", t ).toggleClass( "expanded" );
			});
		});
	};
}( jQuery ) );
