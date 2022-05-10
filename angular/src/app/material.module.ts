import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatTableModule} from '@angular/material/table';
import { MatSelectModule } from "@angular/material/select";
import { MatPaginatorModule } from "@angular/material/paginator";
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
    imports:[MatToolbarModule,MatButtonModule ,MatSidenavModule,MatRadioModule,MatMenuModule,MatListModule,MatSelectModule,MatPaginatorModule,MatDialogModule,
        MatIconModule,MatFormFieldModule,MatButtonToggleModule,MatCardModule,MatInputModule,MatTabsModule,MatGridListModule,FlexLayoutModule,MatTableModule],
    exports:[MatToolbarModule,MatButtonModule ,MatSidenavModule,MatRadioModule,MatMenuModule,MatListModule,MatSelectModule,MatPaginatorModule,MatDialogModule,
        MatIconModule,MatFormFieldModule,MatButtonToggleModule,MatCardModule,MatInputModule,MatTabsModule,MatGridListModule,FlexLayoutModule,MatTableModule]
})
export class MaterialComp{

}