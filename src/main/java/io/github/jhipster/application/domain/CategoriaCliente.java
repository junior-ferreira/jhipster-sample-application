package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A CategoriaCliente.
 */
@Entity
@Table(name = "categoria_cliente")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CategoriaCliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "pontuacao_minima")
    private Double pontuacaoMinima;

    @OneToMany(mappedBy = "clientes")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Cliente> clientes = new HashSet<>();
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

    public CategoriaCliente nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public CategoriaCliente descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getPontuacaoMinima() {
        return pontuacaoMinima;
    }

    public CategoriaCliente pontuacaoMinima(Double pontuacaoMinima) {
        this.pontuacaoMinima = pontuacaoMinima;
        return this;
    }

    public void setPontuacaoMinima(Double pontuacaoMinima) {
        this.pontuacaoMinima = pontuacaoMinima;
    }

    public Set<Cliente> getClientes() {
        return clientes;
    }

    public CategoriaCliente clientes(Set<Cliente> clientes) {
        this.clientes = clientes;
        return this;
    }

    public CategoriaCliente addCliente(Cliente cliente) {
        this.clientes.add(cliente);
        cliente.setClientes(this);
        return this;
    }

    public CategoriaCliente removeCliente(Cliente cliente) {
        this.clientes.remove(cliente);
        cliente.setClientes(null);
        return this;
    }

    public void setClientes(Set<Cliente> clientes) {
        this.clientes = clientes;
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
        CategoriaCliente categoriaCliente = (CategoriaCliente) o;
        if (categoriaCliente.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), categoriaCliente.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CategoriaCliente{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", pontuacaoMinima=" + getPontuacaoMinima() +
            "}";
    }
}
