import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { PaymentDetail } from './payment-detail.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  private url:string = environment.apiBaseUrl + '/PaymentDetail';
  pDtList: PaymentDetail[] = [];
  formData: PaymentDetail = new PaymentDetail();
  constructor(private http: HttpClient) { }

  refreshList(){
    this.http.get(this.url)
    .subscribe({
      next: res=>{
       console.log(res);
       this.pDtList = res as PaymentDetail[];
      },
      error: err=> {
        console.log(err);
      }
    })
  }
  

  savePaymentDetail() {
    return this.http.post(this.url, this.formData);
  }

  updatePaymentDetail() {
    let payment: PaymentDetail = new PaymentDetail();
    payment.cardNumber = this.formData.cardNumber;
    payment.cardOwnerName = this.formData.cardOwnerName;
    payment.expirationDate = this.formData.expirationDate;
    payment.paymentDetailId = this.formData.paymentDetailId;
    payment.securityCode = this.formData.securityCode;
    return this.http.put(`${this.url}/${this.formData.paymentDetailId}`, payment);
}

// updatePaymentDetail(paymentDetail: PaymentDetail): Observable<void> {
//   return this.http.put(`${this.url}/${this.formData.paymentDetailId}`, paymentDetail);
// }

 deletePaymentDetail(record: PaymentDetail) {
  return this.http.delete(this.url + "/" + record.paymentDetailId);
}

  resetForm(form: NgForm){
    form.form.reset();
    this.formData = new PaymentDetail();
  }

  getPaymentDetail(): Observable<PaymentDetail> {
    return this.http.get<PaymentDetail>(`${this.url}/1`); // Assuming you fetch the detail by ID
  }
  // getPaymentDetails(): Observable<any> {
  //   return this.http.get(this.apiUrl);
  // }
}
