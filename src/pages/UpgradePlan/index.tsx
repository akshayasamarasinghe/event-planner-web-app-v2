// src/pages/UpgradePlan/index.tsx
import {useState} from 'react';
import {FiAward, FiBriefcase, FiCheck, FiUser} from 'react-icons/fi';

const UpgradePlan = () => {
    const [activeTab, setActiveTab] = useState<'personal' | 'business'>('personal');

    const personalPlans = [
        {
            id: 'free',
            name: 'Free',
            price: '$0',
            period: 'forever',
            popular: false,
            features: [
                'Up to 5 events per month',
                'Basic event management',
                '100 attendee limit per event',
                'Email support',
            ],
            cta: 'Current Plan',
        },
        {
            id: 'plus',
            name: 'Plus',
            price: '$9',
            period: 'per month',
            popular: true,
            features: [
                'Up to 20 events per month',
                'Advanced event management',
                '500 attendee limit per event',
                'Priority email support',
                'Custom registration forms',
                'Basic analytics',
            ],
            cta: 'Upgrade to Plus',
        },
        {
            id: 'pro',
            name: 'Pro',
            price: '$29',
            period: 'per month',
            popular: false,
            features: [
                'Unlimited events',
                'Premium event management',
                '2,000 attendee limit per event',
                '24/7 phone & email support',
                'Advanced custom forms',
                'Detailed analytics',
                'Early access to new features',
            ],
            cta: 'Upgrade to Pro',
        },
    ];

    const businessPlans = [
        {
            id: 'team',
            name: 'Team',
            price: '$99',
            period: 'per month',
            popular: false,
            features: [
                'Everything in Pro, plus:',
                'Up to 10 team members',
                '10,000 attendee limit per event',
                'Dedicated account manager',
                'Custom branding',
                'API access',
                'Enterprise-grade security',
                'SLA guarantees',
            ],
            cta: 'Upgrade to Team',
        },
    ];

    const handlePlanSelect = (planId: string) => {
        console.log(planId);
        // Here you would typically handle the upgrade logic
        // In a real app, you might:
        // 1. Redirect to checkout page
        // 2. Show a confirmation modal
        // 3. Make an API call to update the plan
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-[#63378F] sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Upgrade Your Plan
                    </h1>
                    <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                        Choose the perfect plan for your event management needs
                    </p>
                </div>

                {/* Plan Type Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex rounded-lg bg-white p-1 shadow-sm border border-gray-200">
                        <button
                            onClick={() => setActiveTab('personal')}
                            className={`px-6 py-3 text-sm font-medium rounded-md flex items-center ${activeTab === 'personal' ? 'bg-[#63378F] text-white' : 'text-[#63378F] hover:bg-gray-100'}`}
                        >
                            <FiUser className="mr-2"/>
                            Personal Plans
                        </button>
                        <button
                            onClick={() => setActiveTab('business')}
                            className={`px-6 py-3 text-sm font-medium rounded-md flex items-center ${activeTab === 'business' ? 'bg-[#63378F] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            <FiBriefcase className="mr-2"/>
                            Business Plans
                        </button>
                    </div>
                </div>

                {/* Plans Grid */}
                <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
                    {activeTab === 'personal' ? (
                        personalPlans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`relative rounded-2xl shadow-xl overflow-hidden border-2 ${plan.popular ? 'border-indigo-500 transform md:-translate-y-3' : 'border-transparent'}`}
                            >
                                {plan.popular && (
                                    <div
                                        className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                                        POPULAR
                                    </div>
                                )}
                                <div className="bg-white p-6 sm:p-8">
                                    <div className="flex items-center mb-4">
                                        <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                                        {plan.id === 'free' && (
                                            <span
                                                className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        CURRENT
                      </span>
                                        )}
                                    </div>
                                    <div className="mb-6">
                                        <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                                        <span className="text-base font-medium text-gray-500">/{plan.period}</span>
                                    </div>
                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-center">
                                                <FiCheck className="flex-shrink-0 text-green-500 mr-2"/>
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => handlePlanSelect(plan.id)}
                                        disabled={plan.id === 'free'}
                                        className={`w-full px-6 py-3 rounded-md text-sm font-medium ${plan.id === 'free' ? 'bg-gray-200 text-gray-600 cursor-not-allowed' : plan.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
                                    >
                                        {plan.cta}
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        businessPlans.map((plan) => (
                            <div
                                key={plan.id}
                                className="relative rounded-2xl shadow-xl overflow-hidden border-2 border-transparent md:col-start-2"
                            >
                                <div className="bg-white p-6 sm:p-8">
                                    <div className="flex items-center mb-4">
                                        <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                                        <FiAward className="ml-2 text-yellow-500"/>
                                    </div>
                                    <div className="mb-6">
                                        <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                                        <span className="text-base font-medium text-gray-500">/{plan.period}</span>
                                    </div>
                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <FiCheck className="flex-shrink-0 text-green-500 mr-2 mt-1"/>
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => handlePlanSelect(plan.id)}
                                        className="w-full px-6 py-3 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
                                    >
                                        {plan.cta}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* FAQ Section */}
                <div className="mt-16 max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {[
                            {
                                question: 'Can I switch plans later?',
                                answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated based on your billing cycle.',
                            },
                            {
                                question: 'Do you offer discounts for non-profits?',
                                answer: 'Yes! We offer special pricing for registered non-profit organizations. Contact our sales team for more information.',
                            },
                            {
                                question: 'What payment methods do you accept?',
                                answer: 'We accept all major credit cards (Visa, Mastercard, American Express) as well as PayPal and bank transfers for annual plans.',
                            },
                            {
                                question: 'Is there a contract or long-term commitment?',
                                answer: 'No, all plans are month-to-month with no long-term commitment. You can cancel anytime.',
                            },
                        ].map((faq, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                                <p className="mt-2 text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpgradePlan;
