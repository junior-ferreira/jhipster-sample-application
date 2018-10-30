package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A OrdemServico.
 */
@Entity
@Table(name = "ordem_servico")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OrdemServico implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_processamento")
    private LocalDate dataProcessamento;

    @Column(name = "servico")
    private String servico;

    @Column(name = "valor_total")
    private Double valorTotal;

    @ManyToOne
    @JsonIgnoreProperties("nomes")
    private Servico servico;

    @ManyToOne
    @JsonIgnoreProperties("listaCartoes")
    private Cliente servico;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataProcessamento() {
        return dataProcessamento;
    }

    public OrdemServico dataProcessamento(LocalDate dataProcessamento) {
        this.dataProcessamento = dataProcessamento;
        return this;
    }

    public void setDataProcessamento(LocalDate dataProcessamento) {
        this.dataProcessamento = dataProcessamento;
    }

    public String getServico() {
        return servico;
    }

    public OrdemServico servico(String servico) {
        this.servico = servico;
        return this;
    }

    public void setServico(String servico) {
        this.servico = servico;
    }

    public Double getValorTotal() {
        return valorTotal;
    }

    public OrdemServico valorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
        return this;
    }

    public void setValorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
    }

    public Servico getServico() {
        return servico;
    }

    public OrdemServico servico(Servico servico) {
        this.servico = servico;
        return this;
    }

    public void setServico(Servico servico) {
        this.servico = servico;
    }

    public Cliente getServico() {
        return servico;
    }

    public OrdemServico servico(Cliente cliente) {
        this.servico = cliente;
        return this;
    }

    public void setServico(Cliente cliente) {
        this.servico = cliente;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        OrdemServico ordemServico = (OrdemServico) o;
        if (ordemServico.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ordemServico.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrdemServico{" +
            "id=" + getId() +
            ", dataProcessamento='" + getDataProcessamento() + "'" +
            ", servico='" + getServico() + "'" +
            ", valorTotal=" + getValorTotal() +
            "}";
    }
}
