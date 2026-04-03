# Contributing to tbox

Thank you for your interest in contributing to tbox! This document outlines the process for contributing to the project.

## Development Setup

### Prerequisites

- **Runtime**: Bun (recommended) or Node.js 18+
- **Package manager**: npm

### Getting Started

1. **Fork the repository** on GitHub

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/tbox.git
   cd tbox
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000)

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── tools/[id]/         # Dynamic tool pages
│   └── layout.tsx          # Root layout
├── components/             # Shared React components
│   └── shared/             # Reusable UI components
├── features/               # Feature modules (one directory per tool)
│   ├── json/               # JSON Formatter tool
│   ├── base64/             # Base64 tool
│   └── ...
├── lib/                    # Utilities and libraries
│   ├── tool-registry.ts    # Tool ID → Component mapping
│   └── I18nProvider.tsx    # i18n context provider
├── context/                # React context providers
└── messages/               # i18n translation files
    ├── zh-CN.json          # Chinese translations
    └── en.json             # English translations
```

## Adding a New Tool

1. **Create the feature directory**:
   ```bash
   mkdir src/features/my-tool/
   ```

2. **Create the component** in `src/features/my-tool/MyTool.tsx`:
   ```tsx
   'use client';

   import React from 'react';

   export default function MyTool() {
     return (
       <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
         {/* Your tool UI */}
       </div>
     );
   }
   ```

3. **Register the tool** in `src/lib/tool-registry.ts`:
   ```ts
   import MyTool from '@/features/my-tool/MyTool';

   export const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
     // ... existing tools
     'my-tool': MyTool,
   };
   ```

4. **Add translations** in `src/messages/zh-CN.json` and `src/messages/en.json`:
   ```json
   {
     "tools": {
       "my-tool": {
         "name": "My Tool",
         "desc": "Description of my tool"
       }
     }
   }
   ```

## Running Tests

### Unit Tests
```bash
npm run test        # Run once
npm run test:watch # Run in watch mode
```

### End-to-End Tests
```bash
npm run test:e2e           # Run Playwright tests
npm run test:e2e:ui       # Run with UI (visual)
```

### Build
```bash
npm run build   # Production build
npm start       # Start production server
```

## Code Style

- Use **TypeScript** for all new code
- Use **Tailwind CSS** for styling
- Components use the **React Compiler** pattern (memoized with `_c`)
- All feature components are `'use client'` directive
- Error handling uses React state (`useState`) rather than `alert()`

## Pull Request Process

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/my-new-tool
   ```

2. **Make your changes** and commit with clear messages:
   ```bash
   git commit -m "feat: add my-new-tool"
   ```

3. **Run tests** to ensure nothing is broken:
   ```bash
   npm run test
   npm run build
   ```

4. **Push to your fork** and open a Pull Request on GitHub

5. Fill in the PR template with:
   - A clear description of what the PR does
   - Screenshots for UI changes
   - Test plan (how you verified the changes)

## Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## Reporting Issues

Please report bugs and feature requests via [GitHub Issues](https://github.com/huangtaos/tbox/issues).

When reporting bugs, please include:
- Browser and OS version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
