<template>
  <div>
    <hero></hero>
    <Shops-list-container></Shops-list-container>
  </div>
</template>

<script>
import ShopsListContainer from '../shops_list/ShopsListContainer';
import HeroSection from '../hero/Hero';

export default {
  name: 'homepage-component',
  components: {
    'Shops-list-container': ShopsListContainer,
    'hero': HeroSection
  }
};
</script>
