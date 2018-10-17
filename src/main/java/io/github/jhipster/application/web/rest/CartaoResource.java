package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Cartao;
import io.github.jhipster.application.repository.CartaoRepository;
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
 * REST controller for managing Cartao.
 */
@RestController
@RequestMapping("/api")
public class CartaoResource {

    private final Logger log = LoggerFactory.getLogger(CartaoResource.class);

    private static final String ENTITY_NAME = "cartao";

    private CartaoRepository cartaoRepository;

    public CartaoResource(CartaoRepository cartaoRepository) {
        this.cartaoRepository = cartaoRepository;
    }

    /**
     * POST  /cartaos : Create a new cartao.
     *
     * @param cartao the cartao to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cartao, or with status 400 (Bad Request) if the cartao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cartaos")
    @Timed
    public ResponseEntity<Cartao> createCartao(@RequestBody Cartao cartao) throws URISyntaxException {
        log.debug("REST request to save Cartao : {}", cartao);
        if (cartao.getId() != null) {
            throw new BadRequestAlertException("A new cartao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cartao result = cartaoRepository.save(cartao);
        return ResponseEntity.created(new URI("/api/cartaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cartaos : Updates an existing cartao.
     *
     * @param cartao the cartao to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cartao,
     * or with status 400 (Bad Request) if the cartao is not valid,
     * or with status 500 (Internal Server Error) if the cartao couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cartaos")
    @Timed
    public ResponseEntity<Cartao> updateCartao(@RequestBody Cartao cartao) throws URISyntaxException {
        log.debug("REST request to update Cartao : {}", cartao);
        if (cartao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Cartao result = cartaoRepository.save(cartao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cartao.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cartaos : get all the cartaos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cartaos in body
     */
    @GetMapping("/cartaos")
    @Timed
    public List<Cartao> getAllCartaos() {
        log.debug("REST request to get all Cartaos");
        return cartaoRepository.findAll();
    }

    /**
     * GET  /cartaos/:id : get the "id" cartao.
     *
     * @param id the id of the cartao to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cartao, or with status 404 (Not Found)
     */
    @GetMapping("/cartaos/{id}")
    @Timed
    public ResponseEntity<Cartao> getCartao(@PathVariable Long id) {
        log.debug("REST request to get Cartao : {}", id);
        Optional<Cartao> cartao = cartaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cartao);
    }

    /**
     * DELETE  /cartaos/:id : delete the "id" cartao.
     *
     * @param id the id of the cartao to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cartaos/{id}")
    @Timed
    public ResponseEntity<Void> deleteCartao(@PathVariable Long id) {
        log.debug("REST request to delete Cartao : {}", id);

        cartaoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
