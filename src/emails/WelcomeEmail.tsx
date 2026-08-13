import * as React from "react"
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
      <Body style={main}>
        <Container style={container}>
          {/* Top Organization Branding Flag */}
          <Text style={branding}>GREEN IMPACT INNOVATORS</Text>

          {/* Core Message Header */}
          <Heading style={mainHeading}>
            We're planting seeds for a greener tomorrow
          </Heading>

          {/* Static Personalized Salutation Context */}
          <Text style={subtextCenter}>
            Hi there, we're thrilled to share a milestone with you — our new
            home on the web is officially live.
          </Text>

          {/* Main Action Hub Button */}
          <Section style={{ textAlign: "center", margin: "24px 0" }}>
            <Button style={button} href="https://greenimpactinnovators.works">
              Explore our website
            </Button>
          </Section>

          {/* Core Mission Layout Block */}
          <Section style={sectionPadding}>
            <Heading as="h2" style={sectionHeading}>
              Our mission
            </Heading>
            <Text style={bodyText}>
              Green Impact Innovators is a community-based non-profit rooted in
              agriculture and environmental stewardship. We work alongside local
              growers, youth, and neighbors to restore soil, protect water, and
              grow food that nourishes both people and the land.
            </Text>
          </Section>

          {/* Current Objectives Internal Panel */}
          <Section style={alertPanel}>
            <Heading as="h3" style={panelHeading}>
              What we're focused on right now
            </Heading>
            <ul style={list}>
              <li style={listItem}>
                Regenerative farming demos and community garden pilots
              </li>
              <li style={listItem}>
                Environmental education for youth and families
              </li>
              <li style={listItem}>
                Tree planting and native habitat restoration
              </li>
              <li style={listItem}>
                Building partnerships with local farmers and schools
              </li>
            </ul>
          </Section>

          {/* Stage Status / Milestone Section */}
          <Section style={sectionPadding}>
            <Heading as="h2" style={sectionHeading}>
              An honest note about where we are
            </Heading>
            <Text style={{ ...bodyText, marginBottom: "12px" }}>
              We're in our early days. Our team is actively working through the
              accreditation and registration process to formalize Green Impact
              Innovators as a recognized non-profit organization. That means
              we're building carefully — with transparency, patience, and
              community at the center of everything we do.
            </Text>
            <Text style={bodyText}>
              During this stage, your encouragement, feedback, and word-of-mouth
              support mean the world to us.
            </Text>
          </Section>

          {/* Dynamic Community Invitation Call */}
          <Section style={{ ...sectionPadding, textAlign: "center" }}>
            <Heading as="h2" style={sectionHeading}>
              Grow with us
            </Heading>
            <Text style={{ ...subtextCenter, marginBottom: "20px" }}>
              There are already a few ways you can be part of the movement, even
              in these early days.
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
                  <td
                    style={{
                      width: "50%",
                      paddingRight: "12px",
                      textAlign: "left",
                      verticalAlign: "top",
                    }}
                  >
                    <Heading as="h3" style={{ ...panelHeading, marginTop: 0 }}>
                      Volunteer
                    </Heading>
                    <Text style={subtext}>
                      Join a planting day, workshop, or community clean-up in
                      your area.
                    </Text>
                  </td>
                  <td
                    style={{
                      width: "50%",
                      paddingLeft: "12px",
                      textAlign: "left",
                      verticalAlign: "top",
                    }}
                  >
                    <Heading as="h3" style={{ ...panelHeading, marginTop: 0 }}>
                      Partner
                    </Heading>
                    <Text style={subtext}>
                      Schools, farms, and local groups — let's build programs
                      together.
                    </Text>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Secondary CTA */}
            <Section style={{ marginTop: "32px", marginBottom: "8px" }}>
              <Button style={button} href="https://greenimpactinnovators.works">
                Get involved
              </Button>
            </Section>
          </Section>

          <Hr style={hr} />

          {/* Footer with Unsubscribe Option */}
          <Section style={{ textAlign: "center" }}>
            <Text style={footerText}>
              Thank you for standing with us at the very beginning.
            </Text>
            <Text style={footerSignature}>
              — The Green Impact Innovators team
            </Text>
            <Text style={{ ...footerText, marginTop: "16px" }}>
              Visit us at{" "}
              <Link
                href="https://greenimpactinnovators.works"
                style={footerLink}
              >
                greenimpactinnovators.works
              </Link>
            </Text>
            <Text style={unsubscribeStyle}>
              You received this email because you signed up on our website.{" "}
              <Link href={unsubscribeUrl} style={unsubscribeLink}>
                Unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default WelcomeEmail

// React Email standard styling convention: declare individual CSSProperties objects
const main: React.CSSProperties = {
  backgroundColor: "#f4f7f4",
  margin: "0 auto",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  padding: "32px 16px",
}

const container: React.CSSProperties = {
  border: "1px solid #e1e8e1",
  borderRadius: "12px",
  backgroundColor: "#ffffff",
  margin: "24px auto",
  padding: "40px",
  maxWidth: "580px",
  boxShadow: "0 4px 12px rgba(47, 125, 58, 0.08)",
}

const branding: React.CSSProperties = {
  color: "#2f7d3a",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "1.5px",
  textAlign: "center",
  textTransform: "uppercase",
  margin: "0 0 12px 0",
}

const mainHeading: React.CSSProperties = {
  color: "#14532d",
  fontSize: "30px",
  fontWeight: 700,
  letterSpacing: "-0.5px",
  textAlign: "center",
  lineHeight: "1.25",
  margin: "0 0 16px 0",
}

const subtextCenter: React.CSSProperties = {
  color: "#4b5563",
  fontSize: "16px",
  textAlign: "center",
  lineHeight: "1.6",
  margin: "0 0 28px 0",
}

const subtext: React.CSSProperties = {
  color: "#4b5563",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0",
}

const button: React.CSSProperties = {
  backgroundColor: "#2f7d3a",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: 600,
  borderRadius: "8px",
  padding: "14px 28px",
  textDecoration: "none",
  display: "inline-block",
  textAlign: "center",
  boxShadow: "0 2px 4px rgba(47, 125, 58, 0.2)",
}

const sectionPadding: React.CSSProperties = {
  padding: "16px 0",
}

const sectionHeading: React.CSSProperties = {
  color: "#14532d",
  fontSize: "20px",
  fontWeight: 600,
  margin: "0 0 12px 0",
}

const bodyText: React.CSSProperties = {
  color: "#1f2937",
  fontSize: "16px",
  lineHeight: "1.65",
  margin: "0",
}

const alertPanel: React.CSSProperties = {
  backgroundColor: "#f2f9f3",
  borderRadius: "10px",
  padding: "24px",
  margin: "24px 0",
  border: "1px solid #d1e7d3",
}

const panelHeading: React.CSSProperties = {
  color: "#14532d",
  fontSize: "17px",
  fontWeight: 600,
  margin: "0 0 12px 0",
}

const list: React.CSSProperties = {
  color: "#1f2937",
  fontSize: "15px",
  margin: "0",
  paddingLeft: "20px",
}

const listItem: React.CSSProperties = {
  marginBottom: "8px",
  lineHeight: "1.5",
}

const hr: React.CSSProperties = {
  borderTop: "1px solid #e5e7eb",
  margin: "32px 0",
}

const footerText: React.CSSProperties = {
  color: "#6b7280",
  fontSize: "13px",
  margin: "0",
}

const footerSignature: React.CSSProperties = {
  color: "#2f7d3a",
  fontSize: "13px",
  fontWeight: 600,
  margin: "6px 0 0 0",
}

const footerLink: React.CSSProperties = {
  color: "#2f7d3a",
  textDecoration: "underline",
  fontWeight: 500,
}

const unsubscribeStyle: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: "12px",
  margin: "16px 0 0 0",
}

const unsubscribeLink: React.CSSProperties = {
  color: "#6b7280",
  textDecoration: "underline",
}
