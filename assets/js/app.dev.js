/*!
 * @author: Pojo Team
 */
/* global jQuery, PojoA11yOptions */


( function() {
	var is_webkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
		is_opera = navigator.userAgent.toLowerCase().indexOf( 'opera' ) > -1,
		is_ie = navigator.userAgent.toLowerCase().indexOf( 'msie' ) > -1;

	if ( ( is_webkit || is_opera || is_ie ) && document.getElementById && window.addEventListener ) {
		window.addEventListener( 'hashchange', function() {
			var id = location.hash.substring( 1 ),
				element;

			if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
				return;
			}

			element = document.getElementById( id );

			if ( element ) {
				if ( !( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
					element.tabIndex = -1;
				}
				element.focus();
			}
		}, false );
	}
} )();



( function( $, window, document, undefined ) {
	'use strict';
	
	var Pojo_Accessibility_App = {
		cache: {
			$document: $( document ),
			$window: $( window )
		},

		cacheElements: function() {
			this.cache.$toolbar = $( '#pojo-a11y-toolbar' );
			this.cache.$toolbarLinks = this.cache.$toolbar.find( 'div.pojo-a11y-toolbar-overlay a.pojo-a11y-toolbar-link' );
			this.cache.$btnBackgrounGroup = this.cache.$toolbar.find( 'a.pojo-a11y-btn-background-group' );
			this.cache.$body = $( 'body' );
		},

		bindToolbarButtons: function() {
			var $self = this;

			function resizeFont( event ) {
				event.preventDefault();

				var MAX_SIZE = 200,
					MIN_SIZE = 120,
					action = $( this ).data( 'action' ),
					oldFontSize = $self.currentFontSize;

				if ( 'plus' === action && MAX_SIZE > oldFontSize ) {
					$self.currentFontSize += 10;
				}

				if ( 'minus' === action && MIN_SIZE < oldFontSize ) {
					$self.currentFontSize -= 10;
				}

				$self.cache.$body.removeClass( 'pojo-a11y-resize-font-' + oldFontSize );

				if ( 120 !== $self.currentFontSize ) {
					$self.cache.$toolbar.find( 'a.pojo-a11y-btn-resize-plus' ).addClass( 'active' );
					$self.cache.$body.addClass( 'pojo-a11y-resize-font-' + $self.currentFontSize );
				} else {
					$self.cache.$toolbar.find( 'a.pojo-a11y-btn-resize-plus' ).removeClass( 'active' );
				}
				
			}
			
			function backgrounGroup( event ) {
				event.preventDefault();
				
				var currentAction = $( this ).data( 'action' ),
					isButtonActive = $( this ).hasClass( 'active' ),
					bodyClasses = {
						'grayscale': 'pojo-a11y-grayscale',
						'high_contrast': 'pojo-a11y-high-contrast',
						'negative_contrast': 'pojo-a11y-negative-contrast',
						'light-bg': 'pojo-a11y-light-background'
					};
				
				$.each( bodyClasses, function( action, bodyClass ) {
					if ( currentAction === action && ! isButtonActive ) {
						$self.cache.$body.addClass( bodyClass );
					} else {
						$self.cache.$body.removeClass( bodyClass );
					}
				} );
				
				$self.cache.$btnBackgrounGroup.removeClass( 'active' );
				
				if ( ! isButtonActive ) {
					$( this ).addClass( 'active' );
				}
			}

			function linksUnderline( event ) {
				event.preventDefault();
				$self.cache.$body.toggleClass( 'pojo-a11y-links-underline' );
				$( this ).toggleClass( 'active' );
			}

			function readableFont( event ) {
				event.preventDefault();
				$self.cache.$body.toggleClass( 'pojo-a11y-readable-font' );
				$( this ).toggleClass( 'active' );
			}

			function reset( event ) {
				event.preventDefault();

				$self.cache.$body.removeClass( 'pojo-a11y-grayscale pojo-a11y-high-contrast pojo-a11y-negative-contrast pojo-a11y-light-background pojo-a11y-links-underline pojo-a11y-readable-font' );
				$self.cache.$toolbarLinks.removeClass( 'active' );
				
				var MIN_SIZE = 120;
				$self.cache.$body.removeClass( 'pojo-a11y-resize-font-' + $self.currentFontSize );
				$self.currentFontSize = MIN_SIZE;
			}

			$self.currentFontSize = 120;
			$self.cache.$toolbar.find( 'a.pojo-a11y-btn-resize-font' ).click(resizeFont);
			$self.cache.$btnBackgrounGroup.click(backgrounGroup);
			$self.cache.$toolbar.find( 'a.pojo-a11y-btn-links-underline' ).click(linksUnderline);
			$self.cache.$toolbar.find( 'a.pojo-a11y-btn-readable-font' ).click(readableFont);
			$self.cache.$toolbar.find( 'a.pojo-a11y-btn-reset' ).click(reset);
		},

		
		init: function() {
			this.cacheElements();
			this.bindToolbarButtons();
		}
	};

	$( document ).ready( function( $ ) {
		var plugin;
		if(plugin = document.querySelector('#da11y-plugin')) {
			plugin.innerHTML = '<div id="da11y-toggle"></div><div id="da11y-options"></div>';
		}

		$('#da11y-toggle').attr("tabindex",0);
		
		function da11yToggle(){
			var o = $('#da11y-options');
			o.hasClass("active") ? o.removeClass("active") : o.addClass("active");

			var t = $(this);
			t.hasClass("active") ? t.removeClass("active") : t.addClass("active");
		}
		function da11yToggleActive(){
			$('#da11y-options').addClass("active");
			$('#da11y-toggle').addClass("active");
		}
		
		$('#da11y-toggle').click(da11yToggle);
// 	    $('#da11y-toggle').focus(da11yToggleActive);

	    $('#da11y-options').append(
			'<nav id="pojo-a11y-toolbar" class="pojo-a11y-toolbar-left" role="navigation"><ul>' +
				'<li class="pojo-a11y-toolbar-item">' +
				'<a tabindex="0" href="#" class="pojo-a11y-toolbar-link pojo-a11y-btn-resize-font pojo-a11y-btn-resize-plus" data-action="plus" tabindex="-1">הגדל טקסט</a></li>' +
				'<li class="pojo-a11y-toolbar-item">' +
				'<a tabindex="0" href="#" class="pojo-a11y-toolbar-link pojo-a11y-btn-resize-font pojo-a11y-btn-resize-minus" data-action="minus" tabindex="-1">הקטן טקסט</a><' +
				'/li><li class="pojo-a11y-toolbar-item">' +
				'<a tabindex="0" href="#" class="pojo-a11y-toolbar-link pojo-a11y-btn-background-group pojo-a11y-btn-grayscale" data-action="grayscale" tabindex="-1">גווני אפור</a></li>' +
				'<li class="pojo-a11y-toolbar-item">' +
				'<a tabindex="0" href="#" class="pojo-a11y-toolbar-link pojo-a11y-btn-background-group pojo-a11y-btn-high-contrast" data-action="high_contrast" tabindex="-1">ניגודיות גבוהה</a></li>' +
				'<li class="pojo-a11y-toolbar-item">' +
				'<a tabindex="0" href="#" class="pojo-a11y-toolbar-link pojo-a11y-btn-background-group pojo-a11y-btn-negative-contrast" data-action="negative_contrast" tabindex="-1">ניגודיות הפוכה</a></li>' +
				'<li class="pojo-a11y-toolbar-item">' +
				'<a tabindex="0" href="#" class="pojo-a11y-toolbar-link pojo-a11y-btn-background-group pojo-a11y-btn-light-bg" data-action="light-bg" tabindex="-1">רקע בהיר</a></li>' +
				'<li class="pojo-a11y-toolbar-item">' +
				'<a tabindex="0" href="#" class="pojo-a11y-toolbar-link pojo-a11y-btn-links-underline" tabindex="-1">הדגשת קישורים</a></li>' +
				'<li class="pojo-a11y-toolbar-item">' +
				'<a tabindex="0" href="#" class="pojo-a11y-toolbar-link pojo-a11y-btn-readable-font" tabindex="-1">פונט קריא</a>' +
				'</li><li class="pojo-a11y-toolbar-item">' +
				'<a tabindex="0" href="#" class="pojo-a11y-toolbar-link pojo-a11y-btn-reset" tabindex="-1">איפוס</a></li>' +
			'</ul></nav>');

		Pojo_Accessibility_App.init();
	});

}( jQuery, window, document ) );
