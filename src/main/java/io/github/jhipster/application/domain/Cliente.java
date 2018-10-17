package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Cliente.
 */
@Entity
@Table(name = "cliente")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "email")
    private String email;

    @Column(name = "telefone")
    private String telefone;

    @OneToOne    @JoinColumn(unique = true)
    private Fatura fatura;

    @OneToMany(mappedBy = "titular")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Cartao> listaCartoes = new HashSet<>();
    @OneToOne(mappedBy = "cliente")
    @JsonIgnore
    private Pagamento pagamento;

    @ManyToOne
    @JsonIgnoreProperties("clientes")
    private CategoriaCliente clientes;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Cliente nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public Cliente email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public Cliente telefone(String telefone) {
        this.telefone = telefone;
        return this;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Fatura getFatura() {
        return fatura;
    }

    public Cliente fatura(Fatura fatura) {
        this.fatura = fatura;
        return this;
    }

    public void setFatura(Fatura fatura) {
        this.fatura = fatura;
    }

    public Set<Cartao> getListaCartoes() {
        return listaCartoes;
    }

    public Cliente listaCartoes(Set<Cartao> cartaos) {
        this.listaCartoes = cartaos;
        return this;
    }

    public Cliente addListaCartoes(Cartao cartao) {
        this.listaCartoes.add(cartao);
        cartao.setTitular(this);
        return this;
    }

    public Cliente removeListaCartoes(Cartao cartao) {
        this.listaCartoes.remove(cartao);
        cartao.setTitular(null);
        return this;
    }

    public void setListaCartoes(Set<Cartao> cartaos) {
        this.listaCartoes = cartaos;
    }

    public Pagamento getPagamento() {
        return pagamento;
    }

    public Cliente pagamento(Pagamento pagamento) {
        this.pagamento = pagamento;
        return this;
    }

    public void setPagamento(Pagamento pagamento) {
        this.pagamento = pagamento;
    }

    public CategoriaCliente getClientes() {
        return clientes;
    }

    public Cliente clientes(CategoriaCliente categoriaCliente) {
        this.clientes = categoriaCliente;
        return this;
    }

    public void setClientes(CategoriaCliente categoriaCliente) {
        this.clientes = categoriaCliente;
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
        Cliente cliente = (Cliente) o;
        if (cliente.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cliente.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cliente{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", email='" + getEmail() + "'" +
            ", telefone='" + getTelefone() + "'" +
            "}";
    }
}
