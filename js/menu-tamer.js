( function ( $, l10n ) {
	var menuTamer = {

		init : function () {
			this.settings.init();
			this.setUpToggleElements();
			$( '#wpbody' ).on( 'sortstop', '#menu-to-edit', menuTamer.refresh );
		},

		settings : {

			menus : [],

			init : function () {
				var raw = getUserSetting( 'menuTamerCollapsed' ).toString(), x, temp;
				if ( /^\d+(s\d+)*/.test( raw ) ) {
					raw = raw.split( 's' );
					for ( x in raw ) {
						temp = parseInt( raw[x] );
						if ( temp ) {
							this.menus.push( temp );
						}
					}
				}
			},

			find : function ( id ) {
				var x;
				for ( x in this.menus ) {
					if ( this.menus[x] === id ) {
						return x;
					}
				}
				return undefined;
			},

			exists : function ( id ) {
				return ! ( this.find( id ) === undefined );
			},

			add : function ( id ) {
				id = parseInt( id );
				if ( ! this.exists( id ) ) {
					this.menus.push( id );
				}
				this.save();
			},

			remove : function ( id ) {
				id = parseInt( id );
				var key = this.find( id );
				if ( key === undefined ) {
					return;
				}
				delete this.menus[key];
				this.save();
			},

			save : function () {
				var val = this.menus.join( 's' );
				setUserSetting( 'menuTamerCollapsed', val );
			}

		},

		refresh : function () {
			setTimeout( function () {
				menuTamer.setUpToggleElements.call( menuTamer );
			}, 50 );
		},

		setUpToggleElements : function () {
			$( '.menuTamerToggle' ).each( function ( key, item ) {
				menuTamer.setUpToggleElement( item );
			} );
		},

		setUpToggleElement : function ( el ) {
			el = $(el);
			if ( ! el.data( 'menu-tamer-setup' ) ) {
				el.click( this.handleClick );
				if ( this.settings.exists( this.getMenuItemId( el ) ) ) {
					el.data( 'menu-tamer-collapsed', true );
					this.getMenuItem( el ).childMenuItems().hide();
				}
			}
			this.setText( el );
			if ( this.getMenuItem( el ).childMenuItems().length ) {
				el.removeClass( 'hidden' ).addClass( 'menuTamerActive' );
			} else {
				el.removeClass( 'menuTamerActive' ).addClass( 'hidden' );
			}
			el.data( 'menu-tamer-setup', true );
		},

		isCollapsed : function ( el ) {
			return !! ( $( el ).data( 'menu-tamer-collapsed' ) );
		},

		getMenuItemId : function ( el ) {
			var id = this.getMenuItem( el ).attr( 'id' ).replace( 'menu-item-', '' );
			return parseInt( id );
		},

		setState : function ( el ) {
			el = $( el );
			var new_state = ! $( el ).data( 'menu-tamer-collapsed' );
			if ( new_state ) {
				this.settings.add( this.getMenuItemId( el ) );
			} else {
				this.settings.remove( this.getMenuItemId( el ) );
			}
			el.data( 'menu-tamer-collapsed', new_state );
		},

		setText : function ( el ) {
			var textToUse = this.isCollapsed( el ) ? l10n.expand : l10n.collapse;
			$( el ).text( textToUse );
		},

		getMenuItem : function ( el ) {
			return $( el ).closest( '.menu-item' );
		},

		handleClick : function ( event ) {
			event.preventDefault();
			var t = this,
			menuItem = menuTamer.getMenuItem( t ),
			children = menuItem.childMenuItems();
			if ( ! menuTamer.isCollapsed( t ) ) {
				children.slideUp( 'fast' );
			} else {
				children.find( '.menuTamerActive' ).each( function ( key, item ) {
					if ( menuTamer.isCollapsed( item ) ) {
						children = children.not( menuTamer.getMenuItem( item ).childMenuItems() );
					}
				} );
				children.slideDown( 'fast' );
			}
			menuTamer.setState( t );
			menuTamer.setText( t );
		}

	}
	$( document ).ready( function () {
		menuTamer.init();
	} );
} )( jQuery, MenuTamerL10n );
