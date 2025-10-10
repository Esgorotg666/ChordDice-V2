import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to App
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-sm text-gray-600 mb-8">Last updated: January 2025</p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
              <p>
                Welcome to Chord Dice ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and web service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mt-4 mb-2">Personal Information</h3>
              <p>When you create an account, we collect:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Email address</li>
                <li>Display name (if provided)</li>
                <li>Authentication credentials</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4 mb-2">Usage Data</h3>
              <p>We automatically collect:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Number of chord progressions generated</li>
                <li>Feature usage statistics</li>
                <li>Premium subscription status</li>
                <li>Referral codes and referral activity</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4 mb-2">Payment Information</h3>
              <p>
                Payment processing is handled securely by Stripe. We do not store your complete credit card information on our servers. Stripe may collect billing address, card details, and transaction history according to their privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
              <p>We use the collected information to:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Provide and maintain the Chord Dice service</li>
                <li>Manage your account and authentication</li>
                <li>Process premium subscription payments</li>
                <li>Track usage limits for free and premium features</li>
                <li>Manage the referral program and rewards</li>
                <li>Send important service notifications (email verification, password resets)</li>
                <li>Improve our app and user experience</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Data Sharing and Disclosure</h2>
              <p>We share your information only in the following circumstances:</p>
              
              <h3 className="text-xl font-semibold mt-4 mb-2">Service Providers</h3>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>Stripe:</strong> Payment processing for premium subscriptions</li>
                <li><strong>Email Service Provider:</strong> Sending verification and notification emails</li>
                <li><strong>Hosting Provider:</strong> Application and database hosting</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4 mb-2">Legal Requirements</h3>
              <p className="mt-2">
                We may disclose your information if required by law or in response to valid legal requests.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your personal information, including:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Encrypted data transmission (HTTPS/TLS)</li>
                <li>Secure password hashing</li>
                <li>Regular security audits</li>
                <li>Secure database storage</li>
              </ul>
              <p className="mt-2">
                However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Your Rights and Choices</h2>
              <p>You have the right to:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct your information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
                <li><strong>Opt-out:</strong> Unsubscribe from non-essential emails</li>
              </ul>
              <p className="mt-4">
                To exercise these rights or delete your account, visit the{" "}
                <Link href="/delete-account" className="text-blue-600 hover:underline">
                  Account Deletion
                </Link>
                {" "}page or contact us at support@chorddice.app
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Data Retention</h2>
              <p>
                We retain your personal information for as long as your account is active or as needed to provide services. When you delete your account, we will permanently delete your personal information within 30 days, except where we are required to retain it for legal purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Children's Privacy</h2>
              <p>
                Chord Dice is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. International Data Transfers</h2>
              <p>
                Your information may be transferred to and maintained on servers located outside of your country. By using Chord Dice, you consent to the transfer of your information to countries that may have different data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">10. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">11. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold">Chord Dice Support</p>
                <p>Email: support@chorddice.app</p>
              </div>
            </section>

            <section className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                By using Chord Dice, you agree to the collection and use of information in accordance with this Privacy Policy.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
