import json
import os

paths = [
    r"H:\realizeos-site\public\locales\en\translation.json",
    r"H:\realizeos-site\public\locales\he\translation.json",
    r"H:\realizeos-site\public\locales\pt\translation.json"
]

for path in paths:
    if not os.path.exists(path):
        continue
        
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # 1. Update Pricing (Get Started)
    data['pricing']['header'] = {
        "title": "Get Started",
        "subtitle": "RealizeOS is distributed under BSL 1.1. Free for most commercial uses."
    }
    data['pricing']['compareNote'] = "Stop paying recurring subscriptions. Host your own AI operations engine."
    
    data['pricing']['tiers'] = {
        "free": {
            "name": "Open Source (GitHub)",
            "description": "For developers and operators who want to self-host.",
            "emotionalPromise": "Full access to the RealizeOS V5 engine. Deploy on your own infrastructure.",
            "features": [
                "Complete Python engine (11,000+ lines)",
                "Docker one-command deploy",
                "5 channels + 13 Google Workspace tools",
                "Multi-LLM routing (Claude, Gemini, OpenAI, Ollama)",
                "BSL 1.1 License (Free for non-competitive use)"
            ],
            "price": "0",
            "period": "Free forever",
            "ctaText": "View on GitHub",
            "delivery": "Instant access via GitHub",
            "guarantee": ""
        },
        "guided": {
            "name": "Installation Session",
            "description": "Direct collaboration with the architect of RealizeOS.",
            "emotionalPromise": "Fast-track your freedom. We configure the system directly around your unique venture.",
            "badge": "Recommended",
            "features": {
                "header": "Everything in Open Source, plus:",
                "list": [
                    "1-hour setup call with the builder",
                    "Custom KB scaffolding for your business",
                    "Agent definitions tailored to your needs",
                    "Venture voice configuration",
                    "First skill workflow set up together",
                    "Priority email support for 30 days"
                ]
            },
            "price": "499",
            "period": "one-time",
            "ctaText": "Book Setup Session",
            "delivery": "1-hour setup call via Google Meet",
            "guarantee": "14-day money-back guarantee"
        },
        "consulting": {
            "name": "Enterprise Consulting",
            "description": "Custom AI operations for large-scale production.",
            "emotionalPromise": "We build, deploy, and manage your entire AI infrastructure.",
            "features": {
                "header": "For complex organizations:",
                "list": [
                    "Custom agent development",
                    "On-premise secure deployment",
                    "ERP and custom CRM integrations",
                    "Dedicated Slack/Teams support channel",
                    "Ongoing prompt engineering & optimization",
                    "SLA guarantees"
                ]
            },
            "price": "Custom",
            "period": "",
            "ctaText": "Contact Us",
            "delivery": "Custom timeline",
            "guarantee": ""
        }
    }

    # 2. Update FAQ
    data['faq'] = {
        "title": "Frequently Asked Questions",
        "items": [
            {
                "question": "Is it really free?",
                "answer": "<p>RealizeOS V5 is licensed under the Business Source License (BSL) 1.1. It is completely free for internal business use and production. The only restriction is that you cannot offer RealizeOS itself as a competing commercial service (e.g. 'AI operations as a service'). After 4 years, the code transitions to Apache 2.0.</p>"
            },
            {
                "question": "What do I need to get started?",
                "answer": "<p>Python 3.11+, Docker, and API keys for your chosen LLM providers (Anthropic, Google AI, OpenAI, and/or Ollama for local inference).</p>"
            },
            {
                "question": "Can I host it on my own server?",
                "answer": "<p>Yes. Deploy with Docker on any VPS, cloud instance, or local machine. Your data stays on your infrastructure.</p>"
            },
            {
                "question": "Is my data private?",
                "answer": "<p>Completely. RealizeOS runs on your machine or server. For maximum privacy, use Ollama for fully local inference &mdash; no data leaves your network at all.</p>"
            },
            {
                "question": "Do I get updates?",
                "answer": "<p>Yes. As an open-source project, you get access to all updates via the GitHub repository. Pull the latest changes whenever you want.</p>"
            }
        ]
    }

    # 3. Update Final CTA
    data['finalCta']['title1'] = "Start Building Your"
    data['finalCta']['title2'] = "AI Operations System"
    data['finalCta']['subtitle'] = "Join the community and take control of your AI infrastructure."
    data['finalCta']['getRealizeOS'] = "Star on GitHub"

    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
