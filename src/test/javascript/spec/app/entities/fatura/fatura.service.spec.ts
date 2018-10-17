/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { FaturaService } from 'app/entities/fatura/fatura.service';
import { IFatura, Fatura, StatusFatura } from 'app/shared/model/fatura.model';

describe('Service Tests', () => {
    describe('Fatura Service', () => {
        let injector: TestBed;
        let service: FaturaService;
        let httpMock: HttpTestingController;
        let elemDefault: IFatura;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(FaturaService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Fatura(0, currentDate, 0, 0, StatusFatura.GERADA);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dataProcessamento: currentDate.format(DATE_FORMAT)
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

            it('should create a Fatura', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dataProcessamento: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dataProcessamento: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Fatura(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Fatura', async () => {
                const returnedFromService = Object.assign(
                    {
                        dataProcessamento: currentDate.format(DATE_FORMAT),
                        valorTotal: 1,
                        pontuacao: 1,
                        statusFatura: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dataProcessamento: currentDate
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

            it('should return a list of Fatura', async () => {
                const returnedFromService = Object.assign(
                    {
                        dataProcessamento: currentDate.format(DATE_FORMAT),
                        valorTotal: 1,
                        pontuacao: 1,
                        statusFatura: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dataProcessamento: currentDate
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

            it('should delete a Fatura', async () => {
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
