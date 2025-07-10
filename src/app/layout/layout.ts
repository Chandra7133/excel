import { Component, inject, OnInit } from '@angular/core';
import { Excel } from '../utils/excel';
import { FormsModule } from '@angular/forms'
@Component({
 selector: 'app-layout',
 imports: [FormsModule],
 templateUrl: './layout.html',
 styleUrl: './layout.css'
})
export class Layout implements OnInit {

 name: string = ""
 age: number = 0
 height: number = 0
 weight: number = 0
 buttonText: string = "Save"
 id: number = 0;
 private readonly excel = inject(Excel)
 tableData: any = []
 ngOnInit(): void {
  this.getDetails()
 }
 getDetails() {
  this.excel.getAll().then((data: any) => {
   this.tableData = data;
  });
 }
 save() {
  if (this.name.length < 2 || this.age == 0 || this.height == 0 || this.weight == 0) {
   alert("Invalid data")
   return
  }
  const data = { name: this.name, age: this.age, height: this.height, weight: this.weight };
  if (this.buttonText == "Save") {
   this.excel.create(data);
  } else {
   this.excel.update(this.id, data);
  }
  this.getDetails()
  this.clear()
 }
 edit(data: any) {
  this.id = data.id
  this.name = data.name
  this.age = data.age
  this.height = data.height
  this.weight = data.weight
  this.buttonText = "Edit"
 }
 del(data: any) {
  const confirm = window.confirm("Do you want to delete this record?")
  if (confirm) {
   this.excel.remove(data.id);
   this.getDetails();
  }
 }
 clear() {
  this.id = 0
  this.name = ""
  this.age = 0
  this.height = 0
  this.weight = 0
  this.buttonText = "Save"
 }
}
