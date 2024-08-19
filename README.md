# Description

Project Exam 2:
To take the skills learned over the last two years and take on an extensive project where the finished product should reflect the candidate's general development capabilities, in addition to visual and technical skills.

## Requirements

> All admin functionality is managed by an existing application. This project only covers the front-end application for the API.

## API

The API you are using for this project can be found under Social EndPoints in the [Noroff API documentation](https://noroff-api-docs.netlify.app/).

### Resources

[API Guide](https://noroff-api-docs.netlify.app/social-endpoints/authentication)
[API Documentation](https://nf-api.onrender.com/docs)

### User Stories

- [x] 1. A user with a `stud.noroff.no` email may register
- [x] 2. A registered user may login
- [x] 3. A registered user may update their avatar and banner
- [x] 4. A registered user may logout
- [x] 5. A registered user may view a list of `Posts`
- [x] 6. A registered user may view a list of `Profiles`
- [x] 7. A registered user may view a single `Post` by `id`
- [x] 8. A registered user may view a single `Profile` by `name`
- [x] 9. A registered user may create a `Post`
- [x] 10. A registered user may update a `Post` they own
- [x] 11. A registered user may delete a `Post` they own
- [x] 12. A registered user may create a `Comment` on any `Post`
- [x] 13. A registered user may `react` to any `Post` with an emoji
- [x] 14. A registered user may `follow` and `unfollow` another `Profile`

### Technical Restrictions

The company CTO has set the following technical restrictions:

- [x] 1. Must use an approved `JavaScript Framework`
- [x] 2. Must use an approved `CSS Framework`
- [x] 3. Must be hosted on an approved `Static Host`
- [x] 4. Must use an approved `Design Application`
- [x] 5. Must use an approved `Planning Application`

# Content

- **Local Development:** Watch for file changes and instantly see the effects.

- **Linting:** Validate the consistency and syntax of your code.

# How to Install

1. Clone repository
2. bash `npm i`

# How To Use

Available scripts to lint, build, start, or test the project:

- **Add a .env feil to the Local Development:**

  - URL `VITE_API_URL=`

- **Start the development server:** `npm run dev`

- **Lint the code:** `npm run lint`

- **Build the project:** `npm run build`



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
