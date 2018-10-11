package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.CategoriaCliente;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CategoriaCliente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategoriaClienteRepository extends JpaRepository<CategoriaCliente, Long> {

}
