module.exports = {
  ci: {
    collect: {
      staticDistDir: "./public",
      url: [
        "http://localhost/",
        "http://localhost/en/",
        "http://localhost/links/",
        "http://localhost/blog/",
        "http://localhost/en/blog/"
      ],
      numberOfRuns: 3,
      settings: {
        onlyCategories: ["performance", "accessibility", "best-practices", "seo"]
      }
    },
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }],
        "categories:performance": ["warn", { minScore: 0.75 }],
        "categories:best-practices": ["warn", { minScore: 0.75 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "errors-in-console": ["error", { minScore: 1 }],
        "largest-contentful-paint": ["warn", { maxNumericValue: 5500 }],
        "total-blocking-time": ["warn", { maxNumericValue: 300 }]
      }
    },
    upload: {
      target: "filesystem",
      outputDir: ".context/lhci"
    }
  }
};
