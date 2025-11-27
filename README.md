## Spotify Web Experience Clone

This project recreates Spotify's multi-step account creation flow and login experience using vanilla HTML, CSS, and JavaScript. It focuses on styling fidelity as well as interactive behaviors such as inline validation, password visibility toggles, and contextual warnings.

### Features
- **Landing and Auth Pages** – `index.html` mirrors the Spotify marketing splash screen, while `sites/login.html`, `sites/registration.html`, and `sites/registration-password.html` reproduce the authentication flow.
- **Form Validation Feedback** – Custom scripts (`js/emailValidity.js`, `js/passwordValidity.js`, `js/usernameValidity.js`) add blur/input listeners, toggle warning states, and surface requirement indicators without third-party libraries.
- **Password UX Enhancements** – Password requirement checklist, real-time rule tracking, and show/hide toggles mimic the official Spotify onboarding experience.
- **Progressive Registration Flow** – Separate sections inside `registration-password.html` guide the user through password creation, profile info, and demographic inputs with visual progress indicators.
- **Responsive Styling** – Modular stylesheets (`styles/index.css`, `styles/login.css`, `styles/createAcc.css`, `styles/registration.css`, `styles/fonts.css`) keep layouts flexible across viewports.

### Screenshots
Screenshots live in the root `assets/` directory. Keep the filenames below (or update both the files and Markdown references) so they render correctly:

![Landing Page](assets/landing.png)
![Login Form](assets/login.png)
![Registration Step](assets/registration.png)
![Registration Alternate Step](assets/registration-other.png)
![Password + Profile Step](assets/registration-password.png)

> Tip: Drop new PNG/JPG captures into `assets/` and adjust these paths if you introduce different names or add more states.

### Tech Stack
- HTML5 templates for structure
- CSS3 (Flexbox, custom properties) for layout and branding
- Vanilla JavaScript for DOM interactions and validation

### Getting Started
1. **Clone the repo**
	```bash
	git clone https://github.com/majtobijakodric/website-copy-project.git
	cd website-copy-project
	```
2. **Open locally** – Serve the root folder with any static server (e.g., VS Code Live Server, `python -m http.server`, or a simple file preview) to retain correct relative paths for assets and navigation between subpages.
3. **Navigate pages** – Visit `index.html` for the landing page, then follow links/buttons to reach the login and registration flows under `sites/`.

### File/Folder Overview
| Path | Purpose |
| --- | --- |
| `index.html` | Landing page clone with hero messaging and call-to-actions |
| `sites/login.html` | Login form replica with password toggles and alerts |
| `sites/registration.html` | Initial registration step (email/username collection) |
| `sites/registration-password.html` | Multi-step password + profile form with progress bar |
| `styles/` | Page-specific styles plus shared fonts and layout helpers |
| `js/` | Modular scripts for validation, alerts, and navigation helpers |

### Development Notes
- Scripts are loaded per page to keep bundles lean. Ensure any new script tags are added to the relevant HTML file in `sites/` or the root.
- Custom radio/checkbox styles rely on utility classes such as `.touched`, `.hidden`, `.warning`, so keep those definitions in sync between CSS files during refactors.
- When extending validation logic, reuse the existing pattern: query the input, listen for `blur`/`input`, then toggle helper classes to drive the visual state.

### Future Improvements
1. Hook the forms to a lightweight backend or mock API to persist submissions.
2. Add automated tests (e.g., Playwright) to snapshot the UI and verify form validation flows.
3. Introduce localization support for copy and accessibility improvements for screen readers.

Feel free to fork, experiment, and submit pull requests if you spot opportunities to make the clone even closer to the real Spotify experience.
