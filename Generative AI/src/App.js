import React from "react";
import "@shopify/polaris/build/esm/styles.css";
import { AppProvider, Page, Text, Card, Box, Image, Button, InlineStack, BlockStack } from "@shopify/polaris";

function App() {
  return (
    <AppProvider i18n={{}}>
      <Page title="My Portfolio">
        <BlockStack gap="400">
          <Card title="About Me" sectioned>
          <InlineStack gap="400">
            <Box width="186px">
                <Image
                  source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
                  alt="Profile"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
            </Box>
            <Box paddingInlineStart="500">
                <Text as="h1" variant="headingXl">Hello, I'm [Your Name] 👋</Text>
                <Text as="p" variant="bodyMd">
                  A passionate developer creating stunning web experiences. Welcome to my portfolio!
                </Text>
            </Box>
          </InlineStack>
        </Card>


        <Card title="More Projects" sectioned>
          <InlineStack gap="1200"> 
            <Card title='Project' sectioned>
              <BlockStack gap="200">
                <Text as="h1"  variant="headingMd">Project</Text>
                <Text as="p">Description of project.</Text>
                <InlineStack gap="400">
                  <Button primary>Github</Button>
                  <Button>Deployed</Button>
                </InlineStack>
              </BlockStack>
            </Card>
            <Card title='Project' sectioned>
              <BlockStack gap="200">
                <Text as="h1"  variant="headingMd">Project</Text>
                <Text as="p">Description of project.</Text>
                <InlineStack gap="400">
                  <Button primary>Github</Button>
                  <Button>Deployed</Button>
                </InlineStack>
              </BlockStack>
            </Card>
            <Card title='Project' sectioned>
              <BlockStack gap="200">
                <Text as="h1"  variant="headingMd">Project</Text>
                <Text as="p">Description of project.</Text>
                <InlineStack gap="400">
                  <Button primary>Github</Button>
                  <Button>Deployed</Button>
                </InlineStack>
              </BlockStack>
            </Card>
            <Card title='Project' sectioned>
              <BlockStack gap="200">
                <Text as="h1"  variant="headingMd">Project</Text>
                <Text as="p">Description of project.</Text>
                <InlineStack gap="400">
                  <Button primary>Github</Button>
                  <Button>Deployed</Button>
                </InlineStack>
              </BlockStack>
            </Card>
            <Card title='Project' sectioned>
              <BlockStack gap="200">
                <Text as="h1"  variant="headingMd">Project</Text>
                <Text as="p">Description of project.</Text>
                <InlineStack gap="400">
                  <Button primary>Github</Button>
                  <Button>Deployed</Button>
                </InlineStack>
              </BlockStack>
            </Card>
            <Card title='Project' sectioned>
              <BlockStack gap="200">
                <Text as="h1"  variant="headingMd">Project</Text>
                <Text as="p">Description of project.</Text>
                <InlineStack gap="400">
                  <Button primary>Github</Button>
                  <Button>Deployed</Button>
                </InlineStack>
              </BlockStack>
            </Card>
            <Card title='Project' sectioned>
              <BlockStack gap="200">
                <Text as="h1"  variant="headingMd">Project</Text>
                <Text as="p">Description of project.</Text>
                <InlineStack gap="400">
                  <Button primary>Github</Button>
                  <Button>Deployed</Button>
                </InlineStack>
              </BlockStack>
            </Card>
            <Card title='Project' sectioned>
              <BlockStack gap="200">
                <Text as="h1"  variant="headingMd">Project</Text>
                <Text as="p">Description of project.</Text>
                <InlineStack gap="400">
                  <Button primary>Github</Button>
                  <Button>Deployed</Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </InlineStack>          
        </Card>

        <Card title="Get in Touch" sectioned>
          <Text as="p">
            Feel free to reach out! You can email me at <strong>your.email@example.com</strong>.
          </Text>
        </Card>
        </BlockStack>
      </Page>
    </AppProvider>
);
}

export default App;