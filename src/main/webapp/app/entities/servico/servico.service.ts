import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IServico } from 'app/shared/model/servico.model';

type EntityResponseType = HttpResponse<IServico>;
type EntityArrayResponseType = HttpResponse<IServico[]>;

@Injectable({ providedIn: 'root' })
export class ServicoService {
    public resourceUrl = SERVER_API_URL + 'api/servicos';

    constructor(private http: HttpClient) {}

    create(servico: IServico): Observable<EntityResponseType> {
        return this.http.post<IServico>(this.resourceUrl, servico, { observe: 'response' });
    }

    update(servico: IServico): Observable<EntityResponseType> {
        return this.http.put<IServico>(this.resourceUrl, servico, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IServico>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IServico[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
