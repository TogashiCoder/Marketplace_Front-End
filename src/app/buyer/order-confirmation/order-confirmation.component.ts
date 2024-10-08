import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderConfirmationService } from 'src/app/services/order-confirmation.service';
import { OrderConfirmationDto } from 'src/app/models/OrderConfirmationDto';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  orderConfirmation!: OrderConfirmationDto;

  constructor(
    private route: ActivatedRoute,
    private orderConfirmationService: OrderConfirmationService
  ) {}

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');
    console.log("the id is : ",orderId)
    if (orderId) {
      this.orderConfirmationService.getOrderConfirmation(+orderId).subscribe(
        (data: OrderConfirmationDto) => {
          this.orderConfirmation = data;
        },
        error => {
          console.error('Error fetching order confirmation:', error);
        }
      );
    }
  }


  downloadAsPDF() {
    const element = document.body;
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps= pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('order-confirmation.pdf');
    });
  }




}
