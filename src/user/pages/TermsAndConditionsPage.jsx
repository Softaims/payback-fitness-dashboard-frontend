import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const TermsAndConditionsPage = () => {
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
          <h1 className="text-4xl font-bold text-white mb-2">Terms & Conditions</h1>
          <p className="text-[#ffffff]/50">Last Updated: September 24, 2025</p>
        </div>

        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
          <p className="text-[#ffffff]/70 leading-relaxed">
            Welcome to Payback Fitness. These Terms and Conditions govern your use of our application and services. By accessing or using the Service, you agree
            to be bound by these Terms.
          </p>
        </section>

        {/* Use of Service */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Use of Service</h2>
          <p className="text-[#ffffff]/70 leading-relaxed mb-3">
            You agree to use the Service only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and
            enjoyment of the Service.
          </p>
          <p className="text-[#ffffff]/70 leading-relaxed mb-2">Prohibited behavior includes:</p>
          <ul className="list-disc list-inside text-[#ffffff]/70 space-y-2 ml-4">
            <li>Harassing other users</li>
            <li>Causing distress or inconvenience</li>
            <li>Engaging in illegal activities via the Service</li>
          </ul>
        </section>

        {/* Intellectual Property */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
          <p className="text-[#ffffff]/70 leading-relaxed mb-3">
            All content, trademarks, service marks, trade names, logos, and icons are the property of Payback Fitness or its licensors.
          </p>
          <p className="text-[#ffffff]/70 leading-relaxed">You may not use or reproduce any of these without prior written permission.</p>
        </section>

        {/* Account Registration */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Account Registration</h2>
          <p className="text-[#ffffff]/70 leading-relaxed mb-3">To use certain features of the Service, you may need to create an account.</p>
          <p className="text-[#ffffff]/70 leading-relaxed mb-2">You agree to:</p>
          <ul className="list-disc list-inside text-[#ffffff]/70 space-y-2 ml-4">
            <li>Provide accurate, current, and complete information during registration</li>
            <li>Keep your account information updated</li>
            <li>Be responsible for safeguarding your password and login credentials</li>
          </ul>
        </section>

        {/* Termination */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
          <p className="text-[#ffffff]/70 leading-relaxed">
            We may suspend or terminate your access to the Service immediately, without notice, if you breach these Terms or for any other reason.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
          <p className="text-[#ffffff]/70 leading-relaxed mb-3">To the maximum extent permitted by law, Payback Fitness shall not be liable for:</p>
          <ul className="list-disc list-inside text-[#ffffff]/70 space-y-2 ml-4">
            <li>Indirect, incidental, special, consequential, or punitive damages</li>
            <li>Loss of profits or revenues, whether incurred directly or indirectly</li>
          </ul>
        </section>

        {/* Changes to Terms */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
          <p className="text-[#ffffff]/70 leading-relaxed">
            We reserve the right to modify or replace these Terms at any time. Continued use of the Service after changes are made constitutes acceptance of the
            new Terms.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
          <p className="text-[#ffffff]/70 leading-relaxed">
            These Terms shall be governed and construed in accordance with the laws of North Carolina, United States, without regard to its conflict of law
            provisions.
          </p>
        </section>

        {/* Contact Us */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-[#ffffff]/70 leading-relaxed mb-3">If you have any questions about these Terms, please contact us at:</p>
          <p className="text-[#4BEEA2] font-medium">support@paybackfitness.com</p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
