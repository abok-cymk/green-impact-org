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
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Top Organization Branding Flag */}
          <Text style={styles.branding}>GREEN IMPACT INNOVATORS</Text>

          {/* Core Message Header */}
          <Heading style={styles.mainHeading}>
            We're planting seeds for a greener tomorrow
          </Heading>

          {/* Static Personalized Salutation Context */}
          <Text style={styles.subtextCenter}>
            Hi there, we're thrilled to share a milestone with you — our new
            home on the web is officially live.
          </Text>

          {/* Main Action Hub Button */}
          <Section style={{ textAlign: "center", margin: "24px 0" }}>
            <Button
              style={styles.button}
              href="https://greenimpactinnovators.works"
            >
              Explore our website
            </Button>
          </Section>

          {/* Core Mission Layout Block */}
          <Section style={styles.sectionPadding}>
            <Heading as="h2" style={styles.sectionHeading}>
              Our mission
            </Heading>
            <Text style={styles.bodyText}>
              Green Impact Innovators is a community-based non-profit rooted in
              agriculture and environmental stewardship. We work alongside local
              growers, youth, and neighbors to restore soil, protect water, and
              grow food that nourishes both people and the land.
            </Text>
          </Section>

          {/* Current Objectives Internal Panel */}
          <Section style={styles.alertPanel}>
            <Heading as="h3" style={styles.panelHeading}>
              What we're focused on right now
            </Heading>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Regenerative farming demos and community garden pilots
              </li>
              <li style={styles.listItem}>
                Environmental education for youth and families
              </li>
              <li style={styles.listItem}>
                Tree planting and native habitat restoration
              </li>
              <li style={styles.listItem}>
                Building partnerships with local farmers and schools
              </li>
            </ul>
          </Section>

          {/* Stage Status / Milestone Section */}
          <Section style={styles.sectionPadding}>
            <Heading as="h2" style={styles.sectionHeading}>
              An honest note about where we are
            </Heading>
            <Text style={{ ...styles.bodyText, marginBottom: "12px" }}>
              We're in our early days. Our team is actively working through the
              accreditation and registration process to formalize Green Impact
              Innovators as a recognized non-profit organization. That means
              we're building carefully — with transparency, patience, and
              community at the center of everything we do.
            </Text>
            <Text style={styles.bodyText}>
              During this stage, your encouragement, feedback, and word-of-mouth
              support mean the world to us.
            </Text>
          </Section>

          {/* Dynamic Community Invitation Call */}
          <Section style={{ ...styles.sectionPadding, textAlign: "center" }}>
            <Heading as="h2" style={styles.sectionHeading}>
              Grow with us
            </Heading>
            <Text style={{ ...styles.subtextCenter, marginBottom: "20px" }}>
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
                    <Heading
                      as="h3"
                      style={{ ...styles.panelHeading, marginTop: 0 }}
                    >
                      Volunteer
                    </Heading>
                    <Text style={styles.subtext}>
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
                    <Heading
                      as="h3"
                      style={{ ...styles.panelHeading, marginTop: 0 }}
                    >
                      Partner
                    </Heading>
                    <Text style={styles.subtext}>
                      Schools, farms, and local groups — let's build programs
                      together.
                    </Text>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Secondary CTA */}
            <Section style={{ marginTop: "32px", marginBottom: "8px" }}>
              <Button
                style={styles.button}
                href="https://greenimpactinnovators.works"
              >
                Get involved
              </Button>
            </Section>
          </Section>

          <Hr style={styles.hr} />

          {/* Footer with Unsubscribe Option */}
          <Section style={{ textAlign: "center" }}>
            <Text style={styles.footerText}>
              Thank you for standing with us at the very beginning.
            </Text>
            <Text style={styles.footerSignature}>
              — The Green Impact Innovators team
            </Text>
            <Text style={{ ...styles.footerText, marginTop: "16px" }}>
              Visit us at{" "}
              <Link
                href="https://greenimpactinnovators.works"
                style={styles.footerLink}
              >
                greenimpactinnovators.works
              </Link>
            </Text>
            <Text style={styles.unsubscribeText}>
              You received this email because you signed up on our website.{" "}
              <Link href={unsubscribeUrl} style={styles.unsubscribeLink}>
                Unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Explicit styles optimized for strict inline email engine output mapping
const styles = {
  body: {
    backgroundColor: "#f4f7f4",
    margin: "0 auto",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: "32px 16px",
  },
  container: {
    border: "1px solid #e1e8e1",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    margin: "24px auto",
    padding: "40px",
    maxWidth: "580px",
    boxShadow: "0 4px 12px rgba(47, 125, 58, 0.08)",
  },
  branding: {
    color: "#2f7d3a",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "1.5px",
    textAlign: "center" as const,
    textTransform: "uppercase" as const,
    margin: "0 0 12px 0",
  },
  mainHeading: {
    color: "#14532d",
    fontSize: "30px",
    fontWeight: 700,
    letterSpacing: "-0.5px",
    textAlign: "center" as const,
    lineHeight: "1.25",
    margin: "0 0 16px 0",
  },
  subtextCenter: {
    color: "#4b5563",
    fontSize: "16px",
    textAlign: "center" as const,
    lineHeight: "1.6",
    margin: "0 0 28px 0",
  },
  subtext: {
    color: "#4b5563",
    fontSize: "15px",
    lineHeight: "1.6",
    margin: "0",
  },
  button: {
    backgroundColor: "#2f7d3a",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 600,
    borderRadius: "8px",
    padding: "14px 28px",
    textDecoration: "none",
    display: "inline-block",
    textAlign: "center" as const,
    boxShadow: "0 2px 4px rgba(47, 125, 58, 0.2)",
  },
  sectionPadding: {
    padding: "16px 0",
  },
  sectionHeading: {
    color: "#14532d",
    fontSize: "20px",
    fontWeight: 600,
    margin: "0 0 12px 0",
  },
  bodyText: {
    color: "#1f2937",
    fontSize: "16px",
    lineHeight: "1.65",
    margin: "0",
  },
  alertPanel: {
    backgroundColor: "#f2f9f3",
    borderRadius: "10px",
    padding: "24px",
    margin: "24px 0",
    border: "1px solid #d1e7d3",
  },
  panelHeading: {
    color: "#14532d",
    fontSize: "17px",
    fontWeight: 600,
    margin: "0 0 12px 0",
  },
  list: {
    color: "#1f2937",
    fontSize: "15px",
    margin: "0",
    paddingLeft: "20px",
  },
  listItem: {
    marginBottom: "8px",
    lineHeight: "1.5",
  },
  hr: {
    borderTop: "1px solid #e5e7eb",
    margin: "32px 0",
  },
  footerText: {
    color: "#6b7280",
    fontSize: "13px",
    margin: "0",
  },
  footerSignature: {
    color: "#2f7d3a",
    fontSize: "13px",
    fontWeight: 600,
    margin: "6px 0 0 0",
  },
  footerLink: {
    color: "#2f7d3a",
    textDecoration: "underline",
    fontWeight: 500,
  },
  unsubscribeText: {
    color: "#9ca3af",
    fontSize: "12px",
    margin: "16px 0 0 0",
  },
  unsubscribeLink: {
    color: "#6b7280",
    textDecoration: "underline",
  },
}

export default WelcomeEmail
