package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import io.github.jhipster.application.domain.enumeration.StatusCartao;

/**
 * A Cartao.
 */
@Entity
@Table(name = "cartao")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cartao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero")
    private Integer numero;

    @Column(name = "data_validade")
    private LocalDate dataValidade;

    @Column(name = "nome_titular")
    private String nomeTitular;

    @Column(name = "cod_seguranca")
    private Integer codSeguranca;

    @Column(name = "limite")
    private Double limite;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_cartao")
    private StatusCartao statusCartao;

    @OneToMany(mappedBy = "faturas")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Fatura> faturas = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("listaCartoes")
    private Cliente titular;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumero() {
        return numero;
    }

    public Cartao numero(Integer numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public LocalDate getDataValidade() {
        return dataValidade;
    }

    public Cartao dataValidade(LocalDate dataValidade) {
        this.dataValidade = dataValidade;
        return this;
    }

    public void setDataValidade(LocalDate dataValidade) {
        this.dataValidade = dataValidade;
    }

    public String getNomeTitular() {
        return nomeTitular;
    }

    public Cartao nomeTitular(String nomeTitular) {
        this.nomeTitular = nomeTitular;
        return this;
    }

    public void setNomeTitular(String nomeTitular) {
        this.nomeTitular = nomeTitular;
    }

    public Integer getCodSeguranca() {
        return codSeguranca;
    }

    public Cartao codSeguranca(Integer codSeguranca) {
        this.codSeguranca = codSeguranca;
        return this;
    }

    public void setCodSeguranca(Integer codSeguranca) {
        this.codSeguranca = codSeguranca;
    }

    public Double getLimite() {
        return limite;
    }

    public Cartao limite(Double limite) {
        this.limite = limite;
        return this;
    }

    public void setLimite(Double limite) {
        this.limite = limite;
    }

    public StatusCartao getStatusCartao() {
        return statusCartao;
    }

    public Cartao statusCartao(StatusCartao statusCartao) {
        this.statusCartao = statusCartao;
        return this;
    }

    public void setStatusCartao(StatusCartao statusCartao) {
        this.statusCartao = statusCartao;
    }

    public Set<Fatura> getFaturas() {
        return faturas;
    }

    public Cartao faturas(Set<Fatura> faturas) {
        this.faturas = faturas;
        return this;
    }

    public Cartao addFatura(Fatura fatura) {
        this.faturas.add(fatura);
        fatura.setFaturas(this);
        return this;
    }

    public Cartao removeFatura(Fatura fatura) {
        this.faturas.remove(fatura);
        fatura.setFaturas(null);
        return this;
    }

    public void setFaturas(Set<Fatura> faturas) {
        this.faturas = faturas;
    }

    public Cliente getTitular() {
        return titular;
    }

    public Cartao titular(Cliente cliente) {
        this.titular = cliente;
        return this;
    }

    public void setTitular(Cliente cliente) {
        this.titular = cliente;
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
        Cartao cartao = (Cartao) o;
        if (cartao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cartao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cartao{" +
            "id=" + getId() +
            ", numero=" + getNumero() +
            ", dataValidade='" + getDataValidade() + "'" +
            ", nomeTitular='" + getNomeTitular() + "'" +
            ", codSeguranca=" + getCodSeguranca() +
            ", limite=" + getLimite() +
            ", statusCartao='" + getStatusCartao() + "'" +
            "}";
    }
}
