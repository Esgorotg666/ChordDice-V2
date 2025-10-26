import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfServicePage() {
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
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          <p className="text-sm text-gray-600 mb-8">Last updated: January 2025</p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using Guitar Dice ("the App"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the App.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Description of Service</h2>
              <p>
                Guitar Dice is a musical tool application that generates chord progressions, provides guitar exercises, scales, and educational content for musicians. The App is available in both free and premium subscription tiers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Account Registration</h2>
              <p>To access certain features, you must create an account by providing:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>A valid email address</li>
                <li>A secure password</li>
                <li>Optional username or display name</li>
              </ul>
              <p className="mt-3">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Subscription and Payment</h2>
              
              <h3 className="text-xl font-semibold mt-4 mb-2">Free Tier</h3>
              <p>Free users receive:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>5 free dice roll generations</li>
                <li>Access to basic chord progressions</li>
                <li>Ability to earn additional rolls by watching ads (max 5 per day)</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4 mb-2">Premium Subscription</h3>
              <p>Premium subscribers ($4.99/month) receive:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Unlimited dice roll generations</li>
                <li>Access to exotic chords and advanced genres</li>
                <li>Guitar exercises and comprehensive lessons</li>
                <li>Compatible scales and tapping features</li>
                <li>Ad-free experience</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4 mb-2">Billing</h3>
              <p>
                Subscriptions are billed monthly via Stripe. By subscribing, you authorize us to charge your payment method on a recurring basis. You may cancel your subscription at any time through your account settings.
              </p>

              <h3 className="text-xl font-semibold mt-4 mb-2">Refunds</h3>
              <p>
                Monthly subscriptions are non-refundable except as required by law. If you cancel, you will retain access to premium features until the end of your current billing period.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Referral Program</h2>
              <p>
                Users may participate in our referral program by sharing a unique referral code. When a referred user upgrades to Premium, the referrer receives 1 month of free Premium access. Referral abuse or fraudulent activity may result in account termination and forfeiture of rewards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Acceptable Use</h2>
              <p>You agree NOT to:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Use the App for any illegal or unauthorized purpose</li>
                <li>Attempt to gain unauthorized access to any portion of the App</li>
                <li>Interfere with or disrupt the App's servers or networks</li>
                <li>Use automated scripts, bots, or scrapers</li>
                <li>Share your account credentials with others</li>
                <li>Abuse the referral program or ad reward system</li>
                <li>Reverse engineer, decompile, or disassemble the App</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Intellectual Property</h2>
              <p>
                All content, features, and functionality of Guitar Dice, including but not limited to text, graphics, logos, chord progressions, educational content, and software, are owned by Guitar Dice and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="mt-3">
                You are granted a limited, non-exclusive, non-transferable license to access and use the App for personal, non-commercial purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Third-Party Services</h2>
              <p>The App integrates with third-party services including:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>Stripe</strong> - Payment processing</li>
                <li><strong>Google AdMob</strong> - Advertising and rewarded videos</li>
                <li><strong>Music Gear Affiliates</strong> - Sweetwater, Thomann, Guitar Center, zZounds, Musician's Friend</li>
              </ul>
              <p className="mt-3">
                Your use of these services is subject to their respective terms of service and privacy policies. We are not responsible for the practices of third-party services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Disclaimers</h2>
              <p>
                Guitar Dice is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied. We do not guarantee that the App will be error-free, uninterrupted, or secure.
              </p>
              <p className="mt-3">
                The musical content and educational materials are for informational purposes only. We are not responsible for your musical performance or outcomes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">10. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Guitar Dice shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">11. Account Termination</h2>
              <p>
                We reserve the right to suspend or terminate your account at any time for violations of these Terms, fraudulent activity, or any other reason at our sole discretion. You may delete your account at any time through the account settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">12. Changes to Terms</h2>
              <p>
                We may modify these Terms at any time. We will notify users of material changes via email or in-app notification. Your continued use of the App after changes constitutes acceptance of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">13. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">14. Contact Information</h2>
              <p>
                If you have questions about these Terms of Service, please contact us at:
              </p>
              <p className="mt-2">
                <strong>Email:</strong> Chorddice@outlook.com
              </p>
            </section>

            <section className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                By using Guitar Dice, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
