/*! Pwn JavaScript library v0.0.2 - http://www.pwncss.com
 *  Copyright 2015 Brytecore, LLC
 *  Licensed under MIT - https://github.com/Brytecore/pwn/blob/master/LICENSE
 */
/* Pwn INPUT TYPE=CHECKBOX replacement. */

( function ( $, undefined ) {

	$.fn.pwn_checkbox = function () {

		return this.each( function () {
			var t = $( this );

			if ( 'input' !== t[0].tagName.toLowerCase() ||
				'checkbox' !== t.attr('type') ||
				'true' === t.attr( 'data-pwned' ) ) {
				return;
			}

			var cb = $( "<div class='pwn-checkbox'></div>" );

			if ( t.prop( "checked" ) ) {
				cb.addClass( "checked" );
			}

			var label = t.parent( 'label.checkbox' );

			t.before( cb );
			t.hide().attr( 'data-pwned', 'true' );

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

/* Pwn SELECT replacement. */

( function ( $, undefined ) {

	$.fn.pwn_select = function () {

		return this.each( function () {
			var t = $( this );

			if ( 'select' !== t[0].tagName.toLowerCase() ||
				'true' === t.attr( 'data-pwned' ) ) {
				return;
			}

			// Build the pwn select
			var cont = $( "<div class='pwn-select'></div>" );
			var field = $( "<div class='pwn-select-value'></div>" );
			var ddl = $( "<div class='pwn-select-list'></div>" );
			var arrow_cont = $( "<div class='pwn-select-arrow'></div>" );

			var current_value, current_text, current_option;

			// Build the drop-down list
			t.children( 'option' ).each( function () {
				var c = $( this );

				current_option = $( "<div class='pwn-select-option'></div>" );
				current_option.attr( 'data-value', c.val() );
				current_option.text( c.text() );

				if ( c.is( ':selected' ) ) {
					current_value = c.val();
					current_text = c.text();
					current_option.addClass( 'selected' );
				}

				ddl.append( current_option );
			} );

			// Get the first option value if none selected
			if ( undefined == current_value || '' == current_value ) {
				var option = t.children( ":first" );
				current_value = option.val();
				current_text = option.text();
				ddl.children( ":first" ).addClass( 'selected' );
				field.addClass( 'not-selected' );
			}

			// Set the initial value to the selected option value
			field.text( current_text );

			cont.append( field );
			cont.append( ddl );
			cont.append( arrow_cont );

			// Insert the pwn select and hide the html select
			t.before( cont );
			t.hide().attr( 'data-pwned', 'true' );

			// Attach events

			// Show ddl on click
			field.on( "click", function () {
				ddl.toggle();
				arrow_cont.toggleClass( 'expanded' );
			} );

			arrow_cont.on( "click", function () {
				ddl.toggle();
				arrow_cont.toggleClass( 'expanded' );
			} );

			// Hide ddl on mouse click outside list
			$( document ).on( "mouseup", function ( e ) {
				if ( ! cont.is( e.target ) && 0 === cont.has( e.target ).length ) {
					ddl.hide();
					arrow_cont.removeClass( 'expanded' );
				}
			} );

			t.on( 'change', function () {
				var text = t.children( ':selected' ).text();
				var value = t.val();
				if ( '' === value ) {
					field.addClass( 'not-selected' );
				} else {
					field.removeClass( 'not-selected' );
				}
				field.text( text );
				ddl.children( '.pwn-select-option' ).removeClass( 'selected' );
				ddl.children( ".pwn-select-option[data-value='" + value + "']" ).addClass( 'selected' );
			} );

			ddl.on( 'click', '.pwn-select-option', function () {
				var o = $( this );
				if ( ! o.hasClass( 'selected' ) ) {
					t.val( o.attr( 'data-value' ) ).change();
					ddl.hide();
					arrow_cont.removeClass( 'expanded' );
				}
			} )

		} );
	};

}( jQuery ) );

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
