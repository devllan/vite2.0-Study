<template>
  <div>123</div>
</template>

<script>
import { defineProps, reactive } from 'vue'

defineProps({
  msg: String
})

// const state = reactive({ count: 0 })
export default {
  data() {
    return {
      loading1: true,
      bgDate: "20200830",
      endDate: "20200901",
      select1: "430000",
      options1: [],
      select2: "cur_sdl_month",
      options2: [
        {
          value: "cur_sdl_month",
          label: "当日值",
        },
        {
          value: "count_sdl_month",
          label: "累计值",
        },
        {
          value: "count_sdl_growth_rate_month",
          label: "当日增速",
        },
      ],
      select3: "1",
      options3: [
        {
          value: "1",
          label: "折线图",
        },
        {
          value: "2",
          label: "柱形图",
        },
      ],
      tableData: {},
      LineData1: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
        ],
      },
      extend1: {
        grid: {
          left: "5%",
          right: "3%",
          bottom: "10%",
          top: "5%",
        },
        tooltip: {
          trigger: "axis",
          confine: true,
          formatter: (par) => {
            var relVal = par[0].axisValue + "<br/>";
            for (var i = 0; i < par.length; i++) {
              var o = par[i];
              var value = this.select3 == "1" ? o.value[1] : o.value;
              relVal +=
                '<span style="width:12px; height:12px;float:left; border-radius:100%!important; margin:5px 5px 0 0;background-color:' +
                o.color +
                ';">&nbsp;&nbsp;</span>' +
                o.seriesName +
                "：" +
                (value == null ? "--" : value + "千瓦时") +
                "<br/>";
            }
            return relVal;
          },
        },
        legend: {
          show: true,
          y: "top",
          x: "center",
          textStyle: {
            fontSize: 12,
            color: "#1c3a63",
          },
        },
        icon: "line",
        xAxis: {
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#1c3a63",
            fontSize: 12,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#1c3a63",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dotted",
              color: "rgba(255,255,255,0.2)",
            },
          },
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              type: "dotted",
              color: "rgba(255,255,255,0.2)",
            },
          },
          axisLabel: {
            color: "#1c3a63",
            fontSize: 12,
            formatter: function (value, index) {
              return value.toString() + "";
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#1c3a63",
            },
          },
        },
        series: {
          smooth: false,
          connectNulls: true, //这个是重点，将断点连接
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#8ec6ad",
              },
              {
                offset: 1,
                color: "#ffe",
              },
            ]),
          },
        },
      },
      centerDialogVisible: false,
    };
  },
  methods: {
    // 查询按钮
    InquiryBtn() {
      this.loading1 = true;
      this.getTableData();
      this.getLineData1();
    },
    // 获取最新时间
    getNewTime() {
      this.axios({
        method: "post",
        url: "/HuNanSdl/DataManageCtrl/getMonth",
        data: {},
      })
        .then((res) => {
          console.log(res);
          this.endDate = res.data.maxdate;
          this.bgDate = res.data.mindate;
          this.getTableData();
          this.getLineData1();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取地区下拉框
    getOptions1() {
      this.axios({
        method: "post",
        url: "/HuNanSdl/DataManageCtrl/getMoRegion",
        data: {},
      })
        .then((res) => {
          this.options1 = res.data.options;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取charts
    getLineData1() {
      this.axios({
        method: "post",
        url: "/HuNanSdl/DataManageCtrl/selectMoCharts",
        data: {
          bgDate: this.bgDate,
          endDate: this.endDate,
          typeID: this.select2,
          regionID: this.select1,
          index: "1",
        },
      })
        .then((res) => {
          this.LineData1 = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取表格
    getTableData() {
      this.axios({
        method: "post",
        url: "/HuNanSdl/DataManageCtrl/selectMoData",
        data: {
          bgDate: this.bgDate,
          endDate: this.endDate,
          typeID: this.select2,
          regionID: this.select1,
        },
      })
        .then((res) => {
          console.log(res.data);
          this.tableData = res.data;
          this.loading1 = false;
          this.$nextTick(() => {
            this.$refs.goodsDetailTable.doLayout();
          });
        })
        .catch((err) => {
          this.loading1 = false;
          console.log(err);
        });
    },
    // 切换折线图柱形图
    select3Change() {
      setTimeout(() => {
        this.$refs[`chart1`].echarts.resize();
        this.$refs[`chart2`].echarts.resize();
      }, 1);
    },
    daoru() {
      this.centerDialogVisible = !this.centerDialogVisible;
    },
    DaochuMoban() {
      window.location.href =
        "//192.168.0.17:8036/template/MonthElecImportTemplate.xls";
    },
    upload() {
      let formData = new FormData();
      formData.append("fileUpload", this.$refs.file.files[0]);
      this.axios
        .post("/HuNanSdl/DataManageCtrl/importMonthData", formData)
        .then((res) => {
          this.centerDialogVisible = false;
          this.$message({
            message: "上传成功。",
            type: "success",
          });
          console.log(this.$refs.file.files);
        })
        .catch((err) => {
          this.$message.error("上传失败。");
          console.log(err);
        });
    },
  },
  mounted() {
    
  },
  watch: {},
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>