import { Component } from '@angular/core';
import { PaymentDetailService } from '../../shared/payment-detail.service';
import { PaymentDetail } from '../../shared/payment-detail.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styleUrl: './payment-detail-form.component.css'
})
export class PaymentDetailFormComponent {
  title:String = "Winter is coming";
  constructor(public paymentDetailService:PaymentDetailService){
    
  }

  OnSubmit(form: NgForm){
    if(form.valid){
      if(this.paymentDetailService.formData.paymentDetailId == 0)
        this.insertPaymentDetail(form);
      else
         this.EditPaymentDetail(form);

    }
  }

  insertPaymentDetail(form: NgForm){
              this.paymentDetailService.savePaymentDetail()
    .subscribe({
      next: res=>{
       console.log(res);
       this.paymentDetailService.pDtList = res as PaymentDetail[];
       this.paymentDetailService.resetForm(form);
      },
      error: err=> {
        console.log(err);
      }
    })
  }

  EditPaymentDetail(form: NgForm){
    this.paymentDetailService.updatePaymentDetail()
    .subscribe({
      next: res=>{
       console.log(res);
       this.paymentDetailService.pDtList = res as PaymentDetail[];
       this.paymentDetailService.refreshList();
       this.paymentDetailService.resetForm(form);
      },
      error: err=> {
        console.log(err);
      }
    })

  }

 

  ngOnInit(): void {
    
  }
}


