# madrasah-frontend

Online Medrese Projesinin frontend reposudur.

## Tech Stack
Next.js
TailwindCSS
Shadcn

## Project Bootstrap Requirements

Configurations and helper tooling should be complete
Base configuration and .env
This README should be edited properly

```
.
├── apps/                    # Each independent frontend app lives here
│   └── web/                 # Initial frontend app (Next.js)
│       ├── app/             # App Router structure
│       ├── components/      # Project-specific components
│       ├── lib/             # Local helpers and utilities
│       └── ...
│
├── shared/                  # Code shared across frontend apps
│   ├── ui/                  # Shared UI components (wrappers or common UIs)
│   ├── hooks/               # Shared React hooks
│   ├── utils/               # Shared utility functions
│   ├── types/               # Shared TypeScript types
│   └── ...
│
├── .env                     # Base environment variables (can be overridden per app)
├── turbo.json               # Turborepo configuration
├── package.json             # Root-level dependencies and scripts
└── tsconfig.base.json       # Shared TypeScript configuration
```
