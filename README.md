# saigo.info

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

IganoSaigo's personal website running on React, FastAPI and Sqlalchemy.

**Note**: I've created this repository for my own use. It is neither a template, nor theme. But you feel free to take whatever inspiration you want. If you looking for stack or template for your own blog then you definitly should look on [Gatsby](https://www.gatsbyjs.com) or [Next.js](https://nextjs.org) or similar. Perhaps these are more apropriate for your purpose since they are working in SSR area whereas this project is **NOT**.

Currently it is at a **very** early stage. Initial version developed as fast as i could. So there are many critical improvements required. Especialy auth section and user management need to be taking care of. See complete TODO list below...



## Stack:
- [React.js](https://reactjs.org)
- [Redux Toolkit with RTK Query](https://redux-toolkit.js.org)
- [React Router](https://reactrouter.com)
- [Markdown Editor](https://github.com/RIP21/react-simplemde-editor)
- [Chakra-UI](https://chakra-ui.com)
- [FastAPI](https://fastapi.tiangolo.com)
- [SQLAlchemy](https://www.sqlalchemy.org)
- [Pydantic](https://github.com/pydantic/pydantic)
- [PostgreSQL](https://www.postgresql.org)

## Deploy Stack:
- [Ansible](https://github.com/ansible/ansible)
- [Terraform](https://www.terraform.io)
- [YandexCloud](https://cloud.yandex.ru)
- [Helm](https://helm.sh)
- [Helmfile](https://github.com/helmfile/helmfile)
- [K3S](https://k3s.io)

## TODO
- [x] Initial version
- [x] Add tags filter
- [ ] Add deployment files
  - [x] Manual deploy entrypoint
  - [x] Terraform manifests
  - [x] Basic Ansible roles
  - [x] Simple version for compose
  - [x] K8S Helm charts
  - [ ] Flux gitops config
  - [ ] CI/CD Pipeline
- [ ] Ops Addons
  - [ ] Monitoring/Alerting
  - [ ] Logging
- [ ] Complete API test coverage
- [ ] Add hidden post section
- [ ] Add images upload support
- [ ] Add caching
- [ ] Separate logic from endpoints of FastAPI
- [ ] Complete test coverage
- [ ] Add hidden post section
- [ ] Improve Auth
  - [ ] Add refresh JWT
  - [ ] Move JWT from localStorage to HTTPOnly cookie
  - [ ] Add interceptors to RTK Query
- [ ] Improve basic RBAC
- [ ] Change hardcoded roles to downloaded list
- [ ] Add client error handling for better UI experience with toast
- [ ] Improve backend error handling
- [ ] Add error handling for better UI experience with toast
- [ ] Search section
  - [ ] Add tags cloud
  - [ ] Add full text search
  - [ ] Add filters
- [ ] Add multilanguage support
- [ ] Add backup all posts to archive with markdown files
- [ ] Add dark theme

## License

This project is open source and available under the [MIT License](LICENSE).

