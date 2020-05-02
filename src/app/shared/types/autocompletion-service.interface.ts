import { Observable } from 'rxjs';
import { ListCriteria } from './list-criteria.interface';

export interface AutocompletionService<T> {
    items$: Observable<T[]>;
    loading$: Observable<boolean>;
    load: (criteria: ListCriteria) => void;
    loadMore?: () => void;
}
