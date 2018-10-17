package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Fatura;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Fatura entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FaturaRepository extends JpaRepository<Fatura, Long> {

}
