package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Cartao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Cartao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CartaoRepository extends JpaRepository<Cartao, Long> {

}
