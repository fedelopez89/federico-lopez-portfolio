# Naming Conventions

This project follows strict naming conventions for consistency and maintainability.

## File & Folder Naming Standards

### Components

- **Files**: `PascalCase.tsx` (e.g., `Header.tsx`, `AboutMe.tsx`)
- **Folders**: `PascalCase/` (e.g., `Header/`, `AboutMe/`)
- **Styled files**: `PascalCase.styles.ts` (e.g., `Header.styles.ts`)

### Data Files

- **Format**: `kebab-case.json` or `kebab-case.ts`
- **Examples**: `contact-me.json`, `education.json`, `skills.ts`

### Hooks

- **Format**: `camelCase.ts` starting with `use`
- **Examples**: `useScrollToTop.ts`, `useNavbarScroll.ts`

### Utilities

- **Format**: `camelCase.ts`
- **Examples**: `reportWebVitals.ts`

### Types

- **Format**: `kebab-case.types.ts`
- **Examples**: `contact.types.ts`, `skills.types.ts`

### Configuration Files

- **Format**: `kebab-case.{js,ts,json}`
- **Examples**: `vite.config.ts`, `eslint.config.js`, `tsconfig.json`

## Examples

```
src/
├── components/
│   ├── Header/              # PascalCase folder
│   │   ├── Header.tsx       # PascalCase component
│   │   └── Header.styles.ts # PascalCase.styles
│   └── ui/
│       └── Button.tsx       # PascalCase component
├── data/
│   ├── contact-me.json      # kebab-case
│   ├── education.json       # kebab-case
│   └── skills.ts            # kebab-case
├── hooks/
│   └── useScrollToTop.ts    # camelCase with 'use' prefix
├── types/
│   └── contact.types.ts     # kebab-case.types
└── utils/
    └── reportWebVitals.ts   # camelCase
```

## Rationale

- **PascalCase for Components**: React convention, easy to identify components
- **kebab-case for Data/Config**: URL-friendly, easy to read in file systems
- **camelCase for Hooks/Utils**: JavaScript convention for functions
- **Consistency**: One rule per file type, no exceptions
