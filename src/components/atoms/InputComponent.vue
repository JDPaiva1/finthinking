<script setup lang="ts">
defineProps<{
  label:string,
  name:string,
  type:string,
  max?: string,
  value?: string | number,
  required?: boolean
}>()

defineEmits(['update:value']);
</script>

<template>
  <div class="form-wrapper">
    <label class="form-label" :for="name">
      {{ label }}
    </label>
    <input
      class="form-input"
      :type="type"
      :name="name"
      :required="required"
      :value="value"
      :max="max"
      @input="$event => $emit('update:value', ($event.target as HTMLInputElement)?.value)"
    />
  </div>
</template>

<style scoped>
.form-wrapper {
  @apply mb-2;
}

.form-label {
  @apply capitalize;
}

.form-input {
  @apply w-full block py-2 border-0 border-b-2 focus:ring-0;
  background-color: var(--color-background-mute);
  border-color: var(--color-border);
}

.form-input:focus {
  background-color: var(--color-background-soft);
  border-color: var(--color-border-hover);
}</style>
