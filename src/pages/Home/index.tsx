import { Button, Accordion, Card, Title, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Eventfashion from "../../assets/images/event-fashion.jpg";
import Eventtech from "../../assets/images/event-tech1.jpg";
import Eventwedding from "../../assets/images/event-wedding1.jpeg";
import aboutus1 from "../../assets/images/about-us.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-6">
      {/* Hero Section */}
      <section className="py-36 text-center bg-gradient-to-r from-pink-100 via-white to-blue-100">
        <h1 className="text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
          Welcome to <span className="text-[#63378F]">EventPro</span>
        </h1>
        <p className="text-xl max-w-4xl mx-auto mb-8 text-gray-700">
          Creating unforgettable moments across Sri Lanka and beyond. Whether it's a dreamy wedding, corporate gala, or international expo — we plan it all.
        </p>
        <Button
          size="lg"
          onClick={() => navigate("/signup")}
          variant="filled"
          color="#63378F"
          radius="xl"
        >
          Start Planning Now
        </Button>
      </section>

      {/* Trending Events Section */}
      <section className="py-20 text-center">
        <Title order={2} className="text-4xl mb-10">🔥 Trending Events</Title>
        <div className="grid md:grid-cols-3 gap-8">
          <Card shadow="md" padding="lg">
            <Title order={4}>Colombo Fashion Week 2025</Title>
            <img src={Eventfashion} className="rounded-lg object-cover col-span-1" alt="Planning" />
            <Text mt="sm">A glamorous showcase of designers, models, and luxury brands. We’re handling the afterparty!</Text>
          </Card>
          <Card shadow="md" padding="lg">
            <Title order={4}>Global Tech Innovators Summit</Title>
            <img src={Eventtech} className="rounded-lg object-cover col-span-1" alt="Planning" />
            <Text mt="sm">Happening at Shangri-La Colombo – Event Pro is the official planner!</Text>
          </Card>
          <Card shadow="md" padding="lg">
            <Title order={4}>Destination Wedding: Galle Fort</Title>
            <img src={Eventwedding} className="rounded-lg object-cover col-span-1" alt="Planning" />
            <Text mt="sm">Exclusive coastal ceremony crafted by our luxury weddings team.</Text>
          </Card>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Who We Are</h2>
            <p className="text-lg text-gray-700 mb-4">
              Based in the heart of Colombo 7, <strong>Event Pro</strong> is Sri Lanka’s leading full-service event management agency.
            </p>
            <p className="text-lg text-gray-700">
              With over a decade of expertise, we specialize in seamless planning, creative design, and flawless execution of every event imaginable.
            </p>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[400px]">
            <img src={aboutus1} className="rounded-lg object-cover col-span-4" alt="Planning" />
          </div>
        </div>
      </section>

      {/* FAQ & Upgrade Plans */}
      <section className="py-20">
        <Title order={2} className="text-4xl mb-10 text-center">❓ Frequently Asked Questions</Title>
        <div className="max-w-4xl mx-auto">
          <Accordion multiple>
            <Accordion.Item value="q1">
              <Accordion.Control>What types of events do you manage?</Accordion.Control>
              <Accordion.Panel>
                Weddings, corporate events, exhibitions, birthday parties, destination events, and more.
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="q2">
              <Accordion.Control>Do you offer customizable packages?</Accordion.Control>
              <Accordion.Panel>
                Absolutely! From DIY tools to all-inclusive concierge-style services, we tailor everything to your needs.
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="q3">
              <Accordion.Control>Can I upgrade my current plan?</Accordion.Control>
              <Accordion.Panel>
                Yes. Just log in and go to “My Plan” to switch between Basic, Premium, and VIP Tiers at any time.
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="q4">
              <Accordion.Control>Do you operate outside of Colombo?</Accordion.Control>
              <Accordion.Panel>
                Yes, we plan events island-wide and even offer destination planning services overseas.
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[#63378F] text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Your Dream Event Starts Here</h2>
        <p className="text-lg mb-8">Let us turn your vision into reality. Join hundreds of satisfied clients today.</p>
        <Button
          size="lg"
          onClick={() => navigate("/signup")}
          variant="white"
          color="#63378F"
          radius="xl"
        >
          Book a Free Consultation
        </Button>
      </section>
    </div>
  );
};

export default Home;
