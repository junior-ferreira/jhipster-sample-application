package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.OrdemServico;
import io.github.jhipster.application.repository.OrdemServicoRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing OrdemServico.
 */
@RestController
@RequestMapping("/api")
public class OrdemServicoResource {

    private final Logger log = LoggerFactory.getLogger(OrdemServicoResource.class);

    private static final String ENTITY_NAME = "ordemServico";

    private OrdemServicoRepository ordemServicoRepository;

    public OrdemServicoResource(OrdemServicoRepository ordemServicoRepository) {
        this.ordemServicoRepository = ordemServicoRepository;
    }

    /**
     * POST  /ordem-servicos : Create a new ordemServico.
     *
     * @param ordemServico the ordemServico to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ordemServico, or with status 400 (Bad Request) if the ordemServico has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ordem-servicos")
    @Timed
    public ResponseEntity<OrdemServico> createOrdemServico(@RequestBody OrdemServico ordemServico) throws URISyntaxException {
        log.debug("REST request to save OrdemServico : {}", ordemServico);
        if (ordemServico.getId() != null) {
            throw new BadRequestAlertException("A new ordemServico cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrdemServico result = ordemServicoRepository.save(ordemServico);
        return ResponseEntity.created(new URI("/api/ordem-servicos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ordem-servicos : Updates an existing ordemServico.
     *
     * @param ordemServico the ordemServico to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ordemServico,
     * or with status 400 (Bad Request) if the ordemServico is not valid,
     * or with status 500 (Internal Server Error) if the ordemServico couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ordem-servicos")
    @Timed
    public ResponseEntity<OrdemServico> updateOrdemServico(@RequestBody OrdemServico ordemServico) throws URISyntaxException {
        log.debug("REST request to update OrdemServico : {}", ordemServico);
        if (ordemServico.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrdemServico result = ordemServicoRepository.save(ordemServico);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ordemServico.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ordem-servicos : get all the ordemServicos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ordemServicos in body
     */
    @GetMapping("/ordem-servicos")
    @Timed
    public List<OrdemServico> getAllOrdemServicos() {
        log.debug("REST request to get all OrdemServicos");
        return ordemServicoRepository.findAll();
    }

    /**
     * GET  /ordem-servicos/:id : get the "id" ordemServico.
     *
     * @param id the id of the ordemServico to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ordemServico, or with status 404 (Not Found)
     */
    @GetMapping("/ordem-servicos/{id}")
    @Timed
    public ResponseEntity<OrdemServico> getOrdemServico(@PathVariable Long id) {
        log.debug("REST request to get OrdemServico : {}", id);
        Optional<OrdemServico> ordemServico = ordemServicoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ordemServico);
    }

    /**
     * DELETE  /ordem-servicos/:id : delete the "id" ordemServico.
     *
     * @param id the id of the ordemServico to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ordem-servicos/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrdemServico(@PathVariable Long id) {
        log.debug("REST request to delete OrdemServico : {}", id);

        ordemServicoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
