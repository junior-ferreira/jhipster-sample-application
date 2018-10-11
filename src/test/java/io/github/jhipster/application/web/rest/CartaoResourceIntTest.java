package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.ProjetoeasoftwareApp;

import io.github.jhipster.application.domain.Cartao;
import io.github.jhipster.application.repository.CartaoRepository;
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

import io.github.jhipster.application.domain.enumeration.StatusCartao;
/**
 * Test class for the CartaoResource REST controller.
 *
 * @see CartaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjetoeasoftwareApp.class)
public class CartaoResourceIntTest {

    private static final Integer DEFAULT_NUMERO = 1;
    private static final Integer UPDATED_NUMERO = 2;

    private static final LocalDate DEFAULT_DATA_VALIDADE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_VALIDADE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NOME_TITULAR = "AAAAAAAAAA";
    private static final String UPDATED_NOME_TITULAR = "BBBBBBBBBB";

    private static final Integer DEFAULT_COD_SEGURANCA = 1;
    private static final Integer UPDATED_COD_SEGURANCA = 2;

    private static final Double DEFAULT_LIMITE = 1D;
    private static final Double UPDATED_LIMITE = 2D;

    private static final StatusCartao DEFAULT_STATUS_CARTAO = StatusCartao.BLOQUEADO;
    private static final StatusCartao UPDATED_STATUS_CARTAO = StatusCartao.LIBERADO;

    @Autowired
    private CartaoRepository cartaoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCartaoMockMvc;

    private Cartao cartao;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CartaoResource cartaoResource = new CartaoResource(cartaoRepository);
        this.restCartaoMockMvc = MockMvcBuilders.standaloneSetup(cartaoResource)
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
    public static Cartao createEntity(EntityManager em) {
        Cartao cartao = new Cartao()
            .numero(DEFAULT_NUMERO)
            .dataValidade(DEFAULT_DATA_VALIDADE)
            .nomeTitular(DEFAULT_NOME_TITULAR)
            .codSeguranca(DEFAULT_COD_SEGURANCA)
            .limite(DEFAULT_LIMITE)
            .statusCartao(DEFAULT_STATUS_CARTAO);
        return cartao;
    }

    @Before
    public void initTest() {
        cartao = createEntity(em);
    }

    @Test
    @Transactional
    public void createCartao() throws Exception {
        int databaseSizeBeforeCreate = cartaoRepository.findAll().size();

        // Create the Cartao
        restCartaoMockMvc.perform(post("/api/cartaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cartao)))
            .andExpect(status().isCreated());

        // Validate the Cartao in the database
        List<Cartao> cartaoList = cartaoRepository.findAll();
        assertThat(cartaoList).hasSize(databaseSizeBeforeCreate + 1);
        Cartao testCartao = cartaoList.get(cartaoList.size() - 1);
        assertThat(testCartao.getNumero()).isEqualTo(DEFAULT_NUMERO);
        assertThat(testCartao.getDataValidade()).isEqualTo(DEFAULT_DATA_VALIDADE);
        assertThat(testCartao.getNomeTitular()).isEqualTo(DEFAULT_NOME_TITULAR);
        assertThat(testCartao.getCodSeguranca()).isEqualTo(DEFAULT_COD_SEGURANCA);
        assertThat(testCartao.getLimite()).isEqualTo(DEFAULT_LIMITE);
        assertThat(testCartao.getStatusCartao()).isEqualTo(DEFAULT_STATUS_CARTAO);
    }

    @Test
    @Transactional
    public void createCartaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cartaoRepository.findAll().size();

        // Create the Cartao with an existing ID
        cartao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCartaoMockMvc.perform(post("/api/cartaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cartao)))
            .andExpect(status().isBadRequest());

        // Validate the Cartao in the database
        List<Cartao> cartaoList = cartaoRepository.findAll();
        assertThat(cartaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCartaos() throws Exception {
        // Initialize the database
        cartaoRepository.saveAndFlush(cartao);

        // Get all the cartaoList
        restCartaoMockMvc.perform(get("/api/cartaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cartao.getId().intValue())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO)))
            .andExpect(jsonPath("$.[*].dataValidade").value(hasItem(DEFAULT_DATA_VALIDADE.toString())))
            .andExpect(jsonPath("$.[*].nomeTitular").value(hasItem(DEFAULT_NOME_TITULAR.toString())))
            .andExpect(jsonPath("$.[*].codSeguranca").value(hasItem(DEFAULT_COD_SEGURANCA)))
            .andExpect(jsonPath("$.[*].limite").value(hasItem(DEFAULT_LIMITE.doubleValue())))
            .andExpect(jsonPath("$.[*].statusCartao").value(hasItem(DEFAULT_STATUS_CARTAO.toString())));
    }
    
    @Test
    @Transactional
    public void getCartao() throws Exception {
        // Initialize the database
        cartaoRepository.saveAndFlush(cartao);

        // Get the cartao
        restCartaoMockMvc.perform(get("/api/cartaos/{id}", cartao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cartao.getId().intValue()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO))
            .andExpect(jsonPath("$.dataValidade").value(DEFAULT_DATA_VALIDADE.toString()))
            .andExpect(jsonPath("$.nomeTitular").value(DEFAULT_NOME_TITULAR.toString()))
            .andExpect(jsonPath("$.codSeguranca").value(DEFAULT_COD_SEGURANCA))
            .andExpect(jsonPath("$.limite").value(DEFAULT_LIMITE.doubleValue()))
            .andExpect(jsonPath("$.statusCartao").value(DEFAULT_STATUS_CARTAO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCartao() throws Exception {
        // Get the cartao
        restCartaoMockMvc.perform(get("/api/cartaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCartao() throws Exception {
        // Initialize the database
        cartaoRepository.saveAndFlush(cartao);

        int databaseSizeBeforeUpdate = cartaoRepository.findAll().size();

        // Update the cartao
        Cartao updatedCartao = cartaoRepository.findById(cartao.getId()).get();
        // Disconnect from session so that the updates on updatedCartao are not directly saved in db
        em.detach(updatedCartao);
        updatedCartao
            .numero(UPDATED_NUMERO)
            .dataValidade(UPDATED_DATA_VALIDADE)
            .nomeTitular(UPDATED_NOME_TITULAR)
            .codSeguranca(UPDATED_COD_SEGURANCA)
            .limite(UPDATED_LIMITE)
            .statusCartao(UPDATED_STATUS_CARTAO);

        restCartaoMockMvc.perform(put("/api/cartaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCartao)))
            .andExpect(status().isOk());

        // Validate the Cartao in the database
        List<Cartao> cartaoList = cartaoRepository.findAll();
        assertThat(cartaoList).hasSize(databaseSizeBeforeUpdate);
        Cartao testCartao = cartaoList.get(cartaoList.size() - 1);
        assertThat(testCartao.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testCartao.getDataValidade()).isEqualTo(UPDATED_DATA_VALIDADE);
        assertThat(testCartao.getNomeTitular()).isEqualTo(UPDATED_NOME_TITULAR);
        assertThat(testCartao.getCodSeguranca()).isEqualTo(UPDATED_COD_SEGURANCA);
        assertThat(testCartao.getLimite()).isEqualTo(UPDATED_LIMITE);
        assertThat(testCartao.getStatusCartao()).isEqualTo(UPDATED_STATUS_CARTAO);
    }

    @Test
    @Transactional
    public void updateNonExistingCartao() throws Exception {
        int databaseSizeBeforeUpdate = cartaoRepository.findAll().size();

        // Create the Cartao

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCartaoMockMvc.perform(put("/api/cartaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cartao)))
            .andExpect(status().isBadRequest());

        // Validate the Cartao in the database
        List<Cartao> cartaoList = cartaoRepository.findAll();
        assertThat(cartaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCartao() throws Exception {
        // Initialize the database
        cartaoRepository.saveAndFlush(cartao);

        int databaseSizeBeforeDelete = cartaoRepository.findAll().size();

        // Get the cartao
        restCartaoMockMvc.perform(delete("/api/cartaos/{id}", cartao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Cartao> cartaoList = cartaoRepository.findAll();
        assertThat(cartaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cartao.class);
        Cartao cartao1 = new Cartao();
        cartao1.setId(1L);
        Cartao cartao2 = new Cartao();
        cartao2.setId(cartao1.getId());
        assertThat(cartao1).isEqualTo(cartao2);
        cartao2.setId(2L);
        assertThat(cartao1).isNotEqualTo(cartao2);
        cartao1.setId(null);
        assertThat(cartao1).isNotEqualTo(cartao2);
    }
}
