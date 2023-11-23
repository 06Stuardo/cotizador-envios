import { QuoterService } from './../../service/quoter.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomerModel } from 'src/app/model/customer-model';
import { RateModel } from 'src/app/model/rate-model';


@Component({
  selector: 'app-quoter',
  templateUrl: './quoter.component.html',
  styleUrls: ['./quoter.component.sass']
})
export class QuoterComponent implements OnInit {


  listCustomer: CustomerModel [] = [];
  listRate: RateModel [] = [];
  formCustomer: FormGroup = new FormGroup({});
  formQTN: FormGroup = new FormGroup({});
  isInvited: boolean = true;
  isNewCustomer: boolean =  true;
  id: any;
  region: any;
  grandTotal: number = 0;

  constructor(private quoterService: QuoterService) { }

  ngOnInit(): void {

    this.listRates();
    this.formCustomer =  new FormGroup({
      customer_id: new FormControl(''),
    });

    this.formQTN = new FormGroup({
      full_name: new FormControl(''),
      nit: new FormControl(''),
      customer_type: new FormControl(''),
      weight_: new FormControl(''),
      width_:new FormControl(''),
      height: new FormControl(''),
      length_: new FormControl(''),
      from_country: new FormControl(''),
      to_country: new FormControl(''),
      region: new FormControl(''),
      rate: new FormControl('')
      
    })

  }


  findCustomer(){

    this.id = this.formCustomer.controls["customer_id"].value;
    this.isInvited = false;

    if(this.id != ""){
      this.quoterService.getCustomer(this.id).subscribe(resp=>{
        
        if(resp.length != 0){
          this.listCustomer = resp;
          this.setValuesFormQTN(resp[0])
          console.log(resp);
          this.isNewCustomer = false;
        }else{
          this.formQTN.reset();
          this.isNewCustomer = true;
          this.formQTN.controls['customer_type'].setValue("Nuevo");
        }

      });
    }else{
      alert("El identificador es requerido")
    }

    console.log("Llama al método", this.id);
  }

  listRates(){
    this.quoterService.getRates().subscribe(resp=>{
      if(resp){
        this.listRate = resp;
        console.log(resp)
      }
    });
  }


  selectedRegion(index: number){
    this.region = this.listRate[index-1];
    console.log("HOLA", this.region);
  }


  setValuesFormQTN(customer:any){
    console.log(customer);
    this.formQTN.controls['full_name'].setValue(customer.full_name);
    this.formQTN.controls['nit'].setValue(customer.nit);
    this.formQTN.controls['customer_type'].setValue(customer.customer_type);
  }


  generateQTN(){

    console.log(this.isInvited, this.isNewCustomer)
    
    if(!this.isInvited && this.isNewCustomer){
      this.quoterService.insertCustomer(this.createCustomer()).subscribe(resp =>{
        if(resp){
          this.formCustomer.reset();
          console.log(resp);
        }
      });

      console.log(this.getGrandTotalQTN());

      this.quoterService.getGrandTotal(this.getGrandTotalQTN()).subscribe(resp=>{
        if(resp){
          this.formCustomer.reset();
          this.grandTotal= resp['grand_total_qtn'].grand_total;
          console.log(resp)
        }
      });

    }else{

      this.quoterService.getGrandTotal(this.getGrandTotalQTN()).subscribe(resp=>{
        if(resp){
          this.formCustomer.reset();
          this.grandTotal= resp['grand_total_qtn'].grand_total;
          console.log(resp)
        }
      });

      console.log(this.getGrandTotalQTN());

    }
  }


  getGrandTotalQTN(){

    let customerID = 0;

    if(this.isInvited){
      customerID = 111111111;
    }else{
      customerID = this.formCustomer.controls['customer_id'].value
    }

    return {
  
      "customer_id": customerID,
      "rate_id": this.region.rate_id,
      "weight_": this.formQTN.controls['weight_'].value,
      "width_": this.formQTN.controls['width_'].value,
      "height": this.formQTN.controls['height'].value,
      "length_": this.formQTN.controls['length_'].value,
      "from_country": this.formQTN.controls['from_country'].value,
      "to_country":this.formQTN.controls['to_country'].value,
      "region": this.region.region,
      "discount_amount": 0,
      "grand_total": 0,
      "per_discount": this.getPerDiscount(this.formQTN.controls['customer_type'].value),
      "rate": this.region.amount
    
    }
  }  


  createCustomer(){

      return{
        "customer_id": this.formCustomer.controls['customer_id'].value,
        "full_name": this.formQTN.controls['full_name'].value,
        "nit": this.formQTN.controls['nit'].value,
        "customer_type": this.formQTN.controls['customer_type'].value
      }
  }


  getPerDiscount(customerType: string){

    if(customerType == "Premium"){
      alert("Por ser cliente especial tiene descuento de " + (0.05*100) + "%")
      return 0.05;
    }else if(customerType == "Super Premium"){
      alert("Por ser cliente especial tiene descuento de " + (0.1*100) + "%")
      return 0.10;
    }else{
      return 0;
    }
  }

  isInvitatedUser(){
    this.isInvited =true;
    this.formCustomer.reset();
    this.formQTN.controls['customer_type'].setValue("Invitado");
  }


}
