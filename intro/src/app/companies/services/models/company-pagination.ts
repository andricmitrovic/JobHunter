import { Company } from './../../../pages/register/company/models/company';

export interface CompanyPagination{
    docs: Company[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number | null;
    page: number;
    pagingCounter: number;
    prevPage: number | null;
    totalDocs: number;
    totalPages: number;
}
