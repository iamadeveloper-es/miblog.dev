<script lang="ts" setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const emitValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <input 
  :value="modelValue"
  class="input app-search-bar" 
  type="text" 
  name="search-value"
  placeholder="Busca algo..."
  @input="emitValue($event)">
</template>