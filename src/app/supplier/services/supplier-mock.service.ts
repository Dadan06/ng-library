import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { paginate } from 'src/app/shared/utils/paginate';
import { EMPTY_SUPPLIER_MODEL } from '../constants/supplierl.constants';
import { SUPPLIERS_MOCK } from '../models/supplier.mock';
import { SupplierCriteria } from '../types/supplier-criteria.interface';
import { Supplier } from '../types/supplier.interface';
import { SupplierServiceInterface } from './supplier-service.interface';

@Injectable()
export class SupplierMockService implements SupplierServiceInterface {
    loadSuppliers(criteria: SupplierCriteria): Observable<Paginated<Supplier>> {
        return of({
            items: paginate(SUPPLIERS_MOCK, criteria.page),
            totalItems: SUPPLIERS_MOCK.length
        }).pipe(delay(1500));
    }

    loadSupplier(masterDetailModelId: string): Observable<Supplier> {
        return of(SUPPLIERS_MOCK.find(p => p._id === masterDetailModelId));
    }

    supplierFactory(): Observable<Supplier> {
        return of(EMPTY_SUPPLIER_MODEL);
    }

    deleteSupplier(masterDetailModel: Supplier): Observable<void> {
        return of(null);
    }

    saveSupplier(masterDetailModel: Supplier): Observable<Supplier> {
        return of(masterDetailModel);
    }
}
