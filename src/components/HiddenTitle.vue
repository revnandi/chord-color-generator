<template>
  <div class="hidden-title">
    <slot></slot>
  </div>
</template>

<style>
  .hidden-title {
    position: absolute !important;
    height: 1px; width: 1px; 
    overflow: hidden;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
  }
</style>