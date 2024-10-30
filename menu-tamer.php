<?php

/*
Plugin Name: Menu Tamer
Version: 1.0.1
Description: Make your nav menus easier to work with
Plugin URI: http://github.com/avendi-media/menu-tamer
Author: Avendi Media
Author URI: http://www.avendimedia.com/
License: GPLv2 or later
Text Domain: menu-tamer
*/
/*
Copyright (C) 2012  Avendi Media, Inc.

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

if ( is_admin() ) {
	define( 'MT_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );
	require_once dirname( __FILE__ ) . '/MenuTamerClass.php';
	add_filter( 'wp_edit_nav_menu_walker', array( 'MenuTamer', 'nav_edit_walker' ) );
	add_action( 'load-nav-menus.php', array( 'MenuTamer', 'init' ) );
}
