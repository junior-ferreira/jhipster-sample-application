/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetoeasoftwareTestModule } from '../../../test.module';
import { OrdemServicoDetailComponent } from 'app/entities/ordem-servico/ordem-servico-detail.component';
import { OrdemServico } from 'app/shared/model/ordem-servico.model';

describe('Component Tests', () => {
    describe('OrdemServico Management Detail Component', () => {
        let comp: OrdemServicoDetailComponent;
        let fixture: ComponentFixture<OrdemServicoDetailComponent>;
        const route = ({ data: of({ ordemServico: new OrdemServico(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoeasoftwareTestModule],
                declarations: [OrdemServicoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrdemServicoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrdemServicoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.ordemServico).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
