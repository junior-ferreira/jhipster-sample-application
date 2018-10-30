import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrdemServico } from 'app/shared/model/ordem-servico.model';

type EntityResponseType = HttpResponse<IOrdemServico>;
type EntityArrayResponseType = HttpResponse<IOrdemServico[]>;

@Injectable({ providedIn: 'root' })
export class OrdemServicoService {
    public resourceUrl = SERVER_API_URL + 'api/ordem-servicos';

    constructor(private http: HttpClient) {}

    create(ordemServico: IOrdemServico): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(ordemServico);
        return this.http
            .post<IOrdemServico>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(ordemServico: IOrdemServico): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(ordemServico);
        return this.http
            .put<IOrdemServico>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IOrdemServico>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IOrdemServico[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(ordemServico: IOrdemServico): IOrdemServico {
        const copy: IOrdemServico = Object.assign({}, ordemServico, {
            dataProcessamento:
                ordemServico.dataProcessamento != null && ordemServico.dataProcessamento.isValid()
                    ? ordemServico.dataProcessamento.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dataProcessamento = res.body.dataProcessamento != null ? moment(res.body.dataProcessamento) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((ordemServico: IOrdemServico) => {
            ordemServico.dataProcessamento = ordemServico.dataProcessamento != null ? moment(ordemServico.dataProcessamento) : null;
        });
        return res;
    }
}
