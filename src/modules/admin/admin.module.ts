/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { TablesModule } from '@modules/tables/tables.module';
import { RolesModalComponent } from './components';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as adminComponents from './components';

/* Containers */
import * as adminContainers from './containers';

/* Guards */
import * as adminGuards from './guards';

/* Services */
import * as adminServices from './services';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        NgbModalModule,
        TablesModule,
        // JwtModule.forRoot({
        //     config: {
        //         tokenGetter: () => {
        //             return localStorage.getItem('token');
        //         },
        //         allowedDomains: ['localhost:5000'],
        //         disallowedRoutes: ['localhost:5000/auth']
        //     }
        // })
    ],
    providers: [...adminServices.services, ...adminGuards.guards],
    declarations: [...adminContainers.containers, ...adminComponents.components],
    entryComponents: [RolesModalComponent],
    exports: [...adminContainers.containers, ...adminComponents.components],
})
export class AdminModule {}
