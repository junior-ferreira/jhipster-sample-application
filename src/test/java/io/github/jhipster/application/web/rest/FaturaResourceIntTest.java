package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.ProjetoeasoftwareApp;

import io.github.jhipster.application.domain.Fatura;
import io.github.jhipster.application.repository.FaturaRepository;
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

import io.github.jhipster.application.domain.enumeration.StatusFatura;
/**
 * Test class for the FaturaResource REST controller.
 *
 * @see FaturaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjetoeasoftwareApp.class)
public class FaturaResourceIntTest {

    private static final LocalDate DEFAULT_DATA_PROCESSAMENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_PROCESSAMENTO = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_VALOR_TOTAL = 1D;
    private static final Double UPDATED_VALOR_TOTAL = 2D;

    private static final Double DEFAULT_PONTUACAO = 1D;
    private static final Double UPDATED_PONTUACAO = 2D;

    private static final StatusFatura DEFAULT_STATUS_FATURA = StatusFatura.GERADA;
    private static final StatusFatura UPDATED_STATUS_FATURA = StatusFatura.ATRASADA;

    @Autowired
    private FaturaRepository faturaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFaturaMockMvc;

    private Fatura fatura;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FaturaResource faturaResource = new FaturaResource(faturaRepository);
        this.restFaturaMockMvc = MockMvcBuilders.standaloneSetup(faturaResource)
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
    public static Fatura createEntity(EntityManager em) {
        Fatura fatura = new Fatura()
            .dataProcessamento(DEFAULT_DATA_PROCESSAMENTO)
            .valorTotal(DEFAULT_VALOR_TOTAL)
            .pontuacao(DEFAULT_PONTUACAO)
            .statusFatura(DEFAULT_STATUS_FATURA);
        return fatura;
    }

    @Before
    public void initTest() {
        fatura = createEntity(em);
    }

    @Test
    @Transactional
    public void createFatura() throws Exception {
        int databaseSizeBeforeCreate = faturaRepository.findAll().size();

        // Create the Fatura
        restFaturaMockMvc.perform(post("/api/faturas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fatura)))
            .andExpect(status().isCreated());

        // Validate the Fatura in the database
        List<Fatura> faturaList = faturaRepository.findAll();
        assertThat(faturaList).hasSize(databaseSizeBeforeCreate + 1);
        Fatura testFatura = faturaList.get(faturaList.size() - 1);
        assertThat(testFatura.getDataProcessamento()).isEqualTo(DEFAULT_DATA_PROCESSAMENTO);
        assertThat(testFatura.getValorTotal()).isEqualTo(DEFAULT_VALOR_TOTAL);
        assertThat(testFatura.getPontuacao()).isEqualTo(DEFAULT_PONTUACAO);
        assertThat(testFatura.getStatusFatura()).isEqualTo(DEFAULT_STATUS_FATURA);
    }

    @Test
    @Transactional
    public void createFaturaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = faturaRepository.findAll().size();

        // Create the Fatura with an existing ID
        fatura.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFaturaMockMvc.perform(post("/api/faturas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fatura)))
            .andExpect(status().isBadRequest());

        // Validate the Fatura in the database
        List<Fatura> faturaList = faturaRepository.findAll();
        assertThat(faturaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFaturas() throws Exception {
        // Initialize the database
        faturaRepository.saveAndFlush(fatura);

        // Get all the faturaList
        restFaturaMockMvc.perform(get("/api/faturas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fatura.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataProcessamento").value(hasItem(DEFAULT_DATA_PROCESSAMENTO.toString())))
            .andExpect(jsonPath("$.[*].valorTotal").value(hasItem(DEFAULT_VALOR_TOTAL.doubleValue())))
            .andExpect(jsonPath("$.[*].pontuacao").value(hasItem(DEFAULT_PONTUACAO.doubleValue())))
            .andExpect(jsonPath("$.[*].statusFatura").value(hasItem(DEFAULT_STATUS_FATURA.toString())));
    }
    
    @Test
    @Transactional
    public void getFatura() throws Exception {
        // Initialize the database
        faturaRepository.saveAndFlush(fatura);

        // Get the fatura
        restFaturaMockMvc.perform(get("/api/faturas/{id}", fatura.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fatura.getId().intValue()))
            .andExpect(jsonPath("$.dataProcessamento").value(DEFAULT_DATA_PROCESSAMENTO.toString()))
            .andExpect(jsonPath("$.valorTotal").value(DEFAULT_VALOR_TOTAL.doubleValue()))
            .andExpect(jsonPath("$.pontuacao").value(DEFAULT_PONTUACAO.doubleValue()))
            .andExpect(jsonPath("$.statusFatura").value(DEFAULT_STATUS_FATURA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFatura() throws Exception {
        // Get the fatura
        restFaturaMockMvc.perform(get("/api/faturas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFatura() throws Exception {
        // Initialize the database
        faturaRepository.saveAndFlush(fatura);

        int databaseSizeBeforeUpdate = faturaRepository.findAll().size();

        // Update the fatura
        Fatura updatedFatura = faturaRepository.findById(fatura.getId()).get();
        // Disconnect from session so that the updates on updatedFatura are not directly saved in db
        em.detach(updatedFatura);
        updatedFatura
            .dataProcessamento(UPDATED_DATA_PROCESSAMENTO)
            .valorTotal(UPDATED_VALOR_TOTAL)
            .pontuacao(UPDATED_PONTUACAO)
            .statusFatura(UPDATED_STATUS_FATURA);

        restFaturaMockMvc.perform(put("/api/faturas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFatura)))
            .andExpect(status().isOk());

        // Validate the Fatura in the database
        List<Fatura> faturaList = faturaRepository.findAll();
        assertThat(faturaList).hasSize(databaseSizeBeforeUpdate);
        Fatura testFatura = faturaList.get(faturaList.size() - 1);
        assertThat(testFatura.getDataProcessamento()).isEqualTo(UPDATED_DATA_PROCESSAMENTO);
        assertThat(testFatura.getValorTotal()).isEqualTo(UPDATED_VALOR_TOTAL);
        assertThat(testFatura.getPontuacao()).isEqualTo(UPDATED_PONTUACAO);
        assertThat(testFatura.getStatusFatura()).isEqualTo(UPDATED_STATUS_FATURA);
    }

    @Test
    @Transactional
    public void updateNonExistingFatura() throws Exception {
        int databaseSizeBeforeUpdate = faturaRepository.findAll().size();

        // Create the Fatura

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFaturaMockMvc.perform(put("/api/faturas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fatura)))
            .andExpect(status().isBadRequest());

        // Validate the Fatura in the database
        List<Fatura> faturaList = faturaRepository.findAll();
        assertThat(faturaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFatura() throws Exception {
        // Initialize the database
        faturaRepository.saveAndFlush(fatura);

        int databaseSizeBeforeDelete = faturaRepository.findAll().size();

        // Get the fatura
        restFaturaMockMvc.perform(delete("/api/faturas/{id}", fatura.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Fatura> faturaList = faturaRepository.findAll();
        assertThat(faturaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fatura.class);
        Fatura fatura1 = new Fatura();
        fatura1.setId(1L);
        Fatura fatura2 = new Fatura();
        fatura2.setId(fatura1.getId());
        assertThat(fatura1).isEqualTo(fatura2);
        fatura2.setId(2L);
        assertThat(fatura1).isNotEqualTo(fatura2);
        fatura1.setId(null);
        assertThat(fatura1).isNotEqualTo(fatura2);
    }
}
