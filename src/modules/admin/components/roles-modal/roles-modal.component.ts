import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.scss']
})
export class RolesModalComponent implements OnInit {

  @Output() modalSelectedRoles = new EventEmitter();
  @Input() dataFromAdmin: any;
  

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

  /* Summary:
        The method send seleced roles to Admin (parent component) */
  updateRoles() {
    console.log(this.dataFromAdmin);
    this.modalSelectedRoles.emit(this.dataFromAdmin);
    this.activeModal.close();
  }
}
