<template>
  <button @click="openMedia">
    <slot>{{ buttonText }}</slot>
  </button>
</template>

<script setup>
const props = defineProps({
  buttonText: {
    type: String,
    default: "Select Media",
  },
  title: {
    type: String,
    default: "Select Media",
  },
  buttonLabel: {
    type: String,
    default: "Use this media",
  },
  mediaType: {
    type: String,
    default: "all",
    validator(value) {
      return ["image", "video", "audio", "text", "application", "all"].includes(
        value
      );
    },
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

let mediaFrame = null;

function ensureUnderscoreForWordPress() {
  if (typeof window._ === "undefined") {
    return;
  }

  function isLodash() {
    return (
      typeof _ !== "undefined" &&
      typeof _.forEach === "function" &&
      ["get", "set", "cloneDeep", "at"].every(
        (fn) => typeof _[fn] === "function"
      )
    );
  }

  if (isLodash()) {
    _.noConflict();
  }
}

function openMedia() {
  if (props.disabled) return;

  ensureUnderscoreForWordPress();

  if (!window.wp?.media) {
    console.warn(
      "WordPress media uploader not available. Call wp_enqueue_media()."
    );
    return;
  }

  if (!mediaFrame) {
    const librarySettings = {};
    if (
      props.mediaType &&
      props.mediaType !== "files" &&
      props.mediaType !== "all"
    ) {
      librarySettings.type = props.mediaType;
    }

    mediaFrame = wp.media({
      title: props.title,
      state: "library",
      button: { text: props.buttonLabel },
      library: librarySettings,
      multiple: props.multiple,
    });

    mediaFrame.on("select", () => {
      const selection = mediaFrame.state().get("selection");
      if (props.multiple) {
        const selected = selection.map((item) => item.toJSON());
        emit("update:modelValue", selected);
      } else {
        const selected = selection.first().toJSON();
        emit("update:modelValue", selected);
      }
    });

    mediaFrame.on("open", () => {
      if (
        !props.modelValue ||
        (props.multiple && props.modelValue.length === 0)
      ) {
        return;
      }

      const selection = mediaFrame.state().get("selection");
      const ids = props.multiple
        ? props.modelValue.map((item) => item.id)
        : [props.modelValue.id];

      ids.forEach((id) => {
        if (id) {
          const attachment = wp.media.attachment(id);
          attachment.fetch();
          selection.add(attachment ? [attachment] : []);
        }
      });
    });
  }

  mediaFrame.open();
}
</script>
