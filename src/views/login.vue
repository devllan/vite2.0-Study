<template>
  <div>{{ testData }}</div>
  <!-- <div>{{ axiosData }}</div> -->
</template>
<script>
// import axios from 'axios'
export default {
  data() {
    return {
      testData: "login",
      axiosData:{}
    };
  },
  methods: {
    test(){
      console.log(this)
      this.axios({
      method: "post",
      // url: "",
      url: "",
      data: {},
    })
      .then((res) => {
        console.log(res);
        // this.axiosData = res.data
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
  mounted() {
    // this.test()
    this.$Cookies.set("biwork_token", '123');
  },
  watch: {},
};
</script>
