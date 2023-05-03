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
    <label :for="name" class="field-label">
      {{ $t(`input.${label.toLocaleLowerCase()}`) }}
    </label>

    <div class="field-input-container">

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
        :value="type === 'number' ? Math.abs(Number(value)) : value"
        :max="max"
        :placeholder="type === 'email' ? 'example@example.com' : ''"
        @input="$event => $emit('update:value', ($event.target as HTMLInputElement)?.value)"
        @blur="validate"
      />

      <p v-if="showErrorMsg" class="field-error">
        {{ showErrorMsg }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.field-wrapper {
  @apply mb-6;
}

.field-label {
  @apply capitalize block text-base font-medium;
}

.field-input-container {
  @apply  mt-2 rounded-md shadow-sm;
}

.field-input {
  @apply block w-full rounded-md border-0 py-1.5 px-3 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-base bg-vbg-mute border-vborder;
}

.field-input:focus {
  @apply focus:ring-2 focus:ring-inset focus:ring-indigo-600 bg-vbg-soft border-vborder-hover;
}

.error .field-input {
  @apply ring-red-600;
}
.field-error {
  @apply mt-2 text-sm text-red-600;
}
</style>
