/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetoeasoftwareTestModule } from '../../../test.module';
import { FaturaDetailComponent } from 'app/entities/fatura/fatura-detail.component';
import { Fatura } from 'app/shared/model/fatura.model';

describe('Component Tests', () => {
    describe('Fatura Management Detail Component', () => {
        let comp: FaturaDetailComponent;
        let fixture: ComponentFixture<FaturaDetailComponent>;
        const route = ({ data: of({ fatura: new Fatura(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoeasoftwareTestModule],
                declarations: [FaturaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FaturaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FaturaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.fatura).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
