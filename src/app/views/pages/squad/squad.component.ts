import {AfterViewInit, Component} from '@angular/core';
import {EChartsOption, getInstanceByDom} from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import {connect} from "rxjs";

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.css']
})
export class SquadComponent{
  initOpts = {
    renderer: 'svg',
    width: 850,
    height: 400
  };

  options: EChartsOption = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [{
      type: 'value'
    }],
    series: [{
      name: 'Counters',
      type: 'bar',
      barWidth: '30%',
      data: [10, 52, 200, 334, 390, 330, 220]
    }]
  };
}
