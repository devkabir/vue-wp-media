# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 component library that provides a WordPress media uploader integration. The project builds distributable Vue components that can be used in WordPress admin panels.

## Development Commands

```bash
# Development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Architecture

### Core Structure
- **src/WpMedia.vue**: Main Vue component that integrates with WordPress wp.media API
- **src/index.js**: Vue plugin installer and component export
- **plugin.php**: WordPress plugin file for local development and testing
- **admin.js**: WordPress admin script that mounts the Vue application

### Build System
- Uses Vite for building and development
- Configured as a library build targeting UMD and ES modules
- External dependency: Vue 3 (peer dependency)
- Outputs to `dist/` directory with CSS and JS bundles

### WordPress Integration
The component relies on WordPress's built-in media uploader:
- Requires `wp_enqueue_media()` to be called
- Uses `wp.media` global object for media frame creation
- Integrates with WordPress admin styling

### Component Architecture
- Single File Component (SFC) pattern
- Props-based configuration for media type, selection mode, UI customization
- Emits events for media selection
- Supports both single and multiple file selection
- Built-in button variants (primary, secondary, outline)

### Distribution Pattern
- Dual module format: UMD (`vue-wp-media.umd.js`) and ES modules (`vue-wp-media.es.js`)
- Separate CSS file (`vue-wp-media.css`) for styling
- Vue 3 as peer dependency (not bundled)
- Global name: `VueWpMedia` for script tag usage

### Development Testing
- Uses WordPress plugin architecture for local testing
- Admin page created at "Vue Media Test" with multiple component instances
- Live integration with WordPress media library

## Key Files
- `src/WpMedia.vue:42-73`: Core media frame logic and WordPress integration
- `vite.config.js:6-18`: Library build configuration
- `plugin.php:6-41`: WordPress plugin setup and script enqueuing
- `admin.js:1-25`: Vue 3 app initialization and component demonstrations