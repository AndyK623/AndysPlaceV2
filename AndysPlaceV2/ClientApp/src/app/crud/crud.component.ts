
import { Component, Inject, OnInit, ViewChild } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { animate, state, style, transition, trigger } from '@angular/animations';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { DeleteDialogComponent } from './delete-dialog.component';

import { Customer } from './Customer';

interface Columns {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', maxHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('255ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CrudComponent implements OnInit {

  expandedCustomer: Customer | null;
  public displayedColumns: string[] = ['FirstName', 'LastName', 'CompanyName', 'EmailAddress', 'Phone', 'CountryName',
                                       'OpeningDate', 'Delete'];

  columns: Columns[] = [
    { value: 'firstName', viewValue: "First Name" },
    { value: 'lastName', viewValue: 'Last Name' },
    { value: 'companyName', viewValue: 'Company Name' },
    { value: 'emailAddress', viewValue: 'Email' },
    { value: 'phone', viewValue: 'Phone' },
    { value: 'countryName', viewValue: 'Country' }
  ]

  public Customers: MatTableDataSource<Customer>;
  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  defaultSortColumn: string = 'firstName';
  defaultSortOrder: string = 'asc';
  public filterColumn: string = 'firstName';
  filterQuery: string = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filterTextChanged: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router,
              public dialog: MatDialog)
  {

  }

  ngOnInit() {
    this.loadData();
  }

  onFilterTextChanged(filterText: string) {
    if (this.filterTextChanged.observers.length === 0) {
      this.filterTextChanged.pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe(query => {
          this.loadData(query);
        });
    }

    this.filterTextChanged.next(filterText);
  }

  loadData(query: string = null) {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;

    this.filterQuery = query;

    this.getData(pageEvent);
  }

  getData(event: PageEvent) {
    var url = this.baseUrl + 'api/Crud';
    var params = new HttpParams()
      .set("pageIndex", event.pageIndex.toString())
      .set("pageSize", event.pageSize.toString())
      .set("sortColumn", (this.sort) ? this.sort.active : this.defaultSortColumn)
      .set("sortOrder", (this.sort) ? this.sort.direction : this.defaultSortOrder);

    if (this.filterQuery) {
      params = params.set("filterColumn", this.filterColumn)
                     .set("filterQuery", this.filterQuery);
    }

    this.http.get<any>(url, { params }).subscribe(result => {
      this.paginator.length = result.totalCount;
      this.paginator.pageIndex = result.pageIndex;
      this.paginator.pageSize = result.pageSize;
      this.Customers = new MatTableDataSource<Customer>(result.data);
    }, error => console.error(error));
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '60%',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Delete') {
        this.deleteCustomer(result.data);
      }
    });
  }

  deleteCustomer(customer: Customer) {
    var url = this.baseUrl + "api/Crud/" + customer.customerId;
    this.http.delete<Customer>(url).subscribe(result => {
      alert("Costumer eliminated.");
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = "reload";
      this.router.navigate([currentUrl]);
    }, error => console.log(error));
  }



}
