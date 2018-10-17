package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.ProjetoeasoftwareApp;

import io.github.jhipster.application.domain.CategoriaCliente;
import io.github.jhipster.application.repository.CategoriaClienteRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CategoriaClienteResource REST controller.
 *
 * @see CategoriaClienteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjetoeasoftwareApp.class)
public class CategoriaClienteResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final Double DEFAULT_PONTUACAO_MINIMA = 1D;
    private static final Double UPDATED_PONTUACAO_MINIMA = 2D;

    @Autowired
    private CategoriaClienteRepository categoriaClienteRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCategoriaClienteMockMvc;

    private CategoriaCliente categoriaCliente;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CategoriaClienteResource categoriaClienteResource = new CategoriaClienteResource(categoriaClienteRepository);
        this.restCategoriaClienteMockMvc = MockMvcBuilders.standaloneSetup(categoriaClienteResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CategoriaCliente createEntity(EntityManager em) {
        CategoriaCliente categoriaCliente = new CategoriaCliente()
            .nome(DEFAULT_NOME)
            .descricao(DEFAULT_DESCRICAO)
            .pontuacaoMinima(DEFAULT_PONTUACAO_MINIMA);
        return categoriaCliente;
    }

    @Before
    public void initTest() {
        categoriaCliente = createEntity(em);
    }

    @Test
    @Transactional
    public void createCategoriaCliente() throws Exception {
        int databaseSizeBeforeCreate = categoriaClienteRepository.findAll().size();

        // Create the CategoriaCliente
        restCategoriaClienteMockMvc.perform(post("/api/categoria-clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoriaCliente)))
            .andExpect(status().isCreated());

        // Validate the CategoriaCliente in the database
        List<CategoriaCliente> categoriaClienteList = categoriaClienteRepository.findAll();
        assertThat(categoriaClienteList).hasSize(databaseSizeBeforeCreate + 1);
        CategoriaCliente testCategoriaCliente = categoriaClienteList.get(categoriaClienteList.size() - 1);
        assertThat(testCategoriaCliente.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testCategoriaCliente.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testCategoriaCliente.getPontuacaoMinima()).isEqualTo(DEFAULT_PONTUACAO_MINIMA);
    }

    @Test
    @Transactional
    public void createCategoriaClienteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = categoriaClienteRepository.findAll().size();

        // Create the CategoriaCliente with an existing ID
        categoriaCliente.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCategoriaClienteMockMvc.perform(post("/api/categoria-clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoriaCliente)))
            .andExpect(status().isBadRequest());

        // Validate the CategoriaCliente in the database
        List<CategoriaCliente> categoriaClienteList = categoriaClienteRepository.findAll();
        assertThat(categoriaClienteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCategoriaClientes() throws Exception {
        // Initialize the database
        categoriaClienteRepository.saveAndFlush(categoriaCliente);

        // Get all the categoriaClienteList
        restCategoriaClienteMockMvc.perform(get("/api/categoria-clientes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(categoriaCliente.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())))
            .andExpect(jsonPath("$.[*].pontuacaoMinima").value(hasItem(DEFAULT_PONTUACAO_MINIMA.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getCategoriaCliente() throws Exception {
        // Initialize the database
        categoriaClienteRepository.saveAndFlush(categoriaCliente);

        // Get the categoriaCliente
        restCategoriaClienteMockMvc.perform(get("/api/categoria-clientes/{id}", categoriaCliente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(categoriaCliente.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()))
            .andExpect(jsonPath("$.pontuacaoMinima").value(DEFAULT_PONTUACAO_MINIMA.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCategoriaCliente() throws Exception {
        // Get the categoriaCliente
        restCategoriaClienteMockMvc.perform(get("/api/categoria-clientes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCategoriaCliente() throws Exception {
        // Initialize the database
        categoriaClienteRepository.saveAndFlush(categoriaCliente);

        int databaseSizeBeforeUpdate = categoriaClienteRepository.findAll().size();

        // Update the categoriaCliente
        CategoriaCliente updatedCategoriaCliente = categoriaClienteRepository.findById(categoriaCliente.getId()).get();
        // Disconnect from session so that the updates on updatedCategoriaCliente are not directly saved in db
        em.detach(updatedCategoriaCliente);
        updatedCategoriaCliente
            .nome(UPDATED_NOME)
            .descricao(UPDATED_DESCRICAO)
            .pontuacaoMinima(UPDATED_PONTUACAO_MINIMA);

        restCategoriaClienteMockMvc.perform(put("/api/categoria-clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCategoriaCliente)))
            .andExpect(status().isOk());

        // Validate the CategoriaCliente in the database
        List<CategoriaCliente> categoriaClienteList = categoriaClienteRepository.findAll();
        assertThat(categoriaClienteList).hasSize(databaseSizeBeforeUpdate);
        CategoriaCliente testCategoriaCliente = categoriaClienteList.get(categoriaClienteList.size() - 1);
        assertThat(testCategoriaCliente.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testCategoriaCliente.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testCategoriaCliente.getPontuacaoMinima()).isEqualTo(UPDATED_PONTUACAO_MINIMA);
    }

    @Test
    @Transactional
    public void updateNonExistingCategoriaCliente() throws Exception {
        int databaseSizeBeforeUpdate = categoriaClienteRepository.findAll().size();

        // Create the CategoriaCliente

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCategoriaClienteMockMvc.perform(put("/api/categoria-clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoriaCliente)))
            .andExpect(status().isBadRequest());

        // Validate the CategoriaCliente in the database
        List<CategoriaCliente> categoriaClienteList = categoriaClienteRepository.findAll();
        assertThat(categoriaClienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCategoriaCliente() throws Exception {
        // Initialize the database
        categoriaClienteRepository.saveAndFlush(categoriaCliente);

        int databaseSizeBeforeDelete = categoriaClienteRepository.findAll().size();

        // Get the categoriaCliente
        restCategoriaClienteMockMvc.perform(delete("/api/categoria-clientes/{id}", categoriaCliente.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CategoriaCliente> categoriaClienteList = categoriaClienteRepository.findAll();
        assertThat(categoriaClienteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CategoriaCliente.class);
        CategoriaCliente categoriaCliente1 = new CategoriaCliente();
        categoriaCliente1.setId(1L);
        CategoriaCliente categoriaCliente2 = new CategoriaCliente();
        categoriaCliente2.setId(categoriaCliente1.getId());
        assertThat(categoriaCliente1).isEqualTo(categoriaCliente2);
        categoriaCliente2.setId(2L);
        assertThat(categoriaCliente1).isNotEqualTo(categoriaCliente2);
        categoriaCliente1.setId(null);
        assertThat(categoriaCliente1).isNotEqualTo(categoriaCliente2);
    }
}
