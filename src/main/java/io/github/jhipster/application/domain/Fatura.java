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

import io.github.jhipster.application.domain.enumeration.StatusFatura;

/**
 * A Fatura.
 */
@Entity
@Table(name = "fatura")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Fatura implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_processamento")
    private LocalDate dataProcessamento;

    @Column(name = "valor_total")
    private Double valorTotal;

    @Column(name = "pontuacao")
    private Double pontuacao;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_fatura")
    private StatusFatura statusFatura;

    @OneToMany(mappedBy = "produtos")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Produto> produtos = new HashSet<>();
    @OneToOne(mappedBy = "fatura")
    @JsonIgnore
    private Pagamento pagamento;

    @OneToOne(mappedBy = "fatura")
    @JsonIgnore
    private Cliente cliente;

    @ManyToOne
    @JsonIgnoreProperties("faturas")
    private Cartao faturas;

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

    public Fatura dataProcessamento(LocalDate dataProcessamento) {
        this.dataProcessamento = dataProcessamento;
        return this;
    }

    public void setDataProcessamento(LocalDate dataProcessamento) {
        this.dataProcessamento = dataProcessamento;
    }

    public Double getValorTotal() {
        return valorTotal;
    }

    public Fatura valorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
        return this;
    }

    public void setValorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
    }

    public Double getPontuacao() {
        return pontuacao;
    }

    public Fatura pontuacao(Double pontuacao) {
        this.pontuacao = pontuacao;
        return this;
    }

    public void setPontuacao(Double pontuacao) {
        this.pontuacao = pontuacao;
    }

    public StatusFatura getStatusFatura() {
        return statusFatura;
    }

    public Fatura statusFatura(StatusFatura statusFatura) {
        this.statusFatura = statusFatura;
        return this;
    }

    public void setStatusFatura(StatusFatura statusFatura) {
        this.statusFatura = statusFatura;
    }

    public Set<Produto> getProdutos() {
        return produtos;
    }

    public Fatura produtos(Set<Produto> produtos) {
        this.produtos = produtos;
        return this;
    }

    public Fatura addProduto(Produto produto) {
        this.produtos.add(produto);
        produto.setProdutos(this);
        return this;
    }

    public Fatura removeProduto(Produto produto) {
        this.produtos.remove(produto);
        produto.setProdutos(null);
        return this;
    }

    public void setProdutos(Set<Produto> produtos) {
        this.produtos = produtos;
    }

    public Pagamento getPagamento() {
        return pagamento;
    }

    public Fatura pagamento(Pagamento pagamento) {
        this.pagamento = pagamento;
        return this;
    }

    public void setPagamento(Pagamento pagamento) {
        this.pagamento = pagamento;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Fatura cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Cartao getFaturas() {
        return faturas;
    }

    public Fatura faturas(Cartao cartao) {
        this.faturas = cartao;
        return this;
    }

    public void setFaturas(Cartao cartao) {
        this.faturas = cartao;
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
        Fatura fatura = (Fatura) o;
        if (fatura.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fatura.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Fatura{" +
            "id=" + getId() +
            ", dataProcessamento='" + getDataProcessamento() + "'" +
            ", valorTotal=" + getValorTotal() +
            ", pontuacao=" + getPontuacao() +
            ", statusFatura='" + getStatusFatura() + "'" +
            "}";
    }
}
