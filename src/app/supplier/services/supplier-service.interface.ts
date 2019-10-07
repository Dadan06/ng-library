import { Observable } from 'rxjs';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { SupplierCriteria } from '../types/supplier-criteria.interface';
import { Supplier } from '../types/supplier.interface';

export interface SupplierServiceInterface {
    loadSuppliers(criteria: SupplierCriteria): Observable<Paginated<Supplier>>;
    loadSupplier(supplierModelId: string): Observable<Supplier>;
    supplierFactory(): Observable<Supplier>;
    deleteSupplier(supplierModel: Supplier): Observable<void>;
    saveSupplier(supplierModel: Supplier): Observable<Supplier>;
}
