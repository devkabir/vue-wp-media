<template>
  <button 
    @click="openMedia"    
    :disabled="disabled"
  >
    <slot>{{ buttonText }}</slot>
  </button>
</template>

<script setup>
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
  },
  multiple: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Object,
    required: true,
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
        emit("update:modelValue", selected);
      } else {
        const selected = selection.first().toJSON();
        emit("update:modelValue", selected);
      }
    });
  }

  mediaFrame.open();
}
</script>
