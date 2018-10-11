/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { CartaoService } from 'app/entities/cartao/cartao.service';
import { ICartao, Cartao, StatusCartao } from 'app/shared/model/cartao.model';

describe('Service Tests', () => {
    describe('Cartao Service', () => {
        let injector: TestBed;
        let service: CartaoService;
        let httpMock: HttpTestingController;
        let elemDefault: ICartao;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(CartaoService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Cartao(0, 0, currentDate, 'AAAAAAA', 0, 0, StatusCartao.BLOQUEADO);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dataValidade: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Cartao', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dataValidade: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dataValidade: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Cartao(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Cartao', async () => {
                const returnedFromService = Object.assign(
                    {
                        numero: 1,
                        dataValidade: currentDate.format(DATE_FORMAT),
                        nomeTitular: 'BBBBBB',
                        codSeguranca: 1,
                        limite: 1,
                        statusCartao: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dataValidade: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Cartao', async () => {
                const returnedFromService = Object.assign(
                    {
                        numero: 1,
                        dataValidade: currentDate.format(DATE_FORMAT),
                        nomeTitular: 'BBBBBB',
                        codSeguranca: 1,
                        limite: 1,
                        statusCartao: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dataValidade: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Cartao', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
