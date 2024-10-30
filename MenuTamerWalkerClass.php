<?php

class Walker_MenuTamer_Nav_Menu_Edit extends Walker_Nav_Menu_Edit {

	function start_el( &$output, $item, $depth, $args ) {
		$tempOutput = '';
		parent::start_el( $tempOutput, $item, $depth, $args );
		$location = strpos( $tempOutput, '<a class="item-edit"' );
		$parts = array(
			substr( $tempOutput, 0, $location ),
			'<a href="#" class="item-type hide-if-no-js hidden menuTamerToggle"></a>',
			"\n\t\t\t\t\t\t",
			substr( $tempOutput, $location ),
		);
		$tempOutput = implode( '', $parts );
		$output .= $tempOutput;
	}

}
