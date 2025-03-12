
export interface Filter {
organizationType:string[];
    industry:   string [];
    size: string[];
    geographicalScope: string[];
    foundedYear: string[];
}


type UUID = string;
type URL = string;
type Timestamp = string;

export enum OrganizationType {
    Cooperative = "Cooperative",
    EmployeeOwned = "Employee-Owned Company",
    DAO = "DAO (Decentralized Autonomous Organization)",
    Web3Blockchain = "Web3/Blockchain Organization",
    DeFiProtocol = "DeFi Protocol",
    ESOP = "ESOP (Employee Stock Ownership Plan)",
    PlatformCoop = "Platform Cooperative",
    CommunityTrust = "Community Trust",
    PublicBenefitCorporation = "Public Benefit Corporation (PBC)",
    Hybrid = "Hybrid (Combination)",
    Other = "Other"
}

export enum LegalStructure {
    LLC = "LLC",
    Corporation = "Corporation",
    Cooperative = "Cooperative (Legal Entity)",
    DecentralizedEntity = "Decentralized Entity",
    DAO = "DAO (No formal legal entity)",
    Foundation = "Foundation",
    Trust = "Trust",
    Nonprofit = "Nonprofit",
    BenefitCorporation = "Benefit Corporation",
    Hybrid = "Hybrid",
    Other = "Other"
}

export enum GeographicalScope {
    Local = "Local",
    Regional = "Regional",
    National = "National",
    Global = "Global",
    Virtual = "Virtual/Decentralized"
}

export enum Size {
    Micro = "Micro (1-9 employees/members)",
    Small = "Small (10-49 employees/members)",
    Medium = "Medium (50-249 employees/members)",
    Large = "Large (250+ employees/members)"
}

export enum GovernanceModel {
    DirectDemocracy = "Direct Democracy",
    RepresentativeDemocracy = "Representative Democracy",
    TokenBasedVoting = "Token-Based Voting",
    HybridGovernance = "Hybrid Governance",
    BoardOfDirectors = "Board of Directors",
    SociocraticHolacratic = "Sociocratic/Holacratic",
    Other = "Other"
}

export interface HeadquartersLocation  {
    address?: string;
    city?: string;
    state_region?: string;
    country?: string;
    zip_postal_code?: string;
};

export interface FundingFinancialInformation  {
    funding_sources?: string[];
    revenue?: string;
};

export interface TokenInformation  {
    token_name?: string;
    token_symbol?: string;
    blockchain_platform?: string;
    governance_mechanism?: string;
    link_to_token_contract?: URL;
};

export interface LinksSocialMedia  {
    website?: URL;
    twitter?: URL;
    linkedin?: URL;
    discord?: URL;
    github?: URL;
    other?: URL[];
};

export interface ContactInformation {
    contact_person?: string;
    email?: string;
    phone?: string;
};

export interface Company {
    id: UUID;
    name: string;
    description: string;
    type_of_organization: OrganizationType;
    industry: string;
    ownership_structure: string[];
    legal_structure: LegalStructure;
    year_founded: number;
    headquarters_location: string;
    geographical_scope: GeographicalScope;
    size: Size;
    number_of_owners_members: number;
    funding_financial_information: string;
    token_information: string;
    governance_model: GovernanceModel;
    links_social_media: string;
    contact_information: string;
    certifications_affiliations: string[];
    tags: string[];
    date_added_to_directory: Timestamp;
    last_updated: Timestamp;
}
