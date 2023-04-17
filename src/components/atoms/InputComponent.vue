<script setup lang="ts">
import { isFieldValid } from '@/helpers/utils.helper';
import { ref } from 'vue';

const props = defineProps<{
  label: string,
  name: string,
  type: string,
  max?: string,
  value?: string | number,
  required?: boolean,
  options?: Array<string>
}>();

defineEmits(['update:value']);
const showErrorMsg = ref<string>();
function validate() {
  if(props.required)
    showErrorMsg.value = isFieldValid(props.value, props.type);
  return !showErrorMsg.value;
}
</script>

<template>
  <div class="field-wrapper">
    <label class="field-label" :for="name">
      {{ label }}
    </label>

    <select
      v-if="type == 'select'"
      class="field-input"
      :name="name"
      :required="required"
      :value="value"
      @input="$event => $emit('update:value', ($event.target as HTMLInputElement)?.value)"
    >
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option }}
      </option>
    </select>

    <input
      v-else
      class="field-input"
      :type="type"
      :name="name"
      :required="required"
      :value="value"
      :max="max"
      @input="$event => $emit('update:value', ($event.target as HTMLInputElement)?.value)"
      @blur="validate"
    />

    <p v-if="showErrorMsg" class="text-red-500">
      {{ showErrorMsg }}
    </p>
  </div>
</template>

<style scoped>
.field-wrapper {
  @apply mb-2;
}

.field-label {
  @apply capitalize;
}

.field-input {
  @apply w-full block py-2 border-0 border-b-2 focus:ring-0;
  background-color: var(--color-background-mute);
  border-color: var(--color-border);
}

.field-input:focus {
  background-color: var(--color-background-soft);
  border-color: var(--color-border-hover);
}</style>
