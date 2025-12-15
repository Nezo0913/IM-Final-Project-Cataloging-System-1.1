import { create } from 'zustand';

export type Category = 'Frontend Development' | 'Web Development';

export interface Thesis {
  id: string;
  title: string;
  authors: string[];
  year: number;
  category: Category;
  abstract: string;
  adviser?: string;
  fileName?: string;
  dateAdded: string; // ISO string
}

interface ThesisStore {
  theses: Thesis[];
  addThesis: (thesis: Omit<Thesis, 'id' | 'dateAdded'>) => void;
  deleteThesis: (id: string) => void;
  updateThesis: (id: string, data: Partial<Thesis>) => void;
  getThesesByYear: (year: number) => Thesis[];
  getThesesByCategory: (category: Category) => Thesis[];
}

const SEED_DATA: Thesis[] = [
  {
    id: '1',
    title: 'Modernizing Legacy Interfaces with React: A Performance Analysis',
    authors: ['Alice Johnson', 'Bob Smith'],
    year: 2023,
    category: 'Frontend Development',
    abstract: 'This thesis explores the performance implications of migrating legacy jQuery-based interfaces to modern React architectures, focusing on Virtual DOM optimization and state management efficiency.',
    adviser: 'Dr. Emily Chen',
    fileName: 'johnson_smith_2023.pdf',
    dateAdded: '2023-05-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Scalable Microservices Architecture for E-commerce Platforms',
    authors: ['Charlie Brown'],
    year: 2024,
    category: 'Web Development',
    abstract: 'An investigation into the implementation of microservices using Node.js and Docker for high-traffic e-commerce applications, comparing scalability against monolithic structures.',
    adviser: 'Prof. David Williams',
    fileName: 'brown_2024.pdf',
    dateAdded: '2024-04-20T14:30:00Z',
  },
  {
    id: '3',
    title: 'Accessibility in Modern Single Page Applications',
    authors: ['Diana Prince', 'Bruce Wayne'],
    year: 2022,
    category: 'Frontend Development',
    abstract: 'A comprehensive study on WAI-ARIA implementation in complex SPAs, identifying common pitfalls in accessibility compliance and proposing an automated testing framework.',
    adviser: 'Dr. Harleen Quinzel',
    fileName: 'prince_wayne_2022.pdf',
    dateAdded: '2022-11-10T09:15:00Z',
  },
  {
    id: '4',
    title: 'Real-time Collaborative Editing using WebSockets',
    authors: ['Barry Allen'],
    year: 2025,
    category: 'Web Development',
    abstract: 'Developing a conflict-free replicated data type (CRDT) based system for real-time document collaboration, minimizing latency and ensuring data consistency across distributed clients.',
    adviser: 'Prof. Eobard Thawne',
    fileName: 'allen_2025.pdf',
    dateAdded: '2025-02-01T11:45:00Z',
  },
  {
    id: '5',
    title: 'The Impact of WebAssembly on Browser-based Image Processing',
    authors: ['Clark Kent'],
    year: 2023,
    category: 'Web Development',
    abstract: 'Analyzing the performance gains of using Rust-compiled WebAssembly modules for client-side image manipulation compared to traditional JavaScript implementations.',
    adviser: 'Dr. Lex Luthor',
    fileName: 'kent_2023.pdf',
    dateAdded: '2023-06-05T16:20:00Z',
  },
];

export const useThesisStore = create<ThesisStore>((set, get) => ({
  theses: SEED_DATA,
  addThesis: (thesisData) => {
    const newThesis: Thesis = {
      ...thesisData,
      id: Math.random().toString(36).substr(2, 9),
      dateAdded: new Date().toISOString(),
    };
    set((state) => ({ theses: [newThesis, ...state.theses] }));
  },
  deleteThesis: (id) => {
    set((state) => ({ theses: state.theses.filter((t) => t.id !== id) }));
  },
  updateThesis: (id, data) => {
    set((state) => ({
      theses: state.theses.map((t) => (t.id === id ? { ...t, ...data } : t)),
    }));
  },
  getThesesByYear: (year) => {
    return get().theses.filter((t) => t.year === year);
  },
  getThesesByCategory: (category) => {
    return get().theses.filter((t) => t.category === category);
  },
}));

export type UserRole = 'admin' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthStore {
  user: User | null;
  login: (email: string, role: UserRole) => void;
  signup: (name: string, email: string, role: UserRole) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null, // Start logged out
  login: (email, role) => {
    // Mock login
    set({
      user: {
        id: '1',
        name: role === 'admin' ? 'Admin User' : 'Student Viewer',
        email,
        role,
      },
    });
  },
  signup: (name, email, role) => {
    // Mock signup
    set({
      user: {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role,
      },
    });
  },
  logout: () => set({ user: null }),
}));
