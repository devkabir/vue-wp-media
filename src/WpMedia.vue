<template>
  <button 
    @click="openMedia" 
    :class="['wp-media-button', variant, { disabled: disabled }]"
    :disabled="disabled"
    :style="{ width: width, height: height }"
  >
    <slot>{{ buttonText }}</slot>
  </button>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  buttonText: {
    type: String,
    default: "Select Media"
  },
  title: {
    type: String,
    default: "Select Media"
  },
  buttonLabel: {
    type: String,
    default: "Use this media"
  },
  mediaType: {
    type: String,
    default: "image",
    validator: (value) => ["image", "audio", "video", "application"].includes(value)
  },
  multiple: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "secondary", "outline"].includes(value)
  },
  width: {
    type: String,
    default: "auto"
  },
  height: {
    type: String,
    default: "auto"
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["select"]);

let mediaFrame = null;

function openMedia() {
  if (props.disabled) return;
  
  if (!window.wp?.media) {
    console.warn(
      "WordPress media uploader not available. Call wp_enqueue_media()."
    );
    return;
  }

  if (!mediaFrame) {
    mediaFrame = wp.media({
      title: props.title,
      button: { text: props.buttonLabel },
      library: { type: props.mediaType },
      multiple: props.multiple,
    });

    mediaFrame.on("select", () => {
      const selection = mediaFrame.state().get("selection");
      if (props.multiple) {
        const selected = selection.map(item => item.toJSON());
        emit("select", selected);
      } else {
        const selected = selection.first().toJSON();
        emit("select", selected.url);
      }
    });
  }

  mediaFrame.open();
}
</script>

<style scoped>
.wp-media-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #0073aa;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  min-height: 36px;
}

.wp-media-button:hover {
  background: #005a87;
  border-color: #005a87;
}

.wp-media-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 115, 170, 0.3);
}

.wp-media-button.secondary {
  background: #f1f1f1;
  color: #333;
  border-color: #ccc;
}

.wp-media-button.secondary:hover {
  background: #e6e6e6;
  border-color: #999;
}

.wp-media-button.outline {
  background: transparent;
  color: #0073aa;
  border-color: #0073aa;
}

.wp-media-button.outline:hover {
  background: #0073aa;
  color: white;
}

.wp-media-button.disabled,
.wp-media-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #ccc;
  border-color: #ccc;
  color: #666;
}

.wp-media-button.disabled:hover,
.wp-media-button:disabled:hover {
  background: #ccc;
  border-color: #ccc;
}
</style>
