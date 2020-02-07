<template>
  <div>
    <Header />
    <nuxt />
    <Footer/>
  </div>
</template>
<script>
import Header from '@/components/header'
import Footer from '@/components/footer'
export default {
  components:{
    Footer,Header
  }
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
}

</style>
