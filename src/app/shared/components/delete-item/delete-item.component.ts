import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.scss'],
})
export class DeleteItemComponent {
  @Input() itemId!: number;
  @Output() confirmDelete = new EventEmitter<number>();

  onConfirm() {
    this.confirmDelete.emit(this.itemId);
  }
}
