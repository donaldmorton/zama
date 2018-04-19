import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions-view',
  templateUrl: './transactions-view.component.html',
  styleUrls: ['./transactions-view.component.css']
})
export class TransactionsViewComponent implements OnInit {

  transactions = [
    {id:1},
    {id:2},
    {id:3},
    {id:4},
    {id:5}
  ];

  constructor() { }

  ngOnInit() {
  }

}
