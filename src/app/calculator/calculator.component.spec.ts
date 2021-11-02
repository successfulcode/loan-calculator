import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [ CalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  })

  it('Display calculate button text', () => {
    const button: HTMLElement =  fixture.nativeElement.querySelector('.btn-primary');
    fixture.detectChanges();
    expect(button.textContent).toContain('Calculate');
  });

  it('Display reset button text', () => {
    const button: HTMLElement =  fixture.nativeElement.querySelector('.btn-secondary');
    fixture.detectChanges();
    expect(button.textContent).toContain('Reset');
  });

  it('Input values', () => {
    const input: HTMLElement =  fixture.nativeElement.querySelector('input');
    input.nodeValue=''
    input.dispatchEvent(new Event('input'))
    fixture.detectChanges();
    expect(input.textContent).toBe('')
  });
});

