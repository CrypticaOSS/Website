# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-08-09
### Added
- Default Layout with `Metadata` for all pages.
- Husky and commitlint usage for code maintenance.
- Password Vault feature for saving passwords locally with service name, username, and notes.
- Legal pages (Terms of Service, Privacy Policy, About Us, Contact) with ByteBrush Studios branding.
- Error and Not Found (404) pages with proper error handling.
- Security improvement: disabled browser autofill for password vault inputs.
- Internationalization support for all new features (English and French).
- Modular translation system with feature-based organization to improve maintainability.
- Comprehensive documentation for the translation system in `docs/TRANSLATIONS.md`.
- Feature-specific translation files in six categories: common, generate, strength, encryption, settings, and activity.
- Translation utility helpers in `lib/translation-utils.ts` for scoped translations.
- Legal section in navigation sidebar.
- Password breach checker page for checking if passwords have been exposed in data breaches.
- Activity timeline to track password checks and generation history.
- Custom scrollbar-hide utility for improved UI aesthetics.
- Progressive Web App (PWA) support with offline capabilities.
- AI-powered password analysis with OpenAI integration.
- Password breach checker page for checking if passwords have been exposed in data breaches.
- Activity timeline to track password checks and generation history.
- Custom scrollbar-hide utility for improved UI aesthetics.
- Progressive Web App (PWA) support with offline capabilities.
- AI-powered password analysis with OpenAI integration.

### Changed
- Ensured all documentation pages are listed in the docs navigation.
- Added and corrected self-hosting documentation.
- Improved error messages and translation fallback for missing messages.
- Updated and validated JSON translation file structure for both English and French.
- General code cleanup and improved reliability for Next.js/React best practices.

### Fixed
- Fixed missing translation keys and improved i18n error handling across all pages.
- Added missing translation keys for settings, activity, generate, and encryption pages.
- Fixed React key prop warnings in Timeline and Home page card lists.
- Fixed hydration mismatch and improved theme handling for SSR/CSR consistency.

### Improved
- Redesigned settings page with tabbed interface for better organization.
- Enhanced responsive design for settings tabs with horizontal scrolling on smaller screens.
- Better visual hierarchy across user interface elements.
- Improved accessibility for mobile devices.
- Consistent icon usage across the application with FluentUI icons.
- Optimized performance for mobile devices.
- Enhanced theme support with light, dark, and system preferences.
- More intuitive navigation with sidebar improvements.
- Streamlined password generation workflow.
- Better user feedback with improved UI/UX for all main features.
- Advanced encryption options in the settings.
- Reorganized translation files into modular structure by feature for better maintainability.
- Improved translation loading with fallback mechanism for better reliability.
- Enhanced i18n infrastructure with dynamic module loading support.
- Improved code organization with clear separation of translation concerns.
- Optimized translation loading process with environment-specific strategies (development vs. production).

### Fixed
- Icon compatibility issues with FluentUI library.
- Mobile responsiveness issues on smaller screens.
- Theme switching bugs in dark mode.
- Performance bottlenecks in password strength calculation.
- Locale detection and fallback issues in the translation system.
- Improved error handling for missing translation files.
- Runtime translation loading errors with graceful fallbacks.
- Translation key conflicts between different features.
- Development-specific translation loading issues.
- Consistent translation namespace handling across the application.


## [0.1.0] - 2025-08-08
### Added
- Initial release of Cryptica Site.
- Password generator with custom presets and strength options.
- Password strength analysis (entropy, character types, score, crack time estimator).
- Password breach checker using HaveIBeenPwned API (k-Anonymity, local hash history).
- Breach details modal (simulated data).
- Local password check history (privacy-preserving).
- Settings for password defaults, theming, and accessibility.
- SVG theme assets and modern UI.
- FAQ and educational content about password security.
