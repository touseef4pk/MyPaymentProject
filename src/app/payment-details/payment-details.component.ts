import { Component } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { PaymentDetail } from '../shared/payment-detail.model';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent {

  constructor(public paymentDetailService:PaymentDetailService){
    
  }

  populateForm(paymentDetail: PaymentDetail){
      this.paymentDetailService.formData = Object.assign([],paymentDetail);
  }

  deletRecord(paymentDetail: PaymentDetail){
    this.paymentDetailService.deletePaymentDetail(paymentDetail)    
    .subscribe({
      next: res=>{
       console.log(res);
       this.paymentDetailService.pDtList = res as PaymentDetail[];
       this.paymentDetailService.refreshList();
      },
      error: err=> {
        console.log(err);
      }
    })
}

  ngOnInit(): void{
        const paymentData = this.paymentDetailService.refreshList();
  }
}
