import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpService } from '../../services/http-service.service';
import { Router} from  '@angular/router';
import { ChartBtnRendererComponent } from '../customCells/chart-btn-renderer/chart-btn-renderer.component';
import { BuyBtnRendererComponent } from '../customCells/buy-btn-renderer/buy-btn-renderer.component';
import { SellBtnRendererComponent } from '../customCells/sell-btn-renderer/sell-btn-renderer.component';
import { ProfileService } from "../../services/profile-service.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class StocksComponent implements OnInit {

  selectedStock: string = '';
  frameworkComponents: any;
  profile: any;
  allStocks : any = [];
  subscription: Subscription = new Subscription;
  stocksSubscription: Subscription = new Subscription;

  constructor(
    private dialog: MatDialog,
    private http: HttpService, 
    private router: Router,
    private profileService: ProfileService
    ) { 
      this.frameworkComponents = {
        btnCellRenderer: BuyBtnRendererComponent,
        chartBtnRenderer: ChartBtnRendererComponent,
        sellBtnRenderer: SellBtnRendererComponent
      }
    }
    
    columnDefs=[

      {headerName:"ISIN", field:"isin",width:80, headerClass:"head", filter:true},
      {headerName:"Stock", field:"stock",width:80, headerClass:"head", filter:true},
      
      {headerName:"Current Market Price", 
      field:"cmp", 
      headerClass:"head"},
      {headerName:"Open", field:"open",width:80 ,headerClass:"head", filter:true},
      {headerName:"Close", field:"close",width:80, headerClass:"head", filter:true},
      {headerName:"High", 
      field:"high", 
      width:80,
      headerClass:"head"},
  
      {headerName:"Low", 
      field:"low", 
      width:80,
      headerClass:"head"},
  
      {headerName:"Buy", 
      field:"buy", 
      width:80,
      cellRenderer: "btnCellRenderer",
      cellRendererParams: {
        clicked: function(field: any) {
          //alert(`${field} was clicked`);
        }
      },
      headerClass:"head"},
  
      {headerName:"Sell", 
      field:"sell", 
      width:200,
      cellRenderer: "sellBtnRenderer",
      cellRendererParams: {
        clicked: function(field: any) {
          //alert(`${field} was clicked`);
        }
      },
      headerClass:"head"},
  
      {headerName:"View Chart", 
      field:"chart", 
      width:200,   
      cellRenderer: "chartBtnRenderer",  
      cellRendererParams: {
        clicked: function(field: any) {
        }
      },
      headerClass:"head"},
      
    ];
  
    rowData=[
      {isin:'1223',stock:'aapl', cmp:'2',open:'44',close:'33',high:'4',low:'2'},
      {isin:'222',stock:'jj',cmp:'2',open:'44',close:'33',high:'2',low:'2'}
    ];
    
  rowStyle = { fontFamily:" sans-serif", textAlign:"center"};


  ngOnInit(): void {
    this.subscription = this.profileService.currentProfile.subscribe(
      profile => this.profile = profile
    )
    this.stocksSubscription = this.profileService.currAllStocks.subscribe(
      allStocks => this.allStocks = allStocks
    )

    console.log(this.allStocks[0])
  }

  goToStock(){
    this.router.navigate(['/sinfo/'+this.selectedStock]);
  }

//   select * from stocks where 
// symbol='AAPL' 
// or symbol = 'GOOG'
// or symbol = 'AMZN'
// or symbol = 'NFLX'
// or symbol = 'FB'
// or symbol = 'MSFT'
// or symbol = 'BAC'
// or symbol = 'EBAY'
// or symbol = 'TSLA'
// or symbol = 'CSCO'
// or symbol = 'WMT'
// or symbol = 'MCD'
// or symbol = 'TGT'
// or symbol = 'WFC'
// ;
}