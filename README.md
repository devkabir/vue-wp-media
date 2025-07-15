# Vue WP Media

A Vue 3 component that opens the WordPress media uploader with customizable styling and behavior. Features multiple button variants, media type filtering, and responsive design.

## Install

```bash
npm install vue-wp-media
```

## Usage

### Basic Usage

```js
import { createApp } from "vue";
import App from "./App.vue";
import VueWpMedia from "vue-wp-media";

const app = createApp(App);
app.use(VueWpMedia);
app.mount("#app");
```

```vue
<template>
  <WpMedia @select="(url) => (image = url)">Select Image</WpMedia>
  <img :src="image" v-if="image" />
</template>
```

### Advanced Usage

```vue
<template>
  <div>
    <!-- Primary button with custom text -->
    <WpMedia 
      @select="onSelect"
      button-text="Choose Image"
      title="Select an Image"
      button-label="Use this image"
    />
    
    <!-- Secondary button with custom width -->
    <WpMedia 
      @select="onSelect"
      variant="secondary"
      button-text="Browse Media"
      width="150px"
    />
    
    <!-- Outline button for files -->
    <WpMedia 
      @select="onSelect"
      variant="outline"
      media-type="application"
      title="Select a File"
      button-label="Use this file"
    />
    
    <!-- Multiple selection -->
    <WpMedia 
      @select="onMultipleSelect"
      :multiple="true"
      button-text="Select Multiple Images"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedMedia = ref('')
const multipleMedia = ref([])

const onSelect = (url) => {
  selectedMedia.value = url
}

const onMultipleSelect = (mediaArray) => {
  multipleMedia.value = mediaArray
}
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `button-text` | String | `"Select Media"` | Text displayed on the button |
| `title` | String | `"Select Media"` | Title of the media picker dialog |
| `button-label` | String | `"Use this media"` | Label for the media picker's use button |
| `media-type` | String | `"image"` | Media type filter: `"image"`, `"audio"`, `"video"`, `"application"` |
| `multiple` | Boolean | `false` | Allow multiple file selection |
| `variant` | String | `"primary"` | Button style: `"primary"`, `"secondary"`, `"outline"` |
| `width` | String | `"auto"` | Custom button width |
| `height` | String | `"auto"` | Custom button height |
| `disabled` | Boolean | `false` | Disable the button |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `select` | `String \| Array` | Emitted when media is selected. Returns URL string for single selection, array of media objects for multiple selection |

## Button Variants

- **Primary**: WordPress admin blue button (default)
- **Secondary**: Light gray button
- **Outline**: Transparent button with blue border

## Styling

The component includes scoped CSS with WordPress admin color scheme. All styles are prefixed with `.wp-media-button` to avoid conflicts.

## Requirements

- Vue 3
- WordPress environment with `wp_enqueue_media()` called
- WordPress media uploader scripts loaded
