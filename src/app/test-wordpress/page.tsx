import { getServices, getFAQs, testWordPressConnection } from '@/lib/wordpress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function TestWordPressPage() {
  // Test WordPress connection
  const isConnected = await testWordPressConnection();
  
  // Fetch data from WordPress
  const services = await getServices();
  const faqs = await getFAQs();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">WordPress Integration Test</h1>
          <div className="flex justify-center">
            <Badge variant={isConnected ? "default" : "destructive"}>
              {isConnected ? "✅ WordPress Connected" : "❌ WordPress Disconnected"}
            </Badge>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Services from WordPress ({services.length})</h2>
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <Card key={service.id}>
                  <CardHeader>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      dangerouslySetInnerHTML={{ __html: service.content }} 
                      className="mb-4"
                    />
                    {service.serviceDetails?.serviceDescription && (
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Description:</strong> {service.serviceDetails.serviceDescription}
                      </p>
                    )}
                    {service.serviceDetails?.servicePriceRange && (
                      <p className="text-sm text-gray-600">
                        <strong>Price Range:</strong> {service.serviceDetails.servicePriceRange}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">
                  No services found. Make sure you've added services in WordPress admin.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* FAQs Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">FAQs from WordPress ({faqs.length})</h2>
          {faqs.length > 0 ? (
            <div className="space-y-4">
              {faqs.map((faq) => (
                <Card key={faq.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {faq.faqFields?.question || faq.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div dangerouslySetInnerHTML={{ 
                      __html: faq.faqFields?.answer || faq.content 
                    }} />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">
                  No FAQs found. Make sure you've added FAQs in WordPress admin.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Instructions */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-700">
            <ol className="list-decimal list-inside space-y-2">
              <li>Make sure your WordPress site is running with GraphQL enabled</li>
              <li>Update the WORDPRESS_GRAPHQL_URL in your .env.local file</li>
              <li>Add some services and FAQs in your WordPress admin panel</li>
              <li>Refresh this page to see your WordPress content</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}