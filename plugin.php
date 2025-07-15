<?php
/**
 * Plugin Name: Vue WP Media (Local Dev)
 */

add_action('admin_menu', function () {
    add_menu_page('Vue Media Test', 'Vue Media Test', 'manage_options', 'vue-media-test', function () {
        echo '<div id="app"></div>';
    });
});

add_action('admin_enqueue_scripts', function () {
    wp_enqueue_media(); // WP media uploader

    // Load Vue from CDN or locally
    wp_enqueue_script('vue', 'https://unpkg.com/vue@3/dist/vue.global.prod.js');

    // Load built Vue component (from same dir)
    wp_enqueue_script(
        'vue-wp-media',
        plugin_dir_url(__FILE__) . 'dist/vue-wp-media.umd.js',
        ['vue'],
        null,
        true
    );

    // Load Vue app mount script
    wp_enqueue_script(
        'vue-wp-media-init',
        plugin_dir_url(__FILE__) . 'admin.js',
        ['vue-wp-media'],
        null,
        true
    );
});