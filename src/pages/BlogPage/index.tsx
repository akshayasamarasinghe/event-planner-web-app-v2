import { Title, Card, Text, Button, Badge, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const posts = [
    {
      id: 1,
      title: "Mastering Event Timelines: The Blueprint to Perfect Execution",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200",
      excerpt: "Learn professional techniques for creating bulletproof event schedules that ensure seamless execution from start to finish.",
      category: "Planning Guide",
      date: "March 15, 2025",  // Changed to 2025
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Tech Revolution: Transforming Events in 2025",
      image: "https://www.caperey.com/files/6789/22893381_ImageLargeWidth.jpg",
      excerpt: "Explore cutting-edge technologies reshaping attendee experiences - from AI matchmaking to holographic displays.",
      category: "Tech Trends",
      date: "March 14, 2025",  // Changed to 2025
      readTime: "10 min read"
    },
  ];

  return (
    <div className="container mx-auto px-6 py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <Title order={1} className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-[#63378F] bg-clip-text text-transparent">
          Event Insights
        </Title>
        <Text className="text-xl text-gray-600">
          Expert knowledge and industry trends for professional planners
        </Text>
        <div className="h-1 w-24 bg-[#63378F] mx-auto mt-6 rounded-full" />
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {posts.map(post => (
          <Card
            key={post.id}
            shadow="xl"
            padding="lg"
            radius="lg"
            className="hover:shadow-2xl transition-shadow duration-300 group"
          >
            <div className="relative h-64 overflow-hidden rounded-lg mb-6">
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
                <Badge color="blue" variant="light">{post.category}</Badge>
              </div>
            </div>

            <Group className="mb-3">
              <Text className="text-gray-500 text-sm">{post.date}</Text>
              <Text className="text-blue-500 text-sm font-medium">{post.readTime}</Text>
            </Group>

            <Title order={3} className="text-2xl mb-3 font-bold hover:text-blue-600 cursor-pointer">
              {post.title}
            </Title>

            <Text className="text-gray-600 mb-6 leading-relaxed">{post.excerpt}</Text>

            <Button
              variant="outline"
              color="#63378F"
              fullWidth
              onClick={() => navigate(`/blog/${post.id}`)}
              className="hover:transform hover:-translate-y-1 transition-all mt-5"
            >
              Read Full Article
            </Button>
          </Card>
        ))}
      </div>

      {/* Featured Post */}
      <div className="max-w-7xl mx-auto mt-20">
        <Card
          shadow="xl"
          padding="xl"
          radius="lg"
          className="relative overflow-hidden border-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90" />
          <div className="relative z-10 text-white">
            <div className="max-w-2xl">
              <Badge color="white" variant="filled" className="mb-4">Featured Post</Badge>
              <Title order={2} className="text-4xl mb-4 font-bold">
                The Future of Hybrid Events: 2025 Industry Outlook
              </Title>
              <Text className="text-lg mb-6">
                Discover how hybrid events are evolving with new technologies and changing audience expectations...
              </Text>
              <Button
                size="lg"
                variant="white"
                color="dark"
                onClick={() => navigate('/blogs/featured')}
              >
                Read Exclusive Report
              </Button>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200"
            alt="Featured Post"
            className="absolute right-0 top-0 h-full w-1/2 object-cover mix-blend-overlay"
          />
        </Card>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-20 gap-4">
        <Button variant="outline" color="gray" size="lg">Previous</Button>
        <Button color="#63378F" size="lg">Next</Button>
      </div>
    </div>
  );
};

export default Index;
