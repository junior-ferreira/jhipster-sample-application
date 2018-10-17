package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Fatura;
import io.github.jhipster.application.repository.FaturaRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing Fatura.
 */
@RestController
@RequestMapping("/api")
public class FaturaResource {

    private final Logger log = LoggerFactory.getLogger(FaturaResource.class);

    private static final String ENTITY_NAME = "fatura";

    private FaturaRepository faturaRepository;

    public FaturaResource(FaturaRepository faturaRepository) {
        this.faturaRepository = faturaRepository;
    }

    /**
     * POST  /faturas : Create a new fatura.
     *
     * @param fatura the fatura to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fatura, or with status 400 (Bad Request) if the fatura has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/faturas")
    @Timed
    public ResponseEntity<Fatura> createFatura(@RequestBody Fatura fatura) throws URISyntaxException {
        log.debug("REST request to save Fatura : {}", fatura);
        if (fatura.getId() != null) {
            throw new BadRequestAlertException("A new fatura cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fatura result = faturaRepository.save(fatura);
        return ResponseEntity.created(new URI("/api/faturas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /faturas : Updates an existing fatura.
     *
     * @param fatura the fatura to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fatura,
     * or with status 400 (Bad Request) if the fatura is not valid,
     * or with status 500 (Internal Server Error) if the fatura couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/faturas")
    @Timed
    public ResponseEntity<Fatura> updateFatura(@RequestBody Fatura fatura) throws URISyntaxException {
        log.debug("REST request to update Fatura : {}", fatura);
        if (fatura.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Fatura result = faturaRepository.save(fatura);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fatura.getId().toString()))
            .body(result);
    }

    /**
     * GET  /faturas : get all the faturas.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of faturas in body
     */
    @GetMapping("/faturas")
    @Timed
    public List<Fatura> getAllFaturas(@RequestParam(required = false) String filter) {
        if ("pagamento-is-null".equals(filter)) {
            log.debug("REST request to get all Faturas where pagamento is null");
            return StreamSupport
                .stream(faturaRepository.findAll().spliterator(), false)
                .filter(fatura -> fatura.getPagamento() == null)
                .collect(Collectors.toList());
        }
        if ("cliente-is-null".equals(filter)) {
            log.debug("REST request to get all Faturas where cliente is null");
            return StreamSupport
                .stream(faturaRepository.findAll().spliterator(), false)
                .filter(fatura -> fatura.getCliente() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Faturas");
        return faturaRepository.findAll();
    }

    /**
     * GET  /faturas/:id : get the "id" fatura.
     *
     * @param id the id of the fatura to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fatura, or with status 404 (Not Found)
     */
    @GetMapping("/faturas/{id}")
    @Timed
    public ResponseEntity<Fatura> getFatura(@PathVariable Long id) {
        log.debug("REST request to get Fatura : {}", id);
        Optional<Fatura> fatura = faturaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fatura);
    }

    /**
     * DELETE  /faturas/:id : delete the "id" fatura.
     *
     * @param id the id of the fatura to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/faturas/{id}")
    @Timed
    public ResponseEntity<Void> deleteFatura(@PathVariable Long id) {
        log.debug("REST request to delete Fatura : {}", id);

        faturaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
