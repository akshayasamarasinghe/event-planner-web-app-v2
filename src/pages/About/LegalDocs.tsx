// src/pages/LegalDocs.tsx
import { useState } from 'react';
import { DocumentTextIcon, ShieldCheckIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface LegalDocsProps {
  initialTab?: 'terms' | 'privacy' | 'agreement' | 'about';
}

const LegalDocs = ({ initialTab = 'terms' }: LegalDocsProps) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'agreement' | 'about'>(initialTab);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        <button
          onClick={() => setActiveTab('terms')}
          className={`flex items-center px-8 py-5 font-medium whitespace-nowrap transition-colors duration-200 ${
            activeTab === 'terms'
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
          }`}
        >
          <DocumentTextIcon className="w-5 h-5 mr-3" />
          Terms of Service
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`flex items-center px-8 py-5 font-medium whitespace-nowrap transition-colors duration-200 ${
            activeTab === 'privacy'
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
          }`}
        >
          <ShieldCheckIcon className="w-5 h-5 mr-3" />
          Privacy Policy
        </button>
        <button
          onClick={() => setActiveTab('agreement')}
          className={`flex items-center px-8 py-5 font-medium whitespace-nowrap transition-colors duration-200 ${
            activeTab === 'agreement'
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
          }`}
        >
          <UserGroupIcon className="w-5 h-5 mr-3" />
          User Agreement
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-8 md:p-10 prose prose-indigo dark:prose-invert max-w-none">
        {activeTab === 'terms' && <TermsContent />}
        {activeTab === 'privacy' && <PrivacyContent />}
        {activeTab === 'agreement' && <AgreementContent />}
      </div>
    </div>
  );
};

// Content Components
const TermsContent = () => (
  <>
    <div className="mb-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Event Pro Terms of Service</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    </div>

    <div className="space-y-8">
      <Section title="1. Introduction" expanded>
        <p>
          Welcome to Event Pro , the premier platform for international event management. These Terms of Service ("Terms") govern your access to and use of our website, services, and applications (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms and our Privacy Policy.
        </p>
        <p>
          Our platform connects event organizers with attendees worldwide, providing tools for event creation, ticketing, marketing, and analytics across multiple jurisdictions.
        </p>
      </Section>

      <Section title="2. Global User Accounts">
        <p>
          To create an account, you must be at least 18 years old or the age of majority in your jurisdiction. You are responsible for maintaining the security of your account credentials and for all activities that occur under your account.
        </p>
        <p>
          International users must comply with all local laws regarding online services and event participation. Certain features may be restricted based on your country of residence due to legal requirements.
        </p>
      </Section>

      <Section title="3. International Event Management">
        <p>
          As an event organizer, you agree to provide accurate information about your events and comply with all applicable laws in the countries where your events are hosted and where attendees may reside. This includes but is not limited to consumer protection laws, tax regulations, and data privacy requirements.
        </p>
        <p>
        Event Pro  reserves the right to remove any event that violates our global community guidelines or appears to violate any international laws or regulations.
        </p>
      </Section>

      <Section title="4. Cross-Border Payments">
        <p>
          All ticket sales are final unless otherwise stated in the event organizer's refund policy. Service fees are non-refundable. EventGlobal supports multiple currencies and payment methods to accommodate international transactions.
        </p>
        <p>
          In case of event cancellation, organizers are responsible for issuing refunds in accordance with their stated policies and applicable consumer protection laws. Currency conversion fees may apply for international refunds.
        </p>
      </Section>

      <Section title="5. Intellectual Property">
        <p>
          All content on our platform is protected by international copyright, trademark, and other intellectual property laws. You may not use our trademarks, logos, or proprietary information without our express written permission.
        </p>
        <p>
          Event organizers retain ownership of their event content but grant EventGlobal a worldwide license to display and distribute this content through our Service.
        </p>
      </Section>

      <Section title="6. International Jurisdiction">
        <p>
          These Terms shall be governed by the laws of the State of California without regard to conflict of law principles. For any disputes not subject to arbitration, you agree to submit to the personal jurisdiction of the courts located within San Francisco County, California.
        </p>
        <p>
          Notwithstanding the foregoing, EventGlobal complies with applicable local laws regarding consumer disputes in countries where we operate, including the EU's Online Dispute Resolution platform for European consumers.
        </p>
      </Section>
    </div>
  </>
);

const PrivacyContent = () => (
  <>
    <div className="mb-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Event Pro  Privacy Policy</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    </div>

    <div className="space-y-8">
      <Section title="1. Global Data Collection" expanded>
        <p>
          We collect personal information when you register, create events, purchase tickets, or interact with our services internationally. This may include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Contact information (name, email, phone number)</li>
          <li>Payment and billing information (processed through PCI-compliant providers)</li>
          <li>Event details and preferences</li>
          <li>Device and usage data (IP address, browser type, location data)</li>
        </ul>
        <p>
          Our data collection complies with international regulations including GDPR, CCPA, and other applicable privacy laws.
        </p>
      </Section>

      <Section title="2. International Data Use">
        <p>
          We use your information to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide and improve our global services</li>
          <li>Process cross-border transactions</li>
          <li>Communicate in multiple languages based on user preferences</li>
          <li>Ensure platform security and prevent fraud</li>
          <li>Comply with international legal obligations</li>
        </ul>
      </Section>

      <Section title="3. Cross-Border Data Transfers">
        <p>
          As a global platform, we may transfer personal data to countries outside your home jurisdiction. We implement appropriate safeguards for these transfers, including:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>EU Standard Contractual Clauses for transfers from the EEA</li>
          <li>Other legally recognized mechanisms for international data transfers</li>
        </ul>
        <p>
          We only share data with third parties who provide sufficient guarantees for data protection.
        </p>
      </Section>

      <Section title="4. Your International Privacy Rights">
        <p>
          Depending on your location, you may have specific rights regarding your personal data:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>EU/EEA/UK:</strong> Rights under GDPR including access, rectification, erasure, and data portability</li>
          <li><strong>California:</strong> Rights under CCPA including disclosure and opt-out of data sales</li>
          <li><strong>Brazil:</strong> Rights under LGPD including information about data processing</li>
          <li><strong>Other Jurisdictions:</strong> Local privacy rights as applicable</li>
        </ul>
        <p>
          To exercise these rights, please contact our Data Protection Officer at privacy@eventglobal.com.
        </p>
      </Section>

      <Section title="5. Data Security Measures">
        <p>
          We implement industry-standard security measures appropriate for a global platform:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Encryption of data in transit and at rest</li>
          <li>Regular security audits and penetration testing</li>
          <li>Access controls and authentication protocols</li>
          <li>Compliance with international security standards</li>
        </ul>
      </Section>
    </div>
  </>
);

const AgreementContent = () => (
  <>
    <div className="mb-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Event Pro  User Agreement</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    </div>

    <div className="space-y-8">
      <Section title="1. Global Acceptance" expanded>
        <p>
          By using EventGlobal, you agree to comply with this User Agreement, our Terms of Service, and Privacy Policy. If you disagree with any part, you may not use our services.
        </p>
        <p>
          This agreement applies globally, though certain provisions may be modified to comply with local laws in your jurisdiction.
        </p>
      </Section>

      <Section title="2. International User Conduct">
        <p>
          You agree to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide accurate information that complies with local laws</li>
          <li>Not engage in fraudulent activities or money laundering</li>
          <li>Respect intellectual property rights internationally</li>
          <li>Comply with all applicable export control and sanctions laws</li>
        </ul>
      </Section>

      <Section title="3. Prohibited Global Activities">
        <p>
          You may not:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use our platform for illegal activities in any jurisdiction</li>
          <li>Host events that violate international human rights standards</li>
          <li>Circumvent geographic restrictions or sanctions</li>
          <li>Use our services in violation of any export controls</li>
        </ul>
      </Section>

      <Section title="4. International Organizer Obligations">
        <p>
          Organizers must:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide accurate event details that comply with local laws in all relevant jurisdictions</li>
          <li>Honor all ticket sales according to stated terms</li>
          <li>Comply with international tax obligations (VAT, GST, sales tax, etc.)</li>
          <li>Obtain necessary permits and licenses for events</li>
        </ul>
      </Section>

      <Section title="5. Global Attendee Responsibilities">
        <p>
          Attendees must:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Comply with event rules and local laws</li>
          <li>Respect venue policies and cultural norms</li>
          <li>Not resell tickets in violation of organizer terms or applicable laws</li>
          <li>Ensure they have proper travel documents for international events</li>
        </ul>
      </Section>

      <Section title="6. International Dispute Resolution">
        <p>
          Most concerns can be resolved by contacting our global support team at support@eventglobal.com. For unresolved disputes:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>You agree to first attempt informal resolution</li>
          <li>For EU consumers, disputes may be submitted to the EU Online Dispute Resolution platform</li>
          <li>Otherwise, disputes will be resolved through binding arbitration in San Francisco, CA</li>
        </ul>
      </Section>
    </div>
  </>
);

// Reusable Section Component
const Section = ({ title, children, expanded = false }: { title: string; children: React.ReactNode; expanded?: boolean }) => {
  return (
    <section className="border-b border-gray-100 dark:border-gray-700 pb-8 last:border-0 last:pb-0">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{title}</h2>
      <div className="text-gray-600 dark:text-gray-300 space-y-4">
        {children}
      </div>
    </section>
  );
};

export default LegalDocs;