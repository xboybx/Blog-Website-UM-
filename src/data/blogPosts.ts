export interface BlogPostData {
  id: number;
  title: string;
  content: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
}

export const blogPosts: BlogPostData[] = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    content: "Web development continues to evolve at a rapid pace, with new technologies and frameworks emerging regularly. In 2024, we're seeing exciting developments in areas like AI-powered development tools, improved performance optimization techniques, and more sophisticated user experience patterns. React continues to dominate the frontend landscape, while new meta-frameworks are making full-stack development more accessible than ever. The rise of edge computing is also changing how we think about deployment and performance, bringing computation closer to users for faster, more responsive applications.",
    date: "June 15, 2024",
    image: "photo-1498050108023-c5249f4df085",
    category: "Technology",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Building Responsive Designs: A Complete Guide",
    content: "Creating responsive web designs has become essential in today's multi-device world. With users accessing websites from smartphones, tablets, laptops, and desktop computers, ensuring your design works seamlessly across all screen sizes is crucial. This comprehensive guide covers everything from mobile-first design principles to advanced CSS Grid and Flexbox techniques. We'll explore how to use modern CSS features like container queries, which allow components to respond to their container size rather than just the viewport. You'll also learn about performance considerations for responsive images and how to implement proper touch targets for mobile users.",
    date: "June 10, 2024",
    image: "photo-1486312338219-ce68d2c6f44d",
    category: "Design",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "JavaScript Performance Optimization Tips",
    content: "Performance optimization is crucial for creating fast, responsive web applications that provide excellent user experiences. Modern JavaScript applications can quickly become bloated and slow without proper optimization techniques. In this article, we'll explore various strategies including code splitting, lazy loading, tree shaking, and efficient DOM manipulation. We'll also discuss how to leverage browser APIs like the Intersection Observer for performance gains, implement proper caching strategies, and use tools like webpack and Vite for optimal bundling. Understanding these concepts will help you build applications that load quickly and run smoothly across all devices.",
    date: "June 5, 2024",
    image: "photo-1461749280684-dccba630e2f6",
    category: "Programming",
    readTime: "6 min read"
  }
];