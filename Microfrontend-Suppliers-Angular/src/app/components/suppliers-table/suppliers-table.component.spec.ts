import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SUPPLIERS_MOCK } from '../../mocks/suppliers.mocks';
import { SuppliersTableComponent } from './suppliers-table.component';

describe('SuppliersTableComponent', () => {
  let component: SuppliersTableComponent;
  let fixture: ComponentFixture<SuppliersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppliersTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar una tabla', () => {
    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeTruthy();
  });

  it('debería renderizar una fila por cada proveedor', () => {
    component.suppliers = SUPPLIERS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(component.suppliers.length);
  });

  it('debería mostrar los datos del proveedor en cada columna', () => {
    component.suppliers = SUPPLIERS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const supplier = component.suppliers[index];

      expect(columns[0].nativeElement.textContent.trim()).toBe(String(supplier.id));
      expect(columns[1].nativeElement.textContent.trim()).toBe(supplier.name);
      expect(columns[2].nativeElement.textContent.trim()).toBe(supplier.contactName);
      expect(columns[3].nativeElement.textContent.trim()).toBe(supplier.email);
      expect(columns[4].nativeElement.textContent.trim()).toBe(supplier.phone);
      expect(columns[5].nativeElement.textContent.trim()).toBe(supplier.country);
      expect(columns[6].nativeElement.textContent.trim()).toBe(supplier.category);
    });
  });

  it('debería mapear cada categoría a su BadgeType correcto', () => {
    expect(component.categoryMap['Tecnologia']).toBe('primary');
    expect(component.categoryMap['Alimentos']).toBe('success');
    expect(component.categoryMap['Papeleria']).toBe('warning');
    expect(component.categoryMap['Aseo']).toBe('info');
  });
});
