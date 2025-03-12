# Vue.js Company Search App

## Overview

This project is a Vue 3 web application that allows users to:
- Search for companies by name
- Filter companies by organization type, ownership structure, industry, geographic scope, governance model and Founded Year
- Fetch company data from Airtable API
- Use Pinia for state management and Vue Router for navigation
- Styled with Tailwind CSS

## Tech Stack

| Tech | Purpose |
|------|---------|
| Vue 3 + Vite | Frontend framework |
| Pinia | State management |
| Vue Router | Navigation |
| Airtable API | Company data |
| Tailwind CSS | UI styling |


## Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Mohcine50/commonshare-test.git
cd commonshare-test
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file and add your Airtable API credentials:

```
VITE_AIRTABLE_API_KEY=your_base_id
VITE_AIRTABLE_BASE_ID=your_api_key
```

### 4. Run the Development Server

```bash
npm run dev
```

Visit http://localhost:5173 in your browser.

## Features

### 🔎 Search & Filter
- Search for a company by name
- Filter by organization type, industry, and governance model
- Real-time updates using Pinia

### 📡 Airtable API Integration
- Fetches company data from Airtable using their SDK

### 📱 Responsive UI
- Built with Tailwind CSS 
- Responsivity for small and large screens
