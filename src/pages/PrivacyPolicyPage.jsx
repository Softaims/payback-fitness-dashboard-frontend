import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white relative">
      {/* Go Back Link - Fixed to top left */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10">
        <button onClick={() => navigate(-1)} className="cursor-pointer inline-flex items-center text-[#4BEEA2] hover:text-green-400 transition-colors">
          <ChevronLeft className="w-7 h-7 mr-2" />
          <p className="text-[#ffffff]">Go Back</p>
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-24 md:pt-32 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-[#ffffff]/50">Last updated: September 09, 2025</p>
        </div>

        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
          <p className="text-[#ffffff]/70 leading-relaxed mb-4">
            This Privacy Policy describes our policies and procedures on the collection, use, and disclosure of your information when you use the Service and
            informs you about your privacy rights and how the law protects you.
          </p>
          <p className="text-[#ffffff]/70 leading-relaxed">
            We use your personal data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance
            with this Privacy Policy.
          </p>
        </section>

        {/* 1. Interpretation and Definitions */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">1. Interpretation and Definitions</h2>

          <h3 className="text-xl font-semibold text-white mb-3">Interpretation</h3>
          <p className="text-[#ffffff]/70 leading-relaxed mb-4">
            Words with capitalized initials have meanings defined in this section. The definitions apply whether the terms appear in singular or plural.
          </p>

          <h3 className="text-xl font-semibold text-white mb-3">Definitions</h3>
          <div className="space-y-3 text-[#ffffff]/70">
            <p>
              <strong className="text-white">Account:</strong> A unique account created for you to access our Service or parts of it.
            </p>
            <p>
              <strong className="text-white">Affiliate:</strong> An entity that controls, is controlled by, or is under common control with a party (where
              control means ownership of 50% or more of voting shares).
            </p>
            <p>
              <strong className="text-white">Application:</strong> Refers to Payback Fitness, the software provided by the Company.
            </p>
            <p>
              <strong className="text-white">Company:</strong> Referred to as "the Company", "We", "Us", or "Our" — it refers to Payback Fitness.
            </p>
            <p>
              <strong className="text-white">Country:</strong> United States, specifically North Carolina.
            </p>
            <p>
              <strong className="text-white">Device:</strong> Any device that can access the Service (computer, cellphone, tablet, etc.).
            </p>
            <p>
              <strong className="text-white">Personal Data:</strong> Any information that relates to an identified or identifiable individual.
            </p>
            <p>
              <strong className="text-white">Service:</strong> Refers to the Application.
            </p>
            <p>
              <strong className="text-white">Service Provider:</strong> Any person or entity processing data on behalf of the Company.
            </p>
            <p>
              <strong className="text-white">Usage Data:</strong> Data collected automatically through the Service.
            </p>
            <p>
              <strong className="text-white">You:</strong> The individual using the Service, or the company/legal entity on whose behalf the Service is used.
            </p>
          </div>
        </section>

        {/* 2. Collecting and Using Your Personal Data */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">2. Collecting and Using Your Personal Data</h2>

          <h3 className="text-xl font-semibold text-white mb-3">Types of Data Collected</h3>

          <div className="mb-4">
            <h4 className="text-lg font-semibold text-white mb-2">Personal Data:</h4>
            <p className="text-[#ffffff]/70 leading-relaxed mb-2">We may ask for personally identifiable information including, but not limited to:</p>
            <ul className="list-disc list-inside text-[#ffffff]/70 space-y-1 ml-4">
              <li>Email address</li>
              <li>First and last name</li>
              <li>Usage Data</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Usage Data:</h4>
            <p className="text-[#ffffff]/70 leading-relaxed mb-2">Automatically collected when using the Service. It may include:</p>
            <ul className="list-disc list-inside text-[#ffffff]/70 space-y-1 ml-4">
              <li>Device IP address</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Device identifiers</li>
              <li>Diagnostic data</li>
              <li>Mobile device details (e.g., OS, browser, model)</li>
            </ul>
          </div>
        </section>

        {/* 3. Use of Your Personal Data */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">3. Use of Your Personal Data</h2>
          <p className="text-[#ffffff]/70 leading-relaxed mb-3">We may use your personal data for the following purposes:</p>
          <ul className="list-disc list-inside text-[#ffffff]/70 space-y-2 ml-4">
            <li>To provide and maintain the Service</li>
            <li>To manage your account</li>
            <li>To perform a contract</li>
            <li>To contact you with updates</li>
            <li>To provide news, special offers, and promotions</li>
            <li>To respond to your requests</li>
            <li>For business transfers</li>
            <li>For analysis and improvement of the Service</li>
          </ul>
        </section>

        {/* 4. Sharing Your Personal Data */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">4. Sharing Your Personal Data</h2>
          <p className="text-[#ffffff]/70 leading-relaxed mb-3">Your data may be shared in these situations:</p>
          <ul className="list-disc list-inside text-[#ffffff]/70 space-y-2 ml-4">
            <li>With Service Providers (e.g., analytics, communications)</li>
            <li>For business transfers (e.g., mergers, acquisitions)</li>
            <li>With Affiliates that comply with this policy</li>
            <li>With business partners offering services/products</li>
            <li>In public areas (when shared by you)</li>
            <li>With your explicit consent</li>
          </ul>
        </section>

        {/* 5. Retention of Your Personal Data */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">5. Retention of Your Personal Data</h2>
          <p className="text-[#ffffff]/70 leading-relaxed">
            We retain your personal data only as long as necessary for the purposes described and to comply with legal obligations.
          </p>
        </section>

        {/* 6. Transfer of Your Personal Data */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">6. Transfer of Your Personal Data</h2>
          <p className="text-[#ffffff]/70 leading-relaxed">
            Your information may be transferred to and maintained on servers outside your region, where laws may differ from your jurisdiction.
          </p>
        </section>

        {/* 7. Security of Your Personal Data */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">7. Security of Your Personal Data</h2>
          <p className="text-[#ffffff]/70 leading-relaxed">
            We implement security measures to protect your data. However, no method of transmission or electronic storage is 100% secure.
          </p>
        </section>

        {/* 8. Children's Privacy */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">8. Children's Privacy</h2>
          <p className="text-[#ffffff]/70 leading-relaxed">
            Our Service is not directed at anyone under the age of 13. We do not knowingly collect personal information from children under 13.
          </p>
        </section>

        {/* 9. Changes to This Privacy Policy */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">9. Changes to This Privacy Policy</h2>
          <p className="text-[#ffffff]/70 leading-relaxed">
            We may update this policy from time to time. You will be notified of changes by the posting of the updated policy on this page.
          </p>
        </section>

        {/* 10. Contact Us */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
          <p className="text-[#ffffff]/70 leading-relaxed mb-3">For questions about this Privacy Policy, contact us at:</p>
          <p className="text-[#4BEEA2] font-medium">support@paybackfitness.com</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
