<template>
  <button @click="openMedia"><slot>Select Image</slot></button>
</template>

<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["select"]);

let mediaFrame = null;

function openMedia() {
  if (!window.wp?.media) {
    console.warn(
      "WordPress media uploader not available. Call wp_enqueue_media()."
    );
    return;
  }

  if (!mediaFrame) {
    mediaFrame = wp.media({
      title: "Select an image",
      button: { text: "Use this image" },
      library: { type: "image" },
      multiple: false,
    });

    mediaFrame.on("select", () => {
      const selected = mediaFrame.state().get("selection").first().toJSON();
      emit("select", selected.url);
    });
  }

  mediaFrame.open();
}
</script>
