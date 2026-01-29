import { Card, CardBody, Button, Divider } from "@nextui-org/react";
import { ArrowLeft, ShieldCheck, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export function TermsOfUse() {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#889A7F] rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="font-bold text-gray-900">SafeMentor</span>
          </div>
          <Button
            as={Link}
            href="/"
            variant="light"
            size="sm"
            startContent={<ArrowLeft size={16} />}
            className="text-gray-500 hover:text-[#889A7F] font-medium"
          >
            Back to Home
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
          <CardBody className="p-8 md:p-12">
            <div className="mb-10 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
                Terms of Use
              </h1>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#889A7F]/10 text-[#889A7F] rounded-full text-xs font-bold uppercase tracking-wider">
                Last Updated: January 2026
              </div>
            </div>

            {/* Key Points */}
            <div className="bg-[#889A7F]/5 rounded-2xl p-6 md:p-8 mb-12 border border-[#889A7F]/10">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="text-[#889A7F]" size={24} />
                <h2 className="text-lg font-bold text-gray-900">Key Points</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Service is for children with parental supervision and consent",
                  "Parents must be legal guardians of connected children",
                  "AI provides mentorship, not medical or professional advice",
                  "Parents responsible for monitoring child's overall wellbeing",
                  "Service available in specific regions only"
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#889A7F] flex-shrink-0" />
                    <p className="text-sm text-gray-700 leading-relaxed font-medium">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-12">
              {/* Section 1 */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-[#889A7F]">01.</span> Acceptance of Terms
                </h3>
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    By creating an account or using SafeMentor, you agree to these Terms of Use. If you do not agree, you may not use the service. SafeMentor is a tool designed to support child development through AI-assisted mentorship and parental transparency.
                  </p>
                </div>
              </section>

              <Divider className="bg-gray-100" />

              {/* Section 2 */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-[#889A7F]">02.</span> Service Description
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      SafeMentor provides AI-powered mentorship conversations for children under parental supervision.
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Child chat application with AI mentor",
                        "Parent dashboard with aggregated insights",
                        "Safety monitoring and alert system",
                        "Privacy-by-default conversation protection"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1 h-1 rounded-full bg-gray-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center justify-center">
                    <p className="text-xs text-gray-400 italic font-medium text-center uppercase tracking-widest">
                      Interactive Mentorship Platform
                    </p>
                  </div>
                </div>
              </section>

              <Divider className="bg-gray-100" />

              {/* Section 3 */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-[#889A7F]">03.</span> Responsibilities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card shadow="none" className="bg-white border border-gray-100 rounded-xl">
                    <CardBody className="p-5">
                      <p className="text-sm font-bold text-[#889A7F] mb-3 uppercase tracking-wider">Parent/Guardian</p>
                      <ul className="space-y-2">
                        {[
                          "Must be at least 18 years old",
                          "Must be legal guardian of child",
                          "Provide verifiable parental consent",
                          "Monitoring child's use and wellbeing"
                        ].map((item, i) => (
                          <li key={i} className="text-xs text-gray-600 leading-relaxed flex items-start gap-2">
                            <span className="text-gray-300">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </CardBody>
                  </Card>
                  <Card shadow="none" className="bg-white border border-gray-100 rounded-xl">
                    <CardBody className="p-5">
                      <p className="text-sm font-bold text-[#889A7F] mb-3 uppercase tracking-wider">Child</p>
                      <ul className="space-y-2">
                        {[
                          "Must have parent/guardian approval",
                          "Not share personal IDs in chats",
                          "Follow safety rules and guidelines"
                        ].map((item, i) => (
                          <li key={i} className="text-xs text-gray-600 leading-relaxed flex items-start gap-2">
                            <span className="text-gray-300">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </CardBody>
                  </Card>
                </div>
              </section>

              {/* Section 4 */}
              <section className="bg-red-50/30 p-6 rounded-2xl border border-red-100">
                <h3 className="text-xl font-bold text-red-900 mb-4">
                  04. Not Medical Advice
                </h3>
                <p className="text-sm text-red-800 leading-relaxed font-medium">
                  IMPORTANT: SafeMentor is NOT a substitute for professional medical, psychological, or therapeutic services. The AI provides general mentorship and support only. In case of emergencies, contact appropriate professional services immediately.
                </p>
              </section>

              <Divider className="bg-gray-100" />

              {/* Contact */}
              <section className="bg-gray-900 rounded-2xl p-8 md:p-12 text-white">
                <div className="max-w-2xl">
                  <h2 className="text-2xl font-bold mb-6">Questions about these Terms?</h2>
                  <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                    Our legal and support teams are here to help you understand your rights and responsibilities when using SafeMentor.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <Mail size={18} className="text-[#889A7F]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Email Support</p>
                        <p className="text-sm font-medium">legal@safementor.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <MapPin size={18} className="text-[#889A7F]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Registered Office</p>
                        <p className="text-sm font-medium">[Company Address Placeholder]</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Note */}
              <p className="text-center text-xs text-gray-400 font-medium pb-8 uppercase tracking-widest">
                SafeMentor &copy; 2026 &bull; Privacy First &bull; Built for Families
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
