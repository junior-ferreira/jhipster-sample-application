package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Pagamento.
 */
@Entity
@Table(name = "pagamento")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Pagamento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_pagamento")
    private LocalDate dataPagamento;

    @Column(name = "valor")
    private Double valor;

    @Column(name = "nome_banco")
    private String nomeBanco;

    @OneToOne    @JoinColumn(unique = true)
    private Fatura fatura;

    @OneToOne    @JoinColumn(unique = true)
    private Cliente cliente;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataPagamento() {
        return dataPagamento;
    }

    public Pagamento dataPagamento(LocalDate dataPagamento) {
        this.dataPagamento = dataPagamento;
        return this;
    }

    public void setDataPagamento(LocalDate dataPagamento) {
        this.dataPagamento = dataPagamento;
    }

    public Double getValor() {
        return valor;
    }

    public Pagamento valor(Double valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public String getNomeBanco() {
        return nomeBanco;
    }

    public Pagamento nomeBanco(String nomeBanco) {
        this.nomeBanco = nomeBanco;
        return this;
    }

    public void setNomeBanco(String nomeBanco) {
        this.nomeBanco = nomeBanco;
    }

    public Fatura getFatura() {
        return fatura;
    }

    public Pagamento fatura(Fatura fatura) {
        this.fatura = fatura;
        return this;
    }

    public void setFatura(Fatura fatura) {
        this.fatura = fatura;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Pagamento cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
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
        Pagamento pagamento = (Pagamento) o;
        if (pagamento.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pagamento.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Pagamento{" +
            "id=" + getId() +
            ", dataPagamento='" + getDataPagamento() + "'" +
            ", valor=" + getValor() +
            ", nomeBanco='" + getNomeBanco() + "'" +
            "}";
    }
}
