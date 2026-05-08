# fe-main — Coding Standards & Conventions

> Exported from fe-main's CLAUDE.md. Canonical source lives in the fe-main repo.
> Last synced: 2026-04-24

This document provides coding standards and conventions for AI assistants working with the fe-main Angular codebase.

## Project Overview

- **Framework:** Angular 17.3.6 (standalone components)
- **TypeScript:** 5.3.2
- **State Management:** NgRx 17.2.0
- **UI Framework:** Bootstrap 5.3.3 + ng-bootstrap
- **Authentication:** AWS Amplify/Cognito
- **Build Tool:** Angular CLI

## Project Structure

```
src/
├── app/
│   ├── auth/                    # Authentication service & guards
│   ├── components/              # Feature components
│   ├── pages/                   # Page/route components
│   ├── enums/                   # Global enums
│   ├── interfaces/              # TypeScript interfaces
│   ├── pipes/                   # Custom pipes
│   ├── shared/
│   │   ├── components/          # Reusable UI components
│   │   ├── services/            # Application services
│   │   ├── interceptors/        # HTTP interceptors
│   │   ├── directives/          # Custom directives
│   │   ├── enums/               # Shared enums
│   │   ├── interfaces/          # Shared interfaces
│   │   └── const/               # Constants & configurations
│   └── store/                   # NgRx state management
├── environments/                # Environment configurations
├── styling/                     # Global SCSS variables & mixins
└── assets/                      # Static assets
```

## Naming Conventions

### Components

- **File:** `kebab-case.component.ts` (e.g., `chat-item.component.ts`)
- **Class:** PascalCase (e.g., `ChatItemComponent`)
- **Selector:** `app-kebab-case` (e.g., `<app-chat-item>`)

### Services

- **File:** `kebab-case.service.ts`
- **Class:** PascalCase + "Service" suffix (e.g., `ChatListService`)
- **Injection:** `@Injectable({ providedIn: 'root' })`

### Interfaces & Enums

- **Interface file:** `domain-plural.interfaces.ts` (e.g., `conversations.interfaces.ts`)
- **Interface naming:** `I` prefix (e.g., `IConversationData`, `IMessage`)
- **Enum file:** `domain.enums.ts` (e.g., `conversation.enums.ts`)
- **Enum naming:** `E` prefix (e.g., `EChatStates`, `EMessageContent`)

### Directives & Pipes

- **Directive selector:** `[appName]` (e.g., `[appClickOutside]`)
- **Pipe name:** camelCase (e.g., `truncate`)

### Variables

- **Observables:** camelCase with `$` suffix (e.g., `isLoading$`, `data$`)
- **Private properties:** `private` keyword with camelCase

## Component Patterns

### Standalone Components

All components are standalone:

```typescript
@Component({
  selector: 'app-component-name',
  standalone: true,
  imports: [CommonModule, OtherComponent],
  templateUrl: './component-name.component.html',
  styleUrl: './component-name.component.scss'
})
export class ComponentNameComponent implements OnInit, OnDestroy {
  constructor(private readonly someService: SomeService) {}
}
```

### Subscription Management

Always clean up subscriptions in `ngOnDestroy`:

```typescript
private subscription: Subscription;

ngOnInit(): void {
  this.subscription = this.service.data$.subscribe(data => {});
}

ngOnDestroy(): void {
  this.subscription?.unsubscribe();
}
```

## State Management (NgRx)

### Store Structure

```
store/
└── chat/
    ├── chat.state.ts      # State interface & initial state
    ├── chat.actions.ts    # Action creators
    ├── chat.reducer.ts    # Reducer functions
    ├── chat.effects.ts    # Side effects
    └── chat.selectors.ts  # Selectors
```

### Action Naming

Pattern: `[Source] Action Description`

```typescript
export const loadConversations = createAction('[Chat] Load Conversations');
export const loadConversationsSuccess = createAction(
  '[Chat] Load Conversations Success',
  props<{ conversations: IConversationData[] }>()
);
```

## Styling

### SCSS with Variables

- Global variables in `src/styling/variables.scss`
- Import pattern: `@import '../../../styling/variables';`
- BEM-like naming with `&` nesting

### Example

```scss
@import '../../../styling/variables';

.header {
  background: $utility-10;

  &_logo {
    display: flex;
    gap: 8px;

    &__img {
      width: 120px;
    }
  }

  @media (min-width: $md) {
    padding: 12px 16px;
  }
}
```

### Breakpoints

Mobile-first approach using variables: `$xs`, `$s`, `$md`, `$xl`

## Import Organization

Order imports as follows:

1. Angular imports
2. RxJS imports
3. Third-party libraries
4. Local services
5. Components/interfaces
6. Enums
7. Environment

```typescript
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { ConversationService } from '../../shared/services/conversation.service';
import { SvgIconComponent } from '../../shared/components/svg-icon/svg-icon.component';
import { IConversationData } from '../../interfaces/conversations.interfaces';
import { ESvgTypes } from '../../shared/enums/svg.enums';
```

## HTTP & API Patterns

### Service Pattern

```typescript
@Injectable({ providedIn: 'root' })
export class ConversationService {
  readonly apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getConversations(): Observable<IConversationsListResponse> {
    return this.http.get<IConversationsListResponse>(`${this.apiUrl}/conversations`);
  }
}
```

### Auth Interceptor

Located at `shared/interceptors/auth.interceptor.ts` - handles token injection and 401/403 refresh logic.

## Testing

- **Framework:** Jasmine/Karma
- **Test files:** `*.spec.ts` alongside source files
- **Run tests:** `npm test` or `npm run test:coverage`

```typescript
describe('ServiceName', () => {
  let service: ServiceName;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceName]
    });
    service = TestBed.inject(ServiceName);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

## Code Formatting

### Prettier (.prettierrc)

- Print width: 100
- Tab width: 2
- Single quotes: true
- Trailing comma: none
- Semicolons: true

### ESLint

- Component prefix: `app`
- Directive prefix: `app`
- Angular-specific rules enabled

### Pre-commit Hooks

Husky runs `pretty-quick` on staged files before commit.

## Build Commands

```bash
npm start           # Development server
npm run build       # Production build
npm test            # Run tests
npm run test:coverage  # Tests with coverage
npm run lint        # ESLint check
```

## Key Libraries

| Library      | Purpose          |
| ------------ | ---------------- |
| NgRx         | State management |
| AWS Amplify  | Authentication   |
| ng-bootstrap | UI components    |
| gsap         | Animations       |
| Sentry       | Error tracking   |
| Segment      | Analytics        |

## TypeScript Configuration

Key settings:

- `strict: true`
- `strictPropertyInitialization: false`
- `strictNullChecks: false`
- Target: ES2022

## Quick Reference

| Item               | Convention           |
| ------------------ | -------------------- |
| Component selector | `app-kebab-case`    |
| Interface prefix   | `I`                  |
| Enum prefix        | `E`                  |
| Observable suffix  | `$`                  |
| Service injection  | `providedIn: 'root'` |
| SCSS nesting       | BEM-like with `&`    |
| Import base        | `app/...`            |
