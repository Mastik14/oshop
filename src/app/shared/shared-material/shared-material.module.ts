import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatInputModule,
  MatDividerModule,
  MatSlideToggleModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatChipsModule,
    MatCardModule,
    MatDividerModule,
    MatSlideToggleModule
  ],
  exports: [
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatChipsModule,
    MatCardModule,
    MatDividerModule,
    MatSlideToggleModule
  ],
  declarations: []
})
export class SharedMaterialModule {}
