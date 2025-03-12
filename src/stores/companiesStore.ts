import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import Airtable from 'airtable';

const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_TABLE_NAME = 'companies';
const ITEMS_PER_PAGE = 10;



const  base = new Airtable({apiKey: AIRTABLE_API_KEY}).base('appWiGqR6setB1i7d');
const companiesTable = base(AIRTABLE_TABLE_NAME)

export const useCompaniesStore = defineStore('companies', () => {
    // State
    const allCompanies = ref([]);
    const filteredCompanies = ref([]);
    const displayCompanies = ref([]);
    const isLoading = ref(false);
    const hasError = ref(false);
    const errorMessage = ref('');
    const searchQuery = ref('');
    const filters = ref({
        organizationType:[],
        industry: [],
        size: [],
        geographicalScope: [],
        foundedYear: [],
    });

    const filterOptions = ref({
        organizationType: [],
        industry: [],
        size: [],
        geographicalScope: [],
        foundedYear: [],
    });

    const currentPage = ref(1);
    const totalPages = computed(() => Math.ceil(filteredCompanies.value.length / ITEMS_PER_PAGE));
    const totalRecords = computed(() => filteredCompanies.value.length);

    const fetchAllCompanies = async () => {
        isLoading.value = true;
        hasError.value = false;
        errorMessage.value = '';

        try {

            const records = await companiesTable.select().all()

            allCompanies.value = records.map(record => ({
                id: record.id,
                name: record.get('name') || '',
                industry: record.get('industry') || '',
                ownership_structure: record.get('ownership_structure'),
                size: record.get('size') || '',
                legal_structure: record.get('legal_structure') || '',
                founded: record.get('year_founded') || '',
                number_of_owners_members: record.get('number_of_owners_members') || '',
                tags: record.get('tags') || '',
                organization_type: record.get('type_of_organization') || '',
                governance_model: record.get('governance_model') || '',
                geographical_scope: record.get('geographical_scope') || '',
            }));

            extractFilterOptions();

            applyFilters();
        } catch (error) {
            console.error('Error fetching companies:', error);
            hasError.value = true;
            errorMessage.value = error.message || 'Failed to fetch companies';
            allCompanies.value = [];
            filteredCompanies.value = [];
            displayCompanies.value = [];
        } finally {
            isLoading.value = false;
        }
    };

    const extractFilterOptions = () => {
        const options = {
            industry: new Set(),
            size: new Set(),
            geographicalScope: new Set(),
            foundedYear: new Set(),
            organizationType: new Set()
        };

        allCompanies.value.forEach(company => {
            if (company.industry) options.industry.add(company.industry);
            if (company.size) options.size.add(company.size);
            if (company.geographical_scope) options.geographicalScope.add(company.geographical_scope);
            if (company.founded) options.foundedYear.add(company.founded);
            if (company.organization_type) options.organizationType.add(company.organization_type);
        });

        filterOptions.value = {
            industry: Array.from(options.industry).sort(),
            size: Array.from(options.size).sort(),
            geographicalScope: Array.from(options.geographicalScope).sort(),
            foundedYear: Array.from(options.foundedYear).sort(),
            organizationType: Array.from(options.organizationType).sort()
        };
    };

    const applyFilters = () => {
        const query = searchQuery.value.toLowerCase();

        filteredCompanies.value = allCompanies.value.filter(company => {
            const matchesSearch = !query ||
                company.name.toLowerCase().includes(query) ||
                company.description.toLowerCase().includes(query)

            if (!matchesSearch) return false;

            const matchesIndustry = filters.value.industry.length === 0 ||
                filters.value.industry.includes(company.industry);

            const matchesSize = filters.value.size.length === 0 ||
                filters.value.size.includes(company.size);

            const matchesGeographicalScope = filters.value.geographicalScope.length === 0 ||
                filters.value.geographicalScope.includes(company.geographical_scope);

            const matchesFoundedYear = filters.value.foundedYear.length === 0 ||
                filters.value.foundedYear.includes(company.founded);

            const organizationType = filters.value.organizationType.length === 0 ||
                filters.value.organizationType.includes(company.organization_type);

            return matchesIndustry && matchesSize && matchesGeographicalScope && matchesFoundedYear && organizationType;
        });

        currentPage.value = 1;

        updateDisplayedCompanies();
    };

    const updateDisplayedCompanies = () => {
        const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;

        displayCompanies.value = filteredCompanies.value.slice(startIndex, endIndex);
    };

    // Reset all filters
    const resetFilters = () => {
        filters.value = {
            industry: [],
            size: [],
            geographicalScope: [],
            foundedYear: [],
            organizationType: []
        };
        searchQuery.value = '';

        applyFilters();
    };

    const nextPage = () => {
        if (currentPage.value < totalPages.value) {
            currentPage.value++;
            updateDisplayedCompanies();
        }
    };

    const prevPage = () => {
        if (currentPage.value > 1) {
            currentPage.value--;
            updateDisplayedCompanies();
        }
    };

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
            currentPage.value = page;
            updateDisplayedCompanies();
        }
    };

    const getVisiblePages = computed(() => {
        const maxButtons = 5;
        const pages = [];

        if (totalPages.value <= maxButtons) {
            for (let i = 1; i <= totalPages.value; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            let startPage = Math.max(2, currentPage.value - 1);
            let endPage = Math.min(totalPages.value - 1, currentPage.value + 1);

            if (startPage === 2) endPage = Math.min(4, totalPages.value - 1);
            if (endPage === totalPages.value - 1) startPage = Math.max(2, totalPages.value - 3);

            if (startPage > 2) pages.push('...');

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (endPage < totalPages.value - 1) pages.push('...');

            pages.push(totalPages.value);
        }

        return pages;
    });



    return {
        // State
        allCompanies,
        filteredCompanies,
        displayCompanies,
        isLoading,
        hasError,
        errorMessage,
        searchQuery,
        filters,
        filterOptions,
        currentPage,
        totalPages,
        totalRecords,

        // Actions
        fetchAllCompanies,
        resetFilters,
        applyFilters,

        // Pagination
        nextPage,
        prevPage,
        goToPage,
        getVisiblePages,
    };
});