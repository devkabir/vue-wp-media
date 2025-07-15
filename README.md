# Vue WP Media

A simple Vue 3 component that opens the WordPress default media uploader and emits the selected image URL.

## Install

```bash
npm install vue-wp-media
```

## Usage

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
  <WpMedia @select="(url) => (image = url)">Upload</WpMedia>
  <img :src="image" v-if="image" />
</template>
```
