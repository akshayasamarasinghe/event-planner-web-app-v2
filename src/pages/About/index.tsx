// src/pages/About.tsx
import LegalDocs from './LegalDocs';
import { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const About = () => {
  const [showLegalDocs, setShowLegalDocs] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState<'terms' | 'privacy' | 'agreement' | 'about'>('about');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {!showLegalDocs ? (
        // About Page Content
        <div className="space-y-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About <span className="text-indigo-600 dark:text-indigo-400">Event Pro</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Connecting the world through exceptional event experiences
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Founded in 2020, Event Pro emerged from a vision to revolutionize international event management. 
                We've grown from a startup to a global platform serving events in 45+ countries.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Our technology bridges cultural and logistical gaps, making global events accessible and seamless 
                for organizers and attendees worldwide.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Global Team</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our team spans 12 countries, bringing diverse perspectives to event management. 
                We combine tech expertise with deep cultural understanding to serve international clients.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                With backgrounds from Fortune 500 companies and leading event organizers, 
                we're redefining what's possible in global event experiences.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-10 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Contact Our Global Team</h2>
              <p className="text-indigo-100 mb-8 max-w-2xl">
                Have questions about international events? Our multilingual support team is available 24/5 
                to assist you across time zones.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h3 className="font-semibold text-indigo-100 mb-2">General Inquiries</h3>
                  <p className="text-white">support@eventpro.com</p>
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-100 mb-2">Global Support</h3>
                  <p className="text-white">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-100 mb-2">Headquarters</h3>
                  <p className="text-white">200 Event Plaza, Colombo 7, Sri Lanka</p>
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-100 mb-2">EMEA Office</h3>
                  <p className="text-white">100 Conference St, London, UK</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Legal Information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-3xl">
              EventGlobal complies with international regulations including GDPR, CCPA, and other global data 
              protection standards. Review our policies to understand how we protect your information worldwide.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setShowLegalDocs(true);
                  setActiveLegalTab('terms');
                }}
                className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-gray-800 dark:text-gray-200 font-medium"
              >
                Terms of Service
              </button>
              <button
                onClick={() => {
                  setShowLegalDocs(true);
                  setActiveLegalTab('privacy');
                }}
                className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-gray-800 dark:text-gray-200 font-medium"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => {
                  setShowLegalDocs(true);
                  setActiveLegalTab('agreement');
                }}
                className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-gray-800 dark:text-gray-200 font-medium"
              >
                User Agreement
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Legal Docs Component
        <div className="relative">
          <button
            onClick={() => setShowLegalDocs(false)}
            className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-8 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            <span className="font-medium">Back to About</span>
          </button>
          
          <div className="mt-6">
            <LegalDocs initialTab={activeLegalTab} />
          </div>
        </div>
      )}
    </div>
  );
};

export default About;