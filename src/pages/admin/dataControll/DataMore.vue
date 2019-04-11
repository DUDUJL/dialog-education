<template>
  <div class="Chart">
    <h2>批判思维能力</h2>
    <canvas id="radarChart" width="400px" height="400px"></canvas>
  </div>
</template>
<script>
import Chart from 'chart.js';



export default {
    components: {

    },
    data() {
        return {

        }
    },
    mounted() {


        var ctx2 = document.getElementById("radarChart");

        var myChart = new Chart(ctx2, {
            type: "radar",
            data: {
                labels: ["寻找真相", "开放思想", "分析能力", "系统化能力", "批判性思维的自信心", "求知欲", "认知成熟度"],
                datasets: [
                    {
                      label: 'First Data',
                      backgroundColor: 'rgba(0, 216, 255, .3)',
                      borderColor: 'rgba(0, 216, 255, .8)',
                      borderWidth: 1,
                      pointBackgroundColor: '#fff',
                      pointBorderColor: '#fff',
                      pointHoverBackgroundColor: '#fff',
                      pointHoverBorderColor: 'rgba(179,181,198,1)',
                      data: [65, 59, 90, 81, 56, 55, 40]
                    },
                    {
                      label: 'Second Data',
                      backgroundColor: 'rgba(228, 102, 81, .3)',
                      borderColor: 'rgba(255,99,132,1)',
                      pointBackgroundColor: 'rgba(255,99,132,1)',
                      borderWidth: 1,
                      pointBorderColor: '#fff',
                      pointHoverBackgroundColor: '#fff',
                      pointHoverBorderColor: 'rgba(255,99,132,1)',
                      data: [28, 48, 40, 19, 96, 27, 100]
                    }
                ]
            },
            options: {
                
            }

        });
    },
    methods: {

    }
}
</script>
<style>

</style>