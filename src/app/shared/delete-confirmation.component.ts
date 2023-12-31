import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation',
  template: `

    <div class="wrapper p-5 mb-4">
      <h1 mat-dialog-title class="title" style="color: var(--sub-main);">Confirm Deletion</h1>
      <p mat-dialog-content class="content">Are you sure you want to delete?</p>
      <div mat-dialog-actions class="buttons-div">
        <button
          mat-button
          (click)="cancel()"
          class="btn btn-secondery button cancel-button"
        >
          Cancel
        </button>
        <button
          mat-button
          color="warn"
          (click)="confirm()"
          class="btn btn-primary button delete-button"
        >
          Delete
        </button>
      </div>
    </div>

  `,
  styles: [
    `
      /* .wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
  } */
      .wrapper {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 24px;
        width: 500px; /* Adjust the width as desired */
        height: 200px; /* Adjust the height as desired */
      }

      .title {
        font-size: 16px;
        font-weight: bold;
      }

      .content {
        font-size: 14px;
      }

      .buttons-div {
        display: flex;
        justify-content: flex-end;
        gap: 5px;
      }

      .button {
        font-size: 14px;
        font-weight: bold;
        padding: 8px 16px;
      }

      .delete-button {
        background-color: #dc3545 !important;
        border: 1px solid transparent !important;
      }
    `,
  ],
})
export class DeleteConfirmationComponent {
  constructor(private dialogRef: MatDialogRef<DeleteConfirmationComponent>) {}

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
