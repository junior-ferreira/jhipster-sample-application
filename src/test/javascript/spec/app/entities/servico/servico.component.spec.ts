/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetoeasoftwareTestModule } from '../../../test.module';
import { ServicoComponent } from 'app/entities/servico/servico.component';
import { ServicoService } from 'app/entities/servico/servico.service';
import { Servico } from 'app/shared/model/servico.model';

describe('Component Tests', () => {
    describe('Servico Management Component', () => {
        let comp: ServicoComponent;
        let fixture: ComponentFixture<ServicoComponent>;
        let service: ServicoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoeasoftwareTestModule],
                declarations: [ServicoComponent],
                providers: []
            })
                .overrideTemplate(ServicoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ServicoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServicoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Servico(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.servicos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
