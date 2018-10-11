package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.CategoriaCliente;
import io.github.jhipster.application.repository.CategoriaClienteRepository;
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
 * REST controller for managing CategoriaCliente.
 */
@RestController
@RequestMapping("/api")
public class CategoriaClienteResource {

    private final Logger log = LoggerFactory.getLogger(CategoriaClienteResource.class);

    private static final String ENTITY_NAME = "categoriaCliente";

    private final CategoriaClienteRepository categoriaClienteRepository;

    public CategoriaClienteResource(CategoriaClienteRepository categoriaClienteRepository) {
        this.categoriaClienteRepository = categoriaClienteRepository;
    }

    /**
     * POST  /categoria-clientes : Create a new categoriaCliente.
     *
     * @param categoriaCliente the categoriaCliente to create
     * @return the ResponseEntity with status 201 (Created) and with body the new categoriaCliente, or with status 400 (Bad Request) if the categoriaCliente has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/categoria-clientes")
    @Timed
    public ResponseEntity<CategoriaCliente> createCategoriaCliente(@RequestBody CategoriaCliente categoriaCliente) throws URISyntaxException {
        log.debug("REST request to save CategoriaCliente : {}", categoriaCliente);
        if (categoriaCliente.getId() != null) {
            throw new BadRequestAlertException("A new categoriaCliente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CategoriaCliente result = categoriaClienteRepository.save(categoriaCliente);
        return ResponseEntity.created(new URI("/api/categoria-clientes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /categoria-clientes : Updates an existing categoriaCliente.
     *
     * @param categoriaCliente the categoriaCliente to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated categoriaCliente,
     * or with status 400 (Bad Request) if the categoriaCliente is not valid,
     * or with status 500 (Internal Server Error) if the categoriaCliente couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/categoria-clientes")
    @Timed
    public ResponseEntity<CategoriaCliente> updateCategoriaCliente(@RequestBody CategoriaCliente categoriaCliente) throws URISyntaxException {
        log.debug("REST request to update CategoriaCliente : {}", categoriaCliente);
        if (categoriaCliente.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CategoriaCliente result = categoriaClienteRepository.save(categoriaCliente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, categoriaCliente.getId().toString()))
            .body(result);
    }

    /**
     * GET  /categoria-clientes : get all the categoriaClientes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of categoriaClientes in body
     */
    @GetMapping("/categoria-clientes")
    @Timed
    public List<CategoriaCliente> getAllCategoriaClientes() {
        log.debug("REST request to get all CategoriaClientes");
        return categoriaClienteRepository.findAll();
    }

    /**
     * GET  /categoria-clientes/:id : get the "id" categoriaCliente.
     *
     * @param id the id of the categoriaCliente to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the categoriaCliente, or with status 404 (Not Found)
     */
    @GetMapping("/categoria-clientes/{id}")
    @Timed
    public ResponseEntity<CategoriaCliente> getCategoriaCliente(@PathVariable Long id) {
        log.debug("REST request to get CategoriaCliente : {}", id);
        Optional<CategoriaCliente> categoriaCliente = categoriaClienteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(categoriaCliente);
    }

    /**
     * DELETE  /categoria-clientes/:id : delete the "id" categoriaCliente.
     *
     * @param id the id of the categoriaCliente to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/categoria-clientes/{id}")
    @Timed
    public ResponseEntity<Void> deleteCategoriaCliente(@PathVariable Long id) {
        log.debug("REST request to delete CategoriaCliente : {}", id);

        categoriaClienteRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
