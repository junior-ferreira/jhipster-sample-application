import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFatura } from 'app/shared/model/fatura.model';

type EntityResponseType = HttpResponse<IFatura>;
type EntityArrayResponseType = HttpResponse<IFatura[]>;

@Injectable({ providedIn: 'root' })
export class FaturaService {
    private resourceUrl = SERVER_API_URL + 'api/faturas';

    constructor(private http: HttpClient) {}

    create(fatura: IFatura): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fatura);
        return this.http
            .post<IFatura>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(fatura: IFatura): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fatura);
        return this.http
            .put<IFatura>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFatura>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFatura[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(fatura: IFatura): IFatura {
        const copy: IFatura = Object.assign({}, fatura, {
            dataProcessamento:
                fatura.dataProcessamento != null && fatura.dataProcessamento.isValid() ? fatura.dataProcessamento.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dataProcessamento = res.body.dataProcessamento != null ? moment(res.body.dataProcessamento) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((fatura: IFatura) => {
            fatura.dataProcessamento = fatura.dataProcessamento != null ? moment(fatura.dataProcessamento) : null;
        });
        return res;
    }
}
