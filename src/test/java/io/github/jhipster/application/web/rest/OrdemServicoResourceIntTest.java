package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.ProjetoeasoftwareApp;

import io.github.jhipster.application.domain.OrdemServico;
import io.github.jhipster.application.repository.OrdemServicoRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the OrdemServicoResource REST controller.
 *
 * @see OrdemServicoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjetoeasoftwareApp.class)
public class OrdemServicoResourceIntTest {

    private static final LocalDate DEFAULT_DATA_PROCESSAMENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_PROCESSAMENTO = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_SERVICO = "AAAAAAAAAA";
    private static final String UPDATED_SERVICO = "BBBBBBBBBB";

    private static final Double DEFAULT_VALOR_TOTAL = 1D;
    private static final Double UPDATED_VALOR_TOTAL = 2D;

    @Autowired
    private OrdemServicoRepository ordemServicoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOrdemServicoMockMvc;

    private OrdemServico ordemServico;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrdemServicoResource ordemServicoResource = new OrdemServicoResource(ordemServicoRepository);
        this.restOrdemServicoMockMvc = MockMvcBuilders.standaloneSetup(ordemServicoResource)
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
    public static OrdemServico createEntity(EntityManager em) {
        OrdemServico ordemServico = new OrdemServico()
            .dataProcessamento(DEFAULT_DATA_PROCESSAMENTO)
            .servico(DEFAULT_SERVICO)
            .valorTotal(DEFAULT_VALOR_TOTAL);
        return ordemServico;
    }

    @Before
    public void initTest() {
        ordemServico = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrdemServico() throws Exception {
        int databaseSizeBeforeCreate = ordemServicoRepository.findAll().size();

        // Create the OrdemServico
        restOrdemServicoMockMvc.perform(post("/api/ordem-servicos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordemServico)))
            .andExpect(status().isCreated());

        // Validate the OrdemServico in the database
        List<OrdemServico> ordemServicoList = ordemServicoRepository.findAll();
        assertThat(ordemServicoList).hasSize(databaseSizeBeforeCreate + 1);
        OrdemServico testOrdemServico = ordemServicoList.get(ordemServicoList.size() - 1);
        assertThat(testOrdemServico.getDataProcessamento()).isEqualTo(DEFAULT_DATA_PROCESSAMENTO);
        assertThat(testOrdemServico.getServico()).isEqualTo(DEFAULT_SERVICO);
        assertThat(testOrdemServico.getValorTotal()).isEqualTo(DEFAULT_VALOR_TOTAL);
    }

    @Test
    @Transactional
    public void createOrdemServicoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ordemServicoRepository.findAll().size();

        // Create the OrdemServico with an existing ID
        ordemServico.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrdemServicoMockMvc.perform(post("/api/ordem-servicos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordemServico)))
            .andExpect(status().isBadRequest());

        // Validate the OrdemServico in the database
        List<OrdemServico> ordemServicoList = ordemServicoRepository.findAll();
        assertThat(ordemServicoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOrdemServicos() throws Exception {
        // Initialize the database
        ordemServicoRepository.saveAndFlush(ordemServico);

        // Get all the ordemServicoList
        restOrdemServicoMockMvc.perform(get("/api/ordem-servicos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ordemServico.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataProcessamento").value(hasItem(DEFAULT_DATA_PROCESSAMENTO.toString())))
            .andExpect(jsonPath("$.[*].servico").value(hasItem(DEFAULT_SERVICO.toString())))
            .andExpect(jsonPath("$.[*].valorTotal").value(hasItem(DEFAULT_VALOR_TOTAL.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getOrdemServico() throws Exception {
        // Initialize the database
        ordemServicoRepository.saveAndFlush(ordemServico);

        // Get the ordemServico
        restOrdemServicoMockMvc.perform(get("/api/ordem-servicos/{id}", ordemServico.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ordemServico.getId().intValue()))
            .andExpect(jsonPath("$.dataProcessamento").value(DEFAULT_DATA_PROCESSAMENTO.toString()))
            .andExpect(jsonPath("$.servico").value(DEFAULT_SERVICO.toString()))
            .andExpect(jsonPath("$.valorTotal").value(DEFAULT_VALOR_TOTAL.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingOrdemServico() throws Exception {
        // Get the ordemServico
        restOrdemServicoMockMvc.perform(get("/api/ordem-servicos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrdemServico() throws Exception {
        // Initialize the database
        ordemServicoRepository.saveAndFlush(ordemServico);

        int databaseSizeBeforeUpdate = ordemServicoRepository.findAll().size();

        // Update the ordemServico
        OrdemServico updatedOrdemServico = ordemServicoRepository.findById(ordemServico.getId()).get();
        // Disconnect from session so that the updates on updatedOrdemServico are not directly saved in db
        em.detach(updatedOrdemServico);
        updatedOrdemServico
            .dataProcessamento(UPDATED_DATA_PROCESSAMENTO)
            .servico(UPDATED_SERVICO)
            .valorTotal(UPDATED_VALOR_TOTAL);

        restOrdemServicoMockMvc.perform(put("/api/ordem-servicos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrdemServico)))
            .andExpect(status().isOk());

        // Validate the OrdemServico in the database
        List<OrdemServico> ordemServicoList = ordemServicoRepository.findAll();
        assertThat(ordemServicoList).hasSize(databaseSizeBeforeUpdate);
        OrdemServico testOrdemServico = ordemServicoList.get(ordemServicoList.size() - 1);
        assertThat(testOrdemServico.getDataProcessamento()).isEqualTo(UPDATED_DATA_PROCESSAMENTO);
        assertThat(testOrdemServico.getServico()).isEqualTo(UPDATED_SERVICO);
        assertThat(testOrdemServico.getValorTotal()).isEqualTo(UPDATED_VALOR_TOTAL);
    }

    @Test
    @Transactional
    public void updateNonExistingOrdemServico() throws Exception {
        int databaseSizeBeforeUpdate = ordemServicoRepository.findAll().size();

        // Create the OrdemServico

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrdemServicoMockMvc.perform(put("/api/ordem-servicos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordemServico)))
            .andExpect(status().isBadRequest());

        // Validate the OrdemServico in the database
        List<OrdemServico> ordemServicoList = ordemServicoRepository.findAll();
        assertThat(ordemServicoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrdemServico() throws Exception {
        // Initialize the database
        ordemServicoRepository.saveAndFlush(ordemServico);

        int databaseSizeBeforeDelete = ordemServicoRepository.findAll().size();

        // Get the ordemServico
        restOrdemServicoMockMvc.perform(delete("/api/ordem-servicos/{id}", ordemServico.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OrdemServico> ordemServicoList = ordemServicoRepository.findAll();
        assertThat(ordemServicoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrdemServico.class);
        OrdemServico ordemServico1 = new OrdemServico();
        ordemServico1.setId(1L);
        OrdemServico ordemServico2 = new OrdemServico();
        ordemServico2.setId(ordemServico1.getId());
        assertThat(ordemServico1).isEqualTo(ordemServico2);
        ordemServico2.setId(2L);
        assertThat(ordemServico1).isNotEqualTo(ordemServico2);
        ordemServico1.setId(null);
        assertThat(ordemServico1).isNotEqualTo(ordemServico2);
    }
}
