<template>
  <div>{{ testData }}</div>
  <div>{{ axiosData }}</div>
</template>
<script>
// import axios from 'axios'
export default {
  data() {
    return {
      testData: "teeeeeest",
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
    this.test()
  },
  watch: {},
};
</script>
