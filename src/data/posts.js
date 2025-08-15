export const posts = [
  {
    slug: "getting-started-with-react",
    title: "Getting Started with React: A Beginner's Guide",
    author: "Mohammad Rajabi",
    role: "React developer",
    cover: "/react-hero.png", // put an SVG/PNG in /public/blog/
    excerpt:
      "React is one of the most popular libraries for building user interfaces. Let’s explore the basics and set up your first app.",
    content: [
      "React has become one of the most popular JavaScript libraries for building user interfaces, particularly for single-page applications where responsiveness and interactivity are key.",
      "This post guides you through setting up a React development environment using Create React App, JSX basics, and the component-based architecture.",
      "We’ll also cover props, state, and how this promotes reusability and modularity in your code.",
    ],
    readingTime: "6 min",
    date: "2025-02-01",
  },
  {
    slug: "understanding-component-lifecycle",
    title: "Understanding Component Lifecycle in React",
    author: "Mohammad Rajabi",
    role: "React developer",
    cover: "/blog/lifecycle-hero.svg",
    excerpt:
      "Learn how React components mount, update, and unmount—and how hooks like useEffect map to lifecycle stages.",
    content: [
      "React’s lifecycle can be thought of as three major phases: mounting, updating, and unmounting.",
      "Hooks such as useEffect give you a way to run side effects after render, and to clean them up when a component unmounts.",
      "We’ll walk through practical patterns and common pitfalls.",
    ],
    readingTime: "7 min",
    date: "2025-02-03",
  },
  {
    slug: "state-management-context-vs-redux",
    title: "State Management in React: Context API vs Redux",
    author: "Mohammad Rajabi",
    role: "React developer",
    cover: "/blog/state-hero.svg",
    excerpt:
      "When should you use Context, and when is Redux the better fit? Let’s compare with real examples.",
    content: [
      "Context shines for passing data deeply without prop drilling, while Redux is excellent for complex state logic and tooling.",
      "We’ll compare ergonomics, performance, and dev experience.",
      "By the end, you’ll know which option strengthens your app’s architecture.",
    ],
    readingTime: "8 min",
    date: "2025-02-05",
  },
];
