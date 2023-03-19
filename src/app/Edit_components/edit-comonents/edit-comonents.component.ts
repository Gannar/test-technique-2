import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-comonents',
  templateUrl: './edit-comonents.component.html',
  styleUrls: ['./edit-comonents.component.css']
})
export class EditComonentsComponent implements OnInit {
  public editForm!: FormGroup;
  submitted = false;
  public brands!: any;
  public myData!: any;
  public media!: any;

  private _jsonURLBrands = '/assets/json/Brands.json';
  public _jsonURL = '/assets/json/payload-rmp.json';
  private _mediaURL = '/assets/json/media.json';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditComonentsComponent>,
    private fb: FormBuilder,
    public http: HttpClient,
    private datePipe: DatePipe,
  ) {


    this.getJSONBrands().subscribe(data => {
      this.brands = data;
      console.log("this.Brands", this.brands);

    });

    this.getJSON().subscribe(data => {
      this.myData = data.requests;
      console.log(data);
      console.log("this.myData", this.myData);

    });

    this.getMedia().subscribe(data => {
      this.media = data;
      console.log("this.media", this.media);

    });
  }
  public getJSONBrands(): Observable<any> {
    return this.http.get(this._jsonURLBrands);
  }

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL)
  }

  public getMedia(): Observable<any> {
    return this.http.get(this._mediaURL)
  }

  public putSON(): Observable<any> {
    return this.http.put(this._jsonURL, this.editForm.value, this.editForm.value.requestId)
  }


  ngOnInit(): void {
    console.log("dataRow", this.data.rowdata);
    console.log("brandName", this.data.brandName);
    console.log("deadline", this.data.rowdata.decisionDeadline);


    this.editForm = this.fb.group({

      requestId: [''],
      brandName: ['', [Validators.required]],
      campaignName: ['', Validators.required],
      mediaName: ['', Validators.required],
      deadline: ['', Validators.required],

    });

    this.editForm.patchValue({

      requestId: this.data.rowdata.requestId,
      brandName: this.data.brandName,
      campaignName: this.data.rowdata.campaignName,
      deadline: this.datePipe.transform(this.data.rowdata.decisionDeadline, 'yyyy-MM-dd')

    });

    console.log("deadline after format", this.editForm.value.deadline);

  }

  get formControl() { return this.editForm.controls; }


  onSave() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }

    const objectToUpdate = this.myData.find((object: { requestId: any; }) => object.requestId === this.editForm.value.requestId);

    objectToUpdate.campaignName = this.editForm.value.campaignName;


    this.http.put(this._jsonURL,objectToUpdate).subscribe(
      (response) => {
        console.log('Data saved successfully:', response);
      },
      (error) => {
        console.error('Error saving data:', error);
      }
    );

  }




  public closeDialog() {
    this.dialogRef.close(false);
  }

}
