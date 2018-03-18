![Alt text](app/images/logo.png?raw=true "Title")

# Boundless - Internship Tracker

## Company
```
{
  name: String,
  industry: String,
  programs: [],
  targets: [organization]
}
```

## Program
```
{
  company:
  type: 'internship'
  candidates: ['Juniors'],
  roles: ['DevOps', 'SWE', 'IT'],
  locations: ['Seattle, WA'],
  relocation: true,
  sponsorship: false,
  inclusive: undefined,
  compensation: 3.5,
  interviews: ['Technical Phone Screen', 'Behavioral'],
  reviews: []
}
```

## Review
```
{
  company:
  program:
  role:
  location:
  author:
  title:
  body:
  ...
}
```

## User
```
{
  name: String,
  username: String,
  email: String,
  type: 'junior',
  organization: <organization>,
  reviews: [],
  experience: [],
  applications: {
    2017: [program]
  }
}
```

## Organization
```
{
  name: String,
  location: String,
  domains: ['uw.edu'],
  targets: [company]
}
```

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

- [Based on reactGo](https://github.com/reactGo/reactGo/) (adapted and optimized)

---

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
