import { DocumentContent } from "../types";

const STORAGE_KEY = 'inkflow_history';

export const saveToHistory = (content: DocumentContent): DocumentContent => {
  const history = getHistory();
  
  const now = Date.now();
  const newItem = { 
    ...content, 
    lastModified: now,
    id: content.id || `doc_${now}_${Math.random().toString(36).substr(2, 9)}`
  };

  // Remove existing item with same ID if exists
  const filteredHistory = history.filter(item => item.id !== newItem.id);
  
  // Add new item to top
  const newHistory = [newItem, ...filteredHistory].slice(0, 10); // Keep last 10
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  return newItem;
};

export const getHistory = (): DocumentContent[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to parse history", e);
    return [];
  }
};

export const deleteFromHistory = (id: string) => {
  const history = getHistory();
  const newHistory = history.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
};
