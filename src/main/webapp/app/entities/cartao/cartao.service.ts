import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICartao } from 'app/shared/model/cartao.model';

type EntityResponseType = HttpResponse<ICartao>;
type EntityArrayResponseType = HttpResponse<ICartao[]>;

@Injectable({ providedIn: 'root' })
export class CartaoService {
    public resourceUrl = SERVER_API_URL + 'api/cartaos';

    constructor(private http: HttpClient) {}

    create(cartao: ICartao): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(cartao);
        return this.http
            .post<ICartao>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(cartao: ICartao): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(cartao);
        return this.http
            .put<ICartao>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICartao>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICartao[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(cartao: ICartao): ICartao {
        const copy: ICartao = Object.assign({}, cartao, {
            dataValidade: cartao.dataValidade != null && cartao.dataValidade.isValid() ? cartao.dataValidade.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dataValidade = res.body.dataValidade != null ? moment(res.body.dataValidade) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((cartao: ICartao) => {
            cartao.dataValidade = cartao.dataValidade != null ? moment(cartao.dataValidade) : null;
        });
        return res;
    }
}
