<template>
  <div class="item">
    <i>
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.item {
  @apply mt-8 flex;
}

.details {
  @apply flex-[1] ml-4;
}

i {
  @apply flex items-center content-center w-8 h-8;
  color: var(--color-text);
}

h3 {
  @apply text-lg font-medium mb-2;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    @apply mt-0 pt-[0.4rem] pr-0 pb-4;
    padding-left: calc(var(--section-gap) / 2);
  }

  i {
    @apply -left-6 absolute border border-solid border-r-8 w-1/2 h-1/2;
    top: calc(50% - 25px);
    border: 1px solid var(--color-border);
    background: var(--color-background);
  }

  .item:before {
    @apply content-none border-l border-solid absolute left-0;
    border-left: 1px solid var(--color-border);
    bottom: calc(50% + 25px);
    height: calc(50% + 25px);
  }

  .item:after {
    @apply content-none border-l border-solid absolute left-0;
    border-left: 1px solid var(--color-border);
    top: calc(50% - 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    @apply hidden;
  }

  .item:last-of-type:after {
    @apply hidden;
  }
}
</style>
