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
          <p className="text-[#ffffff]/50">Effective Date: October 5, 2025</p>
        </div>

        {/* Introduction */}
        <section className="mb-8">
          <p className="text-[#ffffff]/70 leading-relaxed mb-4">
            This Privacy Policy ("Policy") explains how PayBack Fitness, LLC ("PayBack Fitness," "we," "us," or "our") collects, uses, shares, and protects your
            personal information when you use our mobile applications, website, and related products or services (collectively, the "Service").
          </p>
          <p className="text-[#ffffff]/70 leading-relaxed">
            By using the Service, you agree to this Policy and to the processing of your information as described below. If you do not agree, you must
            discontinue use of the Service.
          </p>
        </section>

        {/* 1. Information We Collect */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
          <p className="text-[#ffffff]/70 leading-relaxed mb-4">
            We collect information that you provide directly and automatically through your interaction with the Service.
          </p>

          <h3 className="text-xl font-semibold text-white mb-3">1.1 Information You Provide</h3>
          <div className="space-y-3 text-[#ffffff]/70 mb-4">
            <p>
              <strong className="text-white">Account Information:</strong> Name, email address, username, password, and profile preferences.
            </p>
            <p>
              <strong className="text-white">Activity & Fitness Data:</strong> Workout logs, completion streaks, daily goals, progress tracking, and
              participation in "Blocks."
            </p>
            <p>
              <strong className="text-white">Communications:</strong> Messages sent to our support team, feedback, or inquiries.
            </p>
            <p>
              <strong className="text-white">Referral Information:</strong> Data associated with referral codes or achievements you generate or receive.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-white mb-3">1.2 Information Collected Automatically</h3>
          <div className="space-y-3 text-[#ffffff]/70">
            <p>
              <strong className="text-white">Device Information:</strong> Device type, operating system, browser, IP address, and mobile identifiers.
            </p>
            <p>
              <strong className="text-white">Usage Data:</strong> Pages or screens viewed, app features used, time spent, and engagement metrics.
            </p>
            <p>
              <strong className="text-white">Cookies & Tracking Technologies:</strong> Small data files that help us recognize you, analyze usage, and improve
              our Service.
            </p>
            <p>
              <strong className="text-white">Location Information:</strong> Only when explicitly allowed by your device settings, to enhance experience or
              verify eligibility in certain jurisdictions.
            </p>
          </div>
        </section>

        {/* 2. How We Use Your Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
          <p className="text-[#ffffff]/70 leading-relaxed mb-3">We use collected data to:</p>
          <ul className="list-disc list-inside text-[#ffffff]/70 space-y-2 ml-4">
            <li>Provide, maintain, and improve the Service.</li>
            <li>Track fitness activity and calculate progress achievements.</li>
            <li>Process subscriptions and manage premium features.</li>
            <li>Prevent fraud and verify eligibility.</li>
            <li>Communicate with you (transactional updates, app notifications, customer support).</li>
            <li>Comply with legal obligations.</li>
          </ul>
        </section>

        {/* 3. Activity Data & Progress Management */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">3. Activity Data & Progress Management</h2>
          <p className="text-[#ffffff]/70 leading-relaxed mb-3">To support your fitness journey, we maintain records of:</p>
          <ul className="list-disc list-inside text-[#ffffff]/70 space-y-2 ml-4 mb-4">
            <li>
              <strong className="text-white">Activity Progress:</strong> Workout completion data linked to your account.
            </li>
            <li>
              <strong className="text-white">Achievement Tracking:</strong> Milestones and goals reached during your participation.
            </li>
            <li>
              <strong className="text-white">Block Participation:</strong> Your engagement in 10-week fitness challenges.
            </li>
            <li>
              <strong className="text-white">Account Status:</strong> Progress may be lost if your account is deleted, terminated, or inactive for more than 12
              months.
            </li>
          </ul>
          <p className="text-[#ffffff]/70 leading-relaxed">
            We retain these records as part of our legitimate business interest in operating the fitness challenge system and meeting legal recordkeeping
            requirements.
          </p>
        </section>

        {/* 4. How We Share Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">4. How We Share Information</h2>
          <p className="text-[#ffffff]/70 leading-relaxed mb-4">
            We do not sell, rent, or otherwise disclose your personal information to third parties for their independent marketing purposes. We only share data
            with third parties as reasonably necessary to operate, maintain, and enhance the Service, or as otherwise required by law.
          </p>
          <p className="text-[#ffffff]/70 leading-relaxed mb-4">
            We rely on Supabase and Railway to provide secure database hosting and account storage services, including the management of user data and activity
            records. We also engage Twilio and certain email service providers to facilitate communications such as verification codes, transactional alerts,
            and service notifications.
          </p>
          <p className="text-[#ffffff]/70 leading-relaxed mb-4">
            We use RevenueCat to manage in-app subscriptions, verify purchase receipts, and synchronize subscription status across devices. RevenueCat may
            collect subscription identifiers, purchase timestamps, and device information to provide these services in accordance with their privacy policy.
          </p>
          <p className="text-[#ffffff]/70 leading-relaxed mb-4">
            Additionally, we employ analytics and performance measurement tools, such as Firebase or comparable providers, to evaluate usage trends, diagnose
            technical issues, and improve functionality across the PayBack Fitness platform. These providers may collect aggregated or anonymized data for
            analytical purposes in accordance with their own privacy practices.
          </p>
          <p className="text-[#ffffff]/70 leading-relaxed mb-3">We may also share data:</p>
          <ul className="list-disc list-inside text-[#ffffff]/70 space-y-2 ml-4">
            <li>With professional advisors (legal, compliance) where necessary.</li>
            <li>When required by law, subpoena, or governmental request.</li>
            <li>In the event of a business transfer, merger, or sale of company assets.</li>
          </ul>
        </section>

        {/* 5. Data Retention */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">5. Data Retention</h2>
          <p className="text-[#ffffff]/70 leading-relaxed mb-3">
            We retain personal information only as long as necessary for the purposes stated in this Policy, including:
          </p>
          <ul className="list-disc list-inside text-[#ffffff]/70 space-y-2 ml-4 mb-4">
            <li>While your account is active or needed to provide services.</li>
            <li>To comply with legal or accounting obligations.</li>
            <li>For activity recordkeeping (up to 5 years, unless laws require longer retention).</li>
          </ul>
          <p className="text-[#ffffff]/70 leading-relaxed">After that, data is securely deleted or anonymized.</p>
        </section>

        {/* 6. Data Security */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">6. Data Security</h2>
          <p className="text-[#ffffff]/70 leading-relaxed mb-4">
            We employ industry-standard measures to protect your data, including encryption, access controls, and secure third-party integrations.
          </p>
          <p className="text-[#ffffff]/70 leading-relaxed">
            However, no online service is 100% secure. You use the Service at your own risk and expressly waive any claims, damages, liabilities, and costs
            associated with any third party breach out of PayBack Fitness's reasonable control.
          </p>
        </section>

        {/* 7. Your Rights & Choices */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights & Choices</h2>
          <p className="text-[#ffffff]/70 leading-relaxed mb-3">Depending on your location, you may have the right to:</p>
          <ul className="list-disc list-inside text-[#ffffff]/70 space-y-2 ml-4 mb-4">
            <li>
              <strong className="text-white">Access and Portability:</strong> Request a copy of your data.
            </li>
            <li>
              <strong className="text-white">Correction:</strong> Update inaccurate information.
            </li>
            <li>
              <strong className="text-white">Deletion:</strong> Request deletion of your data; however, some User Content may not be completely removed and
              copies of the User Content may continue to exist in the Service, and PayBack Fitness may continue to use such User Content. PayBack Fitness is not
              responsible or liable for the removal or deletion of, or the failure to remove or delete, any User Content.
            </li>
            <li>
              <strong className="text-white">Restriction or Objection:</strong> Limit or object to certain processing activities.
            </li>
            <li>
              <strong className="text-white">Opt-Out:</strong> Decline marketing emails or certain cookies.
            </li>
          </ul>
          <p className="text-[#ffffff]/70 leading-relaxed">Requests can be made by contacting support@paybackfitness.com.</p>
        </section>

        {/* 8. Children's Privacy */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">8. Children's Privacy</h2>
          <p className="text-[#ffffff]/70 leading-relaxed">
            The Service is not directed to individuals under the age of 18. We do not knowingly collect data from individuals under 18; if we become aware, we
            will delete it promptly.
          </p>
        </section>

        {/* 9. International Users */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">9. International Users</h2>
          <p className="text-[#ffffff]/70 leading-relaxed">
            Your data may be processed in the United States and other countries where our partners operate. By using the Service, you consent to this transfer
            and processing. We take appropriate safeguards for international data transfers, including standard contractual clauses where applicable.
          </p>
        </section>

        {/* 10. Cookies & Tracking Technologies */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">10. Cookies & Tracking Technologies</h2>
          <p className="text-[#ffffff]/70 leading-relaxed mb-4">We use cookies, pixels, and analytics tools to improve the user experience.</p>
          <p className="text-[#ffffff]/70 leading-relaxed">
            You can adjust your browser settings to refuse cookies, but some Service features may not function properly without them.
          </p>
        </section>

        {/* 11. Subscriptions & In-App Purchases */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">11. Subscriptions & In-App Purchases</h2>
          <p className="text-[#ffffff]/70 leading-relaxed mb-4">
            PayBack Fitness offers subscription plans that provide access to premium features, including group creation, activity notifications, and enhanced
            progress tracking.
          </p>

          <h3 className="text-xl font-semibold text-white mb-3">11.1 Subscription Plans</h3>
          <p className="text-[#ffffff]/70 leading-relaxed mb-3">We offer the following subscription options:</p>
          <ul className="list-disc list-inside text-[#ffffff]/70 space-y-2 ml-4 mb-4">
            <li>
              <strong className="text-white">Monthly Subscription:</strong> $5/month
            </li>
            <li>
              <strong className="text-white">Annual Subscription:</strong> $50/year (16.7% savings)
            </li>
          </ul>
          <p className="text-[#ffffff]/70 leading-relaxed mb-4">
            All subscriptions automatically renew unless canceled at least 24 hours before the end of the current period.
          </p>

          <h3 className="text-xl font-semibold text-white mb-3">11.2 Payment & Billing</h3>
          <ul className="list-disc list-inside text-[#ffffff]/70 space-y-2 ml-4 mb-4">
            <li>Subscriptions are billed through your Apple App Store or Google Play Store account.</li>
            <li>Payment is charged at confirmation of purchase.</li>
            <li>Your account will be charged for renewal within 24 hours prior to the end of the current period.</li>
            <li>We use RevenueCat to manage and verify subscription status across platforms.</li>
            <li>We do not store or process your payment card information directly; all transactions are handled securely by Apple or Google.</li>
          </ul>

          <h3 className="text-xl font-semibold text-white mb-3">11.3 Cancellation & Refunds</h3>
          <ul className="list-disc list-inside text-[#ffffff]/70 space-y-2 ml-4 mb-4">
            <li>You can cancel your subscription at any time through your App Store or Google Play account settings.</li>
            <li>Cancellation takes effect at the end of the current billing period; you retain access until then.</li>
            <li>No refunds are provided for partial subscription periods, except where required by law.</li>
            <li>
              To cancel: iOS users should visit Settings &gt; [Your Name] &gt; Subscriptions. Android users should visit Google Play Store &gt; Menu &gt;
              Subscriptions.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-white mb-3">11.4 Subscription Data Collection</h3>
          <p className="text-[#ffffff]/70 leading-relaxed mb-3">When you subscribe, we collect and process:</p>
          <ul className="list-disc list-inside text-[#ffffff]/70 space-y-2 ml-4 mb-4">
            <li>Subscription status and tier (monthly/annual)</li>
            <li>Purchase timestamps and renewal dates</li>
            <li>Transaction identifiers from Apple/Google for verification</li>
            <li>Feature usage data to improve premium offerings</li>
          </ul>
          <p className="text-[#ffffff]/70 leading-relaxed">
            This information is processed through RevenueCat and used solely to provide, maintain, and improve subscription services. We do not share payment
            details with third parties beyond Apple, Google, and RevenueCat's payment verification services.
          </p>
        </section>

        {/* 12. Communications */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">12. Communications</h2>
          <p className="text-[#ffffff]/70 leading-relaxed">
            <strong className="text-white">Transactional Messages:</strong> We may send service-related communications (e.g., account confirmations, activity
            updates, subscription renewals). These cannot be opted out of.
          </p>
        </section>

        {/* 13. Data Transfers in the Event of Business Change */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">13. Data Transfers in the Event of Business Change</h2>
          <p className="text-[#ffffff]/70 leading-relaxed">
            If PayBack Fitness undergoes a merger, acquisition, or sale of assets, your information may be transferred to the successor entity, subject to this
            Policy.
          </p>
        </section>

        {/* 14. Changes to This Policy */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">14. Changes to This Policy</h2>
          <p className="text-[#ffffff]/70 leading-relaxed">
            PayBack Fitness reserves the right to update this Policy at any time at our discretion. Any modifications shall be uploaded to PayBack Fitness's
            website and will be effective on the date they are posted. Payback Fitness is not obligated to provide individual notice to Users of each update. If
            you continue to use PayBack Fitness Services after an updated Policy has been posted, you are agreeing to be bound by the updated Policy. If you do
            not agree to be bound by the updated Policy, you must discontinue use of the Service and terminate your account.
          </p>
        </section>

        {/* 15. Contact Us */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">15. Contact Us</h2>
          <p className="text-[#ffffff]/70 leading-relaxed mb-3">For privacy questions, data requests, or complaints, contact:</p>
          <p className="text-[#4BEEA2] font-medium">📧 support@paybackfitness.com</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
