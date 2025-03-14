import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { type Company, type Filter, GeographicalScope, LegalStructure, OrganizationType, Size } from '../types';
import {getAllCompanies} from "../services/Airtable.ts";

const ITEMS_PER_PAGE = 10;

export const useCompaniesStore = defineStore('companies', () => {
    // State
    const allCompanies = ref<Company[]>([]);
    const filteredCompanies = ref<Company[]>([]);
    const displayCompanies = ref<Company[]>([]);
    const isLoading = ref<boolean>(false);
    const hasError = ref<boolean>(false);
    const errorMessage = ref<string>('');
    const searchQuery = ref<string>('');

    // Filters
    const filters = ref<Filter>({
        organizationType: [],
        industry: [],
        size: [],
        geographicalScope: [],
        foundedYear: [],
    });



    const filterOptions = ref<Filter>({
        organizationType: [],
        industry: [],
        size: [],
        geographicalScope: [],
        foundedYear: [],
    });

    const currentPage = ref(1);
    const totalPages = computed(() => Math.ceil(filteredCompanies.value.length / ITEMS_PER_PAGE));
    const totalRecords = computed(() => filteredCompanies.value.length);

    // Fetch all companies
    const fetchAllCompanies = async () => {
        isLoading.value = true;
        hasError.value = false;
        errorMessage.value = '';

        try {
            const records = await getAllCompanies();

            const companies : Company[] = records.map((record) => ({
                id: record.id,
                name: record.get('name') || '',
                description: record.get('description') || '',
                type_of_organization: (record.get('type_of_organization') as OrganizationType) || OrganizationType.Other,
                industry: record.get('industry') || '',
                ownership_structure: record.get('ownership_structure') || [],
                legal_structure: (record.get('legal_structure') as LegalStructure) || LegalStructure.Other,
                year_founded: record.get('year_founded') || 0,
                headquarters_location: record.get('headquarters_location') || '',
                geographical_scope: (record.get('geographical_scope') as GeographicalScope) || GeographicalScope.Global,
                size: (record.get('size') as Size) || Size.Medium,
                number_of_owners_members: record.get('number_of_owners_members') || 0,
                funding_financial_information: record.get('funding_financial_information') || '',
                token_information: record.get('contact_information') || '',
                governance_model: record.get('governance_model') || '',
                links_social_media: record.get('links_social_media') || '',
                contact_information: record.get('contact_information') || '',
                certifications_affiliations: record.get('certifications_affiliations') || [],
                tags: record.get('tags') || [],
                date_added_to_directory: record.get('date_added_to_directory') || new Date().toISOString(),
                last_updated: record.get('last_updated') || new Date().toISOString(),
            })) as Company[];
            allCompanies.value =companies

            extractFilterOptions();
            applyFilters(); // Apply initial filters after fetching data
        } catch (error) {
            console.error('Error fetching companies:', error);
            hasError.value = true;
            allCompanies.value = [];
            filteredCompanies.value = [];
            displayCompanies.value = [];
            if (error instanceof Error) {
                errorMessage.value = error.message || 'Failed to fetch companies';
            } else {
                errorMessage.value = 'Failed to fetch companies';
            }
        } finally {
            isLoading.value = false;
        }
    };

    // Extract filter options from all companies
    const extractFilterOptions = () => {
        const options = {
            industry: new Set<string>(),
            size: new Set<string>(),
            geographicalScope: new Set<string>(),
            foundedYear: new Set<string>(),
            organizationType: new Set<string>(),
        };

        allCompanies.value.forEach((company) => {
            if (company.industry) options.industry.add(company.industry);
            if (company.size) options.size.add(company.size);
            if (company.geographical_scope) options.geographicalScope.add(company.geographical_scope);
            if (company.year_founded) options.foundedYear.add(company.year_founded.toString());
            if (company.type_of_organization) options.organizationType.add(company.type_of_organization);
        });

        filterOptions.value = {
            industry: Array.from(options.industry).sort(),
            size: Array.from(options.size).sort(),
            geographicalScope: Array.from(options.geographicalScope).sort(),
            foundedYear: Array.from(options.foundedYear).sort(),
            organizationType: Array.from(options.organizationType).sort(),
        };
    };

    const applyFilters = () => {

        const query = searchQuery.value.toLowerCase();

        filteredCompanies.value = allCompanies.value.filter((company) => {
            const matchesSearch = !query ||
                company.name.toLowerCase().includes(query) ||
                company.description.toLowerCase().includes(query);

            if (!matchesSearch) return false;

            const matchesIndustry = filters.value.industry.length === 0 ||
                filters.value.industry.includes(company.industry);

            const matchesSize = filters.value.size.length === 0 ||
                filters.value.size.includes(company.size);

            const matchesGeographicalScope = filters.value.geographicalScope.length === 0 ||
                filters.value.geographicalScope.includes(company.geographical_scope);

            const matchesFoundedYear = filters.value.foundedYear.length === 0 ||
                filters.value.foundedYear.includes(company.year_founded.toString());

            const matchesOrganizationType = filters.value.organizationType.length === 0 ||
                filters.value.organizationType.includes(company.type_of_organization);

            return matchesIndustry && matchesSize && matchesGeographicalScope && matchesFoundedYear && matchesOrganizationType;
        });

        currentPage.value = 1;
        updateDisplayedCompanies();
    };

    // Update displayed companies based on pagination
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
            organizationType: [],
        };
        searchQuery.value = '';
        applyFilters();
    };

    // Pagination
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

    const goToPage = (page: number) => {
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