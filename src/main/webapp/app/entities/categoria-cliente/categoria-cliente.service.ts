import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICategoriaCliente } from 'app/shared/model/categoria-cliente.model';

type EntityResponseType = HttpResponse<ICategoriaCliente>;
type EntityArrayResponseType = HttpResponse<ICategoriaCliente[]>;

@Injectable({ providedIn: 'root' })
export class CategoriaClienteService {
    private resourceUrl = SERVER_API_URL + 'api/categoria-clientes';

    constructor(private http: HttpClient) {}

    create(categoriaCliente: ICategoriaCliente): Observable<EntityResponseType> {
        return this.http.post<ICategoriaCliente>(this.resourceUrl, categoriaCliente, { observe: 'response' });
    }

    update(categoriaCliente: ICategoriaCliente): Observable<EntityResponseType> {
        return this.http.put<ICategoriaCliente>(this.resourceUrl, categoriaCliente, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICategoriaCliente>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICategoriaCliente[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
