import {AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TransactionService } from '../transaction.service';
import { HomeComponent } from '../home/home.component';
import { CategorizeDialogComponent } from '../categorize-dialog/categorize-dialog.component';

 export interface TransactionData {
   id: number;
   amount: number;
 }
@Component({
  selector: 'app-finance-management',
  templateUrl: './finance-management.component.html',
  styleUrls: ['./finance-management.component.css']
})
export class FinanceManagementComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['id'];
  public dataSource: MatTableDataSource<TransactionData>;
 
  public transaction:any ={};

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private transactionService: TransactionService, public dialog: MatDialog) {
    
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe((transaction:any)=>{
      console.log(transaction);
      this.dataSource.data = transaction.items;
    })

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog() {
    this.dialog.open(CategorizeDialogComponent);
  }

}


