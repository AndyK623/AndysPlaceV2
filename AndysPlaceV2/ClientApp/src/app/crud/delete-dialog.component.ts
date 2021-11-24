import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Customer } from './Customer';

@Component({
  selector: 'app-crud',
  templateUrl: 'delete-dialog.component.html',
})
export class DeleteDialogComponent {

  action: string;
  local_data: any;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: Customer)
  {
    this.local_data = { ...data };
    this.action = this.local_data.action
  }

  doAction() {
    this.dialogRef.close({event: this.action, data:this.local_data})
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
