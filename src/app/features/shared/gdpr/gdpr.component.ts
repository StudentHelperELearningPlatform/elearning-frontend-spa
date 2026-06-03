import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gdpr',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-white font-sans text-black">
      <nav class="flex items-center justify-between px-6 py-6 border-b-4 border-black bg-white sticky top-0 z-50">
        <div class="flex items-center gap-2" routerLink="/">
          <div class="w-10 h-10 bg-[#0ABAB5] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
            <span class="material-icons text-white font-black">school</span>
          </div>
          <span class="text-2xl font-black uppercase tracking-tighter italic cursor-pointer">E-Tutor</span>
        </div>
        <a routerLink="/" class="font-black uppercase text-sm tracking-widest hover:text-[#0ABAB5] transition-colors">Back to Home</a>
      </nav>

      <div class="max-w-4xl mx-auto px-6 py-16">
        <h1 class="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8">
          GDPR &<br><span class="text-[#0ABAB5]">Privacy Policy</span>
        </h1>
        <div class="h-2 w-32 bg-[#0ABAB5] border-2 border-black mb-12"></div>

        <div class="space-y-8 text-lg font-medium text-gray-700">

          <section>
            <h2 class="text-2xl font-black uppercase italic mb-4 text-black">1. Definitions</h2>
            <p>For the purposes of this Privacy Policy:</p>
            <ul class="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Platform</strong> means the E-Learning Adaptive Tutor (E-Tutor) web application and all associated services.</li>
              <li><strong>Personal Data</strong> means any information relating to an identified or identifiable natural person ('Data Subject').</li>
              <li><strong>Processing</strong> means any operation performed on Personal Data, whether automated or not.</li>
              <li><strong>Data Controller</strong> means E-Tutor, which determines the purposes and means of Processing Personal Data.</li>
              <li><strong>Data Processor</strong> means a natural or legal person which Processes Personal Data on behalf of the Data Controller.</li>
              <li><strong>Data Subject</strong> means the identified or identifiable person to whom Personal Data relates.</li>
              <li><strong>Consent</strong> means any freely given, specific, informed, and unambiguous indication of the Data Subject's wishes.</li>
              <li><strong>Service</strong> means the E-Tutor educational platform accessed via web browser.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-black uppercase italic mb-4 text-black">2. Data Controller</h2>
            <p>E-Learning Adaptive Tutor (E-Tutor) is the data controller for the personal data collected through this platform.</p>
            <p class="mt-4"><strong>Contact Information:</strong></p>
            <ul class="list-disc pl-6 mt-2 space-y-1">
              <li>Company Name: E-Learning Adaptive Tutor SRL</li>
              <li>Registered Address: Available upon request via email</li>
              <li>Email: gdpr&#64;e-tutor.com</li>
              <li>Data Protection Officer (DPO): DPO&#64;e-tutor.com</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-black uppercase italic mb-4 text-black">3. Data We Collect</h2>
            <p>We collect and process the following categories of personal data:</p>

            <h3 class="text-xl font-bold mt-6 mb-3">3.1 Identity Data</h3>
            <ul class="list-disc pl-6 space-y-1">
              <li>First name and last name</li>
              <li>Email address</li>
              <li>Username or similar identifier</li>
              <li>Role (student, teacher, professor, parent, admin)</li>
              <li>Date of birth (for age verification)</li>
            </ul>

            <h3 class="text-xl font-bold mt-6 mb-3">3.2 Profile Data</h3>
            <ul class="list-disc pl-6 space-y-1">
              <li>Avatar or profile picture</li>
              <li>Bio or personal description</li>
              <li>Academic information (grade level, subjects, institution)</li>
              <li>Preferences and settings</li>
            </ul>

            <h3 class="text-xl font-bold mt-6 mb-3">3.3 Usage Data</h3>
            <ul class="list-disc pl-6 space-y-1">
              <li>Lesson progress and completion status</li>
              <li>Quiz results and assessment scores</li>
              <li>Platform interaction logs (clicks, navigation, time spent)</li>
              <li>Learning path and content recommendations</li>
              <li>Search queries within the platform</li>
            </ul>

            <h3 class="text-xl font-bold mt-6 mb-3">3.4 Technical Data</h3>
            <ul class="list-disc pl-6 space-y-1">
              <li>Internet Protocol (IP) address</li>
              <li>Browser type and version</li>
              <li>Device type and operating system</li>
              <li>Time zone and location settings</li>
              <li>Session duration and page response times</li>
              <li>Referral source (how you arrived at the platform)</li>
            </ul>

            <h3 class="text-xl font-bold mt-6 mb-3">3.5 Communications Data</h3>
            <ul class="list-disc pl-6 space-y-1">
              <li>Messages sent through the platform chat system</li>
              <li>Support inquiries and correspondence</li>
              <li>Notification preferences</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-black uppercase italic mb-4 text-black">4. Legal Basis for Processing</h2>
            <p>We process your personal data based on the following legal grounds as defined in Article 6 of the GDPR:</p>

            <h3 class="text-xl font-bold mt-6 mb-3">4.1 Consent (Article 6(1)(a))</h3>
            <p>We process certain data based on your explicit consent, which you may withdraw at any time. This applies to:</p>
            <ul class="list-disc pl-6 mt-2 space-y-1">
              <li>Marketing communications and newsletters</li>
              <li>Optional profile features (e.g., public bio)</li>
              <li>Cookie preferences (where consent is required)</li>
            </ul>

            <h3 class="text-xl font-bold mt-6 mb-3">4.2 Contractual Necessity (Article 6(1)(b))</h3>
            <p>Processing is necessary for the performance of a contract to which the Data Subject is party. This applies to:</p>
            <ul class="list-disc pl-6 mt-2 space-y-1">
              <li>Creating and managing your account</li>
              <li>Providing educational content and assessments</li>
              <li>Tracking progress and generating reports</li>
              <li>Facilitating communication between users</li>
            </ul>

            <h3 class="text-xl font-bold mt-6 mb-3">4.3 Legal Obligation (Article 6(1)(c))</h3>
            <p>Processing is necessary for compliance with a legal obligation to which the controller is subject. This applies to:</p>
            <ul class="list-disc pl-6 mt-2 space-y-1">
              <li>Retaining records as required by applicable laws</li>
              <li>Responding to lawful requests from public authorities</li>
              <li>Age verification requirements</li>
            </ul>

            <h3 class="text-xl font-bold mt-6 mb-3">4.4 Legitimate Interests (Article 6(1)(f))</h3>
            <p>Processing is necessary for the legitimate interests pursued by the controller. This applies to:</p>
            <ul class="list-disc pl-6 mt-2 space-y-1">
              <li>Platform security and fraud prevention</li>
              <li>Service improvement and analytics</li>
              <li>Business operations and reporting</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-black uppercase italic mb-4 text-black">5. Purposes of Processing</h2>
            <p>We process your personal data for the following purposes:</p>
            <ul class="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Account Management:</strong> to create, maintain, and manage your user account</li>
              <li><strong>Service Delivery:</strong> to provide educational content, assessments, and learning tools</li>
              <li><strong>Progress Tracking:</strong> to monitor and report on educational progress</li>
              <li><strong>Communication:</strong> to facilitate messaging between students, teachers, and parents</li>
              <li><strong>Personalization:</strong> to tailor content and recommendations to your needs</li>
              <li><strong>Platform Improvement:</strong> to analyze usage patterns and enhance the service</li>
              <li><strong>Security:</strong> to protect the platform against unauthorized access and threats</li>
              <li><strong>Compliance:</strong> to fulfill legal and regulatory obligations</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-black uppercase italic mb-4 text-black">6. Your Rights Under GDPR</h2>
            <p>As a Data Subject, you have the following rights under Articles 15-22 of the GDPR:</p>

            <h3 class="text-xl font-bold mt-6 mb-3">6.1 Right of Access (Article 15)</h3>
            <p>You have the right to obtain confirmation as to whether we process your personal data and, if so, access to that data along with information about the processing purposes, categories of data, recipients, retention periods, and your other rights.</p>

            <h3 class="text-xl font-bold mt-6 mb-3">6.2 Right to Rectification (Article 16)</h3>
            <p>You have the right to request correction of inaccurate or incomplete personal data without undue delay.</p>

            <h3 class="text-xl font-bold mt-6 mb-3">6.3 Right to Erasure ('Right to be Forgotten') (Article 17)</h3>
            <p>You have the right to request deletion of your personal data when:</p>
            <ul class="list-disc pl-6 mt-2 space-y-1">
              <li>The data is no longer necessary for the purposes for which it was collected</li>
              <li>You withdraw consent and no other legal basis applies</li>
              <li>You object to processing and there are no overriding legitimate grounds</li>
              <li>The data has been unlawfully processed</li>
              <li>Legal obligation requires erasure</li>
            </ul>

            <h3 class="text-xl font-bold mt-6 mb-3">6.4 Right to Restrict Processing (Article 18)</h3>
            <p>You have the right to restrict processing when:</p>
            <ul class="list-disc pl-6 mt-2 space-y-1">
              <li>You contest the accuracy of the data (until we verify)</li>
              <li>Processing is unlawful and you oppose erasure</li>
              <li>We no longer need the data but you require it for legal claims</li>
              <li>You have objected to processing pending verification</li>
            </ul>

            <h3 class="text-xl font-bold mt-6 mb-3">6.5 Right to Data Portability (Article 20)</h3>
            <p>You have the right to receive your personal data in a structured, commonly used, machine-readable format and to transmit that data to another controller without hindrance, where processing is based on consent or contract and is carried out by automated means.</p>

            <h3 class="text-xl font-bold mt-6 mb-3">6.6 Right to Object (Article 21)</h3>
            <p>You have the right to object to processing based on legitimate interests, including profiling. We shall cease processing unless we demonstrate compelling legitimate grounds that override your interests, rights, and freedoms.</p>

            <h3 class="text-xl font-bold mt-6 mb-3">6.7 Rights Related to Automated Decision-Making (Article 22)</h3>
            <p>You have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects concerning you or similarly significantly affects you.</p>

            <h3 class="text-xl font-bold mt-6 mb-3">6.8 How to Exercise Your Rights</h3>
            <p>To exercise any of these rights, please contact us at <span class="text-[#0ABAB5] font-black">gdpr&#64;e-tutor.com</span>. We will respond to your request within 30 days as required by GDPR. You also have the right to lodge a complaint with a supervisory authority.</p>
          </section>

          <section>
            <h2 class="text-2xl font-black uppercase italic mb-4 text-black">7. Data Retention</h2>
            <p>We retain your personal data only as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>

            <h3 class="text-xl font-bold mt-6 mb-3">7.1 Retention Periods</h3>
            <ul class="list-disc pl-6 space-y-1">
              <li><strong>Account Data:</strong> Retained for the duration of your account activity. Upon account deletion, data is securely erased within 30 days.</li>
              <li><strong>Usage Data:</strong> Retained for a maximum of 24 months for analytics and platform improvement.</li>
              <li><strong>Communications Data:</strong> Retained for the duration of the conversation plus 12 months.</li>
              <li><strong>Technical Data:</strong> Retained for 12 months for security and operational purposes.</li>
              <li><strong>Financial Data:</strong> Retained for 10 years as required by tax and accounting laws.</li>
            </ul>

            <h3 class="text-xl font-bold mt-6 mb-3">7.2 Data Deletion</h3>
            <p>You may request account deletion at any time through your profile settings or by contacting support. Upon deletion:</p>
            <ul class="list-disc pl-6 mt-2 space-y-1">
              <li>Your account will be permanently deactivated within 24 hours</li>
              <li>Personal data will be anonymized or deleted within 30 days</li>
              <li>Aggregated anonymized data may be retained for analytics</li>
              <li>Certain data may be retained if required by law</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-black uppercase italic mb-4 text-black">8. Data Sharing and Disclosure</h2>
            <p>We do not sell, trade, or rent your personal data. We may share data in the following circumstances:</p>

            <h3 class="text-xl font-bold mt-6 mb-3">8.1 Service Providers</h3>
            <p>We engage trusted third-party service providers who process data on our behalf under strict Data Processing Agreements (DPAs) that comply with Article 28 of the GDPR. These include:</p>
            <ul class="list-disc pl-6 mt-2 space-y-1">
              <li>Cloud hosting providers (secure data storage)</li>
              <li>Analytics services (anonymized usage analysis)</li>
              <li>Communication services (email notifications, chat)</li>
              <li>Payment processors (for paid services)</li>
            </ul>

            <h3 class="text-xl font-bold mt-6 mb-3">8.2 Educational Institutions</h3>
            <p>If you are affiliated with an educational institution, we may share relevant progress and performance data with authorized representatives of that institution for educational purposes.</p>

            <h3 class="text-xl font-bold mt-6 mb-3">8.3 Legal Authorities</h3>
            <p>We may disclose personal data if required to do so by law or in response to valid legal requests by public authorities, including to meet national security or law enforcement requirements.</p>

            <h3 class="text-xl font-bold mt-6 mb-3">8.4 Business Transfers</h3>
            <p>In the event of a merger, acquisition, or sale of assets, personal data may be transferred as part of the transaction. We will notify you of any such change and ensure your data continues to be protected.</p>
          </section>

          <section>
            <h2 class="text-2xl font-black uppercase italic mb-4 text-black">9. International Data Transfers</h2>
            <p>Your personal data may be transferred to and processed in countries outside the European Economic Area (EEA). When such transfers occur, we ensure appropriate safeguards are in place:</p>
            <ul class="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Standard Contractual Clauses (SCCs):</strong> We use European Commission-approved contractual clauses for transfers to non-adequate countries.</li>
              <li><strong>Adequacy Decisions:</strong> Where the European Commission has determined that a country ensures an adequate level of data protection.</li>
              <li><strong>Binding Corporate Rules:</strong> Where applicable, we adhere to approved corporate rules for intra-group transfers.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-black uppercase italic mb-4 text-black">10. Security Measures</h2>
            <p>We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, in accordance with Article 32 of the GDPR:</p>

            <h3 class="text-xl font-bold mt-6 mb-3">10.1 Technical Measures</h3>
            <ul class="list-disc pl-6 space-y-1">
              <li>Encryption of data in transit (TLS 1.3) and at rest (AES-256)</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Regular security audits and penetration testing</li>
              <li>Intrusion detection and prevention systems</li>
              <li>Secure software development lifecycle</li>
              <li>Automated backup and disaster recovery</li>
            </ul>

            <h3 class="text-xl font-bold mt-6 mb-3">10.2 Organizational Measures</h3>
            <ul class="list-disc pl-6 space-y-1">
              <li>Data protection training for all personnel</li>
              <li>Strict access control policies based on need-to-know</li>
              <li>Data Processing Agreements with all third-party processors</li>
              <li>Incident response and breach notification procedures</li>
              <li>Regular data protection impact assessments (DPIAs)</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-black uppercase italic mb-4 text-black">11. Data Breach Notification</h2>
            <p>In accordance with Articles 33 and 34 of the GDPR:</p>
            <ul class="list-disc pl-6 mt-4 space-y-2">
              <li>We will notify the relevant supervisory authority within 72 hours of becoming aware of a personal data breach that poses a risk to your rights and freedoms.</li>
              <li>If the breach poses a high risk to your rights and freedoms, we will notify you directly without undue delay.</li>
              <li>Our breach notification will include the nature of the breach, categories of data affected, contact information for our DPO, and recommended mitigation measures.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-black uppercase italic mb-4 text-black">12. Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar tracking technologies to enhance your experience. For detailed information, please refer to our Cookie Policy. In summary:</p>
            <ul class="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for platform functionality (no consent required)</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how you use the platform (anonymized)</li>
              <li><strong>Marketing Cookies:</strong> Used only with your explicit consent</li>
            </ul>
            <p class="mt-4">You can manage your cookie preferences at any time through your browser settings or our cookie consent banner.</p>
          </section>

          <section>
            <h2 class="text-2xl font-black uppercase italic mb-4 text-black">13. Children's Privacy</h2>
            <p>We are committed to protecting the privacy of children. Our platform is designed for users of all ages, with appropriate safeguards:</p>
            <ul class="list-disc pl-6 mt-4 space-y-2">
              <li>For users under 16, we require verifiable parental consent before processing personal data, in accordance with Article 8 of the GDPR.</li>
              <li>Children's data is processed only to the extent necessary for participation in educational activities.</li>
              <li>We do not use children's data for behavioral advertising or profiling for marketing purposes.</li>
              <li>Parents have the right to access, modify, or request deletion of their child's data at any time.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-black uppercase italic mb-4 text-black">14. Automated Decision-Making and Profiling</h2>
            <p>We may use automated decision-making and profiling for the following purposes:</p>
            <ul class="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Learning Path Recommendations:</strong> Our AI analyzes your progress and performance to suggest optimal learning paths and content. This is based on your contractual relationship with us and you can opt out by disabling personalization features.</li>
              <li><strong>Performance Analytics:</strong> We analyze quiz results and engagement data to provide insights to you and your educators. This does not produce legal effects concerning you.</li>
              <li><strong>Fraud Detection:</strong> Automated systems monitor for suspicious activity to protect the platform and its users.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-black uppercase italic mb-4 text-black">15. Data Protection Officer (DPO)</h2>
            <p>We have appointed a Data Protection Officer to oversee our compliance with data protection laws. Our DPO can be contacted at:</p>
            <ul class="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Email:</strong> DPO&#64;e-tutor.com</li>
              <li><strong>Postal Address:</strong> Available upon request</li>
            </ul>
            <p class="mt-4">Our DPO is responsible for monitoring compliance, advising on data protection impact assessments, and acting as a point of contact for supervisory authorities and data subjects.</p>
          </section>

          <section>
            <h2 class="text-2xl font-black uppercase italic mb-4 text-black">16. Complaints and Supervisory Authority</h2>
            <p>You have the right to lodge a complaint with a supervisory authority if you believe our processing of your personal data violates GDPR. We encourage you to contact us first at <span class="text-[#0ABAB5] font-black">gdpr&#64;e-tutor.com</span> so we can address your concerns.</p>
            <p class="mt-4">You may lodge a complaint with the supervisory authority in your country of residence, place of work, or where the alleged infringement occurred. Contact information for each European data protection authority is available at the European Data Protection Board website.</p>
          </section>

          <section>
            <h2 class="text-2xl font-black uppercase italic mb-4 text-black">17. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any material changes through:</p>
            <ul class="list-disc pl-6 mt-4 space-y-2">
              <li>A notice on the platform</li>
              <li>An email notification (if you have provided your email)</li>
              <li>A banner or pop-up on your next login</li>
            </ul>
            <p class="mt-4">We encourage you to review this policy periodically. The "Last updated" date at the bottom indicates when the policy was last revised. Continued use of the platform after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 class="text-2xl font-black uppercase italic mb-4 text-black">18. Contact Information</h2>
            <p>For any questions, concerns, or requests regarding this Privacy Policy or our data processing practices, please contact us:</p>
            <ul class="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Data Protection Officer:</strong> DPO&#64;e-tutor.com</li>
              <li><strong>GDPR Inquiries:</strong> gdpr&#64;e-tutor.com</li>
              <li><strong>Support:</strong> support&#64;e-tutor.com</li>
            </ul>
            <p class="mt-4">We aim to respond to all inquiries within 30 days. For complex requests, we may extend this period by an additional 60 days, and we will inform you of any such extension within the initial 30-day period.</p>
          </section>

          <div class="h-2 w-full bg-[#0ABAB5]/20 border-2 border-black mt-16"></div>
          <p class="text-sm text-gray-500 font-bold">Last updated: June 2026</p>
        </div>
      </div>

      <footer class="px-6 py-8 border-t-4 border-black bg-white">
        <div class="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-[#0ABAB5] border-2 border-black flex items-center justify-center">
              <span class="material-icons text-white text-sm">school</span>
            </div>
            <span class="text-xl font-black uppercase tracking-tighter italic">E-Tutor</span>
          </div>
          <p class="font-bold text-gray-500">© 2026 E-Learning Adaptive Tutor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `,
})
export class GdprComponent {}
