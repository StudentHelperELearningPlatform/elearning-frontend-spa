// src/app/shared/components/data-table/data-table.component.ts
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

interface TableColumn {
  field: string;
  header: string;
  type?: 'text' | 'badge' | 'date';
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  host: { style: 'display: contents' },
  imports: [CommonModule, TableModule],
  template: `
    <div class="border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
      <p-table 
        [value]="data()" 
        [columns]="columns()" 
        [paginator]="paginator()" 
        [rows]="rows()"
        [styleClass]="'p-datatable-gridlines'"
        class="custom-table"
      >
        <ng-template pTemplate="header" let-columns>
          <tr class="bg-gray-100 border-b-4 border-black">
            @for (col of columns; track col.field) {
              <th class="p-4 font-black text-black uppercase tracking-wider text-sm border-r-2 border-black last:border-r-0">
                {{ col.header }}
              </th>
            }
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowData let-columns="columns">
          <tr class="border-b-2 border-black/10 hover:bg-[var(--color-primary)]/5 transition-colors">
            @for (col of columns; track col.field) {
              <td class="p-4 font-bold text-black border-r-2 border-black/10 last:border-r-0">
                @if (col.type === 'badge') {
                  <span class="px-3 py-1 rounded-full text-xs font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        [ngClass]="rowData[col.field] === 'ACTIVE' ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-black'">
                    {{ rowData[col.field] }}
                  </span>
                } @else {
                  {{ rowData[col.field] }}
                }
              </td>
            }
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
  styles: [`
    :host ::ng-deep {
      .p-datatable .p-datatable-thead > tr > th {
        background: #f3f4f6;
        color: black;
      }
      .p-paginator {
        border-top: 4px solid black;
        background: white;
        padding: 1rem;
      }
      .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
        background: var(--color-primary);
        color: white;
        border: 2px solid black;
      }
    }
  `]
})
export class DataTableComponent {
  data = input<Record<string, unknown>[]>([]);
  columns = input<TableColumn[]>([]);
  paginator = input<boolean>(true);
  rows = input<number>(10);
}

