import {
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Chart } from './chart.model';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() data$: Observable<(string | number)[][]>;

  public chartData: (string | number)[][];
  public chart: Chart;
  private _subs: Subscription[] = [];

  constructor() {}

  ngOnInit(): void {
    this.chart = {
      title: '',
      type: 'LineChart',
      data: [],
      columnNames: ['period', 'close'],
      options: { title: `Stock price`, width: '600', height: '400' }
    };

    this._subs.push(
      this.data$.subscribe((newData) => {
        this.chartData = newData
      }, error => {
        console.error('Error getting chart data', error)
      })
    )
  }

  ngOnDestroy(): void {
    this._subs.forEach(sub => (sub.unsubscribe) ? sub.unsubscribe() : null);
  }
}
