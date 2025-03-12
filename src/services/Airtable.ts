import Airtable from "airtable";



const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_TABLE_NAME = 'companies';

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base('appWiGqR6setB1i7d');
const companiesTable = base(AIRTABLE_TABLE_NAME);


export const getAllCompanies = async () => {
    try {
        return await companiesTable.select().all();
    }catch (error) {
        throw error;
    }
}

export async function getLinkedRecord(
    tableId: string,
    recordId: string,
) {
    try {
        const table = base(tableId);

        const record = await table.find(recordId);

        if (!record) {
            console.warn(`No record found with ID: ${recordId}`);
            return null;
        }

        console.log(record)

        return {
            id: record.id,
            ...record.fields
        };
    } catch (error) {
        console.error(`Error fetching linked record: ${error}`);
        throw error;
    }
}


