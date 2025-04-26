import { Title, Text, Button, Container, Group, Badge, Card } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Share, Bookmark } from 'tabler-icons-react';

const ReadMorePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const posts = [
    {
      id: 1,
      title: "Mastering Event Timelines: The Blueprint to Perfect Execution",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600",
      content: `In the world of event planning, precision is paramount. This comprehensive guide will walk you through professional techniques for creating bulletproof event schedules that ensure seamless execution from start to finish.
      
**Key Highlights:**
- Phase-based planning methodology
- Vendor coordination strategies
- Contingency planning frameworks
- Real-time adjustment techniques

A well-structured timeline is essential to keep all stakeholders aligned and avoid last-minute surprises. By implementing these proven strategies, you'll elevate your event planning game to professional standards.`,
      category: "Planning Guide",
      date: "March 15, 2025",
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Event Trends in 2025: Innovations Shaping the Future of Events",
      image: "https://www.caperey.com/files/6789/22893381_ImageLargeWidth.jpg",
      content: `As we approach 2025, event planning is set to undergo a massive transformation. With technological advancements and changing expectations, event professionals need to adapt quickly to stay ahead of the curve.

**Key Event Trends in 2025:**
- Virtual and Hybrid Event Integration: The demand for both in-person and virtual experiences is on the rise.
- AI-Powered Event Personalization: From personalized schedules to AI-driven networking, technology will tailor every aspect of the event.
- Sustainability and Eco-Friendly Practices: More events will prioritize green practices and sustainability.
- Interactive and Immersive Experiences: Attendees will expect interactive displays, AR/VR experiences, and real-time engagement.

These trends highlight the shifting landscape of event planning and provide insights into what to expect and how to stay competitive in 2025.`,
      category: "Event Trends",
      date: "March 20, 2025",
      readTime: "10 min read"
    },
  ];

  const post = posts.find(post => post.id === parseInt(id || ''));

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Text className="text-2xl text-gray-600">No article found</Text>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative h-96 w-full mb-16">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-12">
          <Container size="xl">
            <div className="max-w-3xl">
              <Badge
                color="blue"
                variant="light"
                size="lg"
                className="mb-4"
              >
                {post.category}
              </Badge>
              <Title order={1} className="text-4xl md:text-5xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {post.title.split(':')[0]}:
                </span>
                <br />
                <span className="font-serif">{post.title.split(':')[1]}</span>
              </Title>
              <Group className="text-gray-300">
                <Text>{post.date}</Text>
                <span>•</span>
                <Text>{post.readTime}</Text>
              </Group>
            </div>
          </Container>
        </div>
      </div>

      {/* Content Section */}
      <Container size="lg" className="mb-20">
        <div className="max-w-2xl mx-auto">
          <article className="prose lg:prose-xl">
            <div className="text-lg text-gray-700 leading-relaxed space-y-6">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index} className={index === 0 ? 'first-letter:text-4xl first-letter:font-bold first-letter:mr-2' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          {/* Editor's Exclusive Report */}
          <div className="bg-gradient-to-br from-yellow-50 via-white to-purple-50 border-l-4 border-yellow-400 rounded-xl p-6 my-16 shadow-inner">
            <div className="mb-4 flex items-center justify-between">
              <Badge color="yellow" variant="filled" size="lg">
                Editor’s Exclusive
              </Badge>
              <span className="text-sm text-gray-500 italic">Expert Insight</span>
            </div>
            <Title order={3} className="text-2xl font-bold mb-3 text-gray-800">
              “Why This Topic Matters in 2025”
            </Title>
            <Text size="md" className="text-gray-700 leading-relaxed">
              In a fast-evolving industry, staying updated isn’t just useful—it’s essential.
              This report offers behind-the-scenes reasoning on how trends like AI, personalization, and hybrid experiences
              are not just fads, but pillars of the future of event planning. <br />
              <br />
              As event professionals, embracing these innovations will help you craft more engaging, sustainable, and future-proof experiences.
            </Text>
          </div>

          {/* Share Actions */}
          <div className="mt-12 p-6 bg-white rounded-xl shadow-lg">
            <Group position="apart">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  color="#63378F"
                  leftIcon={<ArrowLeft size={18} />}
                  onClick={() => navigate('/blog')}
                >
                  Back to Blog
                </Button>
                <Button
                  variant="light"
                  color="#63378F"
                  leftIcon={<Share size={18} />}
                >
                  Share Article
                </Button>
              </div>
              <Button
                variant="subtle"
                color="gray"
                leftIcon={<Bookmark size={18} />}
              >
                Save for Later
              </Button>
            </Group>
          </div>
        </div>
      </Container>

      {/* Related Articles */}
      <Container size="xl" className="mb-20">
        <Title order={2} className="text-3xl font-bold mb-8 px-6">
          Related Articles
        </Title>
        <div className="grid md:grid-cols-3 gap-8 px-6">
          {posts.filter(p => p.id !== post.id).slice(0, 3).map(relatedPost => (
            <Card
              key={relatedPost.id}
              shadow="sm"
              padding="lg"
              className="hover:shadow-md transition-shadow"
              onClick={() => navigate(`/blogs/${relatedPost.id}`)}
            >
              <img
                src={relatedPost.image}
                alt={relatedPost.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <Badge color="blue" variant="light" className="mb-2">
                {relatedPost.category}
              </Badge>
              <Title order={3} className="text-lg font-semibold mb-2">
                {relatedPost.title}
              </Title>
              <Group className="text-sm text-gray-500">
                <Text>{relatedPost.date}</Text>
                <span>•</span>
                <Text>{relatedPost.readTime}</Text>
              </Group>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ReadMorePage;
