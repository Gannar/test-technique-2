import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EditComonentsComponent } from './Edit_components/edit-comonents/edit-comonents.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public myData!: any;
  public brands!: any;
  public searchText!: any;
  public searchBrand!: any;


  private _jsonURLBrands = '/assets/json/Brands.json';
  private _jsonURL = '/assets/json/payload-rmp.json';

  constructor(public http: HttpClient,
    private datePipe: DatePipe,
    public dialog: MatDialog,
  ) {
    this.getJSON().subscribe(data => {
      this.myData = data.requests;
      console.log(data);
      console.log("this.myData", this.myData);

    });

    this.getJSONBrands().subscribe(data => {
      this.brands = data;
      console.log("this.Brands", this.brands);

    });
  }

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  public getJSONBrands(): Observable<any> {
    return this.http.get(this._jsonURLBrands);
  }

  ngOnInit(): void {

  }


  get MyDataItems() {
    const itemData = this.myData;
   
   if (this.searchBrand)
    
    {
      console.log("this.searchBrand",this.searchBrand);
      return  itemData.filter((item1: { brand: { brandId: string; }; }) => item1.brand.brandId.toString().toLowerCase().includes(this.searchBrand.toLowerCase())); }

      if (!this.searchText) return this.myData;

    return  itemData.filter((item1: { campaignName: string; }) => item1.campaignName.toLowerCase().includes(this.searchText.toLowerCase()));
    
  }


  


  openDialogedit(item: any, brand: any) {
    return this.dialog.open(EditComonentsComponent, {
      width: '70%',
      panelClass: 'confirm-dialog-container',
      autoFocus: false,

      disableClose: false,


      data: {
        rowdata: item,
        brandName: brand
      }

    }).afterClosed().subscribe(result => {
      this.getJSON();
    })
  }


}
