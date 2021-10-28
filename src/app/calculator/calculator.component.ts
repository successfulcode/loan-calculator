import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

  onSubmit() {
    const newLoan = {
      monthlyIncome: this.calculatorForm.value.income,
      requestedAmount: this.calculatorForm.value.amount,
      loanTerm: this.calculatorForm.value.term,
      children: this.calculatorForm.value.children,
      coapplicant: this.calculatorForm.value.coapplicant
    }
    console.log('onSubmit', newLoan)
  }

  calculatorForm = new FormGroup({
    income: new FormControl(),
    children: new FormControl('NONE'),
    coapplicant: new FormControl('NONE'),
    amount: new FormControl(),
    term: new FormControl()
  });
}

