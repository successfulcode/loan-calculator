import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { faCalculator, faMinusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  constructor(private http: HttpClient) {}

  isLoading = false;
  requiredFieldMessage = 'This field is required';
  faCalculator = faCalculator;
  faMinusSquare = faMinusSquare;
  loanConditions: any = {};
  errorMessages: any = [];
  displayLoanConditions = false;
  displayErrors = false;

  onCalculateLoan(loanParams: {
    monthlyIncome: number;
    requestedAmount: number;
    loanTerm: number;
    children: string;
    coapplicant: string;
  }) {
    this.isLoading = true;
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain',
      'X-API-KEY': 'swb-222222',
    });
    const options = { headers: headers };
    return this.http
      .post('https://homework.fdp.workers.dev', loanParams, options)
      .subscribe(
        (res) => {
          this.isLoading = false;
          this.loanConditions = res;
          this.displayErrors = false;
          this.displayLoanConditions = true;
          this.errorMessages = [];
          console.log('data', res);
        },
        (err) => {
          this.isLoading = false;
          this.errorMessages = err.error.fields;
          this.displayLoanConditions = false;
          this.loanConditions = {};
          this.displayErrors = true;
          console.log('err', this.errorMessages);
        }
      );
  }

  onSubmit() {
    const loanParams = {
      monthlyIncome: this.calculatorForm.value.income*1000,
      requestedAmount: this.calculatorForm.value.amount*1000,
      loanTerm: this.calculatorForm.value.term,
      children: this.calculatorForm.value.children,
      coapplicant: this.calculatorForm.value.coapplicant,
    };
    console.log('calculatorForm', this.calculatorForm)
    this.onCalculateLoan(loanParams);
  }

  calculatorForm = new FormGroup({
    income: new FormControl(null, Validators.required),
    children: new FormControl('NONE'),
    coapplicant: new FormControl('NONE'),
    amount: new FormControl(null, Validators.required),
    term: new FormControl(null, Validators.required),
  });

  onCloseErrorMessage(){
    this.errorMessages = [];
    this.displayErrors = false;
  }

  onCloseDisplayLoanConditions(){
    this.displayLoanConditions = false;
    this.loanConditions = {};
  }
}
