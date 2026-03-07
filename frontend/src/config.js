/**
 * Frontend config from env. Vite exposes only VITE_* to client.
 */
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
export const GLOSSARY_URL = import.meta.env.VITE_GLOSSARY_URL || ''
