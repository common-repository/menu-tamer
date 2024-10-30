<?php

class MenuTamer {

	public static function init() {
		self::load_l10n();
		$jsFile = (defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG) ? 'js/menu-tamer.js' : 'js/menu-tamer.min.js';
		wp_enqueue_script( 'menu-tamer', plugins_url( $jsFile, __FILE__ ), array( 'jquery' ), '0.1.1', true );
		wp_localize_script( 'menu-tamer', 'MenuTamerL10n', array(
			'collapse' => __( 'Collapse', 'menu-tamer' ),
			'expand' => __( 'Expand', 'menu-tamer' ),
		) );
	}

	protected static function load_l10n() {
		load_plugin_textdomain( 'menu-tamer', false, dirname( MT_PLUGIN_BASENAME ) . '/lang' );
	}

	public static function nav_edit_walker() {
		require_once dirname( __FILE__ ) . '/MenuTamerWalkerClass.php';
		return 'Walker_MenuTamer_Nav_Menu_Edit';
	}

}
