import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { DbserviceService } from '../services/dbservice.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-transections',
  templateUrl: './transections.component.html',
  styleUrls: ['./transections.component.scss']
})
export class TransectionsComponent implements OnInit {
  displayedColumns = ['id', 'name', 'code', 'price', 'action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private DbserviceService: DbserviceService) {
    // Create 100 users
    /*const users: UserData[] = [];
    for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }
    console.log(users);*/

    this.load_table();
  }

  load_table(){

    let args = [{'action': 'select_rows',
    'table': 'sma_products',
    'where_fields': {id: '1'}
    }];
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.DbserviceService.call('DbService', args));
  }

  ngOnInit() {
  }
 /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  edit_row() {
    let args = [{
      'action': 'select_rows',
      'table': 'sma_products',
      'where_fields': {id: '8'}
    }];
    // Assign the data to the data source for the table to render
    let return_result = this.DbserviceService.call('DbService', args);
    console.log(return_result);
    alert('edit_row calling');
  }

  delete_row(row_id) {
    if(row_id){
      let args = [{'action': 'delete_row',
      'table': 'sma_products',
      'where_fields': {id: row_id }
      }];
      let return_result = this.DbserviceService.call('DbService', args);
      console.log(return_result);
      alert('row deleted successfully.');
      this.load_table();


    }
  }
}


export interface UserData {
  id: string;
  name: string;
  code: string;
  price: string;
  action: any;
}