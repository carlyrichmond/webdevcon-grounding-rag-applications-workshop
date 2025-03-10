# Appendix: Advanced Topics

Even with the current state of our chatbot, there are other advanced topics that we should investigate for productionizing our application. 

These are discussed in subsequent sections.

# Prompt Sanitization

One glaring issue with our implementation is the lack of sanitization of our input. Sanitization is important for several reasons:

1. You may have requests outside of your domain that you don't want to action. For example, someone asking Oscar to generate code for a React component instead of using ChatGPT.
2. Other types of inappropriate, dangerous or forbidden requests.
3. Requests that may violate application usage policies.
4. Attempts to extract sensitive information using approaches such as prompt injection attacks.

There are other practices and tools available, outside of the scope of this workshop, that can help you. Check out [this piece from Elastic Security Labs](https://www.elastic.co/security-labs/embedding-security-in-llm-workflows) and open source tools such as [LLM-Guard](https://github.com/protectai/llm-guard), [LangKit](https://github.com/whylabs/langkit/tree/main) and [Open-Prompt Injection](https://github.com/liu00222/Open-Prompt-Injection).

## Sourcing

We have also not made the sources clear. It is possible in AI by Vercel to [pass back data as part of the stream](https://sdk.vercel.ai/docs/ai-sdk-ui/streaming-data), which could achieve this.

## Facets

Traditional search often uses facets, AKA those panels with additional filters to further reduce the data results. An example is available [here](https://www.elastic.co/guide/en/app-search/current/facets-guide.html).

It is possible with the `useChat` prompt to pass additional data on the submission handler. See [here for details](https://sdk.vercel.ai/docs/ai-sdk-ui/chatbot#setting-custom-body-fields-per-request).

### Telemetry

Tracing through any web application is vital in identifying bottlenecks or actual behaviour of complex web applications. Our chatbot is an example of a complex application where tracing to identify the source of slowness, unexpected behaviour or errors is important.

[OpenTelemetry](https://opentelemetry.io/) is an open source set of APIs, SDKs and tools to instrument and collect metrics, logs and application traces. 

Native browser telemetry is currently supported for [tracing](https://opentelemetry.io/docs/languages/js/getting-started/browser/), with other capabilities under development by the [Client Instrumentation SIG](https://docs.google.com/document/d/16Vsdh-DM72AfMg_FIt9yT9ExEWF4A_vRbQ3jRNBe09w/edit?tab=t.0#heading=h.yplevr950565).

Specifically for AI by Vercel, by using the [Vercel Next.js OTel integration](https://nextjs.org/docs/app/building-your-application/optimizing/open-telemetry) combined with the [`experimental_telemetry` flag](https://sdk.vercel.ai/docs/ai-sdk-core/telemetry) you will be able to collect some tracing data. However, this hasn't been covered in detail due to its currently experimental nature.  

### Testing

Because LLMs are non-deterministic and are slow and potentially expensive to run, testing the applications we build to leverage them is challenging.

The author recommends utilizing mocks at a minimum for unit tests, and potentially early E2E test runs as well if using external LLM services. The AI Core SDK does provided mock providers and test helpers for unit testing. Further details are available [here](https://sdk.vercel.ai/docs/ai-sdk-core/testing#testing).

## Expected Result

We now have better user experience having added all these elements!