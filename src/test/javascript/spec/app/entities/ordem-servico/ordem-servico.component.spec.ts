/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetoeasoftwareTestModule } from '../../../test.module';
import { OrdemServicoComponent } from 'app/entities/ordem-servico/ordem-servico.component';
import { OrdemServicoService } from 'app/entities/ordem-servico/ordem-servico.service';
import { OrdemServico } from 'app/shared/model/ordem-servico.model';

describe('Component Tests', () => {
    describe('OrdemServico Management Component', () => {
        let comp: OrdemServicoComponent;
        let fixture: ComponentFixture<OrdemServicoComponent>;
        let service: OrdemServicoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoeasoftwareTestModule],
                declarations: [OrdemServicoComponent],
                providers: []
            })
                .overrideTemplate(OrdemServicoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrdemServicoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrdemServicoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new OrdemServico(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.ordemServicos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
