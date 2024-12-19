import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'stock-book';
  userData: any;
  tradePayload = {
    id: "",
    name: "",
    type: "",
    pnl: 0,
    date: "",
    direction: ""
  };
  showAddTrade = false;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dataService.getData().subscribe(d => {
      this.userData = d;
      this.userData.cardData.pnl = this.userData.tradeHistory.reduce((sum: any, item: any) => {
        return item.direction === "+" ? sum + item.pnl : sum - item.pnl;
      }, 0);

      this.userData.cardData.balance = this.userData?.cardData?.capital + this.userData?.cardData?.pnl;
      this.userData.cardData.gain = ((this.userData?.cardData?.pnl / this.userData?.cardData?.capital) * 100).toFixed(2);

      console.log("data", this.userData);
    })
  }

  updateData(payload: any) {
    this.dataService.updateData(payload).subscribe(d => {
      console.log("data uploaded successfully", d)
    })
  }

  addTrade() {
    this.showAddTrade = !this.showAddTrade
  }

  saveTrade(tradePayload: any) {
    tradePayload.id = self.crypto.randomUUID();
    this.userData.tradeHistory.push(tradePayload);
    this.dataService.updateData(this.userData).subscribe(d => {
      console.log("data updated", d);
      this.showAddTrade = false;
      this.getData();
    });
  }
}
