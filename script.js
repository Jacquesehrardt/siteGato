const options = {
    chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        foreColor: '#fff'
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 5,
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [20, 100, 100, 100]
          },
      },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: function(val, timestamp) {
          return moment(timestamp).format('DD MMMM HH:mm');
        },
        offsetX: 20,
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
        labels: {
          offsetX: -10,
          offsetY: -5
        },
        tooltip: {
          enabled: true
        }
    },
    grid: {
      padding: {
        left: -5,
        right: 5
      }
    },
    title: {
        align: 'left',
        offsetX: 14
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy HH:mm"
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    },
  };

fetch("https://apigato.herokuapp.com/")
.then((response) => {
  return response.json()
}).then((json) => {
  const optionsChartTagBranca = {
    ...options,
    title: {
      text: 'Consumo de Água da Khaleesi'
    },
    colors:['#FF7750'],
    series: [json[0]]
  }
  const optionsChartTagVerde = {
    ...options,
    title: {
      text: 'Consumo de Água da Lisa'
    },
    colors:['#42BAFE'],
    series: [json[1]]
  }
  const chartTagBranca = new ApexCharts(document.querySelector("#chartTagBranca"), optionsChartTagBranca);
  chartTagBranca.render();

  const chartTagVerde = new ApexCharts(document.querySelector("#chartTagVerde"), optionsChartTagVerde);
  chartTagVerde.render();
})
  

const optionsBar = {
  series: [{
    name: 'Khaleesi',
  }, {
    name: 'Lisa',
  }],
  chart: {
    type: 'bar',
    height: 300,
    foreColor: '#fff'
  },
  title: {
    text: 'Consumo de Água Total por Dia'
  },
  colors:['#FF7750', '#42BAFE'],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {},
  yaxis: {},
  fill: {
    opacity: 1
  },
  tooltip: {}
};


fetch("https://apigato.herokuapp.com/totalconsumo")
.then((response) => {
  return response.json()
}).then((json) => {
  optionsBar.series = json.series;
  optionsBar.xaxis.categories = json.xaxis;
  const chartBar = new ApexCharts(document.querySelector("#chartBar"), optionsBar);
  chartBar.render();
})