import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { SharedUiChartModule } from '../shared-ui-chart.module';
import { of } from 'rxjs';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedUiChartModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.data$ = of({});
    fixture.detectChanges();
    spyOn(component, 'data$').and.returnValue({})
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
