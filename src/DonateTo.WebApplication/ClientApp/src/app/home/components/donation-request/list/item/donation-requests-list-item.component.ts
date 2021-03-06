import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DonationRequestModel } from '../../../../../shared/models';

@Component({
  selector: 'app-donation-requests-list-item',
  templateUrl: './donation-requests-list-item.component.html',
  styleUrls: ['./donation-requests-list-item.component.less'],
})
export class DonationRequestsListItemComponent implements OnInit {
  @Output() showDetail = new EventEmitter<number>();
  @Input() item: DonationRequestModel;
  @Input() loading = true;
  @Input() modalClosed = false;
  proportionalPercentage = 20;

  constructor() {}

  getCategories(donationRequest: DonationRequestModel) {
    return !!donationRequest.donationRequestCategories
      ? donationRequest.donationRequestCategories.map((drc) => drc.category.name)
      : [];
  }

  sendItem() {
    this.showDetail.emit(this.item.id);
  }

  getPriority() {
    if (this.item) {
      return Math.round(this.item.priority / this.proportionalPercentage);
    } else {
      return 0;
    }
  }
  ngOnInit(): void {}
}
