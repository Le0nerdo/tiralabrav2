# Tiralabra v2

The project is to make an AI that plays [connect 4](https://en.wikipedia.org/wiki/Connect_Four). I am using Pascal Pons [Blog](http://blog.gamesolver.org/) as a guide.

## Installation
Unfortunately, you have to host the website, because of CORS policies. I used `npm` with `http-server`, you can use something else.
```cmd
git clone https://github.com/Le0nerdo/tiralabrav2.git
cd tiralabrav2
npm install
```

## Usage
```cmd
npm run localhost
# The website should be available under http://localhost:8080/
```

## Testign
```cmd
npm install --only=dev # When not installed, and no need for http-server

npm test # to run tests once

npm run testw # to run tests when files are modified

npm run coverage # to get test coverage
```

## Documentation
* [Project Specification](/documentation/ProjectSpecification.md)
* a somewhat useless [Testing Document](/documentation/TestingDocument.md)

## Code Coverage
|File|% Stmts|% Branch|% Funcs| % Lines|Uncovered Lines #s|
|:---:|:---:|:---:|:---:|:---:|:---:|
|GameState.js|100|100|100|100||
|NegamaxAI.js|98.11|92.86|100|97.83|59

## Weekly Reports
|[Week 1](/documentation/Week1Report.md)|[Week 2](/documentation/Week2Report.md)|[Week 3](/documentation/Week3Report.md)|[Week 4](/documentation/Week4Report.md)|[Week 5](/documentation/Week5Report.md)|[Week 6](/documentation/Week6Report.md)|
|:---:|:---:|:---:|:---:|:---:|:---:|
