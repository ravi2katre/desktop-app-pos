import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MatPaginator, MatDialogModule, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DbserviceService } from '../services/dbservice.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  displayedColumns = ['id', 'name', 'code', 'price', 'action'];
  dataSource: MatTableDataSource<UserData>;
  data_parms: any = {title : ''};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private DBService: DbserviceService, public dialog: MatDialog) {
    // Create 100 users
    /*const users: UserData[] = [];
    for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }
    console.log(users);*/

    this.load_table();
  }

  load_table() {

    const args = [{'action': 'select_rows',
    'table': 'sma_products',
    'where_fields': {id: '1'}
    }];
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.DBService.call('DbService', args));
    this.ngAfterViewInit();
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

  add_row() {
    // Assign the data to the data source for the table to render
    this.data_parms.product_detail = [{
      alert_quantity: '0.0000',
      barcode_symbology: '',
      brand: '2',
      // cat_name: 'Uncategoris',
      category_id: '0',
      cf1: '',
      cf2: '',
      cf3: '',
      cf4: '',
      cf5: '',
      cf6: '',
      code: '85086124',
      cost: '0.00',
      date: '',
      details: '',
      end_date: null,
      file: null,
      hsn_code: null,
      // id: dbService.getDynamicProductId(),
      image: '',
      is_featured: '0',
      // item_discount: 0,
      // item_net_price: '0.00',
      mrp: '0.00',
      name: '',
      // per_item_discount: 0,
      // pr_item_tax: 0,
      price: '0.00',
      product_details: '',
      promo_price: null,
      promotion: null,
      purchase_unit: '1',
      // qty: '0',
      quantity: '0',
      sale_unit: '1',
      start_date: null,
      subcategory_id: null,
      // subtotal: 25,
      supplier1: '0',
      supplier1_part_no: '',
      supplier1price: null,
      supplier2: null,
      supplier2_part_no: null,
      supplier2price: null,
      supplier3: null,
      supplier3_part_no: null,
      supplier3price: null,
      supplier4: null,
      supplier4_part_no: null,
      supplier4price: null,
      supplier5: null,
      supplier5_part_no: null,
      supplier5price: null,
      tax_method: '1',
      tax_rate: '0',
      track_quantity: '0',
      type: 'standard',
      unit: '',
      unit_code: '',
      unit_id: '',
      unit_name: '',
      warehouse: null,
     // is_quick_sale_product: true

  }];

   this.data_parms.title = 'Add Product';
   this.openDialog(this.data_parms);
  }

  edit_row(row_id) {
    const args = [{
      'action': 'select_row',
      'table': 'sma_products',
      'where_fields': {id: row_id}
    }];
    // Assign the data to the data source for the table to render
    this.data_parms.product_detail = this.DBService.call('DbService', args);
    console.log(this.data_parms.product_detail);
   this.data_parms.title = 'Update Product';
   this.openDialog(this.data_parms);
  }

  delete_row(row_id) {
    if (row_id) {
      const args = [{'action': 'delete_row',
      'table': 'sma_products',
      'where_fields': {id: row_id }
      }];
      const return_result = this.DBService.call('DbService', args);
      console.log(return_result);
      alert('row deleted successfully.');
      this.load_table();


    }
  }

  openDialog(data_parms): void {
    const dialogRef = this.dialog.open(AddProductsComponent, {
      width: '450px',
      data: { data_parms }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.load_table();
    });
  }
}
export interface UserData {
  id: string;
  name: string;
  code: string;
  price: string;
  action: any;
}

@Component({
  selector: 'add-products-component',
  templateUrl: 'product-add-dialog.html',
})

export class AddProductsComponent implements OnInit {
  response_data: any = {};
  product: any = {};
  title = 'No Title';
  constructor(
    private DBService: DbserviceService,
    public dialogRef: MatDialogRef<AddProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log('---------data------------');
      console.log(data);
      this.product = data.data_parms.product_detail[0];
      this.title = data.data_parms.title;
     }

    ngOnInit() {
    }

    save() {
      let args: any;
      if (this.product.id) {
        args = [{
          'action': 'update_row',
          'table': 'sma_products',
          'where_fields': {id: this.product.id},
          'fields': this.product,
        }];
      } else {
        args = [{
          'action': 'insert_row',
          'table': 'sma_products',
          'fields': this.product,
        }];
      }


      // Assign the data to the data source for the table to render
      this.response_data.update = this.DBService.call('DbService', args);
      this.response_data = this.data;
      this.onNoClick();
    }

  onNoClick(): void {
    this.dialogRef.close(this.response_data);
  }

}
