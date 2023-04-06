<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array<string>,
    required: true,
  },
})

defineEmits(['update:value']);
</script>

<template>
  <div class="select-wrapper">
    <label class="select-label" :for="name">
      {{ label }}
    </label>
    <select
      class="select-input"
      :name="name"
      :required="required"
      :value="value"
      @input="$event => $emit('update:value', ($event.target as HTMLInputElement)?.value)"
    >
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.select-wrapper {
  @apply mb-2;
}

.select-label {
  @apply capitalize;
}

.select-input {
  @apply w-full block py-2 border-0 border-b-2 focus:ring-0;
  background-color: var(--color-background-mute);
  border-color: var(--color-border);
}

.select-input:focus {
  background-color: var(--color-background-soft);
  border-color: var(--color-border-hover);
}</style>
