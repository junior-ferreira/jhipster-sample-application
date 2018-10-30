package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.OrdemServico;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the OrdemServico entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrdemServicoRepository extends JpaRepository<OrdemServico, Long> {

}
