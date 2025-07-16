# Vue WP Media

A simple button for WordPress that lets you pick pictures, videos, and files. Works with Vue 3 and is super easy to use!

## What does this do?

If you have a WordPress website and want to add a "Choose File" button that opens WordPress's file picker, this package does exactly that. No coding experience needed!

## Why use this?

### ✅ **Super Easy**
- Just 3 lines of code to get a working file picker
- No complicated setup
- Works right away

### ✅ **Uses WordPress Files**
- Uses the same file picker as WordPress admin
- All your uploaded files are there
- Same look and feel users know

### ✅ **Perfect for**
- Adding file pickers to your WordPress site
- Letting users choose images, videos, or documents
- Making WordPress admin pages with Vue

## What you need

- A WordPress website
- Vue 3 (a JavaScript tool)
- Basic HTML knowledge

## How to install

Type this in your project folder:

```bash
npm install vue-wp-media
```

## How to use

### Method 1: The Easy Way

Step 1: Add to your Vue app
```js
import { createApp } from "vue";
import App from "./App.vue";
import VueWpMedia from "vue-wp-media";

const app = createApp(App);
app.use(VueWpMedia);
app.mount("#app");
```

Step 2: Use in your page
```vue
<template>
  <WpMedia v-model="myFile" button-text="Choose File" />
  <p>You picked: {{ myFile.filename }}</p>
</template>

<script setup>
import { ref } from "vue";
const myFile = ref({});
</script>
```

Done! You now have a working file picker.

### Method 2: Import the piece you need

```vue
<template>
  <WpMedia v-model="myFile" button-text="Choose File" />
</template>

<script setup>
import { ref } from "vue";
import { WpMedia } from "vue-wp-media";

const myFile = ref({});
</script>
```

## Examples

### Pick one image
```vue
<template>
  <WpMedia v-model="photo" button-text="Pick Photo" />
  <img :src="photo.url" v-if="photo.url" />
</template>

<script setup>
import { ref } from "vue";
const photo = ref({});
</script>
```

### Pick multiple files
```vue
<template>
  <WpMedia v-model="files" :multiple="true" button-text="Pick Files" />
  
  <div v-for="file in files" :key="file.id">
    <p>{{ file.filename }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
const files = ref([]);
</script>
```

### Pick only images
```vue
<template>
  <WpMedia v-model="image" media-type="image" button-text="Pick Image" />
</template>
```

### Pick only videos
```vue
<template>
  <WpMedia v-model="video" media-type="video" button-text="Pick Video" />
</template>
```

### Make the button look nice
```vue
<template>
  <!-- Blue button -->
  <WpMedia v-model="file1" class="button button-primary" button-text="Primary" />
  
  <!-- Gray button -->
  <WpMedia v-model="file2" class="button button-secondary" button-text="Secondary" />
</template>
```

## Settings you can change

| Setting | What it does | Default |
|---------|-------------|---------|
| `button-text` | Text on the button | "Select Media" |
| `title` | Title of the popup | "Select Media" |
| `button-label` | Text on "Use" button | "Use this media" |
| `media-type` | What files to show | "all" |
| `multiple` | Pick many files | false |

### File types you can pick
- `image` - Pictures only
- `video` - Videos only  
- `audio` - Sound files only
- `application` - Documents (PDF, Word, etc.)
- `text` - Text files
- `all` - Any file type

## What you get when someone picks a file

```js
{
  id: 123,                    // WordPress file number
  url: "https://...",         // Link to the file
  filename: "my-photo.jpg",   // File name
  alt: "A nice photo",        // Alt text for images
  title: "My Photo",          // File title
  mime: "image/jpeg",         // File type
  type: "image",              // General type
}
```

## Setup WordPress

Your WordPress needs this code (ask a developer to add it):

```php
function my_media_scripts() {
    wp_enqueue_media(); // This loads WordPress file picker
    wp_enqueue_script('vue-wp-media', 'path/to/vue-wp-media.umd.js');
    wp_enqueue_style('vue-wp-media', 'path/to/vue-wp-media.css');
}
add_action('admin_enqueue_scripts', 'my_media_scripts');
```

## Use without building

If you don't want to build anything, copy this code:

```html
<!-- Load Vue 3 -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<!-- Load this tool -->
<script src="path/to/vue-wp-media.umd.js"></script>

<div id="app">
  <WpMedia v-model="myFile" button-text="Pick File"></WpMedia>
</div>

<script>
const { createApp } = Vue;
const { WpMedia } = VueWpMedia;

createApp({
  components: { WpMedia },
  setup() {
    const myFile = Vue.ref({});
    return { myFile };
  },
}).mount("#app");
</script>
```

## Test it

### Build commands
```bash
# Start development
npm run dev

# Build for your website
npm run build

# Preview your build
npm run preview
```

### Test with WordPress
1. Put this folder in `wp-content/plugins/vue-wp-media/`
2. Turn on the plugin in WordPress admin
3. Go to "Vue Media Test" page to try it

## Before and after

**Before (hard way):**
```js
// Lots of complicated code (100+ lines)
let mediaFrame = wp.media({
  title: 'Select Media',
  state: 'library',
  library: { type: 'image' },
  multiple: false
});

mediaFrame.on('select', function() {
  // More complicated code...
});

// Even more code...
```

**After (easy way):**
```vue
<template>
  <WpMedia v-model="selectedImage" button-text="Pick Image" />
</template>

<script setup>
import { ref } from "vue"
import { WpMedia } from "vue-wp-media"

const selectedImage = ref({})
</script>
```

Much easier! 🎉

## What browsers work

- Chrome, Firefox, Safari, Edge
- WordPress 5.0 or newer
- Vue 3.0 or newer

## License

MIT License - free to use for any project!

---

**Made simple for everyone to use!**