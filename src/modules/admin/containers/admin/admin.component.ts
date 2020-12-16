import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RolesModalComponent } from '@modules/admin/components';
import { UserForAdmin } from '@modules/admin/models';
import { AdminService } from '@modules/admin/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'sb-admin',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
    users: UserForAdmin[];
    constructor(private adminService: AdminService, private modalService: NgbModal,private cdRef: ChangeDetectorRef,) {}

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.adminService.getUsersWithRoles().subscribe(
            (response: any) => {
                this.users = response;
            },
            error => {
                console.log(error);
            }
        );
    }

    /* Summary:
            Calling this method opens a modal (RolesModalComponent) and passes it an object 'dataFromAdmin'
            which contains user's information and his roles, receives updated roles from modal, and send
            a reuest to the server */
    editRolesModal(user: UserForAdmin) {
        const modalRef = this.modalService.open(RolesModalComponent);
        modalRef.componentInstance.dataFromAdmin = {
            user,
            roles: this.getRolesArray(user),
        };

        /* Receive 'modalSelectedRoles' from roles-modal-component(child), make an object 'rolesToUpdate'
        which holds only selected roles array 'roleNames'*/
        modalRef.componentInstance.modalSelectedRoles.subscribe((values: any) => {
            const rolesToUpdate = {
                roleNames: [
                    ...values.roles
                        .filter((el: any) => el.checked === true)
                        .map((el: any) => el.name),
                ],
            };

            /* Send a request to the server. Get newly assigned roles in response and update the users
        list */
            this.adminService.updateUserRoles(user, rolesToUpdate).subscribe( () => {
                user.roles = [...rolesToUpdate.roleNames];
                this.cdRef.detectChanges();
            }, error => {
                console.log(error);
            });
        });
    }

    private getRolesArray(user: UserForAdmin) {
        const roles = [];
        const userRoles = user.roles;
        const availabaleRoles: any[] = [
            { name: 'Admin', value: 'Admin' },
            { name: 'Editor', value: 'Editor' },
            { name: 'Member', value: 'Member' },
            { name: 'Moderator', value: 'Moderator' },
        ];

        for (let i = 0; i < availabaleRoles.length; i++) {
            let isMatch = false;
            for (let j = 0; j < userRoles.length; j++) {
                if (availabaleRoles[i].name == userRoles[j]) {
                    isMatch = true;
                    availabaleRoles[i].checked = true;
                    roles.push(availabaleRoles[i]);
                    break;
                }
            }
            if (!isMatch) {
                availabaleRoles[i].checked = false;
                roles.push(availabaleRoles[i]);
            }
        }

        return roles;
    }
}
