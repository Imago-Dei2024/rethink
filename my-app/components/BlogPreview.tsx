import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Understanding Secondary Trauma in First Responders",
    excerpt: "First responders face unique mental health challenges due to repeated exposure to traumatic events. Learn about the signs of secondary trauma and effective coping strategies.",
    author: "Karen Laber, PMHNP-BC",
    date: "June 15, 2023",
    image: "/images/blog/first-responders.jpg",
    slug: "understanding-secondary-trauma-first-responders"
  },
  {
    id: 2,
    title: "Ketamine Therapy: A Breakthrough for Treatment-Resistant Depression",
    excerpt: "Explore how ketamine therapy is changing the landscape for patients with treatment-resistant depression, offering rapid relief and new hope.",
    author: "Erin Webb, PMHNP-BC",
    date: "May 22, 2023",
    image: "/images/blog/ketamine-therapy.jpg",
    slug: "ketamine-therapy-breakthrough-treatment-resistant-depression"
  },
  {
    id: 3,
    title: "Mental Health Considerations for Military Veterans",
    excerpt: "Military service can impact mental health in complex ways. This article discusses common challenges veterans face and specialized treatment approaches.",
    author: "Karen Laber, PMHNP-BC",
    date: "April 8, 2023",
    image: "/images/blog/military-veterans.jpg",
    slug: "mental-health-considerations-military-veterans"
  }
];

const BlogPreview = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">From Our Blog</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Insights, research, and guidance from ReThink's mental health professionals to
            support your wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
              <div className="relative h-48 w-full">
                {/* Placeholder for blog post images */}
                <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                  <i className="fas fa-newspaper text-gray-400 text-4xl"></i>
                </div>
                {/* Uncomment when actual images are available
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                */}
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                  Read More
                  <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/blog" className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-3 px-6 rounded-md border border-blue-200 transition-colors duration-300 inline-flex items-center">
            View All Articles
            <i className="fas fa-chevron-right ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;