import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Hr,
  Link,
  Tailwind,
} from "react-email"

interface WelcomeEmailProps {
  unsubscribeUrl?: string
}

export const WelcomeEmail = ({
  unsubscribeUrl = "{{{RESEND_UNSUBSCRIBE_URL}}}",
}: WelcomeEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        Discover how we're cultivating a healthier planet and community.
      </Preview>
      <Tailwind>
        <Body className="mx-auto my-0 bg-[#f4f7f4] px-4 py-8 font-sans">
          <Container className="mx-auto my-6 max-w-[580px] rounded-xl border border-solid border-[#e1e8e1] bg-white p-10 shadow-[0_4px_12px_rgba(47,125,58,0.08)]">
            {/* Top Organization Branding Flag */}
            <Text className="color-[#2f7d3a] mx-0 my-0 mb-3 text-center text-xs font-bold tracking-[1.5px] uppercase">
              GREEN IMPACT INNOVATORS
            </Text>

            {/* Core Message Header */}
            <Heading className="color-[#14532d] mx-0 my-0 mb-4 text-center text-[30px] leading-[1.25] font-bold tracking-[-0.5px]">
              We're planting seeds for a greener tomorrow
            </Heading>

            {/* Static Personalized Salutation Context */}
            <Text className="color-[#4b5563] text-img mx-0 my-0 mb-7 text-center leading-[1.6]">
              Hi there, we're thrilled to share a milestone with you — our new
              home on the web is officially live.
            </Text>

            {/* Main Action Hub Button */}
            <Section className="mx-0 my-6 text-center">
              <Button
                className="rounded-text inline-block bg-[#2f7d3a] px-7 py-3.5 text-center text-[15px] font-semibold text-white no-underline shadow-[0_2px_4px_rgba(47,125,58,0.2)]"
                href="https://greenimpactinnovators.works"
              >
                Explore our website
              </Button>
            </Section>

            {/* Core Mission Layout Block */}
            <Section className="px-0 py-4">
              <Heading
                as="h2"
                className="color-[#14532d] mx-0 my-0 mb-3 text-xl font-semibold"
              >
                Our mission
              </Heading>
              <Text className="color-[#1f2937] text-img my-0 leading-[1.65]">
                Green Impact Innovators is a community-based non-profit rooted
                in agriculture and environmental stewardship. We work alongside
                local growers, youth, and neighbors to restore soil, protect
                water, and grow food that nourishes both people and the land.
              </Text>
            </Section>

            {/* Current Objectives Internal Panel */}
            <Section className="rounded-n mx-0 my-6 border border-solid border-[#d1e7d3] bg-[#f2f9f3] p-6">
              <Heading
                as="h3"
                className="color-[#14532d] mx-0 my-0 mb-3 text-[17px] font-semibold"
              >
                What we're focused on right now
              </Heading>
              <ul className="color-[#1f2937] my-0 pl-5 text-[15px]">
                <li className="mb-2 leading-[1.5]">
                  Regenerative farming demos and community garden pilots
                </li>
                <li className="mb-2 leading-[1.5]">
                  Environmental education for youth and families
                </li>
                <li className="mb-2 leading-[1.5]">
                  Tree planting and native habitat restoration
                </li>
                <li className="mb-2 leading-[1.5]">
                  Building partnerships with local farmers and schools
                </li>
              </ul>
            </Section>

            {/* Stage Status / Milestone Section */}
            <Section className="px-0 py-4">
              <Heading
                as="h2"
                className="color-[#14532d] mx-0 my-0 mb-3 text-xl font-semibold"
              >
                An honest note about where we are
              </Heading>
              <Text className="color-[#1f2937] text-img my-0 mb-3 leading-[1.65]">
                We're in our early days. Our team is actively working through
                the accreditation and registration process to formalize Green
                Impact Innovators as a recognized non-profit organization. That
                means we're building carefully — with transparency, patience,
                and community at the center of everything we do.
              </Text>
              <Text className="color-[#1f2937] text-img my-0 leading-[1.65]">
                During this stage, your encouragement, feedback, and
                word-of-mouth support mean the world to us.
              </Text>
            </Section>

            {/* Dynamic Community Invitation Call */}
            <Section className="px-0 py-4 text-center">
              <Heading
                as="h2"
                className="color-[#14532d] mx-0 my-0 mb-3 text-xl font-semibold"
              >
                Grow with us
              </Heading>
              <Text className="color-[#4b5563] text-img mx-0 my-0 mb-5 text-center leading-[1.6]">
                There are already a few ways you can be part of the movement,
                even in these early days.
              </Text>

              {/* Grid Columns */}
              <table
                width="100%"
                border={0}
                cellPadding={0}
                cellSpacing={0}
                role="presentation"
              >
                <tbody>
                  <tr>
                    <td className="w-1/2 pr-3 text-left align-top">
                      <Heading
                        as="h3"
                        className="color-[#14532d] mx-0 my-0 mt-0 mb-3 text-[17px] font-semibold"
                      >
                        Volunteer
                      </Heading>
                      <Text className="color-[#4b5563] my-0 text-[15px] leading-[1.6]">
                        Join a planting day, workshop, or community clean-up in
                        your area.
                      </Text>
                    </td>
                    <td className="w-1/2 pl-3 text-left align-top">
                      <Heading
                        as="h3"
                        className="color-[#14532d] mx-0 my-0 mt-0 mb-3 text-[17px] font-semibold"
                      >
                        Partner
                      </Heading>
                      <Text className="color-[#4b5563] my-0 text-[15px] leading-[1.6]">
                        Schools, farms, and local groups — let's build programs
                        together.
                      </Text>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Secondary CTA */}
              <Section className="mt-8 mb-2">
                <Button
                  className="rounded-text inline-block bg-[#2f7d3a] px-7 py-3.5 text-center text-[15px] font-semibold text-white no-underline shadow-[0_2px_4px_rgba(47,125,58,0.2)]"
                  href="https://greenimpactinnovators.works"
                >
                  Get involved
                </Button>
              </Section>
            </Section>

            <Hr className="mx-0 my-8 border-t border-solid border-[#e5e7eb]" />

            {/* Footer with Unsubscribe Option */}
            <Section className="text-center">
              <Text className="color-[#6b7280] my-0| text-xs">
                Thank you for standing with us at the very beginning.
              </Text>
              <Text className="color-[#2f7d3a] my-0 mt-1.5 mr-0 mb-0 ml-0 text-xs font-semibold">
                — The Green Impact Innovators team
              </Text>
              <Text className="color-[#6b7280] my-0 mt-4 mr-0 mb-0 ml-0 text-xs">
                Visit us at{" "}
                <Link
                  href="https://greenimpactinnovators.works"
                  className="color-[#2f7d3a] font-medium underline"
                >
                  greenimpactinnovators.works
                </Link>
              </Text>
              <Text className="color-[#9ca3af] my-0 mt-4 mr-0 mb-0 ml-0 text-xs">
                You received this email because you signed up on our website.{" "}
                <Link
                  href={unsubscribeUrl}
                  className="color-[#6b7280] underline"
                >
                  Unsubscribe
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default WelcomeEmail
